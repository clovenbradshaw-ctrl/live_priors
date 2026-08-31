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

**R8 — full propositional coverage, with the clause role recorded**
(amended 2026-08-31; supersedes R1's folding rule and A2's exclusion rule
for COUNTING purposes, and see that amendment for the measurement that
forced it). EVERY predication in the window gets its own row, including
the ones R1 previously folded into a noun phrase and the ones A2
previously pushed outside the object. Each row declares what it is, in a
new `clause` field:

| `clause` | what it marks |
|---|---|
| `main` | a finite main-clause predication (what R1 alone used to admit) |
| `restrictive-relative` | a relative clause restricting a noun phrase ("acts **which have outraged** the conscience") |
| `coordinate` | an independent clause continuing the previous one paratactically — what a language without relative pronouns uses where English subordinates (Mandarin "这些暴行**玷污了**人类的良心") |
| `relative` | a non-restrictive or descriptive relative clause |
| `complement` | the predication inside an extraposed subject or object clause ("that human rights **should be protected**") |
| `purpose-adjunct` | a purpose or result clause ("to the end that every individual **shall strive**") |
| `conditional-adjunct` | a conditional clause ("if man **is not to be compelled**") |
| `temporal-adjunct` | a finite temporal clause that asserts ("while we **Unburden'd crawl** toward death", "when I have **requir'd** Some heavenly music") — added 2026-08-31 with the gap suite; a VERBLESS temporal phrase still folds per A2 |
| `reason-adjunct` | a causal clause ("puesto que sólo en ella **puede desarrollar**…", "因为只有在社会中他的个性才可能**得到**…发展") — added 2026-08-31 when es/zh rendered article 29's community-development content as an asserted reason where en/ar/sw use a relative |
| `participial-modifier` | a deverbal modifier carrying a predication ("actos **ultrajantes** para la conciencia") |
| `participial-adjunct` | a participial clause ("**keeping** this Declaration constantly in mind") |
| `heading` | a section heading — not a proposition but a ground-opening act (R10) |

**A1 still holds and is not superseded:** the intensional complement of an
attitude verb is NOT separately asserted. "have determined **to promote**
social progress", "have pledged themselves **to achieve** the promotion",
"shall strive **to promote** respect" each stay ONE row — the promoting
is the content of a resolve, not a thing the text says happened. R8 adds
rows for predications the text ASSERTS, never for ones it merely embeds
under an attitude.

**R4's wholeness still holds too.** A main row's object stays whole even
where a sub-predication of it now also has its own row; the two sit at
different levels and `clause` is what distinguishes them. A scorer that
wants the old behaviour filters to `clause === "main"`.

**Why this rule exists, measured rather than argued:** under R1+A2 alone
the five UDHR readings produced 67 rows, of which **67 were polarity `+`
and 1 of 67 was `embedded`** — the window's only negation ("if man is not
to be compelled to have recourse... to rebellion") is a conditional
adjunct, so R6's polarity wall was a rule the goldens never once
exercised, and the Preamble's operative obligation ("every individual and
every organ of society shall strive... to promote respect for these rights
and freedoms") had no row in any language. A target that omits a third of
what the text says teaches an extractor to omit it too.

**R9 — the alignment key** (added 2026-08-31; ROSETTA-GOALS Goal 2).
Every row carries `prop`: a language-independent proposition identifier
(`udhr:born-free`), shared by every language's row for the same claim.
Superposition across languages is a join, and a join needs a key.
Positional identity (`specimen` + row index) cannot serve: the languages'
row counts legitimately diverge. The prop matrix is also where a
language's absences become legible — Arabic's genuinely missing
friendly-relations clause, English folding freed-from-want into an
object — as holes in a row rather than prose in a note. A prop present in
only one language is a language-unique proposition and is recorded as
such, never forced into a shared slot.

**R10 — structure: grounds, roles, headings** (added 2026-08-31;
ROSETTA-GOALS Goal 3). A heading is not a proposition, but it is an act —
a sign held over the region it opens (SIG·Ground; SEG·Ground the
disclosed alternate) — and it gets a row with `clause: "heading"`. Every
row carries `ground`: the section it is read under (on a heading row, the
section it OPENS) — the scope that keeps a section's activation visible
on each row rather than implied by position. Every row carries `role`,
the document's own argument structure: the Preamble's whereas-clauses are
`premise`, the proclamation and its dependents `operative`, Article 1's
substance `declared`. Before R10 the goldens could not distinguish a
premise from a conclusion — the document's own argument was invisible.

