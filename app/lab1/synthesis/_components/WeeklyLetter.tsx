"use client";

import { useState, type FormEvent, type ReactElement } from "react";

export function WeeklyLetter(): ReactElement {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "invalid" | "submitting" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailRegex.test(email.trim())) {
      setStatus("invalid");
      setErrorMessage("That doesn't look like an email address yet.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email: email.trim(), source: "landing-weekly-letter" }),
      });

      if (res.ok) {
        setStatus("done");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMessage(data.error || "Subscription request could not be completed. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const handleBlur = () => {
    if (email.trim() && !emailRegex.test(email.trim())) {
      setStatus("invalid");
      setErrorMessage("That doesn't look like an email address yet.");
    } else if (status === "invalid") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  return (
    <div className="v3-weekly-letter-box" aria-label="Weekly Letter Subscription">
      <h3 className="v3-weekly-letter-title">THE WEEKLY LETTER</h3>
      <p className="v3-weekly-letter-sub">
        Ideas worth your attention. One letter. Every week.
      </p>

      {status === "done" ? (
        <div className="v3-letter-success" role="status">
          ✓ Check your inbox — the first letter is on its way.
        </div>
      ) : (
        <form
          className="v3-letter-form ark-letter-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <label htmlFor="wl-email" className="sr-only">
            Email address for weekly dispatch
          </label>
          <input
            id="wl-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "invalid" || status === "error") setStatus("idle");
            }}
            onBlur={handleBlur}
            placeholder="you@example.com"
            aria-describedby="wl-note wl-err"
            aria-invalid={status === "invalid" || status === "error"}
            className={`v3-letter-input ${status === "invalid" || status === "error" ? "is-invalid" : ""}`}
            disabled={status === "submitting"}
          />

          <button
            type="submit"
            className="v3-btn-primary"
            disabled={status === "submitting"}
            style={{ whiteSpace: "nowrap", minHeight: "48px" }}
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}

      <div
        id="wl-err"
        className="v3-letter-error"
        aria-live="assertive"
        role="alert"
      >
        {(status === "invalid" || status === "error") && errorMessage ? errorMessage : null}
      </div>

      <div id="wl-note" className="v3-letter-reassurance">
        <div>No spam. No noise. Only signal.</div>
        <div>One click unsubscribes. We never sell the list.</div>
      </div>
    </div>
  );
}
