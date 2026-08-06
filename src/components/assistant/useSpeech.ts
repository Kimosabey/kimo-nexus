"use client";

// Voice in and voice out, using only what the browser already ships:
// SpeechRecognition for dictation and speechSynthesis for playback. No keys, no
// vendor, no cost. Both are strictly progressive enhancement — when the API is
// missing (Firefox keeps SpeechRecognition behind a flag), the control hides and
// typing/reading is unaffected.

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ---- Minimal local typings (prefixed so they can't collide with lib.dom) ---- */
type KnRecognitionAlternative = { transcript: string };
type KnRecognitionResult = { isFinal: boolean; 0: KnRecognitionAlternative };
type KnRecognitionEvent = { resultIndex: number; results: { length: number } & Record<number, KnRecognitionResult> };
type KnRecognitionErrorEvent = { error: string };

type KnRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: KnRecognitionEvent) => void) | null;
  onerror: ((e: KnRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
};

type RecognitionCtor = new () => KnRecognition;

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/**
 * Capability detection that survives hydration: the server snapshot is always
 * `false`, so SSR and the first client render agree, and the real value lands in
 * the commit that follows. Nothing to subscribe to — support can't change at runtime.
 */
const noSubscribe = () => () => {};
const serverFalse = () => false;
const useCapability = (probe: () => boolean) => useSyncExternalStore(noSubscribe, probe, serverFalse);

const probeRecognition = () => !!recognitionCtor();
const probeSynthesis = () => typeof window !== "undefined" && "speechSynthesis" in window;

export type DictationState = "idle" | "listening" | "denied" | "error";

/**
 * Push-to-talk dictation. `onFinal` fires once with the settled transcript;
 * `transcript` streams the interim guess so the input field feels live.
 */
export function useDictation(onFinal: (text: string) => void) {
  const supported = useCapability(probeRecognition);
  const [state, setState] = useState<DictationState>("idle");
  const [transcript, setTranscript] = useState("");
  const recRef = useRef<KnRecognition | null>(null);

  // Kept in a ref so the recognition callbacks never close over a stale handler.
  const finalRef = useRef(onFinal);
  useEffect(() => {
    finalRef.current = onFinal;
  }, [onFinal]);

  const stop = useCallback(() => {
    recRef.current?.stop();
    setState("idle");
  }, []);

  const start = useCallback(() => {
    const Ctor = recognitionCtor();
    if (!Ctor) return;

    recRef.current?.abort();
    setTranscript("");

    const rec = new Ctor();
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.lang = navigator.language || "en-US";

    rec.onresult = (e) => {
      let interim = "";
      let settled = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) settled += r[0].transcript;
        else interim += r[0].transcript;
      }
      setTranscript((settled || interim).trim());
      if (settled.trim()) {
        finalRef.current(settled.trim());
        setState("idle");
      }
    };

    rec.onerror = (e) => {
      // "no-speech"/"aborted" are ordinary outcomes, not failures worth surfacing.
      if (e.error === "not-allowed" || e.error === "service-not-allowed") setState("denied");
      else if (e.error === "no-speech" || e.error === "aborted") setState("idle");
      else setState("error");
    };

    rec.onend = () => setState((s) => (s === "listening" ? "idle" : s));

    recRef.current = rec;
    try {
      rec.start();
      setState("listening");
    } catch {
      setState("error"); // already-started races
    }
  }, []);

  useEffect(() => () => recRef.current?.abort(), []);

  return { supported, state, transcript, start, stop, listening: state === "listening" };
}

/** Read-aloud. Opt-in only — nothing is ever spoken until the visitor asks for it. */
export function useSpeaker() {
  const supported = useCapability(probeSynthesis);
  const [enabled, setEnabled] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // Never leave an utterance running after the panel closes.
  useEffect(
    () => () => {
      if (probeSynthesis()) window.speechSynthesis.cancel();
    },
    [],
  );

  const stop = useCallback(() => {
    if (!probeSynthesis()) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!enabled || !probeSynthesis()) return;
      const clean = text.trim();
      if (!clean) return;

      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(clean);
      u.rate = 1.02;
      u.pitch = 1;
      const voices = window.speechSynthesis.getVoices();
      // Prefer a voice matching the page language; otherwise let the OS decide.
      const preferred = voices.find((v) => v.lang?.toLowerCase().startsWith((navigator.language || "en").slice(0, 2).toLowerCase()));
      if (preferred) u.voice = preferred;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(u);
    },
    [enabled],
  );

  /**
   * Toggling runs inside a click, which is the gesture iOS Safari requires before
   * it will allow synthesis at all — so warm the engine here rather than later,
   * when the answer arrives outside any gesture.
   */
  const toggle = useCallback(() => {
    setEnabled((on) => {
      if (on) {
        stop();
        return false;
      }
      if (probeSynthesis()) {
        try {
          const warm = new SpeechSynthesisUtterance("");
          warm.volume = 0;
          window.speechSynthesis.speak(warm);
        } catch {
          /* warmup is best-effort */
        }
      }
      return true;
    });
  }, [stop]);

  return { supported, enabled, speaking, speak, stop, toggle };
}
