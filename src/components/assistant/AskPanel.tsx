"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CornerDownLeft, Loader2, Mic, Square, Volume2, VolumeX } from "lucide-react";
import { assistant, sections } from "@/lib/content";
import { projects, type Project } from "@/lib/work";
import type { SiteAction } from "@/lib/assistant/prompt";
import { Waveform } from "../ui/Waveform";
import { useDictation, useSpeaker } from "./useSpeech";

type Turn = {
  role: "user" | "assistant";
  text: string;
  mode?: "llm" | "local";
  model?: string | null;
  ms?: number;
  tokens?: number;
  note?: string;
  projectIds?: string[];
  action?: SiteAction | null;
};

const byId = new Map(projects.map((p) => [p.id, p]));

/**
 * The palette renders above the project modal and locks body scroll, so an action
 * can't visibly land while it's open. It's applied behind the scenes on arrival and
 * this button is the visitor's way out to go see it — no surprise navigation.
 */
function actionLabel(a: SiteAction): string {
  if (a.kind === "open_project") return `Open ${byId.get(a.value)?.title ?? "project"}`;
  if (a.kind === "filter_work") return `Show ${a.value} work`;
  return `Go to ${sections.find((s) => s.id === a.value)?.label ?? a.value}`;
}

const iconBtn: React.CSSProperties = {
  width: 38,
  height: 38,
  flex: "0 0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 10,
  border: "1px solid var(--hairline)",
  background: "var(--surface-2)",
  color: "var(--ink)",
  cursor: "pointer",
};

const metaText: React.CSSProperties = { fontFamily: "var(--fm)", fontSize: 10.5, color: "var(--muted)", letterSpacing: ".04em" };

