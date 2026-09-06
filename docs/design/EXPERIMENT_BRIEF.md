# Experiment Brief — why the current design fails

**Status: FILLED — Phase 0 deliverable. Gate: Ojas approval pending.**
Evidence base: full code read (`tailwind.config.ts`, `app/page.tsx`, `app/globals.css`, component
inventory), live deployed home page and Brief 001 page (vercel.com project
`ark-bgxnsvmze-risabh1234s-projects`, fetched 2026-08-24), DOCUMENTATION.md voice/funnel record,
and the Part 2 shipped-device inventory.

---

## Critique 1 (mandatory) — score against the 2026 AI-default looks

| Default look | Inside / escapes | Evidence |
|---|---|---|
| Cream bg + serif display + terracotta accent | **Inside** | `bg #FAF8F4` + Fraunces Variable + `accent #D94A16` is the exact triad. The log shows the palette was retokenized **three times in one day**, ending at this convergence after comparing to github.com — iteration without diagnosis converged on the default. |
| Near-black + single acid/neon accent | Escapes | No dark ground sitewide; orange is warm, not acid. |
| Broadsheet pastiche (hairlines everywhere, zero radius, dense columns) | **Partially inside** | `* { border-radius: 0 !important }` + hairline rules as the universal separator + serif body puts the page in broadsheet grammar, though columns aren't newspaper-dense. |
| Gradient SaaS / glassmorphism / 3D blobs / bento | Mostly escapes | No glass/gradients/bento; the Vision icosahedron and Library particle cluster graze the "floating wireframe placeholder" trope. |
| Centered hero + subtitle + two buttons / trope furniture | **Inside (furniture subset)** | Left-aligned hero, but: word-stagger headline, radial glow loop, marquee, hover-lift cards, decorative numerals (01–04), wireframe 3D — five trope-furniture pieces on one page. |

**Verdict:** the incumbent system sits inside default #1, half-inside #3 and #5. Its genuine
distinctiveness currently lives entirely in copywriting and content structure, not in any visual
decision. Strip the words and the page is interchangeable with a thousand generated sites.

## Structural critiques

2. **The system asserts rigour instead of demonstrating it.** ĀRK's stated moat is labelled
   claims, shown sources, declared uncertainty — yet all four claim types (source / evidence /
   interpretation / unresolved) are rendered in one identical visual voice (same row pattern, same
   type, same borders) in the Anatomy table, and Brief 001's own page does not enact the four
   strata at all: it shows provocation → contents list → unresolved list → sample prose. The page
   advertising "every brief is built this way" is not itself built that way. The design tells; the
   brand's law is to demonstrate.

3. **The hero opens with an assertion and nothing to inspect.** The strongest sentence the company
   owns ("You are not short of information…") sits above a button and a radial-gradient glow. No
   artefact, counter, diagram, or specimen — the first screen asks for belief before showing a
   single piece of work, which contradicts the site's own atheist-test ethos. The `.hero-glow`
   behind it is atmosphere that states nothing.

4. **True labour numbers are buried as meta-text.** "63 sources · 48 pages", "Three commissions a
   month", live slot counts, published prices — the most credible objects the company owns —
   appear as small muted strings inside rows and cards. Operational transparency deserves
   first-class instrumentation (dials, ledgers, plates), not caption duty.

5. **Metronomic scroll rhythm.** Six sections in identical grammar — eyebrow → h2 → paragraph(s)
   → bordered block — separated by uniform `pt-140` hairlines, with one full-bleed poster break.
   Every beat weighs the same, so nothing leads; the scroll reads as a template walked through,
   not a narrative with tension and release.

6. **The one diagram illustrates rather than argues.** `BrokenMapDiagram` (the join vs Science/
   Religion/The market) is the page's only diagram-native moment, but it has no legend, key,
   source lines, or claim labels — and it repeats the poster break's message ("maps are broken")
   instead of advancing the argument. Two beats, one point, neither proven.

7. **The type system leaves the "instrument" voice unused.** Mono exists only as 11px eyebrows;
   tabular figures aren't used anywhere numbers matter; diacritic-rich terms (Vimāna, Sāṃkhya)
   get no editorial treatment (`.diacritic` is defined and barely consumed); Fraunces carries
   display, dek, and body simultaneously. The result reads literary-magazine, not
   knowledge-instrument — the fork the process file calls "instrument vs press" was never
   consciously taken.

8. **Motion is six vocabularies deep and semantically empty.** Word-stagger, scroll-tied font
   weight, fade-up reveals on nearly everything, a marquee, a spring pill, a glow loop — none
   communicates structure or state. Reading-progress is the only motion that means anything.
   This is the "ten micro-animations" side of the ratio the process warns about.

