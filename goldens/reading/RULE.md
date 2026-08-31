# The reading golden — the standard a perfect reading is held to

*Written down before any specimen's window was hand-read, so that the rule
is a standard the reading is held to and not a description of what the
readings turned out to contain — `eoreader7/native/goldens/being/RULE.md`'s
own discipline, reused.*

**Exposure, disclosed rather than hidden.** This rule was written in the
same session that built and validated the POS vocabulary gate, so the
author had already seen PARTIAL pipeline outputs for two of the four
specimens before writing it: ~15 folded rows of the Kant sidecar and ~4
folded rows plus the admitted-verb list for Alice (both while debugging a
different defect), plus aggregate edge counts for all four. The golden
READINGS below are nonetheless derived from the source bytes alone, and
no threshold or mapping in this rule was chosen by checking what it does
to any specimen's pipeline score — but a reader weighing independence
should know the exposure existed. UDHR and the ripgrep changelog were
seen only as counts and a partial verb list.

## The question

For a declared window of a real corpus source: what is the COMPLETE, CORRECT
set of assertions a perfect reader would extract — every one with a resolved
subject, a genuine relation, a whole object, a byte address that resolves in
the source's own coordinates, and a **phasepost**: which of the 27 acts of
transformation (operator × grain, `eoreader7/native/kernel/cube.js`'s own
closed algebra) the assertion's verb performs.

The purpose is to work BACKWARDS: the diff between these goldens and the
live pipeline's own reading of the identical windows is the evidence from
which `DERIVED-RULES.md` derives what rules and policies WOULD close each
gap. Nothing in the live pipeline is changed by this golden; changing the
pipeline to score better against it, without an independent justification
for each change, is the calibration-on-the-fixture move both sibling repos'
CLAUDE.md files already forbid.

## Part I — what a perfect assertion is (the reading standard)

**R1 — completeness.** Every finite main-clause predication in the window
is present. A non-restrictive appositive or parenthetical that carries its
own independent assertion ("Kant, a lifelong resident of Königsberg, ...")
also counts, marked `embedded: true`. A restrictive relative clause folds
into the noun phrase it restricts and is NOT a separate assertion. Nothing
is asserted that the window does not state (no inference, no world
knowledge imported — the reading is of the bytes, not of the reader's
memory).

**R2 — subject identity.** The subject is the maximal referent the text
itself establishes: a pronoun whose antecedent is in the window (or is the
document's own established topic — a biography's subject, a statute's
enacting body) is RESOLVED, with the resolution's evidence named. A
subject the window genuinely never grounds stays the pronoun, marked
`unresolved: true` — never guessed. No formatting debris (glued wikilink
fragments, leading conjunctions, list markers) may appear in a subject.

**R3 — relation genuineness.** The relation slot holds the clause's own
predicate head — a genuine verb (or the copula, handled by Part II's
copula rule). A preposition, article, conjunction, or noun in the relation
slot is by definition a reading error, whatever the extractor's slot
heuristic matched.

**R4 — object wholeness.** The object is the clause's own complement,
whole: not truncated at a comma inside it, not overrun into the next
clause, not glued across a sentence boundary. Where the complement is a
clause ("believed THAT reason is the source of morality"), the whole
complement clause is the object.

**R5 — address.** Every assertion carries the byte span of its own
sentence in the SOURCE FILE'S RAW coordinates, and `raw.slice(start,end)`
must contain the assertion's own words (whitespace-collapsed comparison,
the same collapse `hyperlexicon.js::admit` applies) — P5.2 at the golden's
own door.

**R6 — polarity is separate.** Negation is read as polarity on the
assertion (`+`/`-`), NEVER as a change of phasepost: "never married" is
the same act as "married" with polarity `-`, not a NUL. This mirrors the
extractor's own existing design (polarity is already a separate field) and
keeps the phasepost about the KIND of transformation, not its truth.

**R7 — phasepost.** Every assertion carries `{op, grain}` per Part II,
with a one-line `because`. A genuinely undecidable act carries a
`primary` and one disclosed `alternate` with the reason the window cannot
settle it — never a silent coin-flip.

## Part II — the phasepost rule: a verb is one of nine acts, at one of three grains

The framing, received directly (2026-08-29): **a phasepost is an act of
transformation. The verb does one of the 9 acts, modified by the third
element — the grain — which is specific to that overall three-slot act of
transformation.** The 9 acts are the engine's own operators, each a fixed
(mode × domain) pair; the grain is the free axis; 27 cells total
(`cube.js::cellOf`). This is verb-as-act — classifying what a specific,
already-identified predicate DOES — not the refuted passage-as-topic move
(the-fold CLAUDE.md: "the cube is not a content classifier"; that
refutation is about deriving a terrain from a passage's content, and it
stands untouched).

