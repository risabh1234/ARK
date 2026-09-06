# Technical Documentation

Internal. Architecture reference — how the system is actually built, kept strictly in sync with the codebase.
If this documentation drifts from reality, trust the code and fix this file, not the other way around.

---

## 1. System Architecture & Stack

ĀRK is built as a high-performance, modern web application and knowledge platform. It operates a dual-tier data layer (separating legacy unauthenticated records from strictly RLS-enforced user and content tables), variable typography, GPU-accelerated motion and 3D scenes with strict accessibility fallbacks, and multi-cloud deployment capabilities (active on Vercel; configured for Cloudflare Workers via OpenNext).

### Technology Stack Reference

| Layer | Choice | Version / Package | Architectural Rationale & Implementation Details |
|---|---|---|---|
| **Framework** | Next.js 15 App Router | `next@^15.0.3`, `react@^19.0.0`, `react-dom@^19.0.0` | App Router at repo root (`app/`). Server components by default; streaming SSR with Suspense boundaries; Server Actions for authenticated mutations. |
| **Language & Runtime** | TypeScript + Node.js | `typescript@^5.6.3`, Node 22+ (CI: Node 22; Local: Node 23) | Strict typechecking (`tsconfig.json`, `npm run typecheck`). Node-native scripts with ES module support. |
| **Styling** | Tailwind CSS v3 + Hand-Authored Tokens | `tailwindcss@^3.4.14`, `postcss@^8.4.49`, `autoprefixer@^10.4.20` | `tailwind.config.ts` acts as the single source of truth for color, font, spacing, and shadow tokens. Configured with `postcss.config.cjs` (CJS export avoids Windows ESM font-loader pathing bug). |
| **Typography** | Google Variable Fonts via `next/font/google` | Fraunces Variable, Inter Variable, Space Mono, Source Serif 4 | **Production:** Fraunces Variable (display/serif with `opsz`, `SOFT`, `WONK` axes) + Inter Variable (sans/UI/mono). Loaded with no fixed weight array to preserve full continuous variable-axis interpolation (§30.1).<br>**Design Lab / Synthesis:** Technical Triad (Inter Variable + Space Mono + Source Serif 4) loaded with `latin-ext` subset providing verified glyph coverage for Sanskrit IAST diacritics (Ā, ā, Ī, ī, Ṃ, ṃ, Ṛ, ṛ) and currency symbols (₹). |
| **Motion** | Framer Motion + Pure CSS Keyframes | `framer-motion@^13.1.1` | Scroll reveals (`whileInView`), hero word-stagger + variable weight interpolation (`HeroHeadline`), hover weight animation (`VariableHeadline`), sticky numerals (`StickyNumerals`), and topic filter pill springs (`ResearchList`). Every Framer Motion component explicitly queries `useReducedMotion()`. Pure CSS keyframes drive the animated Logo mark, grain overlay, and marquee. |
| **Audio** | Howler.js | `howler@^2.2.4`, `@types/howler@^2.2.13` | `components/AudioToggle.tsx` provides an opt-in, muted-by-default ambient audio loop with `localStorage` state persistence (`ark-ambient-audio`). Degrades to an informative disabled state when `AMBIENT_TRACK_URL` is unconfigured. |
| **3D Graphics** | Three.js + React Three Fiber | `three@^0.185.1`, `@react-three/fiber@^9.7.0` | In-viewport lazy mounting via `components/three/Scene3D.tsx` (`IntersectionObserver`), WebGL availability detection, and static vector fallbacks (`StaticShapeSVG.tsx`) under `prefers-reduced-motion` or WebGL absence. `@react-three/drei` was removed to eliminate bundle bloat. |
| **Database: Public Tier** | Postgres via Drizzle ORM | `drizzle-orm@^0.36.4`, `postgres@^3.4.5`, `drizzle-kit@^0.28.1` | Direct connection to Supabase Postgres via `DATABASE_URL` for tables without RLS: `subscriber`, `order`, `commission_request`. Resilient client (`lib/db.ts`) gracefully returns `null` when unconfigured. |
| **Database: Auth & Protected Tier** | Supabase PostgREST Client with RLS | `@supabase/supabase-js@^2.112.3`, `@supabase/ssr@^0.12.4` | Tables with Row-Level Security: `profiles`, `articles`, `comments`, `admin_audit_log`. Keyed to `auth.uid()`. Must always go through `@supabase/ssr` request-bound clients (`lib/supabase/server.ts`, `lib/supabase/client.ts`), never Drizzle. Dedicated project `ark`, ref `qosdbcvdqtlcinetxdbh`, region `ap-south-1`. |
| **Rich Text Editor** | Tiptap 3 + DOMPurify | `@tiptap/react@^3.30.2`, `@tiptap/starter-kit@^3.30.2`, `isomorphic-dompurify@^3.22.0` | Article composer with StarterKit, Link, and Image extensions. Stored as JSON AST in `articles.body_richtext`. Server-side rendering to HTML sanitized via `isomorphic-dompurify` prior to render to eliminate XSS risks (§33). |
| **Transactional Email** | Resend | `resend@^4.0.1` | Delivers the Primer letter (D0) via `lib/resend.ts`. Logs and continues safely if `RESEND_API_KEY` is unset. |
| **Production Hosting** | Vercel (Active) | Edge & Node Runtime | Active deployment at `https://ark-swart.vercel.app`. Native GitHub integration auto-deploys `main`. Dynamic SSR with live Supabase auth and PostgREST queries verified in production. |
| **Edge Hosting (Configured)** | Cloudflare Workers via OpenNext | `@opennextjs/cloudflare@^1.20.2`, `wrangler@^4.125.0` | Configured via `open-next.config.ts` and `wrangler.jsonc` (`ark.harekrishnachaitanya8.workers.dev`). Auto-deploy via GitHub Actions (`.github/workflows/deploy.yml`). Note: deployment currently requires paid Workers plan or bundle trimming due to 3MiB free-tier script size limit. |
| **Design Quality Assurance** | Node & Playwright Automation | `scripts/design/contrast.mjs`, `scripts/design/verify-specimen.mjs` | Automated mathematical WCAG 2.1 relative luminance and contrast audit (17/17 pairs verified AAA/AA), plus headless Playwright Chromium multi-viewport visual and hydration testing. |

