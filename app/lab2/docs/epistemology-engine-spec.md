# The Epistemology Engine

**ĀRK — Internal Architecture Document**

A four-layer classifier for sorting any unit of human knowledge — scriptural, scientific, cultural — into a single coherent framework, and a site architecture that presents it progressively.

- **Version:** 0.2 — Ratified Specification (Post-Reconciliation)
- **Scope:** Classifier logic · Contradiction protocol · Darśana plurality rule · Site information architecture · Three worked examples · Public onboarding addendum
- **Status:** Ratified for engineering handoff (2026-09-04). Incorporates binding Architect Rulings from `RECONCILE.md` (§7.1, §7.2, §7.4, §6.2). Ontological claims herein are stated positions of the ĀRK project, not neutral academic claims — see §1.4.

---

## §1 — Purpose and Scope

> This document specifies the logic by which any unit of knowledge — a śloka, a peer-reviewed paper, a cultural practice, a psychological theory, a political framework — is tagged, placed, and displayed inside ĀRK. It is not the marketing vision for ĀRK; that document exists separately. This is the engineering and philosophical substrate underneath it.

### 1.1 The problem this solves

Without a formal classifier, a knowledge platform spanning śāstra, science, and culture degrades into one of two failure modes over time: (a) an apologetics archive that quietly discards or reframes any inconvenient data to protect a predetermined conclusion, or (b) a relativist library where everything is presented as equally valid and nothing is actually claimed. ĀRK is designed to avoid both. The classifier's job is to make the sorting of new material *mechanical and repeatable* — so that a team member, or an AI ingestion pipeline, tags a new neuroscience paper the same way a philosopher steeped in the tradition would, without needing to re-litigate first principles every time.

### 1.2 What gets classified

Any discrete "artifact" entering the system: a scriptural verse or passage, a scientific claim or finding, a philosophical argument, a cultural practice or aesthetic norm, a piece of modern psychology, political theory, or any other candidate content unit. Artifacts are the atomic unit of the knowledge graph — larger documents are decomposed into artifacts before tagging.

### 1.3 The four layers, at a glance

| Layer | Question it answers | Possible values |
|---|---|---|
| **Pramāṇa** | What kind of evidence is this artifact, and does it carry independent epistemic weight or borrowed weight? | Śabda · Pratyakṣa · Anumāna · Blend (with stated anchor) |
| **Topic** | Which of the five universal tattvas does this bear on, if any? | Īśvara · Jīva · Prakṛti · Kāla · Karma · combination · None (pure deśa-kāla) |
| **Darśana Lineage** | Which reasoning system is doing the interpreting, and are there rival lineages that would read this differently? | Nyāya · Sāṅkhya · Mīmāṃsā · Vedānta (with sub-tag for commentarial lineage) · Cross-darśana |
| **Puruṣārtha** | What human end is this artifact ultimately in service of? | Dharma · Artha · Kāma · Mokṣa · combination |

Every artifact receives a tag on all four layers before it is placed in the knowledge graph or surfaced in the frontend. An artifact that cannot be coherently tagged on any layer is held in a review queue rather than force-fit — see §2.5.

> **⚠ Assumption flagged for review**
> §1.3 treats the five tattvas (Īśvara, Jīva, Prakṛti, Kāla, Karma) as the fixed content of the Topic layer, per your source documents and the Vedānta-sūtra's own topical division as read through Govinda-bhāṣya. If your intent was a different or expanded topic set, this layer's enum needs revision before build.

### 1.4 A note on what kind of document this is

This spec operationalizes a specific ontological commitment — that Kṛṣṇa, as understood through the Brahma-Vaiṣṇava Vedānta lineage, is the root node of reality and therefore of the knowledge graph. That is a substantive philosophical claim, not a neutral one, and this document does not attempt to independently justify it to a skeptical reader. Its job is to take that commitment as given (as instructed) and build a rigorous, non-arbitrary system on top of it — one that is honest about where it is asserting a contested position versus where it is describing something closer to consensus.

---

## §2 — Layer 1: Pramāṇa Classification

### 2.1 The three pramāṇas in play