### Step 1 — MODE: what does the act do to its object?

- **Differentiate** — the act cuts, bounds, removes, ends, distinguishes:
  something is set apart or taken away.
- **Relate** — the act holds two things in relation without making or
  unmaking either: standing-with, standing-as, standing-against.
- **Generate** — the act brings forth: something exists, is arranged, or
  is understood that was not before.

### Step 2 — DOMAIN: where does the act operate?

- **Existence** — presence and absence of beings and things: being,
  appearing, arriving, being named, ceasing.
- **Structure** — arrangement: parts, wholes, connections, positions.
- **Interpretation** — meaning: claims, judgments, definitions, framings.

Mode × domain names the operator:

| | Existence | Structure | Interpretation |
|---|---|---|---|
| **Differentiate** | NUL — absence, ceasing, lacking ("vanished", "died", "lacked") | SEG — cutting an arrangement ("divided", "left", "removed", "excluded") | DEF — bounding a meaning ("defined", "distinguished", "denied that") |
| **Relate** | SIG — presence held in relation ("appeared", "is called", "was a teacher", "stood at") | CON — arrangement held in relation ("married", "met", "contains", "borders", "accompanied") | EVA — a claim held against a holder ("believed", "judged", "demonstrated", "considered") |
| **Generate** | INS — coming into being ("was born", "founded", "created", "became") | SYN — a whole produced ("wrote", "built", "composed", "assembled") | REC — a new frame produced ("converted", "recanted", "reinterpreted", "revised") |

(Every example above is invented for this table, none drawn from a
specimen window.)

### Step 3 — GRAIN: what does this particular transformation land on?