---

## 2. Codebase Directory Map

```
ARK/
├── .env.example                     Template of all environment variables (documented)
├── .env.local                       Local secrets (gitignored; dummy values fallback)
├── .github/
│   └── workflows/
│       └── deploy.yml               GitHub Actions CI/CD to Cloudflare Workers on push to main
├── .gitignore                       Git exclusion list (node_modules, .next, .open-next, test artifacts)
├── CLAUDE.md                        Operational workflow rules and doc-maintenance conventions
├── Landing Page Design Process.md   Gate-enforced 8-phase AI design methodology
├── README.md                        Public repository overview
├── app/                             Next.js App Router root
│   ├── layout.tsx                   Root HTML layout, variable fonts, grain overlay, metadataBase
│   ├── globals.css                  CSS custom properties, typography resets, Logo mark animations, grain
│   ├── icon.svg                     Favicon vector mark (32x32 SVG, #181310 ground, #f0e7d8 ink)
│   ├── page.tsx                     / (Home page — hero, BrokenMapDiagram, method, strata, poster, cards)
│   ├── account/                     /account (Auth-gated reader dashboard)
│   │   ├── layout.tsx               Auth gate redirecting to /sign-in, sidebar navigation
│   │   ├── page.tsx                 /account (Overview & profile summary)
│   │   ├── actions.ts               Server actions: updateProfile, changeEmail, changePassword, softDeleteOwnAccount
│   │   ├── articles/page.tsx        /account/articles (User-authored articles)
│   │   ├── comments/page.tsx        /account/comments (User-posted comments)
│   │   ├── reset-password/page.tsx  /account/reset-password (In-session password change)
│   │   └── settings/page.tsx        /account/settings (Profile forms, security, soft account erasure)
│   ├── api/
│   │   ├── commission/route.ts      POST /api/commission (Studio form submission → commission_request)
│   │   └── subscribe/route.ts       POST /api/subscribe (Email capture → subscriber + Resend trigger)
│   ├── articles/                    /articles (Community writing & reading ecosystem)
│   │   ├── page.tsx                 /articles (Index list with tag filter & sort)
│   │   ├── actions.ts               Server actions: saveArticle, deleteArticle, postComment, deleteComment
│   │   ├── new/page.tsx             /articles/new (Tiptap composer, auth-gated)
│   │   └── [slug]/
│   │       ├── page.tsx             /articles/[slug] (Article reader & threaded comments)
│   │       └── edit/page.tsx        /articles/[slug]/edit (Article editor, author/moderator gated)
│   ├── auth/
│   │   ├── actions.ts               Server actions: signUpWithPassword, signInWithPassword, signInWithGoogle, signOut, requestPasswordReset
│   │   └── callback/route.ts        GET /auth/callback (Handles PKCE OAuth code & OTP token_hash redirects)
│   ├── control/                     /control (Admin & moderation control plane)
│   │   ├── layout.tsx               Server-side role gate (moderator/admin/owner; 404 for unauthorized)
│   │   ├── page.tsx                 Redirects to /control/users
│   │   ├── actions.ts               Server actions: changeUserRole, setUserStatus (RPC), bestEffortHardDeleteUser, removeArticle, removeComment
│   │   ├── audit-log/page.tsx       /control/audit-log (Immutable admin audit log viewer, owner-only)
│   │   ├── content/page.tsx         /control/content (Moderation search & content deletion)
│   │   ├── settings/page.tsx        /control/settings (Platform controls & hard-delete re-auth, owner-only)
│   │   └── users/page.tsx           /control/users (User listing, role assignment, suspension/ban controls)
│   ├── docs/page.tsx                /docs (Public methodology, brief strata explanation, FAQs)
│   ├── forgot-password/page.tsx     /forgot-password (Password reset email request)
│   ├── lab/                         /lab (Design experiment quarantine workspace)
│   │   ├── layout.tsx               Lab layout: noindex robots, strict isolation wall
│   │   ├── page.tsx                 /lab (Index of design prototype directions & synthesis)
│   │   ├── lab.css                  Scoped [data-dir] token architecture
│   │   ├── a/page.tsx               /lab/a (Direction A: The Instrument Panel)
│   │   ├── b/page.tsx               /lab/b (Direction B: The Provenance Rail)
│   │   ├── c/page.tsx               /lab/c (Direction C: The Strata Ruler)
│   │   ├── d/page.tsx               /lab/d (Direction D: The Unresolved Ledger)
│   │   ├── e/page.tsx               /lab/e (Direction E: The Horizon Plate)
│   │   ├── v2/                      /lab/v2 (Variant 2: Cartographic Horizon)
│   │   ├── v3/                      /lab/v3 (Variant 3: Stratigraphic Instrument)
│   │   └── synthesis/               /lab/synthesis (Ratified Final Landing Page Synthesis)
│   │       ├── page.tsx             /lab/synthesis (Root client page with 7 stratigraphic beats)
│   │       ├── synthesis.css        Ratified design system tokens & Tektronix glow utilities
│   │       ├── synthesis-layout.css Scoped synthesis layout, responsive grid, zero-radius reset
│   │       ├── hooks/               useActiveStratum (IntersectionObserver), useReducedMotion
│   │       ├── _components/         28 modular synthesis components (TopBar, StrataRuler, HeroBeat, etc.)
│   │       └── specimen/            /lab/synthesis/specimen (Interactive specimen sheet)
│   ├── library/page.tsx             /library ("The Library" placeholder with particle 3D visual)
│   ├── primer/page.tsx              /primer (10 public Primer inquiry questions)
│   ├── privacy/page.tsx             /privacy (Public privacy policy & data processing disclosure)
│   ├── research/
│   │   ├── page.tsx                 /research (Brief catalogue with topic filter pill bar)
│   │   └── [slug]/page.tsx          /research/[slug] (Single brief detail with reading progress & DepthControl)
│   ├── sign-in/page.tsx             /sign-in (Authentication portal: email/password & Google OAuth)
│   ├── sign-up/page.tsx             /sign-up (Account creation portal)
│   ├── studio/page.tsx              /studio (Commission tiers, live monthly slot counter, CommissionForm)
│   └── vision/page.tsx              /vision (Codex platform architecture & waitlist capture)
├── components/                      Shared UI components and subsystems
│   ├── AudioToggle.tsx              Howler ambient audio controller with localStorage persistence
│   ├── BriefRow.tsx                 Index-style brief row unit (Research catalogue)
│   ├── BrokenMapDiagram.tsx         SVG circular arc diagram of "The Join" on Home
│   ├── Button.tsx                   ButtonLink & Button (primary, secondary, tertiary)
│   ├── Card.tsx                     Standard hover-lift card with arrow translation
│   ├── CommissionForm.tsx           4-field Studio inquiry client form
│   ├── DepthControl.tsx             Quick / Explain / Deep / Complete visual depth switcher
│   ├── EmailCapture.tsx             Single-field email capture with SVG checkmark draw-in
│   ├── Footer.tsx                   4-column footer, dark ink-dark ground, GiantWordmark
│   ├── GiantWordmark.tsx            18vw responsive footer wordmark (pure CSS hover color shift)
│   ├── Header.tsx                   Synchronous server shell rendering static chrome immediately
│   ├── HeaderClient.tsx             Client scroll handler, mobile nav, sticky backdrop blur
│   ├── HeaderSessionCorner.tsx      Suspense-wrapped async component reading Supabase session
│   ├── Logo.tsx                     7-beat pure CSS animated vector mark
│   ├── Primitives.tsx               Container, Section, Panel, Eyebrow layout helpers
│   ├── ReadingProgress.tsx          Fixed top 2px accent progress bar tied to scroll
│   ├── ResearchList.tsx             Client topic filter bar with spring-in active pill
│   ├── account/
│   │   ├── DeleteArticleButton.tsx  Client confirmation button for article deletion
│   │   ├── DeleteCommentButton.tsx  Client confirmation button for comment deletion
│   │   ├── ProfileForm.tsx          Display name, username, and bio update form
│   │   └── SettingsForms.tsx        Email and password change form components
│   ├── articles/
│   │   ├── ArticleBody.tsx          Sanitized rich text HTML renderer via isomorphic-dompurify
│   │   ├── ArticleComposer.tsx      Client-side authoring form with tag selector & cover input
│   │   ├── ArticleIndexList.tsx     Filterable/sortable articles list
│   │   ├── CommentForm.tsx          Comment and reply submission form
│   │   ├── CommentThread.tsx        One-level nested comment discussion thread
│   │   └── RichTextEditor.tsx       Tiptap client editor with toolbar (bold, italic, links, images)
│   ├── auth/
│   │   ├── AuthForm.tsx             Shared credential form for sign-in and sign-up
│   │   └── ForgotPasswordForm.tsx   Password reset request form
│   ├── control/
│   │   ├── ContentRow.tsx           Moderation row for articles and comments with remove action
│   │   └── UserRow.tsx              User administration row for role assignment and ban actions
│   ├── motion/
│   │   ├── HeroHeadline.tsx         Home hero word-stagger + scroll-tied variable weight
│   │   ├── Marquee.tsx              CSS infinite text marquee with hover-pause
│   │   ├── Reveal.tsx               whileInView fade-up animation wrapper (reduced-motion compliant)
│   │   ├── StickyNumerals.tsx       Sticky numeral column beside scrolling narrative
│   │   └── VariableHeadline.tsx     Framer Motion hover weight animation (500 → 620)
│   └── three/
│       ├── GlobeScene.tsx           Three.js wireframe globe with signal-blue arcs and nodes
│       ├── GlobeVisual.tsx          R3F wrapper for GlobeScene on Home poster section
│       ├── IcosahedronScene.tsx     Wireframe icosahedron for Vision page
│       ├── LibraryOrb.tsx           R3F wrapper for Library particle scene
│       ├── ParticleClusterScene.tsx Assembling particle cluster for Library page
│       ├── Scene3D.tsx              IntersectionObserver lazy-load container with fallback handling
│       ├── StaticShapeSVG.tsx       Static vector fallbacks for 3D forms
│       └── VisionOrb.tsx            R3F wrapper for Vision icosahedron
├── content/
│   ├── briefs.ts                    Brief data definitions, catalogue of 5 briefs (001 live, 002-005 queued)
│   └── primer.ts                    10 public Primer inquiry questions and category mappings
├── db/
│   └── schema.ts                    Drizzle ORM table definitions: subscriber, order, commission_request
├── docs/
│   ├── design/                      Design experiment artifacts, audit reports, and vision specs
│   │   ├── ARK_Vision_Document.md   Civilization-scale platform vision and architectural thesis
│   │   ├── AUDIENCES.md             Four audience archetypes and success behaviors
│   │   ├── CONSTITUTION.md          Constitutional design laws L1–L6 and psychological contract
│   │   ├── DIVERGENCE_LOG.md        Phase 2 divergence worktree provenance and incident log
│   │   ├── EXPERIMENT_BRIEF.md      Phase 0 critique and keep/mutate/kill device audit
│   │   ├── METRICS.md               Funnel baselines and conversion tracking parameters
│   │   ├── PHASE_3_AUDIT_REPORT.md  Independent taste-and-technical audit report
│   │   ├── README.md                Index and gate-status tracker for design workspace
│   │   ├── REFERENCES.md            Annotated non-web and web physical reference library
│   │   ├── SYNTHESIS_SPEC.md        Ratified Triad Synthesis (C + A + E) specification
│   │   ├── VALIDATION_REPORT.md     Phase 5 validation report template
│   │   ├── directions/              Direction specs (A through E: spec.md + rationale.md)
│   │   └── screens/                 Playwright full-page desktop and mobile verification screenshots
│   └── internal/                    Internal engineering and operational documentation
│       ├── DEVELOPMENT_LOG.md       Reverse-chronological session history and bug transcripts
│       ├── DOCUMENTATION.md         Product positioning, brand voice laws, and revenue model
│       ├── IMPLEMENTATION.md        Feature status tracker, deviations log, and operational gaps
│       └── TECHNICAL_DOCUMENTATION.md (This file) Complete technical architecture reference
├── lib/
│   ├── articles.ts                  Tiptap extensions, ARTICLE_TAGS, data types, readTimeMinutes()
│   ├── db.ts                        getDb() lazy Drizzle Postgres client
│   ├── resend.ts                    sendPrimerLetter() email dispatch helper
│   ├── same-origin.ts               isSameOrigin() CSRF protection for API form endpoints
│   └── supabase/
│       ├── client.ts                createClient() browser client via @supabase/ssr
│       ├── middleware.ts            updateSession() cookie refresh logic called by root middleware
│       ├── server.ts                createClient() server client bound to request cookies
│       └── session.ts               getSessionProfile() server-side auth profile reader
├── scripts/
│   └── design/
│       ├── contrast.mjs             Dependency-free WCAG 2.1 mathematical contrast audit script
│       └── verify-specimen.mjs      Playwright automated browser verification & screenshot engine
├── supabase/
│   ├── config.toml                  Local Supabase CLI configuration
│   └── migrations/
│       ├── 0001_init.sql            Legacy Drizzle tables: subscriber, order, commission_request
│       ├── 0002_auth_articles_admin.sql Profiles, articles, comments, audit log + RLS
│       ├── 0003_storage_buckets.sql article-covers & avatars storage buckets + Storage RLS
│       ├── 0004_fix_role_escalation_rls_bug.sql Role-escalation fix on profiles UPDATE
│       ├── 0005_audit_log_insert_policy.sql Scoped audit log INSERT policy for privileged actors
│       └── 0006_admin_status_rpc.sql admin_set_user_status SECURITY DEFINER RPC
├── drizzle.config.ts                Drizzle Kit schema and migration output configuration
├── middleware.ts                    Next.js edge middleware refreshing Supabase auth cookies
├── next.config.ts                   Next.js configuration
├── open-next.config.ts              OpenNext Cloudflare adapter configuration
├── package.json                     Dependencies, scripts, and engine specifications
├── postcss.config.cjs               PostCSS config (CJS format for Windows Next.js compatibility)
├── tailwind.config.ts               Production design tokens (colors, font scale, shadows, timing)
├── tsconfig.json                    TypeScript compiler configuration
└── wrangler.jsonc                   Cloudflare Worker configuration (Worker name, bindings, vars)
```

