import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/content";

// Nodemailer needs the Node.js runtime (not Edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const clip = (s: string, n: number) => s.slice(0, n);
const esc = (s: string) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const name = clip(String(body.name ?? "").trim(), 120);
  const email = clip(String(body.email ?? "").trim(), 160);
  const message = clip(String(body.message ?? "").trim(), 5000);
  const honeypot = String(body.company ?? "").trim(); // bots fill hidden field

  // Silently succeed for bots — don't tip them off.
  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !email || !message || !emailRe.test(email)) {
    return NextResponse.json({ ok: false, error: "Please fill in a valid name, email, and message." }, { status: 422 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  // Creds not configured → tell the client to fall back to mailto (never worse than before).
  if (!user || !pass) {
    return NextResponse.json({ ok: false, fallback: true, error: "Mail service not configured." }, { status: 503 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"${name} (portfolio)" <${user}>`, // authenticated sender = your Gmail
      to: user, // lands in your own inbox
      replyTo: `"${name}" <${email}>`, // hit reply → goes straight to the visitor
      subject: `Portfolio enquiry from ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
      html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
        <p style="white-space:pre-wrap;margin:0 0 18px">${esc(message)}</p>
        <hr style="border:0;border-top:1px solid #e5e5e5;margin:18px 0" />
        <p style="margin:0;color:#555;font-size:13px">From <strong>${esc(name)}</strong> — <a href="mailto:${esc(email)}">${esc(email)}</a><br/>via ${esc(site.url)}</p>
      </div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ ok: false, fallback: true, error: "Couldn't send right now." }, { status: 502 });
  }
}