export function AskPanel({ onOpenProject, onAction, onClose }: { onOpenProject: (p: Project) => void; onAction: (a: SiteAction) => void; onClose: () => void }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [notice, setNotice] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  // Dictation's onFinal needs `ask`, which is defined below it; a ref breaks the cycle.
  const askRef = useRef<(q: string) => void>(() => {});

  const speaker = useSpeaker();
  const dictation = useDictation((text) => {
    setInput(text);
    askRef.current(text);
  });

  // Mounts only when Ask mode is active, so this never steals focus from Jump.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns, busy]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const ask = useCallback(
    async (raw: string) => {
      const question = raw.trim().slice(0, 500);
      if (!question || busy) return;

      setNotice("");
      setInput("");
      speaker.stop();

      // Only completed exchanges become history; the turn in flight is the question.
      const history = turns.filter((t) => t.text).map((t) => ({ role: t.role, content: t.text }));
      setTurns((prev) => [...prev, { role: "user", text: question }, { role: "assistant", text: "" }]);
      setBusy(true);

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      /** Patch the trailing assistant turn in place as frames land. */
      const patch = (fn: (t: Turn) => Turn) =>
        setTurns((prev) => {
          const next = [...prev];
          for (let i = next.length - 1; i >= 0; i--) {
            if (next[i].role === "assistant") {
              next[i] = fn(next[i]);
              break;
            }
          }
          return next;
        });

      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, history }),
          signal: ctrl.signal,
        });

        if (res.status === 429) {
          const data = await res.json().catch(() => ({}));
          setNotice(data.error || "One moment — too many questions at once.");
          setTurns((prev) => prev.slice(0, -1)); // drop the empty assistant turn
          return;
        }
        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => ({}));
          setNotice(data.error || assistant.networkError);
          setTurns((prev) => prev.slice(0, -1));
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";
        let spoken = "";
        let action: SiteAction | null = null;

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });

          const lines = buf.split("\n");
          buf = lines.pop() ?? ""; // keep the partial line for the next read

          for (const line of lines) {
            if (!line.trim()) continue;
            let f: Record<string, unknown>;
            try {
              f = JSON.parse(line);
            } catch {
              continue;
            }

            if (f.t === "meta") {
              const model = f.model as string | null;
              const mode = f.mode as Turn["mode"];
              if (typeof f.remaining === "number") setRemaining(f.remaining);
              patch((t) => ({ ...t, mode, model }));
            } else if (f.t === "delta") {
              const v = String(f.v ?? "");
              spoken += v;
              patch((t) => ({ ...t, text: t.text + v }));
            } else if (f.t === "done") {
              action = (f.action as SiteAction | null) ?? null;
              patch((t) => ({
                ...t,
                mode: f.mode as Turn["mode"],
                // The chain may have routed past the primary — report who answered.
                model: typeof f.model === "string" ? f.model : t.model,
                ms: typeof f.ms === "number" ? f.ms : undefined,
                tokens: typeof f.tokens === "number" ? f.tokens : undefined,
                note: typeof f.note === "string" ? f.note : undefined,
                projectIds: Array.isArray(f.projectIds) ? (f.projectIds as string[]) : [],
                action,
              }));
            }
          }
        }

        if (spoken) speaker.speak(spoken);
        if (action) onAction(action);
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
        setNotice(assistant.networkError);
        setTurns((prev) => (prev[prev.length - 1]?.text ? prev : prev.slice(0, -1)));
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, turns, speaker, onAction],
  );

  useEffect(() => {
    askRef.current = ask;
  }, [ask]);

  const micLabel = dictation.listening ? "Stop dictation" : "Ask by voice";
  const micNote = dictation.state === "denied" ? assistant.micDenied : dictation.state === "error" ? assistant.micError : "";

  const lastAssistant = useMemo(() => [...turns].reverse().find((t) => t.role === "assistant" && t.ms), [turns]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
      {/* transcript */}
      <div
        ref={scrollRef}
        data-hidescroll
        data-lenis-prevent
        style={{ maxHeight: "46vh", overflowY: "auto", overscrollBehavior: "contain", padding: "16px 16px 4px", display: "flex", flexDirection: "column", gap: 14 }}
      >
        {turns.length === 0 ? (
          <div>
            <p style={{ margin: "0 0 14px", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>{assistant.intro}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {assistant.suggestions.map((s) => (
                <button key={s} type="button" className="kn-ask-sugg" onClick={() => ask(s)} disabled={busy}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {turns.map((t, i) =>
          t.role === "user" ? (
            <p key={i} className="kn-ask-q">
              {t.text}
            </p>
          ) : (
            <div key={i}>
              <div className="kn-ask-a" aria-live={i === turns.length - 1 ? "polite" : undefined} aria-atomic="false">
                {t.text || (busy ? <span style={{ color: "var(--muted)" }}>{assistant.thinking}</span> : null)}
              </div>

              {t.projectIds?.length ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 10 }}>
                  {t.projectIds.map((id) => {
                    const p = byId.get(id);
                    if (!p) return null;
                    return (
                      <button key={id} type="button" className="kn-ask-chip" onClick={() => onOpenProject(p)}>
                        {p.title}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {t.action ? (
                <button type="button" className="kn-ask-go" onClick={onClose}>
                  {actionLabel(t.action)}
                  <ArrowRight size={13} strokeWidth={2} />
                </button>
              ) : null}

              {t.note ? <p style={{ ...metaText, margin: "9px 0 0" }}>{t.note}</p> : null}
            </div>
          ),
        )}
      </div>

      {/* live dictation indicator — reuses the site's signature waveform motif */}
      {dictation.listening ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px 0" }}>
          <Waveform bars={16} style={{ height: 14, width: 78 }} />
          <span style={metaText}>{dictation.transcript || assistant.listening}</span>
        </div>
      ) : null}

      {notice || micNote ? (
        <p role="status" style={{ ...metaText, color: "var(--ink-2)", margin: 0, padding: "10px 16px 0" }}>
          {notice || micNote}
        </p>
      ) : null}

      {/* composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, borderTop: "1px solid var(--hairline)", marginTop: 8 }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={assistant.placeholder}
          maxLength={500}
          aria-label={assistant.placeholder}
          className="kn-ask-input"
        />

        {dictation.supported ? (
          <button
            type="button"
            onClick={() => (dictation.listening ? dictation.stop() : dictation.start())}
            aria-label={micLabel}
            aria-pressed={dictation.listening}
            title={assistant.micHint}
            style={{ ...iconBtn, ...(dictation.listening ? { background: "var(--accent)", color: "var(--accent-ink)", borderColor: "var(--accent)" } : null) }}
          >
            {dictation.listening ? <Square size={15} strokeWidth={2.2} /> : <Mic size={17} strokeWidth={1.8} />}
          </button>
        ) : null}

        {speaker.supported ? (
          <button
            type="button"
            onClick={speaker.toggle}
            aria-label={speaker.enabled ? "Turn off read-aloud" : "Read answers aloud"}
            aria-pressed={speaker.enabled}
            style={{ ...iconBtn, ...(speaker.enabled ? { background: "var(--accent-soft)", borderColor: "color-mix(in srgb,var(--accent) 45%,var(--hairline))" } : null) }}
          >
            {speaker.enabled ? <Volume2 size={17} strokeWidth={1.8} /> : <VolumeX size={17} strokeWidth={1.8} />}
          </button>
        ) : null}

        <button type="submit" disabled={busy || !input.trim()} aria-label={assistant.send} style={{ ...iconBtn, background: "var(--accent)", color: "var(--accent-ink)", borderColor: "var(--accent)", opacity: busy || !input.trim() ? 0.45 : 1 }}>
          {busy ? <Loader2 size={16} strokeWidth={2} className="kn-spin" /> : <CornerDownLeft size={16} strokeWidth={2} />}
        </button>
      </form>

      {/* transparency strip — what actually ran, including the fact that it was free */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", padding: "8px 16px 12px", borderTop: "1px solid var(--hairline)" }}>
        <span style={metaText}>
          {lastAssistant?.mode === "local" || (lastAssistant && !lastAssistant.model) ? assistant.localLabel : lastAssistant?.model ? lastAssistant.model.replace(/:free$/, "") : "ready"}
        </span>
        {lastAssistant?.ms ? <span style={metaText}>· {lastAssistant.ms}ms</span> : null}
        {lastAssistant?.tokens ? <span style={metaText}>· {lastAssistant.tokens} tok</span> : null}
        <span style={metaText}>· {assistant.freeLabel}</span>
        {/* Only meaningful once a model request has actually been spent. */}
        {remaining !== null && lastAssistant?.mode === "llm" ? <span style={metaText}>· {remaining} left today</span> : null}
        {turns.length ? (
          <button
            type="button"
            onClick={() => {
              abortRef.current?.abort();
              speaker.stop();
              setTurns([]);
              setNotice("");
              inputRef.current?.focus();
            }}
            style={{ ...metaText, marginLeft: "auto", background: "none", border: 0, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            {assistant.clear}
          </button>
        ) : null}
      </div>
    </div>
  );
}