---

## 3. Design Systems & Token Architecture

The codebase currently houses two token systems: the **Production System (v4)** active across all public and authenticated routes, and the **Synthesis System (Phase 3 Ratified)** isolated inside `app/lab/synthesis/` awaiting promotion in Phase 6/7.

### 3.1 Production Design Tokens (`tailwind.config.ts` & `app/globals.css`)

The production theme uses a crisp near-white background paired with deep ink typography, a single signal orange primary accent, and a dedicated signal blue for data visualizations.

#### Color Tokens

| Token | Hex Value | WCAG Role & Application |
|---|---|---|
| `bg` | `#FAF8F4` | Sitewide page background ground. Cooled from cream toward crisp near-white. |
| `bg-raised` | `#FFFFFF` | Cards, elevated modular panels, active input fields. |
| `ink` | `#171512` | Primary text, titles, headings, and high-contrast structural strokes. |
| `muted` | `#625E57` | Secondary text, meta descriptions, subtitles, inactive borders. |
| `accent` (DEFAULT) | `#D94A16` | Signal orange — primary CTAs, active links, progress indicator. |
| `accent-deep` | `#B83A0E` | Accent hover state, active pill borders, warning boundaries. |
| `gold` | `#B58A45` | Restrained secondary accent (reserved for sparing details; never dual-signaled). |
| `signal-blue` | `#3E7BFA` | Network/telemetry blue reserved strictly for the Home globe visual (`GlobeScene.tsx`). |
| `rule` | `#DDD7CA` | Hairline dividers, table borders (`rgba(18, 16, 11, 0.14)` in CSS). |
| `rule-strong` | — | Emphasized dividers (`rgba(18, 16, 11, 0.28)` in CSS). |
| `ink-dark` | `#14110C` | Dark contrast surfaces: Footer background and Home poster section. |

