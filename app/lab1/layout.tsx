import type { Metadata } from "next";
import "./lab.css";

/*
 * Lab isolation layout — Landing Page Design Process.md, Part 3.
 *
 * WALL RULES (checked mechanically at the Phase 5 gate):
 * - Lab pages import NOTHING from `components/` or `lib/`. They may rebuild
 *   primitives differently — that is the point of the experiment.
 * - Production files must never reference `app/lab` or `/lab`.
 *
 * Known inheritance from the root layout (documented constraint, accepted for
 * the experiment): Fraunces/Inter CSS variables, the 3%-opacity grain overlay,
 * and the global radius-0 reset all apply here too. A direction that needs any
 * of them gone is a system-level decision, made explicitly at Phase 3 — not a
 * per-component override smuggled in here.
 */

export const metadata: Metadata = {
  title: { absolute: "ĀRK Lab — internal" },
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <div data-lab="true">{children}</div>;
}
