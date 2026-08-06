import { projects } from "@/lib/work";
import { localAnswer } from "@/lib/assistant/localAnswer";
import { PROJECT_IDS, SECTION_IDS, WORK_GROUPS } from "@/lib/assistant/knowledge";
import {
  DEFAULT_MODEL,
  MODEL_CHAIN,
  MAX_HISTORY_TURNS,
  MAX_OUTPUT_TOKENS,
  MAX_QUESTION_CHARS,
  parseReply,
  systemPrompt,
  type ChatTurn,
  type SiteAction,
} from "@/lib/assistant/prompt";
import { clientIp, refund, remainingToday, take } from "@/lib/assistant/ratelimit";

// Same runtime posture as api/contact — Node, never cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** Vercel Hobby caps at 60s; the default 10s would cut slower free models off mid-sentence. */
export const maxDuration = 60;

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
/**
 * This budget covers the whole streamed response, not just connect time — at 20s
 * it was truncating long answers mid-word. Kept under maxDuration so the abort is
 * ours (and degrades cleanly) rather than the platform killing the function.
 */
const PROVIDER_TIMEOUT_MS = 45_000;

/**
 * Wire format: newline-delimited JSON, so the client can render tokens as they
 * land without an SSE parser.
 *   {"t":"meta",  mode, model, remaining}
 *   {"t":"delta", v}
 *   {"t":"done",  mode, action, projectIds, ms, tokens?, note?}
 */
type Frame =
  | { t: "meta"; mode: Mode; model: string | null; remaining: number }
  | { t: "delta"; v: string }
  | { t: "done"; mode: Mode; action: SiteAction | null; projectIds: string[]; ms: number; tokens?: number; note?: string; model?: string | null };

type Mode = "llm" | "local";

/**
 * A model may only move the page to somewhere that exists. Anything else is
 * dropped silently — a bad id is a no-op, never a thrown error in the visitor's face.
 */
function validateAction(a: SiteAction | null): SiteAction | null {
  if (!a) return null;
  if (a.kind === "open_project") return PROJECT_IDS.includes(a.value) ? a : null;
  if (a.kind === "filter_work") return WORK_GROUPS.includes(a.value) ? a : null;
  return (SECTION_IDS as readonly string[]).includes(a.value.replace(/^#/, "")) ? { kind: "scroll_to", value: a.value.replace(/^#/, "") } : null;
}

/**
 * Project ids the answer actually named — drives the citation chips. Matches on the
 * title as written ("VoxAgent Neural"), since a model writes the display name, not
 * the slug: deriving "vox agent neural" from the id missed every compound title.
 */
function citedProjects(text: string): string[] {
  const lower = text.toLowerCase();
  return projects.filter((p) => lower.includes(p.title.toLowerCase()) || lower.includes(p.id)).map((p) => p.id);
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}

function streamResponse(pump: (send: (f: Frame) => void) => Promise<void>) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (f: Frame) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`${JSON.stringify(f)}\n`));
        } catch {
          closed = true; // visitor navigated away mid-answer
        }
      };
      try {
        await pump(send);
      } catch (err) {
        console.error("[ask] stream failed:", err);
      } finally {
        closed = true;
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no", // don't let a proxy swallow the stream
    },
  });
}

/** Serves the deterministic answer. Never fails, needs no network, costs nothing. */
function serveLocal(question: string, note: string | undefined, started: number) {
  const { text, projectIds, action } = localAnswer(question);
  return streamResponse(async (send) => {
    send({ t: "meta", mode: "local", model: null, remaining: remainingToday() });
    send({ t: "delta", v: text });
    send({ t: "done", mode: "local", action: validateAction(action), projectIds, ms: Date.now() - started, note });
  });
}