#### Typography Scale

Font families:
- `font-serif`: Fraunces Variable (`var(--font-fraunces)`, Georgia, serif)
- `font-sans`: Inter Variable (`var(--font-inter)`, system-ui, sans-serif)
- `font-mono`: Inter Variable (`var(--font-inter)`, ui-monospace, monospace)

Type tokens:
- `display`: `clamp(3.25rem, 10vw, 8.5rem)` (line-height 0.98, tracking -0.015em)
- `h1`: `clamp(2.25rem, 4.6vw, 3.75rem)` (line-height 1.08, tracking -0.008em)
- `h2`: `clamp(1.625rem, 2.8vw, 2.25rem)` (line-height 1.15, tracking -0.002em)
- `lead`: `1.25rem` (line-height 1.6, tracking 0)
- `body`: `1.0625rem` (line-height 1.7, tracking +0.005em)
- `small`: `0.875rem` (line-height 1.4, tracking +0.005em)
- `eyebrow`: `11px` (line-height 1, tracking 0.2em, uppercase)

#### Elevation & Global Resets

- Elevation shadows: `shadow-0` (none), `shadow-1` (rest cards: `0 1px 2px rgba(35,32,27,.06)`), `shadow-2` (hover cards: `0 6px 16px rgba(35,32,27,.10)`), `shadow-3` (`0 16px 40px rgba(35,32,27,.16)`), `shadow-4` (scrolled header: `0 24px 64px rgba(35,32,27,.22)`).
- Border Radius: Enforced at zero globally (`* { border-radius: 0 !important; }` in `app/globals.css`).
- Grain Overlay: Fixed, non-scrolling monochrome noise texture at 3% opacity (`mix-blend-mode: overlay`).

---

### 3.2 Synthesis Design System (`SYNTHESIS_SPEC.md` & `synthesis.css`)

Governed by `Landing Page Design Process.md` (Ratified Phase 3: The Triad Synthesis C + A + E). Scoped strictly to `[data-dir="synthesis"]` and `html:has([data-dir="synthesis"])`.

#### Token Palette & Contrast Certification

All 17 core pairings are mathematically audited and certified via `scripts/design/contrast.mjs`:

