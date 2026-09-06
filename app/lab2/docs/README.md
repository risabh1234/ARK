# ĀRK Documentation Index & System Governance

**Directory:** `/app/lab2/docs`  
**Current Status:** Consolidated & Post-Reconciliation Master Documentation Set  
**Governing Standard:** `RECONCILE.md` (Master Forensic Ledger) & `design-constitution.md` (v4 Ratified)

This directory houses the architectural specifications, constitutional laws, design systems, and product blueprints governing ĀRK (`arkfuturism.com`).

---

## 1. Document Hierarchy & Authority Matrix

To eliminate duplicate maintenance and prevent regressions, the active documentation is organized into two authoritative tiers:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          TIER 1: ACTIVE CANONICAL SPECIFICATIONS                       │
│                           (The Unassailable Source of Truth)                           │
├──────────────────────────────┬─────────┬───────────────────────────────────────────────┤
│ File                         │ Version │ Scope & Purpose                               │
├──────────────────────────────┼─────────┼───────────────────────────────────────────────┤
│ MASTER_BUILD_SPEC.md         │ v3.0    │ Unified Master Platform & Build Specification │
│                              │         │ (Site IA, 7-Beat Landing Blueprint, Tokens)   │
│ design-constitution.md       │ v4.0    │ Inviolable laws L1–L6, 14-point Anti-List,     │
│                              │         │ and the ethical Psychological Contract        │
│ visual-design-system.md      │ v3.0    │ "The Civilizational Synthesis" design system: │
│                              │         │ Canonical Plate Palette, typography & motion  │
│ brand-editorial-guide.md     │ v4.0    │ Brand voice, translation table, audience      │
│                              │         │ personas (A–E), and layer discipline          │
│ epistemology-engine-spec.md  │ v0.2    │ The 4-layer classifier (Pramāṇa, Tattva,      │
│                              │         │ Darśana, Puruṣārtha) & Contradiction Protocol │
│ product-vision.md            │ Root    │ Foundational civilizational North Star and    │
│                              │         │ Complete Human Archetype (Harvey + Arjuna)    │
└──────────────────────────────┴─────────┴───────────────────────────────────────────────┘
```

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        TIER 2: BINDING RECONCILIATION LEDGER                           │
│                          (The Official Rulings Record)                                 │
├──────────────────────────────┬─────────┬───────────────────────────────────────────────┤
│ File                         │ Nature  │ Purpose                                       │
├──────────────────────────────┼─────────┼───────────────────────────────────────────────┤
│ RECONCILE.md                 │ Master  │ Complete forensic audit history and binding   │
│                              │ Ledger  │ Architect Rulings for all 24 contradictions   │
└──────────────────────────────┴─────────┴───────────────────────────────────────────────┘
```

---

## 2. Historical Consolidation & Deletion Record

Following the ratification of rulings in `RECONCILE.md` on 2026-09-06, redundant, superseded, and conflicting drafts were safely deleted after 100% absorption into canonical documents:

| Deleted File | Nature | Status | Target Destination |
|---|---|---|---|
| `audience-personas.md` | Persona Briefs (A–E) | **Deleted** | Fully absorbed into [`brand-editorial-guide.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab2/docs/brand-editorial-guide.md) §6 |
| `website-build-spec.md` | Build Spec v2 | **Deleted** | Fully consolidated into [`MASTER_BUILD_SPEC.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab2/docs/MASTER_BUILD_SPEC.md) |
| `MASTER_LANDING_PAGE_SPEC.md` | Landing Page Spec | **Deleted** | Fully consolidated into [`MASTER_BUILD_SPEC.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab2/docs/MASTER_BUILD_SPEC.md) |
| `ARCHITECTURAL_AUDIT_AND_CONVERGENCE_REPORT.md` | Initial Audit Report | **Deleted** | Diagnostic history, convergence, & scorecard fully merged into [`RECONCILE.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab2/docs/RECONCILE.md) |
| `v2-overhaul-manifest.md` | Obsolete Sprint Diff | **Deleted** | Superseded changelog; purged font anti-patterns (Orbitron, Pixelify) eradicated |

---

## 3. Reading & Implementation Order for Engineers

When building or reviewing the frontend in `/app/lab2`:

1. **Start Here:** **[`MASTER_BUILD_SPEC.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab2/docs/MASTER_BUILD_SPEC.md)** — The single authoritative construction document providing the complete CSS token sheet, image mapping, route architecture, and beat-by-beat landing page blueprint.
2. **Consult for Design Rules:** **[`visual-design-system.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab2/docs/visual-design-system.md)** — Governs the 8-role typography stack, Canonical Plate Palette, container geometry (structural radius 0 vs. pill tags 9999px), and hybrid motion.
3. **Consult for Review & Governance:** **[`design-constitution.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab2/docs/design-constitution.md)** — Governs laws L1–L6, the 14-point Anti-List, and the ethical psychological contract.
4. **Consult for Copy & Tone:** **[`brand-editorial-guide.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab2/docs/brand-editorial-guide.md)** — Governs the translation table, audience personas (A, B, C, D, E), and layer discipline.
5. **Consult for Epistemology:** **[`epistemology-engine-spec.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab2/docs/epistemology-engine-spec.md)** — Governs the 4-layer taxonomy, public onboarding dual-labeling, and contradiction protocol.
6. **Consult for Philosophical Context:** **[`product-vision.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab2/docs/product-vision.md)** — The civilizational North Star.
7. **Consult for Dispute History:** **[`RECONCILE.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab2/docs/RECONCILE.md)** — The definitive rulings ledger.

---

## 4. Strict Prohibitions & Ban Enforcement

Any code, design, or documentation submission violating the following rules will be rejected:

* ❌ **NO Orbitron, Pixelify Sans, or Cosmic-octo:** All headers, UI controls, and typography must use "The Civilizational Synthesis" stack (Syne, Rajdhani, Space Grotesk, Inter, Source Serif 4, Space Mono, IBM Plex Mono).
* ❌ **NO Global Page-Level Film Grain:** Background canvas must remain sharp, clean, and grain-free for legibility and `eslint-rules/no-atmosphere.js` compliance. Bayer dithering is restricted strictly to artwork frames.
* ❌ **NO Casino Loops or Referral Waitlists:** Nir Eyal variable reward schedules, gamified waitlist positions ("You are #342 in line"), and milestone referral lockouts are prohibited.
* ❌ **NO Devotional Symbols in UI Chrome:** Zero Om symbols, mandalas, or temple icons in navigation, logos, buttons, or promotional cards. Authentic motifs are permitted strictly within illustrative fine art plates.
* ❌ **NO Physical Merchandise:** Print-on-demand drop-shipping and apparel e-commerce are excluded to preserve institutional authority.