9. **CTA economy strains the documented rule.** First screen sells the Primer twice (nav pill +
   hero primary). The closing beat inserts marquee noise between the strongest claim and the ask,
   working against the peak-end intent. Studio — the revenue priority (`Studio → Briefs → Codex`)
   — is a third card with identical weight to a waitlist for unreleased software.

10. **Colour governance lives in code comments, not in the design.** Three accent tokens exist
    (signal-orange general, gold "reserved", signal-blue "globe only") with ration rules no
    viewer can perceive; two ink-dark islands (footer, poster break) survive with no stated logic
    under the single-ground doctrine; the blue globe appears exactly once, at the bottom of a
    dark box. A system whose discipline is invisible is indistinguishable from accident.

## Shipped-device audit (keep / mutate / kill)

| # | Device | Verdict | One sentence |
|---|---|---|---|
| 1 | Cream/Fraunces/terracotta ground | **Mutate** | Warmth and serif identity may survive, but the exact default triad must be broken somewhere deliberate (ground temperature, accent hue/ration, or type role split) — decided in Phase 2, not inherited. |
| 2 | Word-stagger hero + scroll-tied weight | **Kill** | Trope furniture with zero informational payload; the motion budget belongs to one signature device. |
| 3 | `.hero-glow` radial loop | **Kill** | Atmosphere that asserts mood — precisely what "no decoration that is not also content" forbids. |
| 4 | Marquee above email capture | **Kill** | Noise inserted before the closing ask; violates both calm-as-status and peak-end. |
| 5 | Sticky-numeral method section | **Mutate** | The sticky pattern is genuinely useful for ordered content; re-earned only if the method's order is made structurally meaningful rather than decorated with 01–04. |
| 6 | Hover-lift bordered cards | **Mutate** | Cards as objects are fine; the lift-and-glow hover is trope affordance language — replace with an affordance the new system owns. |
| 7 | Wireframe icosahedron / particle cluster | **Kill (landing scope)** | Placeholder 3D signals tech-demo, not rigour; Vision/Library may revisit 3D later under the ratified constitution. |
| 8 | Hairline-everything + radius 0 | **Mutate** | Rules should become load-bearing structure (tables, strata, ledgers) rather than universal wallpaper; radius-0 survives only as a conscious system decision. |
| 9 | Ink-dark poster break + globe | **Mutate** | The full-bleed claim-break is the best rhythm idea on the page; it needs a stated ground logic and its visual (globe) must either argue or leave. |
| 10 | Reading-progress bar | **Keep** | Semantic, cheap, calm; the natural ancestor of a Strata Ruler if one direction earns it. |

Retention cap note: verdicts above allow directions to retain at most two devices intact
(reading-progress, plus one mutated survivor), consistent with the process file.

## Uncomfortable findings

- **Distinctiveness is 100% verbal.** Remove the copy and no screenshot of this site could be
  attributed to ĀRK against a field of competitors — the opposite of what a studio engagement
  buys.
- **The repo already demonstrated the failure mode this process exists to prevent**: three
  retokenizations in one day, each justified by comparison to someone else's site (github.com,
  Mona Sans), landing squarely inside the industry's current default look.
- **The moat gets less care than the tropes.** The strata/provenance structure — the actual
  product difference — is typeset with less intention than a marquee.
- **Ops drift discovered during evidence-gathering**: production currently serves from a Vercel
  project (`risabh1234s-projects`) while docs and CI describe Cloudflare Workers, and the live
  build contains elements absent from local source (an ambient-audio toggle "♪ off", a home-page
  line "Nobody hands you the whole map…"). Design verification is currently being done against an
  unidentified build; measurement baselines (METRICS.md) inherit this problem.

---

## Addendum (2026-08-25) — vision receipt, diagnosis unchanged

`ARK_Vision_Document.md` was supplied after this brief was ratified. It reframes identity and
emotional target (civilization-scale platform; ambition + humility engines; layered spirituality)
but **does not alter any visual diagnosis above** — if anything it sharpens them: the ambition
engine makes critique #1 more damaging (a default look cannot carry an extraordinary-human
promise), and the layered-spirituality design makes #2 (assertion without demonstration) the
central failure to fix. Amendments flowed into CONSTITUTION.md v3, AUDIENCES.md (archetype D),
METRICS.md (depth discovery), the process file Part 0, and DOCUMENTATION.md voice rules — see
those files; this brief stands as written on 2026-08-24.