```css
[data-dir="synthesis"], .ark-synthesis {
  /* Ground & Surfaces (Atmosphere §6: Spacecraft + Private Library at Night) */
  --ark-bg: #181310;             /* Warm near-black instrument ground (never sterile #000) */
  --ark-bg-raised: #211a14;      /* Active panels, toolbars, mobile ruler strip */
  --ark-bg-plate: #282018;       /* Embedded diagram insets, callout frames */
  --ark-bg-deep: #110d0b;        /* Deep recessed cavities, unlit wells */

  /* Ink Hierarchy (Mathematically certified WCAG AA/AAA) */
  --ark-ink-hi: #f0e7d8;         /* Primary headings, H1/H2, CTA surface (15.03:1 on bg) [AAA] */
  --ark-ink: #d9cdb9;            /* Body reading prose, diagram labels (11.75:1 on bg) [AAA] */
  --ark-muted: #a3957d;          /* Meta, sigla, captions, ruler ticks (6.28:1 on bg) [AA] */
  --ark-faint: #5e5445;          /* Inactive borders, grid background */

  /* Hot Signals (Tektronix Glow Law: Signal-Only) */
  --ark-amber: #ffb000;          /* Phosphor-warm signal: reading bead & live measurement (10.06:1) [AAA] */
  --ark-signal-red: #BA3C0F;     /* Action marker & UNSURVEYED void boundaries (4.58:1 on hi, 3.28:1 on bg) */

  /* Structural Hairlines */
  --ark-rule: rgba(240, 231, 216, 0.15);
  --ark-rule-strong: rgba(240, 231, 216, 0.34);
}
```

- **Tektronix Glow Law:** Utility classes (`.ark-glow-signal`, `.ark-glow-signal-sm`, `.ark-glow-red`) restrict luminescence strictly to active datums/signals. Framing bezels and panels never glow.
- **Diacritic Coverage:** Verified Sanskrit IAST glyphs (`Ā, ā, Ī, ī, Ṃ, ṃ, Ṛ, ṛ`) rendered natively using `latin-ext` subsets without synthetic system fallbacks.
- **Touch Target Law:** Interactive buttons enforce a minimum height of `48px` with `14px 24px` padding, exceeding the 44px accessibility threshold.

---

## 4. Lab Isolation & Redesign Quarantine

The redesign experiment is quarantined inside `app/lab/` and `docs/design/` per `Landing Page Design Process.md` Part 3:

1. **Two-Way Wall:**
   - Production code must never import from or link to `app/lab` or `/lab`.
   - Lab routes (`app/lab/**`) must never import from `@/components/*` or `@/lib/*`. Lab pages construct their own primitives.
2. **Indexing & Layout:**
   - `app/lab/layout.tsx` applies `robots: { index: false, follow: false }` metadata.
3. **Route Directory:**
   - `/lab`: Hub indexing experimental directions.
   - `/lab/a` through `/lab/e`: Divergent prototype directions (Phase 2 output).
   - `/lab/synthesis/specimen`: Live interactive specimen sheet verifying typography, Strata Ruler altimeter, Braun 3-key DepthControl, and mathematical contrast floors.
4. **Promotion:**
   - Lab code remains isolated on `exp/redesign-*` branches until Phase 7 promotion merges ratified tokens into production.

---

## 5. Navigation, Identity & Motion Systems

### 5.1 Animated Logo Mark (`components/Logo.tsx`)

The ĀRK mark implements the 5-second motion cycle as a **pure CSS Server Component with zero client JavaScript**:

- **Animation Sequence (4.3s duration along house curve `cubic-bezier(0.16, 1, 0.3, 1)`):**
  1. *0.0s – 1.5s (Earth Line):* Symmetrical horizontal horizon draws outward from center (`.ark-earth`).
  2. *0.7s – 2.1s (Circumference Ring):* Copper ring closes clockwise from top apex (`.ark-ring`).
  3. *1.1s – 2.4s (Rising Legs):* Two structural legs rise upward from base to apex (`.ark-leg`).
  4. *1.7s – 2.5s (Horizontal Plate):* Horizontal lintel plate scales outward symmetrically (`.ark-plate`).
  5. *2.2s – 3.3s (Star Ignition):* Core ignites with a spring overshoot to 115% before settling (`.ark-star-core`, `.ark-star-glow`).
  6. *3.3s – 4.3s (Decay & Hold):* Star luminescence decays to a resting 62% opacity and **holds permanently**.
- **Geometry Normalization:** All SVG paths utilize `pathLength="1"` so that dashoffset animations execute across `1 → 0` regardless of viewBox scale.
- **Accessibility:** Under `prefers-reduced-motion: reduce`, animations are bypassed instantly via CSS media queries, rendering the mark fully formed at resting opacity.

### 5.2 Header Streaming & Session Architecture

The navigation header is split into three components to eliminate server latency bottlenecks:

```
[Header.tsx (Sync Server Component)]
  └── Shell (Logo + 6 Nav Links + "The Primer" CTA) -> Renders immediately
  └── <Suspense fallback={<HeaderSessionFallback />}>
        └── [HeaderSessionCorner.tsx (Async Server Component)]
              └── Reads cookies -> getSessionProfile() -> Returns Avatar / "Sign in"
```

- **6 Nav Items (§4.1):** `Research`, `Studio`, `Vision`, `Library`, `Articles`, `Docs`, plus `The Primer` bordered pill button.
- **Scroll Behavior:** `HeaderClient.tsx` monitors scroll depth (`scrollY > 80`) to apply `backdrop-blur-md`, `bg-bg/90`, `border-rule`, and `shadow-4`.

### 5.3 Motion & Interactive Components

- **`HeroHeadline.tsx`:** Staggers individual words into view on mount and dynamically adjusts `font-variation-settings` weight axes tied to viewport scroll.
- **`VariableHeadline.tsx`:** Animate-on-hover variable font weight transitions (Fraunces weight 500 → 620).
- **`StickyNumerals.tsx`:** Sticky numeral index (`01`…`04`) pinned at `30vh` while descriptive text scrolls.
- **`GiantWordmark.tsx`:** Full-width 18vw responsive footer wordmark utilizing pure CSS `:hover` color transitions to eliminate client JS bundle weight.
- **`ReadingProgress.tsx`:** Top 2px fixed accent progress line animated via `transform: scaleX(var(--progress))`.

