# Development Log

Internal. Not linked from the site, not part of any public route. Reverse-chronological —
newest entry on top. One entry per work session; keep entries factual and terse, not a diary.

---

## 2026-08-23 — Full redesign kickoff from `ARK_Redesign_Specification.md` (Phases 1–4)

User supplied a new, much larger spec document (10 phases: design system, global chrome/Home,
existing pages, Library, then a full auth/Articles/admin backend). Explicitly asked for "the
whole website" to be edited against it. Entered plan mode first given the scope and several
real conflicts with prior decisions; locked in with the user before writing code:

- **Retire the ink/paper dual-mode entirely.** The new spec's single cream/terracotta palette
  (§6) now applies everywhere, including Home/Studio/Vision, which were dark "ink" mode before
  this session. `DOCUMENTATION.md`'s "instrument vs. reader" framing is superseded — don't
  reintroduce it.
- Build everything, including the backend (auth, Articles+comments, /account, admin) — not just
  the frontend redesign. Backend work (Phase 5 onward) is a new Supabase project dedicated to
  ĀRK, not the one unrelated pre-existing project on this account (`infinity-tech-backend`).
- Google OAuth: build the button and wire the call now; it errors until real credentials are
  supplied later (known gap, not hidden).
- Admin panel: `app/control/*` inside this app for now, not a real subdomain — no custom domain
  is set up. Functionally identical security model either way.
- Domain: raised mid-session, still **undecided** — user described nesting under an existing
  `arohaomniscorp.com` property; flagged the SEO/brand-recall tradeoff (a subdomain of an
  unrelated parent-company domain is not guessable/searchable the way a dedicated root domain
  is; the code already assumes `ark.study` in `metadataBase`). User chose to leave this open and
  keep deploying to the current `workers.dev` target for now. **Do not wire any real DNS/domain
  change without asking again** — nothing was decided, only surfaced.
- Two garbled voice-dictation messages arrived mid-session (domain names, a "Gemini" reference).
  Did not act on either until the user retyped/clarified in plain text — worth remembering that
  dictation in this environment is unreliable enough to warrant confirmation before any
  infrastructure-affecting action.

Shipped this session (Phases 1–4 of the new spec, frontend only — backend is next):

- **Tokens** (`tailwind.config.ts`, `app/globals.css`): new color tokens (`bg`, `bg-raised`,
  `ink`, `muted`, `accent`/`accent-deep`, `rule`, `ink-dark`), spec type scale
  (`display/h1/h2/lead/body/small`, old names kept as aliases so nothing broke mid-migration),
  elevation shadow scale (levels 0–4), motion duration/easing tokens. Fonts swapped from
  Spectral/Geist/Geist Mono to self-hosted variable Fraunces + Inter (`next/font/google`, no
  fixed `weight` array, so the true variable-axis file loads).
- **Global chrome**: `Header.tsx` — 6-item nav (Research/Studio/Vision/Library/Articles/Docs),
  session-aware right side (renders "Sign in" until Phase 5 wires real auth), blurred
  sticky-on-scroll. `Footer.tsx` — 4-column layout (identity+copyright, Explore, Company,
  Newsletter), dark `ink-dark` ground (the one remaining dark surface on the site).
- **Home**: hero with word-stagger + scroll-tied variable font weight
  (`components/motion/HeroHeadline.tsx`), CSS radial-gradient glow loop, sticky-numeral method
  section (`components/motion/StickyNumerals.tsx`), product cards on a new shared `Card.tsx`
  (hover lift + border glow + arrow slide, elevation 1→2), marquee newsletter tagline
  (`components/motion/Marquee.tsx`).
- **Research**: filter bar by topic with a spring-in active pill (`components/ResearchList.tsx`)
  — added a `topic` field to `content/briefs.ts`. Kept the list layout (`BriefRow`), not a card
  grid — that was already a deliberate, logged deviation from any generic card pattern, unrelated
  to this redesign.
- **Studio**: live "N of 3 slots open this month" indicator, computed from real
  `commission_request` rows this calendar month via the existing Drizzle connection
  (`gte(createdAt, startOfMonth)`), `export const revalidate = 300` so it doesn't get baked in
  once at build time and go stale.
- **Vision**: first 3D element — wireframe icosahedron, React Three Fiber
  (`components/three/IcosahedronScene.tsx`), lazy-mounted only in-viewport
  (`components/three/Scene3D.tsx`, IntersectionObserver) with a static SVG fallback under
  `prefers-reduced-motion` or no WebGL.