ĀRK recognizes three sources of valid knowledge for classification purposes: **śabda** (testimony — specifically śāstric testimony transmitted through an unbroken lineage), **pratyakṣa** (direct perception, including instrument-mediated perception such as an MRI or telescope), and **anumāna** (inference, including the whole of hypothesis-driven modern science insofar as it reasons from observed data to unobserved conclusions).

### 2.2 Why śabda anchors rather than merely contributes

For the five tattvas specifically — the nature of Īśvara, the jīva, prakṛti, kāla, and karma in their ultimate mechanics — pratyakṣa and anumāna are structurally limited by what your source material calls the four human defects: *bhrama* (illusion), *pramāda* (mistake), *vipralipsā* (the propensity to cheat or deceive), and *karaṇāpāṭava* (imperfection of the instruments of knowledge, including the senses and their technological extensions). These are not moral accusations against individual scientists; they are a structural claim about the limits of any observation- and inference-based method when the object of inquiry exceeds what senses and instruments — however extended — can access. Śabda, understood as testimony originating from a source not subject to these four defects, is therefore treated as the anchor pramāṇa specifically for claims about the five tattvas. Outside that domain — an artifact about, say, metallurgy or agricultural technique — pratyakṣa and anumāna operate with full independent authority and no śabda anchor is needed.

### 2.3 The classification test

> **Pramāṇa Test:** Ask what kind of claim the artifact is making. If it is a claim about the ultimate nature or mechanics of one of the five tattvas, tag its pramāṇa as **Śabda** only if it originates in scriptural testimony; tag it as **Anumāna** or **Pratyakṣa** if it originates in observation or inference, and treat śabda as the background anchor against which it will later be checked (§3). If the artifact makes no claim touching the five tattvas, classify its pramāṇa on its own terms with no anchor requirement.

### 2.4 Blended artifacts

Many real artifacts are blends — a modern commentary that uses logical argument (anumāna) to unpack a scriptural verse (śabda), for instance. Blended artifacts receive a **Blend** tag plus a stated anchor: which pramāṇa is load-bearing, and which is in a supporting or illustrative role. This prevents the common failure where a scriptural conclusion is silently smuggled in as if it were independently derived by logic, or conversely where logic is dismissed as "merely supportive" when it is actually doing the real work.

### 2.5 The review queue

An artifact whose pramāṇa cannot be determined — ambiguous sourcing, uncertain lineage, or a claim type not covered above — is held in a review queue rather than auto-tagged. This is a deliberate design choice: a wrong tag propagates through the topic, darśana, and puruṣārtha layers and corrupts downstream placement, while an untagged artifact simply waits.

---

## §3 — The Contradiction Protocol

> What happens when pratyakṣa or anumāna appears to contradict śabda on a tattva-level claim. This is the case that will occur constantly in practice, and the case on which ĀRK's intellectual honesty actually gets tested.

### 3.1 The governing principle

Contradicting data is **never deleted, suppressed, or silently reframed**. Śabda remains the anchor for tattva-level claims per §2.2, but the contradicting artifact is retained in full, tagged, and made visible. The system's credibility depends on this: a platform that quietly disappears inconvenient findings is indistinguishable, to a discerning user, from the apologetics failure mode described in §1.1.

### 3.2 The four-step protocol

1. **Anchor identification.** The relevant śabda position on the tattva in question is identified and stated plainly, with its source.
2. **Tagging the contradicting claim.** The pratyakṣa/anumāna artifact is tagged as `current-anumāna` or `instrument-bound-pratyakṣa` — a tag that is descriptive, not dismissive. It marks the claim as provisional relative to the current state of method and instrumentation, which is true of essentially all empirical science and is not a special demotion invented for this case.
3. **Gap analysis via darśana.** The relevant darśana lineage (typically Nyāya, for logical structure, and/or Sāṅkhya, for its treatment of the categories of matter and consciousness) is applied to locate precisely where the contradicting claim's inferential chain diverges from the śabda position — which premise, which unstated assumption, which leap from correlation to identity. This step must be substantive, not a rhetorical gesture; see the worked example in §8 for what this looks like when done properly, and the caution in §3.3 about where it goes wrong.
4. **Display, not resolution-by-deletion.** The frontend shows the user both the empirical claim and the gap analysis side by side. The user is not told the science is false; they are shown specifically what it does and does not establish, per the anchor.