---

## 6. 3D Graphics & WebGL Infrastructure (`components/three/`)

All 3D components are built with Three.js and `@react-three/fiber`, orchestrated through a resilient lazy-loading wrapper:

1. **`Scene3D.tsx` Lazy Mount Engine:**
   - Wraps all R3F `Canvas` elements.
   - Monitors visibility with `IntersectionObserver` (`rootMargin: "200px"`). Unmounts or disables rendering when scrolled out of view.
   - Evaluates WebGL capability via `canvas.getContext("webgl2") || canvas.getContext("webgl")`.
   - Renders static SVG equivalents (`StaticShapeSVG.tsx`) if WebGL is unavailable or if `prefers-reduced-motion: reduce` is active.
2. **Visual Scenes:**
   - **`GlobeScene.tsx` (Home Poster):** Wireframe sphere with glowing signal-blue nodes and connecting arcs. Constructed using raw `THREE.Line` objects inside `<primitive object={...} />` to avoid JSX namespace collisions with SVG `<line>`.
   - **`IcosahedronScene.tsx` (Vision):** Wireframe icosahedron rotating continuously on dual axes.
   - **`ParticleClusterScene.tsx` (Library):** 200-particle clustering visual representing knowledge assembly.

---

## 7. Dual-Tier Database Architecture & Security Model

ĀRK employs a strict separation between public unauthenticated data and authenticated, RLS-protected tables.

```
                    ┌────────────────────────────────────────────────────────┐
                    │                      HTTP REQUEST                      │
                    └───────────┬────────────────────────────────┬───────────┘
                                │                                │
                    [Direct Form POSTs]                 [App Router Routes & Actions]
                                │                                │
                   lib/db.ts (getDb)                 lib/supabase/server.ts
                 postgres-js driver                  @supabase/ssr (PostgREST)
                                │                                │
                   Postgres Role: Direct               Postgres Role: anon / authenticated
                    (Bypasses RLS)                       (STRICT RLS ENFORCEMENT)
                                │                                │
                   ┌────────────┴───────────┐        ┌───────────┴────────────────────────┐
                   │ Legacy Public Tables   │        │ Auth-Owned & Protected Tables      │
                   │ - subscriber           │        │ - profiles                         │
                   │ - order                │        │ - articles                         │
                   │ - commission_request   │        │ - comments                         │
                   └────────────────────────┘        │ - admin_audit_log                  │
                                                     │ - Storage: article-covers, avatars │
                                                     └────────────────────────────────────┘
```

### 7.1 Tier 1: Legacy Public Tables (Drizzle ORM)

Defined in `db/schema.ts` and managed via Drizzle Kit (`drizzle.config.ts`).
- **`subscriber`:** `id` (UUID PK), `email` (text unique), `source` (text), `sequence_step` (int default 0), `created_at` (timestamptz).
- **`order`:** `id` (UUID PK), `email` (text), `brief_slug` (text), `amount` (int), `currency` (text), `provider` (text), `provider_ref` (text), `status` (text default 'pending'), `created_at` (timestamptz).
- **`commission_request`:** `id` (UUID PK), `project` (text), `deadline` (text), `budget` (text), `question` (text), `email` (text nullable), `created_at` (timestamptz).

### 7.2 Tier 2: Protected Tables & RLS Policies (Supabase)

Defined in migrations `0002` through `0006`. Always accessed via `@supabase/ssr` with request cookies.

#### Schema Definitions

- **`profiles`:**
  - `id` (UUID PK references `auth.users(id)` ON DELETE CASCADE)
  - `username` (text unique not null), `display_name` (text), `avatar_url` (text), `bio` (text)
  - `role` (text check in `'user'`, `'moderator'`, `'admin'`, `'owner'`, default `'user'`)
  - `status` (text check in `'active'`, `'suspended'`, `'banned'`, default `'active'`)
  - `deleted_at` (timestamptz), `created_at` (timestamptz)
- **`articles`:**
  - `id` (UUID PK), `author_id` (UUID FK `profiles.id`), `slug` (text unique not null), `title` (text not null)
  - `cover_image_url` (text), `body_richtext` (jsonb not null), `body_html` (text)
  - `tag` (text check in `'Sanskrit'`, `'Method'`, `'Field Notes'`)
  - `status` (text check in `'draft'`, `'published'`, default `'draft'`)
  - `published_at` (timestamptz), `created_at` (timestamptz), `updated_at` (timestamptz)
- **`comments`:**
  - `id` (UUID PK), `article_id` (UUID FK `articles.id` ON DELETE CASCADE), `author_id` (UUID FK `profiles.id`)
  - `parent_comment_id` (UUID FK `comments.id` ON DELETE CASCADE), `body` (text not null)
  - `created_at` (timestamptz), `edited_at` (timestamptz)
- **`admin_audit_log`:**
  - `id` (UUID PK), `actor_id` (UUID FK `profiles.id`), `action` (text not null)
  - `target_type` (text check in `'user'`, `'article'`, `'comment'`, `'setting'`), `target_id` (UUID), `detail` (jsonb), `created_at` (timestamptz)

#### Row-Level Security Rules

1. **Profiles:**
   - `SELECT`: Publicly readable (`using (true)`).
   - `UPDATE`: Authenticated users can update their own non-privileged columns (`id = auth.uid()`).
   - `ROLE/STATUS UPDATE` (**Migration `0004`**): Gated strictly to `owner`:
     ```sql
     create policy "Only owners can change role or status" on profiles for update
       using ((select role from profiles where id = auth.uid()) = 'owner')
       with check ((select role from profiles where id = auth.uid()) = 'owner');
     ```
     *(Fixed a critical vulnerability where `WITH CHECK (true)` previously leaked through Postgres policy OR-combinations).*
2. **Articles:**
   - `SELECT`: Published articles are publicly readable (`status = 'published'`); authors can view their own drafts (`author_id = auth.uid()`).
   - `INSERT / UPDATE`: Authenticated authors can create and update their own articles.
   - `DELETE`: Author can delete their own; moderators, admins, and owners can delete any article.