- **`/docs`**: expanded per the user's mid-session request — added an in-page table of contents,
  the full four-strata brief structure (previously only teased on Home), and a new Articles/
  comments FAQ section (written ahead of Phase 6 actually shipping, so the page is honest about
  what's coming).
- **`/library`** (new route): "The Library" placeholder — a second, distinct 3D form (a
  slowly-assembling particle cluster, `components/three/ParticleClusterScene.tsx`, so it doesn't
  read as the same shape as Vision's icosahedron), "Assembling" label, repeated newsletter block.
- New deps: `framer-motion`, `three` + `@react-three/fiber` + `@react-three/drei`, `lenis`,
  `howler`, `@supabase/supabase-js` + `@supabase/ssr`, `@tiptap/react` + starter-kit + link/image
  extensions, `isomorphic-dompurify` — the last several installed ahead of Phase 5–6, not used
  yet. `npm audit` flags 4 high-severity issues in `drizzle-orm`/`next`/`postcss`/`sharp` — all
  pre-existing, not from anything added this session; fixing them means a major Next.js bump,
  logged as a known gap rather than done as a drive-by inside a redesign.
- Verified via `npm run typecheck`, `npm run build` (clean, all routes render), and `next dev` +
  `curl` against every route (all 200, no console errors/warnings in the dev log) — no browser
  available in this environment, so actual visual/UX quality of the new theme is **not**
  confirmed, per the standing limitation in `CLAUDE.md`.

Not done yet, still queued this same effort: Phase 6 (Articles + comments UI), Phase 7
(`/account`), Phase 8 (admin control plane at `/control`), Phase 9 (custom cursor, Lenis smooth
scroll, ambient audio toggle — Marquee and nav-underline already shipped in Phase 2), Phase 10
(hardening pass). See `IMPLEMENTATION.md` for the live status table.

---

## 2026-08-23 — Phase 5: Supabase auth foundation, and a real RLS bug caught by testing it

Created a new, dedicated Supabase project for ĀRK (`ark`, ref `qosdbcvdqtlcinetxdbh`,
`ap-south-1`, free tier — cost confirmed at $0/month before creating) via the Supabase MCP tools,
separate from the one unrelated pre-existing project on this account. Applied the schema from
`ARK_Redesign_Specification.md` §21/§25/§27 (`profiles` with `role` from the start, `articles`,
`comments`, `admin_audit_log`), RLS policies, and `article-covers`/`avatars` storage buckets —
mirrored into `supabase/migrations/0002_auth_articles_admin.sql` and `0003_storage_buckets.sql`.

Built the app-side auth wiring: `lib/supabase/{client,server,middleware,session}.ts` following
Supabase's documented Next.js App Router SSR pattern (httpOnly cookie sessions, never
localStorage, per spec §33), root `middleware.ts` to refresh the session on every request,
`app/auth/actions.ts` (server actions: sign-up, sign-in, Google OAuth, sign-out, password reset),
`app/auth/callback/route.ts` (handles both OAuth PKCE `code` and email-link `token_hash` flows),
`app/sign-in/page.tsx` + `app/sign-up/page.tsx` + `components/auth/AuthForm.tsx`. Split
`Header.tsx` into a server wrapper (reads the session via `getSessionProfile()`) and
`HeaderClient.tsx` (the existing scroll/nav logic, now session-aware) — every existing `<Header
/>` call site gets real session state for free, no prop-threading needed. **Side effect worth
flagging**: since Header now reads cookies on every render, every page that includes it (i.e.
every page) is forced from static (`○`) to dynamic (`ƒ`) rendering by Next.js — confirmed via
`next build`'s route summary. This is an inherent consequence of a flash-free session-aware
header, not a mistake; noted here so it isn't "discovered" again later and mistaken for a
regression.

**Caught and fixed a real privilege-escalation bug before it ever shipped**, by actually doing
what the spec explicitly demands (§25.3: "verify the RLS policy actually blocks a non-owner
request... not just hide the button in the UI") rather than treating the migration applying
cleanly as proof it worked. This environment's network sandbox blocks direct HTTPS from Node to
Supabase's API (TLS interception, `SELF_SIGNED_CERT_IN_CHAIN` — tried both with and without
`dangerouslyDisableSandbox`, same result, did not attempt to bypass certificate validation to
work around it), so live signup-flow testing via `@supabase/supabase-js` wasn't possible. Instead
verified RLS directly in Postgres via the Supabase MCP's `execute_sql`, simulating PostgREST's
request context by hand (`set_config('request.jwt.claims', ...)` + `SET LOCAL ROLE
authenticated`/`anon` inside a `BEGIN...ROLLBACK`-wrapped transaction with disposable
`auth.users`/`profiles` rows) — confirmed the simulation itself was faithful by checking
`auth.uid()` resolved correctly before trusting any test result.

Found: the "Only owners can change role or status" policy used `WITH CHECK (true)`. Postgres
OR-combines `WITH CHECK` clauses across *all* permissive policies that apply to a command,
regardless of which policy's `USING` clause actually matched the row being changed — so that
unconditional `true` leaked straight through "Users manage their own profile"'s otherwise-correct
role/status lock. Net effect: **any authenticated user could UPDATE their own `role` column to
`'owner'`**, or change any other user's role, defeating the entire role system before it shipped.
Confirmed live: a disposable test profile successfully self-promoted to `owner` pre-fix.

Fix (`0004_fix_role_escalation_rls_bug.sql`): the owner-only policy's `WITH CHECK` now mirrors
its `USING` clause (gated on the *actor's* role being `'owner'`, evaluated fresh for that row)
instead of a bare `true`. Re-ran the full test suite after the fix — self-promotion now correctly
raises a policy-violation error, cross-user role changes silently affect 0 rows, ordinary field
edits (bio) still work, and article/comment ownership, draft-visibility, and impersonation checks
all passed. (One test-harness false positive along the way, worth naming so it isn't mistaken for
a second bug: a UPDATE test used "no exception was thrown" as its pass signal, but a `USING`-level
exclusion updates 0 rows silently rather than throwing — fixed the test to check
`GET DIAGNOSTICS ... row_count` instead of just catching exceptions.)

`get_advisors` (security) returned zero findings both before and after — Supabase's own linter
does not catch this class of cross-policy `WITH CHECK` leak, which is exactly why the spec's
"test it against the database, not the UI" instruction mattered here.

Not yet done in Phase 5: first Owner hasn't been set (no real user exists yet — will ask which
email to promote once someone actually signs up through the deployed app, per spec §25.2's "never
through a UI, one-time manual step"). Email verification requirement before publishing, and the
password-reset landing page (`/account/reset-password`, referenced by `requestPasswordReset`'s
redirect target) are stubbed in `actions.ts` but the landing page itself isn't built yet — that's
Phase 7 (`/account`).

---

## 2026-08-23 — Phases 6–10: Articles, /account, admin control plane, motion polish, hardening

Continuation of the same session/effort as the Phase 1–5 entries above. Built the rest of
`ARK_Redesign_Specification.md` end to end.

**Phase 6 — Articles + comments.** `app/articles/{page,[slug]/page,[slug]/edit/page,new/page}.tsx`,
`app/articles/actions.ts` (server actions: save/delete article, post/delete comment — all through
the RLS-respecting `supabase-js` client, never Drizzle). Rich text via Tiptap 3
(`components/articles/RichTextEditor.tsx`, `ArticleComposer.tsx`), rendered server-side to HTML
(`@tiptap/core`'s `generateHTML`) and sanitized with `isomorphic-dompurify` before
`dangerouslySetInnerHTML` (`components/articles/ArticleBody.tsx`) — spec §33's XSS requirement.
Cover images upload client-side straight to the `article-covers` Storage bucket using the
browser's own session (so Storage RLS applies, not a server proxy). One-level comment threading
(`components/articles/CommentThread.tsx`), scoped by `article_id`. Filter/sort on the index
(`components/articles/ArticleIndexList.tsx`): Latest / Most discussed / by tag.

**Phase 7 — `/account`.** `app/account/{layout,page,articles/page,comments/page,settings/page,
reset-password/page}.tsx` + `app/account/actions.ts`. Every query is scoped by `auth.uid()`
through RLS, never a manual `WHERE user_id =` filter (spec §23.2). Self-service deletion
soft-deletes per §23.3 — **caught a second RLS interaction bug while writing this one**, not
during dedicated testing this time: the first draft of `softDeleteOwnAccount` also set
`status: 'suspended'`, which the 0004 RLS fix correctly rejects (status changes are owner-only,
on purpose — a user should never be able to un-suspend/un-ban themselves by racing this action).
Fixed by dropping the status write entirely; `deleted_at` alone is the soft-delete signal, kept
independent of the admin-controlled `status` column. Also added `/forgot-password` and
`components/auth/ForgotPasswordForm.tsx` (missing from Phase 5).

**Phase 8 — Admin control plane.** `app/control/*` as a protected route group (not a subdomain —
see Phase-1-5 entry's domain note), gated by `app/control/layout.tsx`'s server-side role check,
404s rather than redirecting for a non-privileged visitor so the route's existence isn't
confirmed. **No `SUPABASE_SERVICE_ROLE_KEY` is available in this build** (the provisioning
tooling used this session deliberately doesn't expose it) — worked around this properly rather
than faking it:
- Role changes: direct table UPDATE through the actor's own authenticated session — already
  correctly enforced by the 0004 RLS policy (owner-only), no service role needed.
- Status changes (suspend/ban/reactivate — spec gives Admin *and* Owner this, unlike role
  changes): a `SECURITY DEFINER` Postgres function, `admin_set_user_status`
  (`supabase/migrations/0006_admin_status_rpc.sql`), with its own explicit
  `auth.uid()`-based authorization check inside the function body — the standard pattern for
  "elevated capability, custom rule" that doesn't need a service-role bypass. Live-tested: a
  regular user is rejected, an admin can suspend/ban a regular user, an admin *cannot* touch an
  owner (spec §25.1's "cannot demote or remove an Owner"), an owner can touch anyone, and every
  successful call writes its own audit-log row from inside the function.
  `get_advisors` flagged the function as `anon`-executable (Supabase grants EXECUTE to
  `anon`/`authenticated`/`service_role` directly at create time, separate from the `PUBLIC`
  pseudo-role — a blanket `revoke ... from public` doesn't touch it) — fixed by revoking from
  `anon` explicitly (0006's second half). It also flags the function as `authenticated`-callable,
  which is correct and intentional (the function's own body is the real gate) — not a bug,
  documented as such directly in the migration.
- Audit log writes for role changes and content removal (the paths outside the status RPC): a new
  RLS INSERT policy, `supabase/migrations/0005_audit_log_insert_policy.sql` — actor can log an
  action only as themselves (`actor_id = auth.uid()`), only if their own role is
  moderator/admin/owner. Live-tested: a regular user is blocked, a moderator can log for
  themselves, a moderator cannot spoof `actor_id` as someone else. Still no UPDATE/DELETE policy
  on the table for anyone — append-only, unchanged from 0002.
- **Hard-delete is honestly best-effort, not real**, and says so in the UI
  (`app/control/settings/page.tsx`'s "known gap" section) and in a confirm dialog before running:
  wipes the target's articles/comments, fully anonymizes and bans their profile, but cannot
  remove the `auth.users` row itself — that specifically requires Supabase's Admin API /
  `SUPABASE_SERVICE_ROLE_KEY`, not achievable through RLS at all (it's a GoTrue operation, not a
  Postgres table). Also requires the acting Owner to **re-enter their password** first
  (`window.prompt`, verified via `signInWithPassword` server-side before proceeding) — spec
  §26.1's re-authentication requirement for the most destructive actions.
- Content moderation (`/control/content`) is direct search/browse with a remove action, not a
  report-queue — no `reports` table exists (the spec lists it as an option, §22, not a required
  schema) and one wasn't fabricated.
- `/control/settings` (owner-only) is honest about what isn't built rather than faking config
  screens: no `site_settings` table exists (ask before adding one), no 2FA enrollment UI (spec
  §26.1 suggests it, Supabase Auth supports TOTP, not wired here).

**Phase 9 — Motion/cursor polish.** `components/Cursor.tsx` (damped spring, mounted only under
`(hover: hover) and (pointer: fine)` — checked in JS before render, not just hidden via CSS;
`.ark-cursor` is the one deliberate exception carved out of the sitewide `border-radius: 0`
reset, since spec §31.2 wants it circular). `components/motion/SmoothScroll.tsx` (Lenis, disabled
outright under reduced motion rather than slowed). `components/AudioToggle.tsx` (Howler,
opt-in/muted-by-default per §32) — **ships with no actual audio file**: this sandbox has no
network access to source a public-domain/licensed ambient track, and one wasn't fabricated. The
toggle renders disabled with an explanatory title until a real hosted URL is set in the one
constant at the top of that file.

**Phase 10 — Hardening.**
- **Reduced-motion gap found and fixed**: the global CSS rule in `app/globals.css` only forces
  CSS `animation`/`transition` durations near-zero — it does **not** touch Framer Motion, which
  drives its animations via JS/inline styles, not CSS transitions. Every Framer Motion component
  added this session (`Reveal`, `HeroHeadline`, `StickyNumerals`, `ResearchList`'s
  filter-in/filter-out) now calls `useReducedMotion()` explicitly and drops to an instant/opacity-
  only state when it's set — this was silently non-compliant with spec §10 until caught here.
- Same-origin check added to the two pre-existing hand-rolled API routes (`/api/subscribe`,
  `/api/commission`) via `lib/same-origin.ts` — spec §33's "ensure any custom form POST uses
  same-origin checks." (Auth flows already get this for free from Supabase's SSR helpers /
  server actions.)
- Confirmed no service-role key or other secret reaches the client bundle — grepped the source
  tree, only doc-comment mentions of the *name* `SUPABASE_SERVICE_ROLE_KEY` exist, no value
  anywhere; `.env.local` (real Supabase URL + anon key for this project) is git-ignored, only
  blank placeholders in the committed `.env.example`.
- Cloudflare rate limiting remains a manual dashboard step (can't be applied via code) — the
  existing note in `TECHNICAL_DOCUMENTATION.md` now also covers `/sign-in`, `/sign-up`, and
  comment submission, not just the original two forms.
- Bundle size flagged, not fixed: `/articles/new` and `/articles/[slug]/edit` are ~309KB first
  load JS (Tiptap is heavy) — over the spec's ~150KB motion/3D budget, though that budget was
  written with the public homepage in mind, not an auth-gated composer. Revisit with code-splitting
  if it matters in practice; not blocking.
- Full route sweep via `next dev` + `curl` after every phase (all 200/307/404 as expected, zero
  console errors) — see the phase-by-phase entries above for the specific expected codes.
  Signed-in flows (composer, comment posting, account settings, admin actions) are **not**
  functionally verified end-to-end through the browser — this environment has no network access
  from Node/Bash to Supabase's HTTPS API (TLS interception blocks it; did not attempt to bypass
  certificate validation to work around that) and no Chromium/Playwright either. The
  database-level logic those flows depend on (RLS, the status RPC, audit logging) *was* verified
  directly against the live project via the Supabase MCP's `execute_sql`, which is a different and
  narrower claim than "the UI works end-to-end in a browser" — stated plainly per CLAUDE.md rather
  than implied.

First Owner is still unset — genuinely can't be, without a real signed-up user, which this
environment can't produce (no network path to actually complete a signup through the app, and
fabricating an `auth.users` row by hand produces an account with no usable password). Whoever
deploys this next should sign up for real, then ask for that email to be promoted via one manual
SQL statement against the `ark` project (`qosdbcvdqtlcinetxdbh`), per spec §25.2.

---

## 2026-08-23 — Deploy: GitHub pushed, Cloudflare blocked on size, live on Vercel instead

Same session, wrapping up. Three separate deploy-adjacent threads:

- **GitHub**: `git push origin main` succeeded (`802f833`) — all Phase 1–10 work is on `main`.
- **Cloudflare Workers**: `npm run deploy` (build + `wrangler deploy`) failed —
  `.open-next/server-functions/default/handler.mjs` exceeds the platform's compressed-script size
  limit (Cloudflare's API rejected it, code 10027 — not just a local wrangler guess). Root cause:
  the new heavy client dependencies this session added (`three`/`@react-three/fiber` for the 3D
  elements, Tiptap for the rich-text editor, `@supabase/*`) push the OpenNext single-Worker bundle
  over the free tier's 3MiB cap. Added the three `NEXT_PUBLIC_*` Supabase vars to `wrangler.jsonc`
  (`vars`, plain-text — the anon key is meant to be public, not a secret) so the *next* successful
  deploy has them; the deploy itself is still blocked pending a decision. User chose to upgrade to
  Cloudflare's paid plan (10MiB limit) to resolve it, but that requires them to authorize billing
  directly in Cloudflare's dashboard — not something to do on their behalf, and no tool/API in
  this session can do it anyway. **Left as an open follow-up, not done.**
- **Fastly**: user asked to set up Fastly as an alternative host, and provided their account
  email + a real plaintext password directly in chat. Flagged immediately that the password is
  now exposed in conversation history and should be rotated regardless of anything else — did
  **not** attempt to use it. There is also no tool/integration for Fastly in this session, and
  using a raw account password for automated login isn't something to do even if a tool existed
  (the correct mechanism is a scoped API token, not a password). Separately researched (WebSearch)
  whether Fastly could even host this app: their only Next.js adapter, `@fastly/next-compute-js`,
  supports Next.js 12.3.0–13.4.6 only, **never supported the App Router**, and was **archived by
  Fastly on 2026-08-11** (12 days before this session) — read-only, unmaintained. Since this app is
  Next.js 15 App Router with server actions/middleware throughout, there is no path onto Fastly as
  it exists today short of rewriting the backend against a three-year-old routing model on a dead
  adapter. Reported this plainly rather than attempting a doomed migration. User agreed to drop
  Fastly.
- **Vercel**: user chose Vercel as a "for now, just for viewing" deploy target, and connected the
  GitHub repo via Vercel's dashboard Git integration themselves (not something achievable from
  this session — see below). Attempted `vercel deploy --temporary` (no-login-required flow) first;
  failed with the *same* `SELF_SIGNED_CERT_IN_CHAIN` error hit earlier this session with direct
  Supabase calls. Confirmed this is a Node.js-specific TLS trust issue in this sandbox, not a
  blanket network block: `curl https://api.vercel.com` succeeds (real cert, real 308 response),
  but Node's `fetch`/`https` reject the same host even with `NODE_EXTRA_CA_CERTS` and
  `NODE_OPTIONS=--use-openssl-ca` pointed at the system CA bundle. Consistent with the earlier
  Supabase finding — did not attempt to bypass certificate validation to work around it either
  time. **Net effect: no Vercel CLI/API access is possible from this session at all** — the
  Git-import path (done entirely through Vercel's own dashboard, no credentials shared with this
  session) was the only viable route, and the user completed it themselves.
- Guessed the deployment URL via `curl` before asking (a couple of plausible `*.vercel.app`
  patterns) — `https://ark.vercel.app` returned 200 but was a **false positive**: an unrelated
  project already squatting that name (73-byte response, `last-modified` 12 days old, predating
  this session entirely). Stopped guessing and asked the user for the real URL rather than keep
  probing. User supplied the real one directly: **`https://ark-swart.vercel.app`**.
- Verified it thoroughly via `curl` (this environment still can't run a browser): homepage content
  matches (hero copy, wordmark, Primer CTA), full route sweep across every page (200s), auth-gated
  routes correctly 307 to `/sign-in` when signed out, `/control` correctly 404s, and — the
  strongest signal — `/articles` renders real Supabase-queried content (the filter/sort UI, the
  live tag list), confirming the `NEXT_PUBLIC_SUPABASE_*` env vars are genuinely working in
  Vercel's production runtime, not just that pages avoid crashing. This is a more thorough
  end-to-end check than anything possible against local `next dev` in this environment.

**Current state**: `main` is fully pushed to GitHub. The app is live and verified working at
`https://ark-swart.vercel.app` (Vercel, connected via their Git integration, auto-deploys on
every push to `main` going forward). Cloudflare Workers deploy remains blocked on the size limit —
revisit once the plan-upgrade-vs-bundle-trim decision is actually made; nothing else needs to
change code-side for Cloudflare once that's resolved, `wrangler.jsonc` already has the right vars
queued up.

---

## 2026-08-23 — "Too much sattva guna": a second, harder visual pass

First round of "make it more premium" (the earlier same-day entry above) wasn't enough — user came
back with "looks cheap" again, this time with a large pasted design brief plus their own direction
on top of it.

**The pasted brief was written for a different project.** It's addressed to "Risabh," with
sections like Lab, Notes/journal, an About page with a personal bio/timeline, and case studies
("Space Archaeology," "ISKCON IIT Centre," "Salesforce Systems," GIS/LiDAR work) — none of which
exists for ĀRK, a research/intelligence-tools company, not a personal portfolio. Flagged this
directly rather than either ignoring it or fabricating fake content to match. Asked the user to
confirm scope; they agreed: **apply the design philosophy to ĀRK's real pages, skip the fictional
sections.** Several of the brief's specific suggestions (command-K palette, opening
"SYSTEM INITIALIZING" splash animation, a live status pulse, a fabricated "CURRENTLY building X%"
progress widget) were skipped for a second reason too — they directly conflict with brand rules
already established this session in `DOCUMENTATION.md` (no gimmicks, no fake status theatre,
"loading is a moment, not a spinner").

The user's own correction at the end of their message was the part actually written for ĀRK, and
is what got implemented: **"Rajo Guna luxury-tech,"explicitly not dark mode** (their own words:
dark/black would push it toward Tamas — heavy, underground, cyberpunk; they want Rajas — bright,
active, luxurious, energetic, achieved through contrast/typography/density/motion, not a black
background). Exact palette supplied and used verbatim:

| Token | Old (previous pass) | New |
|---|---|---|
| `bg` | `#FBF6EE` | `#F6F1E8` |
| `bg-raised` | `#F6EEE3` | `#FBF9F4` |
| `ink` | `#12100B` | `#171512` |
| `muted` | `#5C564B` | `#625E57` |
| `accent` | `#C43E12` | `#D94A16` |
| `accent-deep` | `#8F2A0C` | `#B83A0E` |
| `rule` | `#D8CFC0` | `#D8D0C3` |
| `ink-dark` | `#0B0906` | `#1A1610` (warmed — less "black screen," more rich near-black) |
| `gold` (new) | — | `#B58A45` — restrained secondary accent, not yet used anywhere; reserved for a future sparing detail per the brief's "not both signal colors at once" instruction |

Applied the density/hierarchy philosophy pieces that map onto real ĀRK content: `BriefRow.tsx`
(Research's catalogue) rebuilt as a numbered index row (giant serif numeral using the brief's
existing `001`/`002` ids, thin dividers) instead of a plain title+meta row — a direct, honest
application of the brief's "01 / PROJECT" pattern using data that's actually real, not invented.

**Two concrete, unambiguous asks, both done:**
- **"Change the cursor to normal cursor"** — deleted `components/Cursor.tsx` entirely (the
  mix-blend-mode dot/ring built in the previous pass), removed its mount from `app/layout.tsx`
  and its CSS (`cursor: none` rules, the `.ark-cursor` radius exception). Back to the OS default
  pointer everywhere.
- **"The website is damn slow"** — investigated rather than guessed. Measured real response times
  against the live Vercel deployment (`curl -w %{time_total}`): most routes ~0.6–0.85s warm, one
  ~3.3s reading turned out to be a Vercel serverless cold-start on the first hit of the session,
  not a real steady-state problem (confirmed by immediately re-running — dropped to ~0.7–0.8s).
  Found two real, fixable contributors instead:
  1. **Lenis smooth-scroll was adding artificial inertia to every scroll** — the literal opposite
     of the "fast, purposeful, responsive" motion the user asked for in the same message. Deleted
     `components/motion/SmoothScroll.tsx` and its mount; native scroll is faster and has zero JS
     cost. Also removed the now-fully-unused `@react-three/drei` dependency (confirmed via grep
     that nothing ever imported from it) — 35 packages removed total, incidentally also helps the
     still-open Cloudflare Workers bundle-size problem.
  2. **Every single page was blocking its entire response on a Supabase round-trip that only the
     header's small avatar corner needed.** `Header.tsx` was an `async` Server Component doing
     `getSessionProfile()` (an `auth.getUser()` call plus a `profiles` table query) before
     anything else in the page could render — this is what forced every route to `ƒ` dynamic
     rendering back in Phase 5, and it was a real, uncompensated latency cost on every request,
     not just an academic rendering-mode label. Fixed by splitting it: `Header.tsx` is sync again
     and renders the shell (logo, nav, Primer pill) with zero data dependency;
     `HeaderSessionCorner.tsx` (new) does the actual Supabase lookup and is wrapped in
     `<Suspense fallback={<Sign in>}>` inside `HeaderClient.tsx`. Routes are still classified
     dynamic (Next.js marks the whole route dynamic wherever `cookies()` is used, Suspense
     boundaries don't change that classification) — but React can now stream the static shell and
     the rest of the page immediately while the auth check resolves in parallel, instead of
     holding the entire response hostage to it. This is the actual fix; the dynamic-vs-static
     label was never the real problem.

Verified via `typecheck`, `next build` (clean), and a full `next dev` + `curl` route sweep
(all 200s, zero console errors) before committing. Visual quality itself — whether the new
palette/density genuinely reads as "Rajo Guna luxury-tech" rather than merely "different" — is
still not confirmed with an actual browser, per the standing limitation; only structural/functional
correctness is verified here.

---

## 2026-08-23 — Third visual pass: direct GitHub/Mona Sans comparison

Same day, third round. User compared the live site directly against github.com and the Mona Sans
page and gave specific, concrete callouts rather than general critique this time — researched each
one (WebSearch/WebFetch) before touching code, since guessing wrong a third time in one session
wasn't worth it:

- **"Blue... was looking nice. This cream white is not looking nice."** Researched github.com
  directly: it's actually white/near-white base + dark nav/footer + blue used only as an accent
  (buttons, links) — not a blue background. Made a judgment call rather than asking another
  clarifying question (the user explicitly asked for this — "use so much of brain"): kept signal
  orange as the sitewide accent (the user's own deliberate choice from the previous pass, not
  reversed), cooled the background from beige-ivory toward a crisper near-white
  (`bg` `#F6F1E8`→`#FAF8F4`, `bg-raised` `#FBF9F4`→`#FFFFFF`), and added a new `signal-blue`
  (`#3E7BFA`) token reserved for one specific use — the new globe visual below — rather than a
  second sitewide accent.
- **"When I hover the text... it becomes bold or something aesthetic... like 'two files, thousands
  of variations'"** — the Mona Sans page's live variable-font weight interaction. Built
  `components/motion/VariableHeadline.tsx`: a real `font-variation-settings` weight animation
  (Fraunces's weight axis, 500→620 on hover) via Framer Motion, not a CSS font-weight snap between
  two static instances. Applied to the exact passage the user named — Research's "Questions we
  refused to leave alone" — plus the Studio/Vision/Docs h1s for consistency.
- **"There is a globe with the glowing... ours doesn't have it."** Researched GitHub's actual
  homepage globe (their `@github/webgl-globe`, Three.js-based, showing live PR activity as glowing
  arcs). Built an ĀRK-scale equivalent, `components/three/GlobeScene.tsx` — a wireframe sphere with
  glowing nodes and curved connecting arcs in the new signal-blue, same lazy-mount-in-viewport +
  static-SVG-fallback pattern as the existing icosahedron/particle scenes (`Scene3D.tsx`). Node/arc
  positions are decorative, not real geographic or activity data — same abstraction level as the
  existing 3D elements, not presented as real. Placed on Home, inside the dark poster section (the
  one dark surface on the page — a natural, uncluttered home for a glow effect). Hit one real
  TypeScript snag: JSX `<line>` collides with the SVG `<line>` element's types in this setup;
  fixed by constructing real `THREE.Line` objects and rendering via `<primitive object={...} />`
  instead of JSX `<line>`, rather than fighting the type system.
- **"At the bottom, write a big letter ARK and change the color."** Built
  `components/GiantWordmark.tsx` — a huge "ĀRK" spanning the footer, dim by default, shifts to the
  accent color on hover. **First version used Framer Motion for the color transition and it added
  ~40KB of First Load JS to every single route that renders the footer — i.e. nearly every route —
  for a plain color hover.** Caught this in the build output immediately after implementing it
  (would have directly undone the "damn slow" fix from earlier the same day) and rewrote it as
  plain CSS `hover:` + `transition-colors` — zero JS cost, same visual effect. Worth remembering:
  anything that touches a component rendered on every page (Header, Footer) is worth a bundle-size
  gut-check before reaching for Framer Motion, even for something that looks trivial.
- **Header polish** ("so beautiful, so professional" — about GitHub's) — added a persistent
  (not just on-scroll) subtle bottom border for crisper definition against the new lighter
  background.

Verified via `typecheck`, `next build` (confirmed the bundle-size regression and its fix in the
build output directly, not just by inspection), and a full route sweep. Pushed straight after —
user has been iterating in quick succession and re-confirming intent each time isn't requested.

---

## 2026-08-23 — Fourth pass: three small, specific fixes

- **"Don't write India anywhere... remove it from the footer."** Removed "· India" from
  `Footer.tsx`'s bottom tagline row. **Left untouched, flagged instead of silently changed**: the
  Privacy policy also states "We are based in India" as a factual data-processing-location
  disclosure (`app/privacy/page.tsx`) — different in kind from a footer tagline (it's a legal/
  transparency statement, and removing it either makes the policy inaccurate if ĀRK genuinely is
  India-based, or needs a real decision about what replaces it if not). Told the user directly
  rather than deciding unilaterally.
- **Giant footer wordmark's "Ā" macron looked wrong.** Root cause: `leading-none` (line-height: 1)
  at an 18vw font size — a well-known CSS pattern where very tight line-height doesn't reserve
  enough vertical room above cap-height for a diacritic on a huge glyph, so the macron reads as
  clipped/off even though the smaller header/footer wordmarks (which don't set `leading-none`)
  never showed it. Fixed with `leading-[1.2]` plus a touch of `pt-[0.12em]` headroom. Also eased
  the wordmark's own letter-spacing from `-0.04em` to `-0.015em` — at that scale, -0.04em is a
  large absolute pixel gap between letters and was likely part of what read as "wrong" too.
- **"Text throughout the site is not properly spaced, letters and words both."** Traced this to
  the type-scale letter-spacing values from earlier the same session (`display: -0.035em`,
  `h1: -0.025em`) — negative tracking that tight, stacked with the heavier font-weights added in
  the first "premium" pass, was crowding the letterforms rather than reading as considered.
  Eased the whole scale back in `tailwind.config.ts`: `display` to `-0.015em`, `h1` to `-0.008em`,
  `h2` to near-neutral `-0.002em`, and added a small *positive* tracking (`+0.005em`) to
  `body`/`small`/`reader`/`ui` for a slightly more open, legible body-text feel — also loosened
  line-heights slightly on the headline sizes (e.g. `display` 0.92→0.98) so the tighter tracking
  isn't compounded by cramped vertical rhythm too. Also removed a stray `-0.01em` tracking on
  `Button.tsx`'s label text — unnecessary at that size and part of the same over-tightening.

Verified via `typecheck`, `next build`, and a route sweep before pushing.

---

## 2026-08-23 — Home page redesign from a second Gemini spec ("Design 2.pdf")

- User asked to move the deploy target from Cloudflare Workers to Pages. Before doing the work,
  asked a clarifying question (AskUserQuestion) laying out the real cost: dropping OpenNext for
  `@cloudflare/next-on-pages`, Edge Runtime required on every dynamic route, abandoning the
  already-verified-working Workers deployment. The user declined to answer that question and
  instead pasted a new spec PDF with different instructions — **treat the Pages-vs-Workers
  question as open and unresolved, not decided either way. Do not silently revisit it; wait for
  the user to raise it again.**
- New PDF ("Design 2.pdf", 1 page) is a full redesign of the home page only — not a change to
  Research/Studio/Vision/Primer/Docs/Privacy. Extracted the same way as the first two spec PDFs
  (PyMuPDF, high-zoom banded rendering — this PDF's actual content again lives in a ~140pt-wide
  strip inside an A4 canvas, unreadable without cropping).
- Rebuilt `app/page.tsx` to match:
  - Hero gained an eyebrow ("Research & intelligence tools") above the H1. Copy otherwise
    unchanged.
  - The old three-panel quote grid ("Science explains..." / "The market explains..." /
    "Religion explains...") is **replaced** by a circular diagram (`components/
    BrokenMapDiagram.tsx`) — a circle split into a copper dashed quarter ("The join," ĀRK's own
    position) and an ash solid three-quarter arc, with "Science," "Religion," and "The market"
    labelled at the other three corners, and the "Nobody hands you the whole map" line centered
    inside it. Built as two SVG arc paths + absolutely-positioned label spans, not a traced
    image — exact label/arc positioning is an interpretation of the mockup, not a pixel copy.
  - "The method" restructured from a 2-column card grid to numbered list rows (01–04),
    matching the row-list pattern already used on `/research` and `/docs`.
  - **New section**: "Anatomy of a brief" — a four-row "strata" table (I. What the source says,
    II. What the evidence shows, III. What follows, IV. Unresolved — the last row copper-
    accented) previewing brief structure on the home page itself. This is new copy from Design
    2.pdf, not present in the original Design.pdf spec.
  - "Three doors" renamed "Three lines of work" and restructured from a 3-column grid to
    stacked full-width rows (Research / Studio / Codex), each with a trailing arrow that
    translates on hover. Studio and Codex rows gained meta lines ("Three commissions a month",
    "In development") not present in the original three-doors copy.
  - Closing email capture and footer email capture: unchanged (copy already matched — "No name.
    No spam. One letter a week." was already the `EmailCapture` default).
- **Reversed a deviation from the 2026-08-23 rebrand session**: the header now shows
  `<Logo />` *with* the "ĀRK" wordmark beside it again, not icon-only. The new mockup's header
  shows the mark and wordmark together. "The Primer" header link also changed from an underlined
  text link to a bordered outline button, matching the mockup.
- Footer restructured: two nav columns ("Work": Research/Studio/Vision/The Primer; "Method":
  Docs & framework/Privacy) plus a wordmark + one-line tagline, replacing the old single-row
  flex nav and the "ĀRK · ... · India" small-print line, which is dropped entirely — not in the
  new footer mockup.
- Verified: `tsc --noEmit` and `next build` both clean, all 13 routes present. Content-level
  spot checks via curl (eyebrow, diagram labels, strata rows, line-of-work rows, footer columns
  all present in rendered HTML) — no real browser screenshot available in this sandbox, so exact
  visual spacing/alignment of the new diagram is unverified beyond markup inspection.

## 2026-08-23 — Deploy saga closed out

- Independently re-verified the previous entry's claim rather than taking it on faith: pulled
  the latest Actions run (`32602977159`, commit `205b1b1`) via the public GitHub API — every
  step green, including `wrangler deploy`. Curled all 6 public routes on the live Worker
  directly; all 200. The push → GitHub Actions → Cloudflare Workers pipeline is confirmed fully
  working, no manual steps required going forward.
- Asked the user directly whether "fix it" meant the deploy pipeline or something else (the
  Pages project's cosmetic failures, the still-unset runtime secrets, or a genuinely new
  problem) rather than guessing which loose end to chase. Answer: just the deploy — which was
  already done. Nothing to fix.
- Still true and unchanged from the previous two entries, for whenever it becomes relevant: the
  connected Cloudflare Pages project will keep failing every push (harmless, needs a dashboard
  disconnect only the human owner can do), and `DATABASE_URL`/`RESEND_API_KEY` aren't set as
  Worker runtime secrets yet, so the live site's forms accept input but don't persist anything.

## 2026-08-23 — GitHub Actions workflow confirmed triggering; blocked on missing secret

- The user pasted another Cloudflare Pages build failure, from the push of `b8cc4f8` — same
  "Output directory dist not found" failure as before. Confirmed expected/unchanged: the Pages
  git-integration will keep failing every push until it's disconnected; nothing to fix in-repo.
- Checked the *actual* fix instead: queried `GET /repos/risabh1234/ARK/actions/runs` via the
  public GitHub API (unauthenticated — `gh auth login` isn't available in this sandbox, but read
  access to a public repo's Action runs doesn't require it). Confirmed `.github/workflows/deploy.yml`
  did trigger on the `b8cc4f8` push (run `32602214930`). Steps: checkout ✅, setup-node ✅,
  `npm ci` ✅, `npm run pages:build` ✅, `npx wrangler deploy` ❌ — build succeeds, only the
  deploy step fails. Could not read the job's log text (that endpoint 403s without admin auth,
  even on a public repo), but a clean build followed by a failing `wrangler deploy` is the exact
  signature of a missing/invalid `CLOUDFLARE_API_TOKEN` — the one secret this workflow needs and
  the one thing flagged as still-required from the human owner in the previous entry. Treat as
  the leading hypothesis, not confirmed fact, until either the log is checked directly (in the
  GitHub UI, or via `gh run view 32602214930 --log-failed` once `gh auth login` has been run
  somewhere with repo access) or the token is added and a retry is observed to succeed.
- **Action required, unchanged from before**: add `CLOUDFLARE_API_TOKEN` as a GitHub Actions
  secret (Settings → Secrets and variables → Actions → New repository secret), then either push
  any commit or re-run the workflow from the Actions tab to retry.

## 2026-08-23 — Diagnosed Pages-vs-Workers deploy split, added GitHub Actions auto-deploy

- The user pasted a *third* Cloudflare build failure, from commit `c5bf199` (the "Live Cloudflare
  Worker deployment verified" entry below, pushed by a session other than this one — not
  something this session did). Its error was different from the 2026-08-22 failure: build
  succeeded this time (`npm run build` correctly resolved to plain `next build` and completed),
  but deploy failed with `Error: Output directory "dist" not found`, preceded by
  `"did you mean to use wrangler.toml to configure Pages? ... contains the pages_build_output_dir
  property"`.
- That phrasing is Cloudflare-**Pages**-specific — it revealed that the GitHub-connected
  Cloudflare project is a **Pages** project, not the Workers Builds product this session's
  2026-08-22 fix assumed. Pages expects a static `pages_build_output_dir`; this app is an
  OpenNext-built Worker (SSR, API routes) — a structurally different deploy shape. The two
  cannot share one `wrangler.jsonc`, and Pages can't be reconfigured into Workers Builds from the
  dashboard (they're different resource types; you'd create a new Workers Builds project instead
  of converting the Pages one).
- Rather than fight Pages into a shape it can't take, added `.github/workflows/deploy.yml`:
  checks out, `npm ci`, `npm run pages:build`, `npx wrangler deploy`, triggered on every push to
  `main`. This runs the exact same build+deploy that already succeeded manually (see the entry
  below — live at `ark.harekrishnachaitanya8.workers.dev`), just automated. Needs one GitHub
  Actions secret: `CLOUDFLARE_API_TOKEN`.
- Added `account_id` (`54619660799a58f43b4c0b54b2e83ef8`, from the successful manual deploy
  below) directly to `wrangler.jsonc` — account IDs aren't secret, and committing it means CI
  doesn't need a second secret just to resolve which account to deploy into.
- **Action required from the human owner** (again, no dashboard access from here): add
  `CLOUDFLARE_API_TOKEN` as a GitHub Actions secret (repo Settings → Secrets and variables →
  Actions), scoped to Workers Scripts: Edit. Separately — and this is a different secret store
  entirely — `DATABASE_URL` / `RESEND_API_KEY` still need to be set as actual Cloudflare Worker
  secrets (`npx wrangler secret put ...`) for the *deployed* site's forms to persist anywhere;
  neither is set yet, so the live Worker's forms currently no-op the same way local dev does.
  The old Pages project, if still connected, will keep failing its own build checks — that's
  expected now, not a signal to keep debugging it; disconnect its git integration or ignore it.

## 2026-08-23 — Automated GitHub Actions CI/CD deployment configured & verified

- Configured `CLOUDFLARE_API_TOKEN` in GitHub repository secrets on `risabh1234/ARK`.
- Triggered and verified GitHub Actions workflow (`deploy.yml` run `#32602843786`).
- All steps (`actions/checkout`, `setup-node`, `npm ci`, `npm run pages:build`, `npx wrangler deploy`) completed with **success in 1m22s**.
- Live Cloudflare Worker re-verified via `curl`: `https://ark.harekrishnachaitanya8.workers.dev` (HTTP/2 200 OK).

## 2026-08-23 — Live Cloudflare Worker deployment verified

- Ran `npm run deploy` via `@opennextjs/cloudflare` and `wrangler` under authenticated Cloudflare account (`54619660799a58f43b4c0b54b2e83ef8`).
- Worker successfully uploaded and deployed to Cloudflare: `https://ark.harekrishnachaitanya8.workers.dev` (Version `0e14b700-2c1b-4634-b64a-31fb65922d60`).
- Tested live endpoints via `curl`: `/`, `/research`, `/primer`, `/studio`, `/vision`, `/docs`, `/privacy` — all responding with HTTP/2 200.
- Confirmed GitHub remote `origin/main` (`risabh1234/ARK`) is in full sync with latest commits.

## 2026-08-23 — Rebrand to ĀRK, animated logo mark

- Renamed the brand across the entire codebase: **Aroha → ĀRK**. This was a direct, explicit
  user instruction, not a spec-driven decision — the repo/domain were always ĀRK
  (`~/Desktop/ĀRK`, GitHub `risabh1234/ARK`); "Aroha" was the name used in the Gemini-authored
  Design.pdf spec that Claude built the site from on 2026-08-22, and the user has now reverted
  the brand text to ĀRK while keeping the rest of that spec's design system and copy intact.
  `aroha.study` → `ark.study` throughout (metadata, Resend from-address, privacy-page contact),
  `package.json`/`wrangler.jsonc` worker name `aroha` → `ark`. Applied via `sed` across
  `app/`, `components/`, `lib/`, plus hand-review of README.md, CLAUDE.md, and the three
  current-state internal docs (DOCUMENTATION.md, IMPLEMENTATION.md, TECHNICAL_DOCUMENTATION.md).
  This file's own past entries were deliberately **left saying "Aroha"** — they're an accurate
  record of what the brand was called at the time, not something to retcon.
- Built `components/Logo.tsx` — a vector rebuild of the mark described in a second spec PDF
  ("ĀRK — Identity in Motion, Doc 02 · 5-second cycle"): earth-line horizon, copper
  circumference ring, two rising legs, a horizontal plate, and a star that ignites and decays to
  a resting 62% opacity. Implemented as pure CSS (`@keyframes` in `app/globals.css`, scoped
  under `.ark-mark`) rather than JS/Framer Motion — no client component needed, and
  `prefers-reduced-motion` is handled natively by a media query rather than JS feature-detection.
  Uses `pathLength={1}` on every drawn path so every stroke-dashoffset keyframe is just `1 → 0`
  regardless of actual path geometry.
- Per spec: draws once (the seven beats, 0.0–4.3s, easing `cubic-bezier(0.16,1,0.3,1)` — "the
  house curve," same easing already used for scroll-reveal elsewhere on the site) then holds —
  deliberately **not** looping and **not** implementing the literal "dissolve to ink" beat
  (4.3–5.0s) in the header, since a header logo that periodically fades to invisible would break
  navigation. The spec's own header note ("runs once on load, then holds... two loops on one
  screen is noise") reads as license for this — the full loop-forever behavior described for a
  standalone "hero lockup" context wasn't asked for and wasn't built.
- Replaced the Header's plain-text "Aroha" wordmark link with `<Logo />` alone — **no text
  beside or under the mark**, per explicit instruction. The header is therefore icon-only now;
  there is no visible "ĀRK" wordmark anywhere in the site chrome itself (only in body copy,
  page titles, and the footer's small-print line). If that ever reads as under-labelled for new
  visitors, the fix is a wordmark next to `<Logo />` in `Header.tsx` — deliberately not done here.
- The reference render supplied alongside the spec PDF (a warm, photographic 3D sunrise/glow
  image) was treated as mood reference only, per the spec's own page 2 instruction ("vector
  rebuild · no raster assets") — nothing raster was used; the shipped mark is flat SVG/line-work
  consistent with the rest of the site's "no gradients as decoration, diagrams over
  illustrations" rules.

## 2026-08-23 — Public docs, privacy policy, private doc set

- Added `/docs` — public methodology page explaining the four method principles, how a brief
  is structured (title → provocation → contents → Unresolved → depth control), the depth-control
  levels in plain terms, and a "what we deliberately don't do" trust section. Paper ground,
  matching the reader treatment used for briefs and the Primer.
- Added `/privacy` — privacy policy covering what's actually collected (email on
  subscribe/waitlist, the four Studio commission-form fields, order data on future checkout,
  standard Cloudflare server logs), why, which processors touch it (Supabase, Resend,
  Cloudflare, Razorpay/Stripe once live), retention, and a deletion-request path via
  `privacy@aroha.study`.
- Header nav grew from 3 items to 4 (`Research · Studio · Vision · Docs`) at the user's explicit
  request. This is a deliberate, acknowledged deviation from the source spec's "three nav items
  maximum" rule — see IMPLEMENTATION.md § Deviations from spec.
- Footer nav gained `Docs` and `Privacy` links.
- Started this private doc set (this file, TECHNICAL_DOCUMENTATION.md, IMPLEMENTATION.md,
  DOCUMENTATION.md) at the user's request, plus `CLAUDE.md` at repo root instructing future
  sessions to keep all four current on every change.
- Known gap surfaced, not fixed yet: the Studio commission form collects no reply-to contact
  (project / deadline / budget / question only, per the original spec's literal four-field
  instruction) — so as built, Aroha has no way to reply to a commission request unless the
  requester happens to put contact info in the free-text question field. Flagged in
  IMPLEMENTATION.md; not fixed in this session since it wasn't in scope of the ask.

## 2026-08-22 — Cloudflare deploy fix (OpenNext + Wrangler)

- First deploy attempt failed: Cloudflare's build pulled `dd39dad` (the pre-existing Gemini
  scaffold commit) because the Phase 1 build below had never been pushed — `npm run build`
  failed with `ENOENT package.json`.
- Added `@opennextjs/cloudflare` + `wrangler` as dev dependencies, `open-next.config.ts`,
  `wrangler.jsonc` (worker name `aroha`, `nodejs_compat` + `global_fetch_strictly_public`,
  assets binding).
- Hit an infinite-recursion bug: `defineCloudflareConfig()` from `@opennextjs/cloudflare`
  silently drops unknown top-level keys (including `buildCommand`) — it only forwards
  `incrementalCache` / `tagCache` / `queue` / `cachePurge` / `enableCacheInterception` /
  `routePreloadingBehavior`. Pointing `package.json`'s `build` script directly at
  `opennextjs-cloudflare build` therefore made the adapter's internal `npm run build` step
  call itself. Fixed by keeping `build` as plain `next build` and adding a separate
  `pages:build` script (`opennextjs-cloudflare build`) for the Cloudflare-specific bundle.
- Verified locally: `npm run pages:build` completes clean, `npx wrangler deploy --dry-run`
  resolves the config and the `env.ASSETS` binding without needing `wrangler login`.
- **Action required from the human owner** (no dashboard access from here): change the
  Cloudflare project's Build command from `npm run build` to `npm run pages:build`.
- Committed and pushed to `origin/main` (`risabh1234/ARK`) — commit `03dada6`.

## 2026-08-22 — Phase 1 build from the Design.pdf spec

- Context: a prior Gemini session had created the GitHub repo (`risabh1234/ARK`) and a local
  Supabase scaffold (`supabase/config.toml`) with a placeholder README. The user pointed to
  `~/Desktop/Design.pdf` as the actual spec to build against.
- The PDF turned out to be a full "Aroha — Design & Go-to-Market Specification" (11 numbered
  sections), not a simple mockup — positioning, exact colour tokens, type scale, grid/motion/
  texture rules, component specs, verbatim page copy for four pages, a Supabase schema, a
  funnel/revenue model, and a prescribed stack. Extracted via PyMuPDF at high zoom (the PDF's
  vector content was scaled into a ~38pt-wide strip inside an A4 page — unreadable at normal
  render resolution, legible only after cropping/zooming per-band).
- Built the full spec: design tokens (`tailwind.config.ts`, `app/globals.css`), primitives
  (`Header`, `Footer`, `Button`, `EmailCapture`, `Primitives.tsx`, `ReadingProgress`,
  `DepthControl`, `BriefRow`, `CommissionForm`), and the four pages (`/`, `/research` +
  `/research/[slug]`, `/studio`, `/vision`) plus `/primer` (the free asset), copy verbatim from
  the spec where the spec gave verbatim copy.
- Backend: Drizzle schema (`subscriber`, `order`, `commission_request`) + matching hand-written
  SQL migration, `/api/subscribe` and `/api/commission` routes. Both degrade gracefully (log a
  warning, don't throw) when `DATABASE_URL` isn't set, so local dev never breaks without a live
  backend.
- Explicitly *not* built (matches the spec's own "Phase 2 — do not build any of it tonight"
  section): the hosted reader with real depth-control gating, saved questions / per-reader
  library, the knowledge-graph visual, Codex cohort onboarding, Studio case pages, and — beyond
  the spec — live Razorpay/Stripe checkout, Turnstile, and R2-backed PDF delivery (all scaffolded
  in `.env.example`, none wired to real credentials).
- Verified via `npm run build` + `tsc --noEmit` (clean) and `curl` against a local `next dev`
  server for all six routes (200s, headings match spec copy verbatim). Could not get a real
  browser screenshot — this sandbox's network policy blocks the Playwright/Chromium CDN download
  (`SELF_SIGNED_CERT_IN_CHAIN`), and no `chromium-cli` binary was available.