### 3.3 What this protocol is not

It is not a claim that modern science is generally unreliable, nor a license to wave away any inconvenient finding with a vague appeal to "instrument limits." The gap analysis in step 3 has to do real philosophical work — identifying an actual unexamined premise — or the artifact should be flagged for expert review rather than published with a hand-wavy rebuttal attached. A gap analysis that cannot identify a specific inferential leap is not ready to ship.

> **⚠ Assumption flagged for review**
> Your collaborator's draft described unresolved scientific contradiction as an "evolving asymptote" approaching śabda over time. That is a theological prediction about the future trajectory of empirical inquiry — a substantive claim in its own right, not a structural feature of the classifier. §3 above deliberately omits it from the mechanical protocol and treats it as an optional editorial position that could be stated in accompanying commentary, not baked into the tagging logic itself. If you want the asymptote claim built into the engine's actual behavior (e.g., artifacts get a "distance-from-resolution" score that is expected to trend downward), that is a separate, larger feature and should be scoped on its own.

---

## §4 — Layer 2: Topic Classification (The Five Tattvas)

### 4.1 The universal/relative razor

> **Universality Test:** Does denying this claim entail denying the existence or mechanics of Īśvara, Jīva, Prakṛti, Kāla, or Karma as such — or does it merely deny a particular community's practice regarding them? If the former, the artifact sits on the **Fixed Axis** (Siddhānta) and is tagged with the relevant tattva(s). If the latter, it sits on the **Deśa-Kāla-Pātra Axis** (time-place-circumstance) and is tagged `Topic: None` — it is admitted to the system as cultural content, evaluated on its own terms against the puruṣārtha layer (§6), but never treated as foundational.

Denying gravity denies a mechanic of prakṛti's lawful behavior — Fixed Axis. Denying that a particular garment is immodest denies nothing about any tattva — Deśa-Kāla-Pātra Axis. The test is mechanical enough to apply consistently, which is its point.

### 4.2 The five tattvas, briefly

| Tattva | Domain |
|---|---|
| Īśvara | The nature of the Supreme controller/source; in the Brahma-Vaiṣṇava reading, Kṛṣṇa specifically. |
| Jīva | The nature of the individual conscious self — its eternality, its relation to Īśvara, its constitutional position as servant. |
| Prakṛti | Material nature — its laws, its behavior, its relationship to consciousness. |
| Kāla | Time — its role as an agent/instrument in the unfolding of prakṛti and karma. |
| Karma | Action and its binding consequence; the mechanics by which action produces result across time. |

An artifact can be tagged with more than one tattva where it genuinely bears on more than one — a discussion of free will, for instance, typically implicates both jīva and karma.

### 4.3 Deśa-Kāla-Pātra content is not second-class, it is differently governed

Content tagged `Topic: None` is not excluded or minimized — a large fraction of what makes ĀRK feel like "a civilization" rather than "a scripture archive" will be exactly this kind of content: business strategy, aesthetics, fitness, psychology of habit formation, and so on. It is governed differently: it is evaluated against whether it serves the puruṣārtha layer (§6) for a given individual in a given context, not measured against tattva-fidelity, because it makes no tattva-level claim to be measured against.

---

## §5 — Layer 3: Darśana Lineage, and the Plurality Rule

### 5.1 Why this layer exists separately from the topic layer

Two artifacts can share a topic tag (both address Jīva, say) while reasoning about it through entirely different systems — one through Sāṅkhya's enumeration of categories, another through Nyāya's logical analysis of a specific claim, another through direct Vedāntic exegesis. Collapsing these into one "spiritual conclusion" erases exactly the kind of intellectual structure that makes ĀRK legible to a rigorous secular reader. The darśana layer keeps that structure visible.

### 5.2 The plurality rule