3. **Comments:**
   - `SELECT`: Publicly readable.
   - `INSERT`: Authenticated users can post comments.
   - `DELETE`: Author, moderator, admin, or owner can delete.
4. **Audit Log (**Migration `0005`**):**
   - `INSERT`: Privileged actors (`moderator`, `admin`, `owner`) can log their own actions (`actor_id = auth.uid()`).
   - `UPDATE / DELETE`: Denied to all roles (immutable append-only table).
5. **Admin Status RPC (**Migration `0006`**):**
   - `SECURITY DEFINER` function `admin_set_user_status(target_id uuid, new_status text)`.
   - Authorizes `admin` and `owner` actors; blocks admins from modifying owners; automatically appends to `admin_audit_log`.
   - Execution permissions explicitly revoked from `anon`.

---

## 8. Authentication & Server Action API

Authentication uses Supabase Auth with PKCE and cookie sessions managed by `@supabase/ssr`.

### 8.1 Auth Actions (`app/auth/actions.ts`)

- `signUpWithPassword(email, password)`: Enforces $\ge 8$ characters, triggers Supabase signup with callback redirect, and creates a linked `profiles` row.
- `signInWithPassword(email, password)`: Validates credentials, sets session cookies, and redirects to `/account`.
- `signInWithGoogle()`: Initiates OAuth redirect flow via `NEXT_PUBLIC_SITE_URL/auth/callback`.
- `signOut()`: Terminates session and clears cookies.
- `requestPasswordReset(email)`: Dispatches password recovery link targeting `/auth/callback?next=/account/reset-password`.

### 8.2 Account Actions (`app/account/actions.ts`)

- `updateProfile(display_name, bio, username)`: Updates public profile details. Validates unique username.
- `changeEmail(email)`: Dispatches verification emails to update account address.
- `changePassword(password)`: Updates user password ($\ge 8$ chars).
- `softDeleteOwnAccount()`: Anonymizes profile name to `"Deleted user"`, clears avatar/bio, renames username to `deleted-<id>`, sets `deleted_at = now()`, and signs out. Does not touch `status` column to prevent bypass of admin locks.

### 8.3 Content Actions (`app/articles/actions.ts`)

- `saveArticle(formData)`: Handles draft creation and publication. Generates URL-safe slugs. Enforces authentication via RLS.
- `deleteArticle(articleId)`: Deletes article and revalidates paths.
- `postComment(formData)`: Inserts top-level or reply comments.
- `deleteComment(commentId, slug)`: Removes comment row.

### 8.4 Control Plane Actions (`app/control/actions.ts`)

- `changeUserRole(targetId, newRole)`: Owner-only direct update on `profiles.role`.
- `setUserStatus(targetId, newStatus)`: Admin/Owner call to `admin_set_user_status` RPC.
- `bestEffortHardDeleteUser(targetId, ownerPassword)`: Owner-only destructive action requiring live password re-entry. Anonymizes user profile, bans user, and wipes all articles and comments.
- `removeArticle(articleId)` & `removeComment(commentId)`: Content moderation removals with automatic audit logging.

---

## 9. Security, Input Sanitization & CSRF Defense

1. **CSRF & Origin Verification (`lib/same-origin.ts`):**
   - Direct form POST routes (`/api/subscribe`, `/api/commission`) validate that the incoming `Origin` header matches the request `Host` before processing payloads.
   - Next.js Server Actions automatically enforce host/origin verification at the framework layer.
2. **XSS Sanitization:**
   - Tiptap JSON AST is converted to HTML on the server and sanitized using `isomorphic-dompurify` inside `components/articles/ArticleBody.tsx` prior to rendering.
3. **Cookie Security:**
   - Session cookies created by `@supabase/ssr` utilize `httpOnly`, `secure`, and `sameSite=lax` directives.
4. **Secret Boundary:**
   - `SUPABASE_SERVICE_ROLE_KEY` is strictly excluded from client builds. All operations in the application run under scoped user permissions or audited `SECURITY DEFINER` functions.

---

## 10. Route Matrix & Access Control

| Route Pattern | Rendering Mode | Access Level | Description |
|---|---|---|---|
| `/` | Dynamic (`ƒ`) | Public | Home page: Hero headline, BrokenMapDiagram, method, strata, poster, cards. |
| `/research` | Dynamic (`ƒ`) | Public | Brief catalogue with spring-in topic filter bar (`ResearchList`). |
| `/research/[slug]` | Dynamic (`ƒ`) | Public | Deep brief reader with `DepthControl`, `ReadingProgress`, and purchase module. |
| `/studio` | Dynamic (`ƒ`) | Public (Revalidated 300s) | Commission tiers with live monthly slot query (`commission_request`). |
| `/vision` | Dynamic (`ƒ`) | Public | Codex platform vision with interactive 3D icosahedron and waitlist capture. |
| `/library` | Dynamic (`ƒ`) | Public | "The Library" placeholder with 3D particle cluster. |
| `/primer` | Dynamic (`ƒ`) | Public | 10 public inquiry questions with category mappings. |
| `/docs` | Dynamic (`ƒ`) | Public | Public documentation, 4-strata brief anatomy, and FAQ. |
| `/privacy` | Dynamic (`ƒ`) | Public | Privacy policy and data handling disclosures. |
| `/articles` | Dynamic (`ƒ`) | Public | Community articles index with tag filtering and sorting. |
| `/articles/[slug]` | Dynamic (`ƒ`) | Public | Full article reader with author metadata and threaded comments. |
| `/articles/new` | Dynamic (`ƒ`) | Authenticated | Tiptap rich-text article authoring composer. |
| `/articles/[slug]/edit` | Dynamic (`ƒ`) | Author / Mod+ | Article editor with draft/publish toggling. |
| `/sign-in` | Dynamic (`ƒ`) | Public (Guest) | Sign-in portal with email/password and OAuth buttons. |
| `/sign-up` | Dynamic (`ƒ`) | Public (Guest) | Account registration portal. |
| `/forgot-password` | Dynamic (`ƒ`) | Public (Guest) | Password reset request form. |
| `/auth/callback` | Dynamic (`ƒ`) | Public | OAuth and email-link session verification endpoint. |
| `/account/*` | Dynamic (`ƒ`) | Authenticated | Reader dashboard: Overview, Articles, Comments, Settings. |
| `/control/*` | Dynamic (`ƒ`) | Mod / Admin / Owner | Admin control plane (404s for unauthorized visitors). |
| `/api/subscribe` | Route Handler | Public (CSRF-checked) | Newsletter email capture endpoint. |
| `/api/commission` | Route Handler | Public (CSRF-checked) | Studio inquiry submission endpoint. |
| `/lab/*` | Static (`○`) | Internal (Noindex) | Design experiment prototypes and specimen sheets. |

