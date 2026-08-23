"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "sent" | "error";

export function EmailCapture({
  source,
  helperText = "No name. No spam. One letter a week.",
  dark = false,
}: {
  source: string;
  helperText?: string;
  /** Set on the dark footer ground so text/border tones stay legible. */
  dark?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={`flex items-center gap-12 border-t-2 border-accent pt-16 ${dark ? "text-bg" : "text-ink"}`}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M4 12.5 L9.5 18 L20 6"
            fill="none"
            stroke="#D94A16"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="email-check-draw"
          />
        </svg>
        <p className="font-sans text-[15px]">Sent. Question 01 is waiting for you.</p>
      </div>
    );
  }

  const fieldBorder = dark ? "border-bg/24" : "border-rule";
  const fieldText = dark ? "text-bg placeholder:text-bg/40" : "text-ink placeholder:text-muted";
  const helper = dark ? "text-bg/40" : "text-muted";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={`w-full min-w-0 border ${fieldBorder} bg-transparent px-16 py-16 font-sans text-[15px] ${fieldText} focus:border-accent focus:outline-none transition-colors duration-fast`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 bg-accent px-24 py-16 font-sans text-ui font-medium text-bg hover:bg-accent-deep transition-colors duration-fast disabled:opacity-60"
        >
          {status === "loading" ? "Sending" : "Send it"}
        </button>
      </div>
      <p className={`font-mono text-[11px] uppercase tracking-[0.15em] ${status === "error" ? "text-accent" : helper}`}>
        {status === "error" ? "Something broke. Try again." : helperText}
      </p>
    </form>
  );
}