export async function POST(req: Request) {
  const started = Date.now();

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Malformed request." }, 400);
  }

  const question = String(body.question ?? "").trim().slice(0, MAX_QUESTION_CHARS);
  if (!question) return json({ ok: false, error: "Ask me something about his work." }, 422);

  // Trust nothing about the client-supplied transcript beyond its shape.
  const history: ChatTurn[] = Array.isArray(body.history)
    ? (body.history as unknown[])
        .filter((t): t is ChatTurn => {
          const turn = t as ChatTurn;
          return !!turn && (turn.role === "user" || turn.role === "assistant") && typeof turn.content === "string";
        })
        .slice(-MAX_HISTORY_TURNS)
        .map((t) => ({ role: t.role, content: t.content.slice(0, MAX_QUESTION_CHARS) }))
    : [];

  const key = process.env.OPENROUTER_API_KEY?.trim();
  if (!key) return serveLocal(question, "Running in local mode — no model configured.", started);

  const verdict = take(clientIp(req));
  if (!verdict.ok && verdict.reason === "throttled") {
    return json({ ok: false, throttled: true, retryAfterSec: verdict.retryAfterSec, error: `One moment — try again in ${verdict.retryAfterSec}s.` }, 429);
  }
  if (!verdict.ok) return serveLocal(question, "Today's free-model budget is used up — answering from the site's own data.", started);

  const model = DEFAULT_MODEL;
  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        // OpenRouter attribution headers — optional, and useful in their dashboard.
        "HTTP-Referer": new URL(req.url).origin,
        "X-Title": "Portfolio assistant",
      },
      body: JSON.stringify({
        model,
        // OpenRouter walks this list when a slug is retired or its provider errors,
        // so one model going paid can't take the feature down.
        models: MODEL_CHAIN,
        stream: true,
        max_tokens: MAX_OUTPUT_TOKENS,
        temperature: 0.3, // low: this is recall over fixed facts, not creative writing
        // Some free models otherwise stream their scratchpad as answer text.
        reasoning: { exclude: true },
        usage: { include: true },
        messages: [{ role: "system", content: systemPrompt() }, ...history, { role: "user", content: question }],
      }),
    });
  } catch (err) {
    console.error("[ask] provider unreachable:", err);
    refund();
    return serveLocal(question, "Model unreachable — answering from the site's own data.", started);
  }

  // 401 bad key · 402 out of credit · 429 provider rate limit · 404 model retired.
  if (!res.ok || !res.body) {
    console.error("[ask] provider rejected:", res.status, await res.text().catch(() => ""));
    refund();
    return serveLocal(question, "Model unavailable — answering from the site's own data.", started);
  }

  const remaining = verdict.remaining;
  const body$ = res.body;

  return streamResponse(async (send) => {
    send({ t: "meta", mode: "llm", model, remaining });

    const reader = body$.getReader();
    const decoder = new TextDecoder();
    let sse = "";
    let acc = ""; // raw model output, action tag included
    let emitted = 0; // chars of *display* text already flushed
    let tokens: number | undefined;
    // Fallback routing means the responder may not be the model we asked for.
    let servedBy: string | null = null;

    const flush = () => {
      const { text } = parseReply(acc);
      if (text.length > emitted) {
        send({ t: "delta", v: text.slice(emitted) });
        emitted = text.length;
      }
    };

    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        sse += decoder.decode(value, { stream: true });

        // SSE frames are \n\n-delimited; keep the trailing partial for next read.
        const frames = sse.split("\n\n");
        sse = frames.pop() ?? "";

        for (const frame of frames) {
          for (const line of frame.split("\n")) {
            // ": OPENROUTER PROCESSING" keep-alive comments.
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const chunk = JSON.parse(payload);
              const delta = chunk?.choices?.[0]?.delta?.content;
              if (typeof delta === "string" && delta) acc += delta;
              if (typeof chunk?.usage?.total_tokens === "number") tokens = chunk.usage.total_tokens;
              if (!servedBy && typeof chunk?.model === "string") servedBy = chunk.model;
            } catch {
              /* partial or non-JSON frame — the next read completes it */
            }
          }
          flush();
        }
      }
    } catch (err) {
      console.error("[ask] stream interrupted:", err);
    }

    flush();
    const { text, action } = parseReply(acc);

    // Provider returned 200 but produced nothing — still owe the visitor an answer.
    if (!text) {
      const local = localAnswer(question);
      send({ t: "delta", v: local.text });
      send({ t: "done", mode: "local", action: validateAction(local.action), projectIds: local.projectIds, ms: Date.now() - started, note: "Model returned nothing — answered from the site's own data." });
      return;
    }

    send({ t: "done", mode: "llm", action: validateAction(action), projectIds: citedProjects(text), ms: Date.now() - started, tokens, model: servedBy ?? model });
  });
}