- **Ground** — a field, state, place, period, or whole condition: the act
  operates on a context ("settled IN THE VALLEY", "reigned THROUGH THE
  DROUGHT").
- **Figure** — one individual: one person, one thing, one specific claim,
  one event ("adopted THE CHILD", "proved THE THEOREM").
- **Pattern** — a kind, class, habit, law, or recurrence ("bred
  RETRIEVERS", "kept THE SAME ROUTE EVERY MORNING", "binds ALL SUCH
  CASES").

Habitual/iterative aspect promotes to Pattern even when the object is
singular in form ("dined at the same table each night" — the assertion is
about the recurrence, not one dinner).

### The copula rule (mechanical, because "is/was" is the commonest verb and act-empty by itself)

The copula's phasepost is read from its PREDICATE:

1. Predicate is a **participle of another verb** ("was born", "was
   elected") → that verb's own act, subject read as patient.
2. Predicate is a **class or kind** ("is a physician", "are mammals") →
   SIG, grain **Pattern** (standing-as-a-kind).
3. Predicate is a **unique role, position, or identity** ("was the third
   of five children", "is the capital") → SIG, grain **Figure**.
4. Predicate is a **property adjective** ("was strict", "is rare") → SIG,
   grain **Figure** (one quality standing with one figure); a
   dispositional/habitual property ("was always punctual") → SIG·Pattern.
5. Predicate is a **location or time** ("was in the harbor", "was during
   the war") → SIG, grain **Ground**.

### Two walls

- **Polarity never moves the phasepost** (R6). NUL is for verbs whose own
  act is absence ("vanished"), never for negated presence ("did not
  appear" = SIG, polarity −).
- **The phasepost classifies the ACT, not the topic.** "Kant wrote about
  death" is SYN (a work produced), not NUL — what the sentence's verb
  does, never what the sentence is about. This is the line that keeps
  this rule on the right side of the content-classifier refutation.

## Part III — what each golden row carries

```json
{
  "subject": "…",            // R2: resolved, maximal
  "relation": "…",           // R3: the predicate as the text states it
  "object": "…",             // R4: whole
  "polarity": "+",           // R6
  "phasepost": { "op": "…", "grain": "…" },
  "because": "one line: why this op and this grain",
  "span": { "start": 0, "end": 0 },   // R5: raw-file coordinates
  "embedded": false,          // true for appositive/parenthetical assertions
  "unresolved": false,        // true only when R2's evidence is absent
  "resolution": null,         // when a pronoun was resolved: the evidence
  "alternate": null           // R7: the one disclosed alternate, when undecidable
}
```

## Part IV — scope and scoring

Each specimen declares its window as `[0, windowEnd)` in the PIPELINE'S
OWN normalized-excerpt coordinates (container-stripped, CRLF-normalized —
the same string `readSidecar` reads), with `windowEnd` chosen at a
sentence boundary before any golden row was written. The golden covers
that window COMPLETELY per R1.

The diff driver (`diff-golden.mjs`) runs the real pipeline on the
identical window and classifies every disagreement into gap classes:

- `missed` — a golden assertion the pipeline never extracted
- `false` — a pipeline edge asserting what the window does not state
- `garbled-subject` / `garbled-object` — right assertion, wrong boundary
- `unresolved-pronoun` — pipeline kept a pronoun the golden resolves
- `wrong-relation` — a non-verb or wrong token in the relation slot
- `no-phasepost` — correct edge, but nothing in the pipeline can carry
  the act (expected everywhere today: the phasepost mechanism does not
  exist in the live pipeline — that gap class IS the point)

Matching is by normalized token containment on subject and object with
lemma-tolerant relation comparison, then hand-checked — the windows are
small enough that every mechanical match is re-read by eye before it is
counted.

`DERIVED-RULES.md` is the deliverable: per gap class, the rule or policy
that WOULD close it, which organ owns it, and what it costs.

## Part V — why the phasepost matters: the reasoning contract

Received directly, mid-build (2026-08-29, near-verbatim): **"we should be
able to reason with anything so long as we have properly encoded the
transformation type and are looking at the correct holonic level and are
following legality rules."** That is the contract these goldens encode
toward, and it decomposes onto machinery this project already has:

1. **Transformation type** = the phasepost. Free-text verbs (`believed`,
   `argues`, `fixes`) have no composition rules; the 27 phaseposts are a
   CLOSED vocabulary a chemistry can be declared over once and reused —
   exactly what the reaction substrate (eoreader7
   `native/kernel/reaction.js`) already requires and what the corpus
   readings could not yet supply.
2. **Holonic level** = the grain, plus the occurrence-vs-entity lesson
   P60's own fourth amendment already proved on real material: "an edge
   relates OCCURRENCES, not the durable entities those occurrences belong
   to... a one-to-one relation violated at entity grain is evidence the
   GRAIN is too coarse, not that the relation is unsound." A reading that
   encodes grain wrongly composes wrongly, however correct its triple.
3. **Legality** = the composition rules over the closed vocabulary: which
   phasepost pairs may compose and what they yield (the GIVEN-affordance
   discipline — "only a GIVEN affordance with a named giver licenses
   composition"), the engine's own production order
   (`checkCubeProgression`), and the veto/concession machinery (P60:
   evidence cannot grant a licence, only take one away).

The goldens therefore judge not only whether an assertion was READ
correctly (Part I) but whether it was encoded so that reasoning over it
is POSSIBLE (Part II) — a triple with a garbled subject fails requirement
2; a preposition in the verb slot fails requirement 1 before requirement
3 can even be asked.

## Amendments (dated, appended — POLICIES.md's own discipline)

**2026-08-29, during the first hand-reading, before any diff ran.** Six
clarifications the specimens forced, each a genuine rule the first draft
lacked rather than a re-fit to make a reading come out better (full
statements in `hand-readings.mjs`'s own header): A1 attitude/perception
complements stay inside the object (intensionality — never separately
asserted); A2 adjuncts sit outside the object unless subcategorized; A3
modality is noted, never moves the phasepost; A4 an existential-negative
subject reads as NUL with polarity `+` (the absence IS the act); A5
translocation verbs read as SIG with grain from what the motion lands on;
A6 repair/revision verbs follow the project's own build-log precedent
(revision = SYN), alternate SEG disclosed.

**2026-08-31, omnilingual extension — four more languages, same window,
independently derived.** The Preamble+Article-1 window was hand-read again
for Arabic, Spanish, Mandarin, and Swahili (`udhr-arb`/`udhr-spa`/
`udhr-cmn_hans`/`udhr-swh`, alongside the existing English `udhr`), each
from that language's own OHCHR file bytes rather than from the English
golden's structure — R2's "the text itself establishes" read literally
across scripts. This surfaced three real, disclosed divergences a
same-language-only pass could not have found: a whereas-clause genuinely
absent from the Arabic translation (12 rows, not 13); an independent
finite clause Mandarin's paratactic grammar produces where English
subordinates the identical content as a restrictive relative (14 rows);
and Swahili verbing "born free" and "equal in dignity/rights" as two
separately-subjected clauses where English folds them into one predicate
(15 rows). None of these are reading errors — R1's own test (an
independent finite predication) applied honestly to each language's own
grammar, not to English's. Full reasoning lives in `hand-readings.mjs`'s
own header and each row's `because` field. Running `diff-golden.mjs`
against these four (comparing to what the LIVE pipeline currently
extracts in each language) is real, disclosed, unstarted next work — this
amendment only establishes the ground truth itself.
