"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "sent" | "error";

export function EmailCapture({
  source,
  helperText = "No name. No spam. One letter a week.",
}: {
  source: string;
  helperText?: string;
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
      <div className="border-t-2 border-copper pt-16">
        <p className="font-sans text-[15px] text-bone">
          Sent. Question 01 is waiting for you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full min-w-0 border border-[rgba(245,243,239,0.24)] bg-transparent px-16 py-16 font-sans text-[15px] text-bone placeholder:text-ash focus:border-copper focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 bg-copper px-24 py-16 font-sans text-ui font-medium text-ink hover:bg-copper-lift transition-colors duration-150 disabled:opacity-60"
        >
          {status === "loading" ? "Sending" : "Send it"}
        </button>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
        {status === "error" ? "Something broke. Try again." : helperText}
      </p>
    </form>
  );
}