**Interface layer — show plurality.** When multiple darśanas would tag or interpret the same artifact differently, the frontend displays the readings side by side, each attributed to its lineage, without ranking them against each other at this level. A user asking about consciousness sees how Sāṅkhya frames it (as an evolute/category question — puruṣa versus prakṛti) alongside how Nyāya frames it (as a question of what the inferential evidence actually licenses one to conclude).

**Ontology layer — Vedānta as root-node tie-breaker.** Beneath the visible plurality, the knowledge graph's underlying structure resolves to a single apex reading via Vedānta — and, per the source material, specifically the Brahma-Vaiṣṇava Vedānta reading as systematized in Baladeva Vidyābhūṣaṇa's Govinda-bhāṣya. A user who continues past the "compare lenses" view into a "complete depth" view is shown this resolution explicitly labeled as the system's own ontological commitment — not represented as the neutral consensus of all darśanas, since it is not that.

> **⚠ Assumption flagged for review — intra-Vedānta plurality**
> The rule above resolves *inter*-darśana conflict (e.g., Sāṅkhya vs. Nyāya). It does not yet specify what happens when rival *Vedānta* commentaries disagree with each other on the same sūtra — e.g., an Advaita reading (Śaṅkara) versus a rival Vaiṣṇava bhāṣya versus Govinda-bhāṣya. Proposed extension, not yet confirmed by you: apply the same two-tier structure one level down — the interface shows the major Vedānta-commentarial readings side by side when a user drills into a sūtra, while the knowledge graph's root node commits specifically to the **Govinda-bhāṣya** reading, labeled precisely as that (not as "the Vedānta position" unqualified, since competing bhāṣyas would dispute that framing). This keeps the tie-breaker honest about being one lineage's reading rather than implying it is uncontested within Vedānta itself. Confirm before build.

### 5.3 Cross-darśana artifacts

Some artifacts (much of the source material you supplied among them) explicitly move across multiple darśanas in a single argument — invoking Nyāya to adjudicate method, then Sāṅkhya-like categories to classify a scientific finding, then Vedānta for final placement. These are tagged `Cross-darśana` with each constituent lineage noted in sequence, rather than forced into a single-lineage tag.

---

## §6 — Layer 4: Puruṣārtha Classification

### 6.1 The four ends

| Puruṣārtha | Governs |
|---|---|
| Dharma | Duty, ethical structure, right action relative to one's position. |
| Artha | Wealth, resources, power, material security and its lawful pursuit. |
| Kāma | Desire, aesthetic and sensory experience, psychological fulfillment. |
| Mokṣa | Liberation; in the bhakti reading specifically, the recovery of the jīva's constitutional relationship to Kṛṣṇa. |

### 6.2 Why this layer matters for Deśa-Kāla content specifically

This is the layer that lets a corporate strategy article, a fitness protocol, and a bhakti verse coexist in one system without collapsing into each other or requiring the strategy article to secretly be "about" mokṣa to belong. An artha-tagged artifact is evaluated as serving artha well or poorly — not retrofitted into a spiritual reading it doesn't make. The four ends are traditionally ordered (dharma constraining artha and kāma, mokṣa as the highest), and that ordering is preserved as a background hierarchy without requiring every artifact to justify itself against mokṣa directly.

---

## §7 — Site Information Architecture: Backend Ontology → Frontend Pedagogy

### 7.1 The core split

The knowledge graph's internal structure is fixed and Kṛṣṇa-rooted, per §5.2. The site's navigation and presentation layer is organized around *depth of engagement*, not around announcing that structure. A user's path through ĀRK is progressive: entry points are secular and domain-specific, and the tattva/darśana architecture becomes visible only as they choose to go deeper.

### 7.2 Three depth tiers

**Tier 1 — Domain Entry** → **Tier 2 — Compare Lenses** → **Tier 3 — Complete Depth**

**Tier 1 — Domain Entry.** The surface of the site is organized by conventional domain — Science, Psychology, Leadership, History, Philosophy, Technology, Culture — the categories a scientist, entrepreneur, or student would already recognize and search for. An artifact appears here framed in its own domain's native language. No tattva, darśana, or puruṣārtha tags are visible at this tier. This is the layer described in the vision document as "the world's most ambitious interdisciplinary knowledge platform" — it must stand on its own merit to a reader who came for the neuroscience and nothing else.

