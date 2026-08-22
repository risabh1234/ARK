"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "sent" | "error";

const BUDGETS = ["₹25,000 — Sprint", "₹75,000 — Dossier", "₹1,50,000/mo — Retainer", "Not sure yet"];

export function CommissionForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/commission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
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
          Sent. We reply within one working day, or we say no fast.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-24">
      <div>
        <label htmlFor="project" className="font-mono text-eyebrow uppercase text-ash">
          Project
        </label>
        <input
          id="project"
          name="project"
          required
          placeholder="Documentary, book, series, brief"
          className="mt-8 w-full border border-[rgba(245,243,239,0.24)] bg-transparent px-16 py-16 font-sans text-[15px] text-bone placeholder:text-ash focus:border-copper focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="deadline" className="font-mono text-eyebrow uppercase text-ash">
          Deadline
        </label>
        <input
          id="deadline"
          name="deadline"
          required
          placeholder="When does this need to land"
          className="mt-8 w-full border border-[rgba(245,243,239,0.24)] bg-transparent px-16 py-16 font-sans text-[15px] text-bone placeholder:text-ash focus:border-copper focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="budget" className="font-mono text-eyebrow uppercase text-ash">
          Budget range
        </label>
        <select
          id="budget"
          name="budget"
          required
          defaultValue=""
          className="mt-8 w-full border border-[rgba(245,243,239,0.24)] bg-transparent px-16 py-16 font-sans text-[15px] text-bone focus:border-copper focus:outline-none"
        >
          <option value="" disabled>
            Select a range
          </option>
          {BUDGETS.map((b) => (
            <option key={b} value={b} className="bg-ink">
              {b}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="question" className="font-mono text-eyebrow uppercase text-ash">
          The question
        </label>
        <textarea
          id="question"
          name="question"
          required
          rows={4}
          placeholder="What has to be right?"
          className="mt-8 w-full border border-[rgba(245,243,239,0.24)] bg-transparent px-16 py-16 font-sans text-[15px] text-bone placeholder:text-ash focus:border-copper focus:outline-none"
        />
      </div>
      {status === "error" && (
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-copper">
          Something broke. Try again.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-copper px-24 py-16 font-sans text-ui font-medium text-ink hover:bg-copper-lift transition-colors duration-150 disabled:opacity-60"
      >
        {status === "loading" ? "Sending" : "Send it"}
      </button>
    </form>
  );
}