*Note: All public pages render as dynamic (`ƒ`) because `Header.tsx` reads auth cookies on every request to stream the session corner without layout shift or sign-in state flashing.*

---

## 11. Hosting, Build Pipelines & Cloud Infrastructure

### 11.1 Vercel (Active Production Host)

- **Production URL:** `https://ark-swart.vercel.app`
- **Deployment:** Connected via GitHub Git integration on branch `main`. Auto-builds and deploys on every push.
- **Runtime:** Next.js App Router Node.js/Edge serverless runtime with streaming SSR.

### 11.2 Cloudflare Workers (OpenNext Build Architecture)

- **Target:** Cloudflare **Workers** (not Cloudflare Pages) using `@opennextjs/cloudflare`.
- **Configuration:** `wrangler.jsonc` specifies `main: ".open-next/worker.js"` and assets binding `ASSETS: ".open-next/assets"`.
- **Build Commands:**
  - `npm run build`: Plain `next build`. Kept plain to prevent infinite recursion during OpenNext builds.
  - `npm run pages:build`: Executes `opennextjs-cloudflare build` to generate Worker assets.
  - `npm run deploy`: Executes `opennextjs-cloudflare build && opennextjs-cloudflare deploy`.
- **CI/CD Pipeline (`.github/workflows/deploy.yml`):** Runs on push to `main` using `CLOUDFLARE_API_TOKEN`.
- **Known Constraint:** The OpenNext worker bundle exceeds Cloudflare's free-tier 3MiB compressed script size limit due to heavy vendor dependencies (`three`, `@tiptap/*`, `@supabase/*`). Deploying to Workers requires upgrading to Cloudflare Paid Workers (10MiB limit) or code-splitting non-critical routes.
- **Pages Incompatibility:** Cloudflare Pages git integration fails because it looks for a static `pages_build_output_dir` rather than a Worker script.

### 11.3 Windows Development Workarounds

- **`postcss.config.cjs`:** Converted from `.mjs` to `.cjs` to eliminate the known Next.js Windows ESM path bug (`Received protocol 'c:'` during font generation).
- **Playwright Chromium Binary Resolution:** Headless verification scripts (`scripts/design/verify-specimen.mjs`) automatically discover installed Chromium binaries in `AppData\Local\ms-playwright` on Windows machines.

---

## 12. Environment Variables Specification

| Variable Name | Required By | Exposure | Description & Fallback Behavior |
|---|---|---|---|
| `DATABASE_URL` | Drizzle ORM | Server only | Supabase Postgres URI for legacy tables (`subscriber`, `order`, `commission_request`). If unset, `getDb()` returns `null` and forms log gracefully. |
| `NEXT_PUBLIC_SITE_URL` | Auth / Links | Public (Client/Server) | Base URL for OAuth and email redirects (e.g. `https://ark-swart.vercel.app` or `https://ark.study`). |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Client | Public (Client/Server) | API endpoint of dedicated Supabase project (`https://qosdbcvdqtlcinetxdbh.supabase.co`). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Client | Public (Client/Server) | Publishable key for PostgREST queries under RLS. Safe to expose to browser. |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Admin | Server only | Admin bypass key (reserved for server-side auth administration and full `auth.users` deletion). Never commit or expose to client bundles. |
| `RESEND_API_KEY` | Resend Email | Server only | API key for transactional emails. If unset, `sendPrimerLetter()` safely no-ops. |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Checkout | Server only | Reserved for Indian payments integration (scaffolded in `.env.example`). |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Checkout | Server only | Reserved for international payments integration (scaffolded in `.env.example`). |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Bot Protection | Public / Server | Reserved for Cloudflare Turnstile captcha validation. |
| `R2_ACCOUNT_ID` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` / `R2_BUCKET` | Brief PDF Delivery | Server only | Reserved for Cloudflare R2 presigned download URLs. |
| `CLOUDFLARE_API_TOKEN` | GitHub Actions | CI/CD Secret | Scoped token for `wrangler deploy` in GitHub Actions workflow. |

---

## 13. Quality Assurance & Verification Commands

All quality gates can be verified via the following command suite:

```bash
# 1. Typecheck: Verify strict TypeScript compilation
npm run typecheck

# 2. Production Next.js Build: Verify route compilation and SSR bundles (36 routes)
npm run build

# 3. Mathematical Contrast Audit: WCAG 2.1 relative luminance check (17 pairs)
node scripts/design/contrast.mjs

# 4. Playwright Headless Verification: Visual, layout, and React hydration check (Desktop & Mobile)
node scripts/design/verify-specimen.mjs
```

---

## 14. Known Operational Gaps & Technical Debt

1. **Initial Owner Elevation:** The first `owner` role must be granted manually via SQL update against `profiles` table (`update profiles set role = 'owner' where email = '...'`) after a user signs up.
2. **Hard Delete Limitation:** Self-service account deletion soft-deletes via `deleted_at`. Admin hard-delete in `/control/settings` wipes user content and anonymizes data, but cannot delete the `auth.users` GoTrue record without `SUPABASE_SERVICE_ROLE_KEY`.
3. **Studio Reply-To Contact:** `CommissionForm.tsx` currently captures 4 fields (project, deadline, budget, question) per the original design specification without a dedicated email field.
4. **Scaffolded Integrations:** Razorpay, Stripe, Cloudflare Turnstile, and R2 PDF delivery have reserved environment variables and database tables (`order`), but checkout flows are not yet wired.
5. **Rate Limiting:** Cloudflare WAF rate limiting on `/sign-in`, `/sign-up`, and comment submission must be configured via Cloudflare Dashboard rules upon custom domain connection.
