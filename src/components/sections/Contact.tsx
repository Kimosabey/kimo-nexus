"use client";

import { useState } from "react";
import { Mail, Send, Loader2, Check } from "lucide-react";
import { contact, site } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { AccentLines } from "../ui/accent";
import { Waveform } from "../ui/Waveform";
import { Socials } from "../Socials";
import { useMagnetic } from "../ui/useMagnetic";

const sec: React.CSSProperties = { padding: "clamp(72px,11vw,130px) 0 clamp(48px,7vw,80px)", borderTop: "1px solid var(--hairline)" };
const label: React.CSSProperties = { display: "block", fontFamily: "var(--fm)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--muted)", marginBottom: 7 };
const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const mag = useMagnetic();
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");

  // Fallback: hand off to the visitor's mail client (identical to the pre-API behaviour).
  function mailtoFallback(name: string, email: string, message: string) {
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const company = String(fd.get("company") || "").trim(); // honeypot

    const next: typeof errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your email.";
    else if (!emailRe.test(email)) next.email = "That email looks off.";
    if (!message) next.message = "Please add a short message.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("idle");
      setNote("");
      return;
    }

    setStatus("sending");
    setNote("Sending…");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        setNote("Thanks — your message is on its way. I'll reply soon.");
        form.reset();
        return;
      }
      if (data.fallback) {
        setStatus("idle");
        setNote("Opening your email client…");
        mailtoFallback(name, email, message);
        return;
      }
      setStatus("error");
      setNote(data.error || "Something went wrong. Please try again.");
    } catch {
      // network failure → don't strand the visitor; open their mail client.
      setStatus("idle");
      setNote("Opening your email client…");
      mailtoFallback(name, email, message);
    }
  }

  const sending = status === "sending";
  const sent = status === "sent";

  return (
    <section id="contact" style={sec}>
      <Waveform bars={56} style={{ height: 26, marginBottom: 30, opacity: 0.7 }} />
      <div className="kn-contact-grid">
        <div>
          <Reveal>
            <AccentLines lines={contact.headline} style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: "clamp(2.2rem,6vw,4.4rem)", letterSpacing: "-.03em", lineHeight: 1, margin: "0 0 22px" }} />
          </Reveal>
          <Reveal>
            <p style={{ color: "var(--ink-2)", fontSize: 17, maxWidth: "52ch", margin: "0 0 34px" }}>{contact.sub}</p>
          </Reveal>
          <Reveal style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <a href={`mailto:${site.email}`} {...mag} style={{ display: "inline-flex", alignItems: "center", gap: 11, height: 58, padding: "0 26px", borderRadius: 16, background: "var(--accent)", color: "var(--accent-ink)", fontWeight: 600, fontSize: 16, transition: "transform .25s" }}>
              <Mail size={18} strokeWidth={1.9} />
              {site.email}
            </a>
            <Socials size={52} />
          </Reveal>
        </div>

        <Reveal>
          <form onSubmit={onSubmit} noValidate style={{ border: "1px solid var(--hairline)", borderRadius: 20, background: "var(--surface)", padding: 24, display: "flex", flexDirection: "column", gap: 15 }}>
            <p style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 16, margin: "0 0 2px" }}>Send a message</p>
            <div>
              <label htmlFor="kn-f-name" style={label}>Name</label>
              <input id="kn-f-name" name="name" type="text" autoComplete="name" placeholder="Your name" className="kn-field" aria-invalid={!!errors.name} style={errors.name ? { borderColor: "#E5484D" } : undefined} />
              <span className="kn-err" style={{ display: "block", fontSize: 11.5, color: "#E5484D", marginTop: 5, minHeight: 2 }}>{errors.name}</span>
            </div>
            <div>
              <label htmlFor="kn-f-email" style={label}>Email</label>
              <input id="kn-f-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className="kn-field" aria-invalid={!!errors.email} style={errors.email ? { borderColor: "#E5484D" } : undefined} />
              <span className="kn-err" style={{ display: "block", fontSize: 11.5, color: "#E5484D", marginTop: 5, minHeight: 2 }}>{errors.email}</span>
            </div>
            <div>
              <label htmlFor="kn-f-msg" style={label}>Message</label>
              <textarea id="kn-f-msg" name="message" placeholder="A line about what you're building…" className="kn-field" aria-invalid={!!errors.message} style={errors.message ? { borderColor: "#E5484D" } : undefined} />
              <span className="kn-err" style={{ display: "block", fontSize: 11.5, color: "#E5484D", marginTop: 5, minHeight: 2 }}>{errors.message}</span>
            </div>
            {/* honeypot — hidden from humans, catches bots */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
            <button type="submit" disabled={sending} {...mag} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, height: 52, borderRadius: 14, background: "var(--accent)", color: "var(--accent-ink)", fontWeight: 600, fontSize: 15, border: 0, cursor: sending ? "wait" : "pointer", fontFamily: "inherit", transition: "transform .25s", opacity: sending ? 0.75 : 1 }}>
              {sending ? (<>Sending… <Loader2 size={16} strokeWidth={2} className="kn-spin" /></>) : sent ? (<>Sent <Check size={16} strokeWidth={2.4} /></>) : (<>Send message <Send size={16} strokeWidth={2} /></>)}
            </button>
            <p aria-live="polite" role="status" style={{ fontSize: 12.5, margin: 0, minHeight: 16, color: status === "error" ? "#E5484D" : sent ? "var(--accent)" : "var(--muted)" }}>{note}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