**Tier 2 — Compare Lenses.** A user who clicks "go deeper" on an artifact reaches a view showing how multiple darśanas or frameworks read the same material, per the plurality rule in §5.2. This is where Sāṅkhya-vs-Nyāya-style comparative framing appears, and where an artifact's pramāṇa tag and contradiction-protocol analysis (§3) become visible if applicable. This tier is where the site starts to look distinctively different from a general knowledge platform, while still reading as rigorous comparative scholarship rather than devotional content.

**Tier 3 — Complete Depth.** The root-node resolution: the Govinda-bhāṣya / Brahma-Vaiṣṇava reading, the relevant tattva placement, and — where applicable — the connection to Kṛṣṇa and the Hare Kṛṣṇa mahā-mantra as the practical culmination the whole framework points toward. This tier is opt-in by navigation depth, never forced, and never the default view for a Tier-1 entry.

### 7.3 Cultural / Deśa-Kāla content in the IA

Content tagged `Topic: None` (§4.3) lives natively at Tier 1 and does not require a Tier 3 at all — a fitness protocol or a design-aesthetics essay can exist as pure Tier-1 content, tagged only for puruṣārtha, with no obligation to resolve upward into tattva placement. Forcing every artifact toward Tier 3 would recreate the "everything is secretly religious" failure mode the vision document explicitly warns against.

### 7.4 Navigational skeleton

| Section | Contents |
|---|---|
| Library | Domain-organized artifact browsing (Tier 1 default view) |
| Compare | Side-by-side darśana / framework views (Tier 2) |
| Root | Tattva map and Govinda-bhāṣya resolution pathway (Tier 3) |
| Engine | AI knowledge-engine interface — conversational, cites artifacts with full tag provenance |
| Journeys | Personal intellectual-trajectory tool referenced in the vision document, built on top of a user's engagement history across tiers |

---

## §8 — Worked Examples

Three artifacts, run through all four layers, showing exactly what the engine outputs and what the frontend displays at each tier.

### Example 1 — Contradiction Case: "Consciousness is generated by the physical cortex" (neuroscience paper)

**Pramāṇa** — `Anumāna` `instrument-bound-pratyakṣa (supporting)`
The claim is an inference from correlational data (cortical activity correlates with reported conscious states) to an identity claim (cortical activity *generates* consciousness). The correlational observations are pratyakṣa via instruments (fMRI, EEG); the leap to generation/identity is anumāna. This is the artifact's own internal blend — noted per §2.4, anchor is the inferential leap, not the raw observation.

**Topic** — `Jīva` `Prakṛti`
Directly addresses the relationship between consciousness (jīva) and matter (prakṛti) — specifically, whether jīva reduces to or emerges from prakṛti. Fails the universality test in reverse: this artifact's claim, if true, would deny jīva's status as ontologically distinct from prakṛti — so it is squarely Fixed-Axis subject matter, not Deśa-Kāla content.

**Darśana Lineage** — `Sāṅkhya (primary)` `Nyāya (gap analysis)`
Sāṅkhya's puruṣa/prakṛti distinction directly frames what's at stake: is the artifact describing prakṛti's activity (correct, as far as it goes) or making a claim about puruṣa/jīva (where its evidence does not reach)? Nyāya is applied to isolate the specific inferential step that overreaches.

**Puruṣārtha** — `Mokṣa (indirect)`
The artifact bears on mokṣa indirectly: a materialist reduction of jīva to prakṛti, if accepted uncritically, forecloses the entire framework in which liberation is coherent. Tagged, not overstated — the paper itself is not making a puruṣārtha claim; this notes what's downstream if its ontological overreach were accepted uncritically.

**Contradiction Protocol Applied (§3.2)**

