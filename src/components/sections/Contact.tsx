"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Loader2, Send } from "lucide-react";
import { contact, sectionIndex, site } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SplitText } from "../ui/SplitText";
import { Socials } from "../Socials";
import { useMagnetic } from "../ui/useMagnetic";
const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const mag = useMagnetic();
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

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
  const err = (m?: string) => <span style={{ display: "block", fontSize: 12, color: "#E5484D", marginTop: 6, minHeight: 2 }}>{m}</span>;

  return (
    <section id="contact" className="kn-sec kn-wrap" aria-labelledby="contact-title" style={{ paddingBottom: "clamp(56px,8vw,96px)" }}>
      <Reveal className="kn-head-meta" style={{ marginBottom: 28 }}>
        <span className="kn-idx">({sectionIndex("contact")})</span>
        <span className="kn-label">Contact</span>
      </Reveal>
      <SplitText lines={contact.headline} trigger="view" className="kn-cta-title" id="contact-title" />

      <div className="kn-contact-grid">
        <div>
          <Reveal>
            <p className="kn-sub" style={{ fontSize: "clamp(16px,1.4vw,19px)", marginBottom: 34 }}>{contact.sub}</p>
          </Reveal>
          <Reveal>
            <a href={`mailto:${site.email}`} className="kn-mailbig" data-cursor="Email">
              {site.email} <ArrowUpRight size={26} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginTop: 24 }}>
            <button type="button" className="kn-copy" onClick={copyEmail} aria-live="polite">
              {copied ? <Check size={14} strokeWidth={2.2} /> : <Copy size={14} strokeWidth={1.8} />}
              {copied ? "Copied" : "Copy email"}
            </button>
            <Socials size={48} />
          </Reveal>
        </div>

        <Reveal>
          <form onSubmit={onSubmit} noValidate className="kn-panel" style={{ padding: "clamp(22px,2.6vw,34px)", display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ fontFamily: "var(--fd)", fontWeight: 500, fontSize: 20, letterSpacing: "-.02em", margin: 0 }}>
              Or send a <span className="kn-serif kn-accent">message</span>
            </p>
            <div>
              <label htmlFor="kn-f-name" className="kn-form-label">Name</label>
              <input id="kn-f-name" name="name" type="text" autoComplete="name" placeholder="Your name" className="kn-field" aria-invalid={!!errors.name} style={errors.name ? { borderColor: "#E5484D" } : undefined} />
              {err(errors.name)}
            </div>
            <div>
              <label htmlFor="kn-f-email" className="kn-form-label">Email</label>
              <input id="kn-f-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className="kn-field" aria-invalid={!!errors.email} style={errors.email ? { borderColor: "#E5484D" } : undefined} />
              {err(errors.email)}
            </div>
            <div>
              <label htmlFor="kn-f-msg" className="kn-form-label">Message</label>
              <textarea id="kn-f-msg" name="message" placeholder="A line about what you're building…" className="kn-field" aria-invalid={!!errors.message} style={errors.message ? { borderColor: "#E5484D" } : undefined} />
              {err(errors.message)}
            </div>
            {/* honeypot — hidden from humans, catches bots */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
            <button type="submit" disabled={sending} {...mag} className="kn-btn kn-btn--accent" style={{ width: "100%", cursor: sending ? "wait" : "pointer", opacity: sending ? 0.75 : 1 }}>
              {sending ? (<>Sending… <Loader2 size={16} strokeWidth={2} className="kn-spin" /></>) : sent ? (<>Sent <Check size={16} strokeWidth={2.4} /></>) : (<>Send message <Send size={16} strokeWidth={2} className="kn-arrow" /></>)}
            </button>
            <p aria-live="polite" role="status" style={{ fontSize: 12.5, margin: 0, minHeight: 16, color: status === "error" ? "#E5484D" : sent ? "var(--accent)" : "var(--muted)" }}>{note}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