**R11 — holonic ground addresses, and the assertion wall** (added
2026-08-31, second pass; user direction on both halves).

*Addresses.* `ground` is a HOLONIC DOTTED ADDRESS: `article-29.2.1.1` =
sub-clause 1 of predication 1 of paragraph 2 of article-29. Two walls:
(1) address levels mirror the SOURCE'S OWN containment (blank-line
paragraph, then predication order, then sub-predication nesting) — never
an invented layer; where a layout splits one sentence across paragraphs
(the en/ar/es proclamations), the row sits at its predicate's paragraph
and the split is noted. (2) `prop` stays flat and language-independent —
structure legitimately diverges across languages (Mandarin coordinates at
main level what English nests; the addresses now SHOW it), so nesting
must never leak into the join key. A heading row sits at the bare region
address (`article-29`); every row it conditions carries that address as a
prefix — a heading's activation scope is a prefix-walk, which is the
mechanical form of "a section heading conditions what follows." An
asserted subordinate predication extends its matrix's address by one
segment; `resolution` binds its borrowed referents. R10's flat `ground`
is superseded compatibly: its "section" is the dotted address's first
segment.

*The assertion wall.* EVERY ROW IS AN ASSERTION. Content the text does
not assert never becomes a row under any label — there are no
presupposition rows, and polarity is never assigned to unasserted
content; a disclosed fold (in `because`) is unasserted material's only
encoding. What folds: intensional complements (A1); verbless
parentheticals, appositives ("as a member of society" — presupposed, not
asserted) and concessive alternative-lists ("whether it be independent,
trust…" — quantifying alternatives, asserting none) per A2;
micro-relatives (R1); and — the rule this pass earned from the material —
IRREALIS CHARACTERIZING MODIFIERS: a subjunctive/potential relative
inside an entitlement object characterizes the sought thing rather than
asserting anything of the world ("que la ampare", "que le asegure",
"utakao mwezesha", "unaoweza kuvunja"), so it folds — MOOD IS EVIDENCE
ABOUT ASSERTION. The same evidence cuts the other way twice: an
INDICATIVE relative in the same position is asserted and rows ("que será
completada", "no fueron delictivos"), and a MAIN-LINE deontic subjunctive
is the assertion itself, not a characterizer — Swahili's -si-/subjunctive
prescriptions ARE its "shall" (A3's deontic frame), so they row. Where
mood is unavailable, existence of the host referent decides: article 28's
sought order does not yet exist (Spanish marks the whole complement
subjunctive), so its realization-relative folds in every language that
nests it; article 29's community EXISTS, so its development-relative is
asserted — and Spanish and Mandarin independently confirm by rendering it
as a causal clause (`reason-adjunct`).

**R12 — goldens revise by append** (added 2026-08-31, second pass; user
direction; store.js's own law applied to the goldens themselves: the
event stream is the reality, the current state a projection). Once a
golden is established (its first commit at whole-document coverage), a
re-adjudication NEVER silently edits a row. It appends
`{date, ground, prop, from: {op, grain, polarity}, to: {…}, because}` to
the entry's append-only `revisions` array AND updates the row — the row
set is the projection, the revisions array the log. A retraction is a
revision with `to: null`. Deleting or rewriting a revisions entry is
forbidden. The inline "RE-TYPED 2026-08-31" notes in `because` fields are
the birth-era record from before this rule existed; they stay.

## The 2026-08-31 re-adjudication (ROSETTA-GOALS Goal 1) — every row re-read verb-first

Hand-inspection found `CON·Pattern` holding 36 of 107 rows — a third of
the corpus in one cell — and two systematic errors feeding it: rows typed
from their DEONTIC FRAMING ("prescribed standing conduct") rather than
from the verb's own act, inverting A3; and six `because` fields
justifying an operator from the engine's DERIVED stance name, which is
circular (stance is computed FROM operator × grain and can never be
evidence for it). Every row was re-read. The retypings:

- **enjoy-freedoms** CON·P → **SIG·P**: the object names a CONDITION
  (freedom) present to the kind — the verbal form of a property
  predication — not a constituent part. The part-whole test now
  separates it from **endowed-reason** (faculties → CON·P, kept).
- **compelled-to-rebellion** CON·P → **INS·P, polarity −**: compulsion
  is causative — unnegated, man driven into rebellion, the same
  causation shape as the Preamble's own "disregard HAS RESULTED IN
  barbarous acts" (both INS·P; the text itself pairs them: violation
  produced barbarism, unprotected rights produce rebellion).
- **standard-to-strive** CON·P → **INS·P**: "esforzarse por / 努力实现 /
  تستهدفه" assert labouring to REALIZE a state of affairs.
- **promote-respect**, **secure-recognition**, **nations-make-known**
  CON·P → **REC·P**: fostering respect / securing recognition / making
  rights understood generate a VALUATION in others — an interpretive
  product, Generate·Interpretation. Typed from the verbs; that this
  re-occupies a previously empty cell is a consequence, not a reason.
- **Kept after re-inspection**, with `because` rewritten from
  mode × domain primitives: law-protects-rights (a standing
  guard-arrangement, CON·P), states-pledged (one standing link, CON·F),
  act-brotherhood (a mutual relation of the kind, CON·P),
  faith-reaffirmed (EVA·F, the circular clause struck).

After: CON·P holds 15 rows (possession, mutual conduct, guardianship —
three relations argued separately), and the corpus occupies 11 cells
including SIG·Ground (headings) and REC·Pattern. The prop matrix shows
23 of 24 shared propositions agreeing across all five languages; the one
disagreement (advent-aspiration: Arabic's bare copula كان vs. the
declaring verb elsewhere) is a fact about the source verbs, mutually
disclosed in the rows' alternates, and is NOT to be normalised away.
That agreement number is one reader's consistency, not independent
convergence — Goal 6's blind adjudication is what would make it evidence.

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
  "clause": "main",           // R8: the predication's construction role
  "prop": "udhr:born-free",   // R9: the language-independent join key
  "ground": "article-1.1.1",  // R11: holonic dotted address (R10's section = first segment)
  "role": "declared",         // R10: premise | operative | declared (null on headings)
  "because": "one line: why this op and this grain",
  "span": { "start": 0, "end": 0 },   // R5: raw-file coordinates
  "embedded": false,          // true for appositive/parenthetical assertions
  "unresolved": false,        // true only when R2's evidence is absent
  "resolution": null,         // when a pronoun was resolved: the evidence
  "alternate": null           // R7: the one disclosed alternate, when undecidable
}
```

Each golden entry additionally carries `revisions: []` — R12's append-only
re-adjudication ledger.

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

**2026-08-31, second pass — whole-document coverage, all five languages;
holonic addresses; the assertion wall; append-only revision.** Every UDHR
golden grew from Preamble+Article 1 to the WHOLE DOCUMENT (Preamble +
Articles 1-30): 651 rows across the five languages (en 125, ar 128, es
127, zh 133, sw 138), one per-language file each (`hand-udhr-*.mjs`),
every row hand-adjudicated verb-first, every anchor byte-verified against
the source before build and self-verified by the builder after. R11
(holonic dotted `ground` addresses; the every-row-is-an-assertion wall;
the mood rule), R12 (append-only `revisions`), and the `reason-adjunct`
clause role were added; `build-goldens.mjs` gained optional
`windowStartText` (a window may declare a start as literal text — unused
by the shipped goldens, kept for partial-window specimens to come). R9
gained the MULTI-ROW rule in practice: prop granularity is pivoted on the
English verb-spans (the props were named from en); a language that splits
what English folds carries multiple rows on one prop (Arabic's three
possessive predications on udhr:right-to-work; the leave/return pairs in
ar/zh/sw), and a language that folds what English splits notes the fold
and simply lacks the prop (es folding no-deny-change-nationality under
one deprivation verb). A prop is language-unique only when its CONTENT is
unique to that rendering (zh no-distinction-kind and rights-violated and
no-attacks-honour and realization-through-effort and
order-realizes-rights; sw rights-set-forth and dignity-equal and
declaration-standard and nations-make-known; ar humanity-aspires).

SOURCE FINDINGS this pass caught, disclosed on the rows and never
repaired (R2): the Arabic file's Preamble is MISSING the
friendly-relations recital entirely (its bytes contain no ودية; the prop
has four languages); Arabic Article 29(3) drops the لا its own
negative-polarity idiom (بحال من الأحوال) requires — read under the only
grammatical parse, with all four siblings negating there as evidence;
Arabic Article 16's non-restriction list has two grounds where the
siblings have three; the Swahili file carries heading typos 'Kufungu cha
7.' and 'Kifungu ch 23.', body typos 'masarasa' and 'uchagazi', and
Article 25's 'wakati wa kazi' (time of work) where every sibling has
unemployment.

CONSTRUCTION SPLITS the full matrix now records systematically (each
mirror-disclosed in both directions via `alternate`): negative
EXISTENTIALS in ar/sw where en/es/zh negate a verb (no-distinction-status
ar; no-destructive-interpretation ar+sw — A4's NUL·Ground, twice);
MAKING-verbs in zh/sw where en/ar/es have holding/subjection verbs
(no-slavery, no-torture, no-arbitrary-arrest — INS vs CON, zh
consistently on the infliction side via 加以/使为); the FOUR-WAY nullum
crimen split (en/zh class-membership 'constitute'/构成, es indicative
property 'no fueron delictivos', ar deeming inside an unless-clause
يعتبر, sw contravention halikupinga); restriction worded as
negation-plus-exception in ar (لا…إلا, polarity −) vs an unnegated
restrictor elsewhere (only / 只有…才 / tu, polarity +) on
marriage-consent; DEFINITENESS MARKING driving copula rule 3
(family-unit-society: en/ar/es definite role → SIG·Figure, zh bare NP →
SIG·Pattern class-membership, sw mereological 'kiungo' → CON·Pattern);
Mandarin's 在于 identificational used twice (limitation-purpose,
education-directed) where siblings verb the aiming/securing; and the
matrix's cleanest five-way ALIGNMENT: compulsion (compelled / إرغام /
obligado / 迫使 / kulazimishwa — INS·Pattern − in all five,
no-compelled-association). The centroid cross-check
(centroid-check-RESULTS.md) covered the 117-row Preamble+Article-1 state
and is superseded in scope, not in conclusion; Goal 6's independent blind
adjudication remains the only validation that can settle ROSETTA-GOALS'
falsification condition, now over 651 rows.


**2026-08-31, third pass — the phasepost gap suite: 27/27, omnilingually.**
Ten tight windows joined the goldens (`hand-gap-suite.mjs`, 80 rows):
Genesis 1:1-8 and 2:1-3 (Hebrew, WLC — pointed text with cantillation;
every field string derived mechanically from the file's own bytes after
hand-typed combining-mark sequences failed byte-verification, the same
never-trust-the-transcription discipline as ever), Mark 1:14-15 and 16:6
(Koine Greek, SBLGNT — its critical sigla stay verbatim where they fall),
Quran 2:37 (Uthmani Arabic AND Pickthall English, sharing quran: props —
the cross-language join's fourth document family), and King Lear 1.1
(three windows) plus The Tempest 5.1 from the pg100 Complete Works.
Result, measured from the built tuples: **all 27 phasepost cells now
carry at least one primary attestation** (767 rows, 18 goldens, 7
languages: en ar es zh sw he grc), 22/27 in two or more languages. The
last four cells landed as: REC·Ground (Prospero's 'this rough magic I
here abjure' — a practice-field conceded), REC·Figure (Lear's 'Here I
disclaim all my paternal care', the tawba's فَتَابَ عَلَيْهِ / 'relented
toward him', and Genesis's וַיְבָרֶךְ — blessing as generated
interpretive standing, the promote-respect family's own cell-arithmetic),
SEG·Ground (Lear's 'divided In three our kingdom' beside Genesis's two
וַיַּבְדֵּל divisions), NUL·Figure (Lear's 'we Have no such daughter' —
A4 at figure grain, spoken over a daughter standing before him; Mark's
οὐκ ἔστιν ὧδε; Prospero's 'I'll drown my book'; Genesis's וַיִּשְׁבֹּת).
The five cells still attested in ONE language (all English) are the
disclosed omnilingual frontier: SEG·Figure, CON·Ground, EVA·Ground,
SYN·Pattern, REC·Ground.

THREE RULINGS the suite forced, all consequences of R11's assertion
wall: (1) a SITUATIONAL directive ('Give me the map there', Μὴ
ἐκθαμβεῖσθε, 'Therefore be gone') performs rather than asserts and FOLDS,
disclosed — distinct from a NORMATIVE deontic over a kind (the Swahili
usifanye / Greek μετανοεῖτε class), which asserts a norm and rows; (2) an
INTERROGATIVE ('Which of you shall we say doth love us most?') asserts
nothing and folds, disclosed; (3) QUOTED PROCLAMATION content rows with
`embedded: true` (the UDHR proclamation precedent — a performative
proclamation enacts its content), the report-frame rowed separately. The
clause table gained `temporal-adjunct`.

SOURCE FINDING, disclosed never repaired: the corpus's
`15-western-canon/folger-shakespeare/` directory is MISLABELED
throughout — every file is a Project Gutenberg text (not Folger) and the
filename↔content mapping is scrambled (Romeo_and_Juliet.txt holds King
Lear; The_Tempest.txt holds Othello; Much Ado, Shrew, Tempest and
Twelfth Night contents are absent while King John, Richard II, Henry
VI.3 and Comedy of Errors are present under other names). The suite
reads both plays from the canonical pg100 file instead.

**2026-08-31, fourth pass — the definition, stated once: a proposition is
a difference that makes a difference, at the triadic minimum.** User
direction, near-verbatim: a proposition should be a difference that makes
a difference — the triadic minimum of assertions. This was already the
engine's own vocabulary one register up (`nul/index.js`: "figure —
difference from its own ground; pattern — the difference that figure made
to the next ground... Bateson's: a difference that makes a difference");
this amendment applies it to what counts as an assertion AT ALL, so the
fold rules above read as instances of one principle rather than a
checklist.

THE DEFINITION. A proposition is the smallest assertion that actually
moves something: (1) a term with a prior state, (2) an operator that
moves or predicates something of it, (3) the state or ground the move
lands against — recoverable either as an explicit object or in the
predicate's own aspect and mood (Πεπλήρωται's perfect passive carries its
own before/after; `object: null` does not fail the test). Fewer than
three terms and nothing has moved: a name, a reference, a label — not a
proposition.

THE FOLD RULES ARE ITS INSTANCES. A heading (R10: subject null, object
null, a bare name — monadic, nothing moved; already declared "not a
proposition" by fiat, now by derivation). An intensional complement (A1:
the outer triad lands — a pledge now exists where none did; the inner
content names a state nothing has yet transformed). Presupposed material
(A2: zero delta against the given ground — restates, does not move). An
irrealis characterizing modifier (R11's mood rule: describes an unlanded,
contingent difference; the indicative sibling reports a landed one). A
situational directive or an interrogative (the gap-suite rulings:
performs or asks; reports nothing landed). One test decides all five:
does this relation land a transformation against a recoverable ground, or
does it only name, restate, or describe an unlanded possibility?

WHAT IT CHANGED THE DAY IT WAS STATED: the corpus's 2,208 machine EOT
sidecars were erased against it — their rows were extractor patterns, not
landed differences (live_priors POLICIES.md LP7 is the record, with the
udhr-eng specimen: five edges, every one the auxiliary "have", every one
INS·Figure, two subjects not referring phrases at all). Stating it forced
no golden-row revision (R12's ledgers stay empty this pass): R8-R11
already were this principle, stated piecewise — which is what the
derivation above verifies.

**2026-08-31, fifth pass — the omnilingual closure: every cell in at
least two languages.** The five cells the third pass left English-only
(SEG·Figure, CON·Ground, EVA·Ground, SYN·Pattern, REC·Ground) closed with
five new windows in Hebrew, Koine Greek, and Quranic Arabic — found by
the eo-lexical-analysis exemplar signatures used as a LEAD-GENERATOR only
(candidate passages located by signature; every row adjudicated fresh
under this rule, never inherited from a signature): mark-15-38 (the veil
torn — SEG·Figure in Greek, with quran-54-1's split moon giving the cell
a third language), quran-2-255 (Ayat al-Kursi, R8-complete at 11 rows —
the kursi encompassing the heavens and the earth, CON·Ground), gen-6
(Genesis 6:5-7 — the ambient wickedness seen, EVA·Ground; the Maker's
repenting, REC·Ground, narrated AND quoted first-person), quran-5-3 (the
din perfected, SYN·Pattern). Measured from the rebuilt tuples: 27/27
cells attested, EVERY cell in >=2 languages (the narrowest — CON·Ground,
INS·Ground, REC·Ground, SEG·Ground, SYN·Pattern — at exactly two).
Twenty-four rows, every field string derived mechanically from source
bytes by word index (the combining-mark lesson, held to; a mangled
regex character class caught live re-proved it — RTL bytes do not
survive retyping even inside a character class). A1 decided gen-6's
shape: the seen and the regretted stay inside their attitude verbs'
objects (the gen-1 saw-that-good precedent), so the window rows are the
acts; the quoted announcement's asserted clauses row per the
proclamation precedent, and the rhetorical interrogative of 2:255 folds
per the suite's own interrogative ruling.