1. **Anchor:** Jīva is ontologically distinct from and irreducible to prakṛti; consciousness is a symptom of jīva's presence, not a product of matter's configuration (Sāṅkhya-Vedānta position, stated per source material and consistent with Govinda-bhāṣya's reading of jīva's constitutional nature).
2. **Tag:** `current-anumāna` — the identity claim (cortex generates consciousness) is provisional, not the correlational data itself.
3. **Gap analysis:** The paper's evidence establishes correlation and, at most, causal necessity of cortical activity for the *reportability* of conscious states in embodied life. It does not and cannot, by its own methodology, distinguish "the cortex generates consciousness" from "the cortex is the instrument through which an already-conscious jīva expresses and localizes awareness within a material body" — both hypotheses predict the identical correlational data. The paper's inferential leap from correlation to generation smuggles in a metaphysical premise (physicalism) that its data does not independently establish.
4. **Display:** Tier 1 shows the paper as-is, in neuroscience's own terms, unedited. Tier 2 shows the Sāṅkhya framing beside a physicalist framing of the same data. Tier 3 shows the full gap analysis and the Govinda-bhāṣya-consistent resolution.

---

### Example 2 — Deśa-Kāla vs. Universal: The micro-bikini / modesty question

**Pramāṇa** — `N/A — no pramāṇa claim`
Neither "wearing X is fine" nor "wearing X is immodest" is an evidentiary claim about reality in the pratyakṣa/anumāna/śabda sense. This is a norm, not a proposition about the tattvas — flagged immediately at intake as a candidate for `Topic: None`.

**Topic** — `None (Deśa-Kāla-Pātra)`
Applying the universality test (§4.1): does denying "this garment is immodest" entail denying anything about Īśvara, Jīva, Prakṛti, Kāla, or Karma? No. It denies a specific community's aesthetic/social norm. Tagged Deśa-Kāla-Pātra — admitted to the system, governed by §6, not §4.

**Darśana Lineage** — `Not applicable at this layer`
Deśa-Kāla-Pātra content does not require darśana adjudication, since it makes no tattva-level claim for a darśana to adjudicate. (If a user tried to argue the norm itself as universal and binding on all cultures, *that argumentative move* would become a new artifact and would fail the universality test on its own account.)

**Puruṣārtha** — `Kāma (primary)` `Dharma (contextual constraint)`
This is where the real evaluative work happens for this artifact. The question ĀRK actually asks is not "is this immodest" but "does this practice, for a given individual in a given deśa-kāla-pātra, serve kāma in a way that remains within the constraining bound of dharma appropriate to their position" — which is individually and culturally variable by design, per §4.1 and the source material's own bikini example.

**Display:** This artifact never surfaces a Tier 3 view — there is no tattva resolution to drill into, and building one would be a category error, actively contradicting the system's own architecture. Tier 1 presents it as a culture/lifestyle artifact. If a user asks the AI engine directly "is this a sin," the engine's answer routes through the puruṣārtha framing above rather than manufacturing a tattva-level verdict the classifier explicitly determined doesn't exist for this artifact.

---

### Example 3 — Direct Śabda: A Bhagavad-gītā verse establishing Jīva (e.g., BG 2.20, on the self's non-origination and non-destruction)

**Pramāṇa** — `Śabda (primary, unblended)`
Direct scriptural testimony, not derived from or dependent on inference for its authority within the system. Per §2.2, this is treated as the anchor pramāṇa for jīva-tattva claims.

**Topic** — `Jīva`
Directly and exclusively establishes a core property of jīva — its non-origination, non-destruction, and consequent distinction from the body, which is subject to origination and destruction.

**Darśana Lineage** — `Vedānta (Govinda-bhāṣya reading)` `Sāṅkhya-compatible framing available at Tier 2`
At Tier 2, this verse can be shown alongside how Sāṅkhya independently arrives at puruṣa's distinctness from prakṛti's evolutes — a genuine point of convergence across darśanas worth surfacing, per §5.3's cross-darśana handling, even though the verse itself is not a Sāṅkhya artifact.

**Puruṣārtha** — `Mokṣa`
Establishing jīva's eternal, non-material nature is foundational to the entire mokṣa framework — the verse's own context in the Gītā is Kṛṣṇa's instruction to Arjuna precisely to correct a misidentification of self with body that is producing wrongful grief and hesitation to act.

**Display:** Tier 1 could surface this verse under Philosophy or Psychology (self/identity, grief, non-attachment) in fully secular framing. Tier 2 shows the Sāṅkhya convergence noted above. Tier 3 shows the direct Govinda-bhāṣya reading and its place in the larger jīva-tattva architecture. No contradiction protocol applies — there is no competing anumāna/pratyakṣa claim being adjudicated here, only direct establishment.

---

## §9 — Resolved Decisions (Post-Reconciliation Ledger)

The open items flagged in v0.1 were formally adjudicated and ratified in `RECONCILE.md` on 2026-09-04:

1. **Intra-Vedānta Plurality (§5.2 / RECONCILE.md Issue 7.4):** **RATIFIED.** The platform uses accessible, universal phrasing ("Vedāntic Philosophy") on public landing surfaces, and exact lineage attribution (*Govinda-bhāṣya* by Baladeva Vidyābhūṣaṇa) presented comparatively beside rival classical commentaries (Advaita, Viśiṣṭādvaita, Dvaita) in deep research codices.
2. **Scientific Contradiction & Asymptote (§3.3 / RECONCILE.md Issue 7.2):** **RATIFIED.** The "asymptote" hypothesis remains an interpretive philosophical perspective rather than an automated algorithm. On public landing surfaces, science and tradition are presented as harmonious partners in truth. In deep research monographs, the formal 4-step Contradiction Protocol (`current-anumāna` tagging, inferential gap analysis, side-by-side display) is rigorously enforced.
3. **Epistemology Engine Scope (RECONCILE.md Issue 7.1):** **RATIFIED.** The 4-layer taxonomy operates across all research briefs and visual plates, paired with mandatory simple, engaging onboarding for first-time visitors.

---

## §10 — Public Surface Presentation & Phased Implementation Addendum

### 10.1 First-Time User Onboarding & Accessible Dual-Labeling (Issue 7.1)
To ensure that general visitors, secular thinkers, and skeptics are not alienated by technical Sanskrit epistemology, all public landing surfaces, gallery filter chips, and interactive cards must implement **plain-English dual-labeling and interactive tooltips**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PUBLIC TAXONOMY ONBOARDING MATRIX                               │
├──────────────────────┬─────────────────────────────┬───────────────────────────────────┤
│ Layer                │ Plain-English Dual Label    │ Onboarding Question & Gloss       │
├──────────────────────┼─────────────────────────────┼───────────────────────────────────┤
│ 1. Pramāṇa           │ Epistemic Source            │ "How do we verify this claim?"    │
│                      │                             │ (Perception / Inference / Sourced)│
│ 2. Topic             │ Domain of Reality           │ "What layer of existence is this?"│
│                      │                             │ (Consciousness / Matter / Cosmos) │
│ 3. Darśana           │ Philosophical Lens          │ "Which analytical school speaks?" │
│                      │                             │ (Empirical / Logic / Synthesis)   │
│ 4. Puruṣārtha        │ Human Telos                 │ "What human purpose does it serve?│
│                      │                             │ (Ethics / Capability / Meaning)   │
└──────────────────────┴─────────────────────────────┴───────────────────────────────────┘
```

### 10.2 Progressive Contradiction Display (Issue 7.2)
- **Surface Layer:** Avoids abstruse theological friction; highlights the shared civilizational quest for truth uniting empirical science and consciousness studies.
- **Deep Monograph Layer:** Employs the full 4-step Contradiction Protocol:
  1. Identifies relevant scriptural anchor.
  2. Tags provisional empirical claim as `current-anumāna`.
  3. Conducts rigorous Nyāya/Sāṅkhya dialectical gap analysis identifying the specific unexamined premise.
  4. Renders side-by-side comparative cards with full citation provenance.

### 10.3 Staged Engineering Deployment (Issue 6.2)
- **Phase 1 (Immediate MVP):** An interactive epistemology showcase module on `arkfuturism.com/` demonstrating the 4-layer taxonomy and sample cards, with primary action linking out to the live resolver on `arohaomniscorp.com` in a new tab (`target="_blank"`).
- **Phase 2 (Growth Roadmap):** Full native ingestion pipeline, citation graph databases, and reasoning engine migrated directly to `arkfuturism.com`.
