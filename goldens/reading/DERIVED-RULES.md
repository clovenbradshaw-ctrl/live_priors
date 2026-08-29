# Derived rules — what would get the pipeline to the goldens, worked backwards

*The deliverable of the hand-rolled golden pass (2026-08-29). These are
PROPOSALS derived from measured gaps, deliberately NOT written into any
POLICIES.md: policy records what was decided and built; this records what
the goldens prove would be needed. Adopting any DR below is its own pass,
with its own validation — changing the pipeline to score better against
these goldens without independent justification per change is the
calibration-on-the-fixture move both sibling repos forbid.*

## The evidence base, honestly sized

Four hand-adjudicated goldens under `RULE.md` (written first, exposure
disclosed there): **49 rows** across four registers — encyclopedic
biography (Kant, 10), literary narrative (Alice, 19), legal/declarative
(UDHR, 13), technical changelog (ripgrep, 7). Every row byte-addressed and
self-verified against the raw file. Adjudication is a single reader's; no
second adjudicator has passed over it, so no agreement statistic exists
yet — `agency-civic`'s own kappa discipline names what a certified version
would need. 8 of 49 rows (16%) carry a disclosed phasepost alternate.

Against them, the REAL pipeline (the corpus sweep's own recipe, POS gate
included) on the identical windows:

| specimen | golden rows | pipeline edges | genuine correspondences (by eye) | clean |
|---|---|---|---|---|
| kant | 10 | 4 | 1 | 1 |
| alice | 19 | 4 | ~4 | 0 |
| udhr | 13 | 5 | ~4 | 0 |
| ripgrep | 7 | 4 | ~3 | 0 |
| **total** | **49** | **17** | **~11 (22%)** | **1 (2%)** |

("Clean" = correct subject, relation, and object boundary. The one clean
match still strands its preposition: `argues → for transcendental
idealism`.) `diff-report.json` carries every row's classification; the
printout in the diff run is the hand-check.

## The frame: the three-part reasoning contract

Received directly, mid-build: *"we should be able to reason with anything
so long as we have properly encoded the transformation type and are
looking at the correct holonic level and are following legality rules."*
Every derived rule below serves one of those three requirements. The
striking measured fact: **the pipeline's gaps are overwhelmingly
requirement-2 failures (wrong holonic level) and requirement-1 absences
(no transformation type at all)** — requirement 3 (legality) cannot even
be exercised until 1 and 2 are met, which is itself a finding: legality
machinery already exists (the reaction substrate, checkCubeProgression,
the veto), starved of legally-encoded input.

---

## I. Encoding the transformation type

**DR1 — the phasepost overlay: a closed verb→act vocabulary with a named
giver.** 49/49 golden rows carry `{op, grain}`; 0/49 pipeline edges can.
Free-text verbs admit no composition rules; the 27 phaseposts are the
closed vocabulary a chemistry can be declared over once (the reaction
substrate's own GIVEN-affordance requirement). Measured from the goldens,
the assignment splits cleanly in two:

- **~31% (15/49) mechanical, no lexicon needed**: the copula rules
  (RULE.md Part II — predicate shape decides: kind→SIG·Pattern,
  role→SIG·Figure, property→SIG·Figure, place→SIG·Ground), A4
  (existential-negative → NUL), A5 (translocation → SIG), A6 (revision →
  SYN, the project's own build-log precedent). These are decision trees
  over structure already visible to the extractor.
- **~69% (34/49) lexical**: needs a received verb→act table with a named
  giver — the exact shape `POSPrior@1` already has for POS. Candidate
  givers exist (VerbNet/Levin verb classes, CC-BY, real linguistic
  scholarship on exactly this question: what KIND of act a verb performs);
  building `ActPrior@1` from one is the same one-curl-one-script move
  `build-pos-prior.mjs` already proved. Unattested verbs land a typed gap,
  never a guess — the POS gate's own "a witness cannot refuse what it
  never saw," applied to acts.

**DR2 — polarity and modality are fields, never phasepost movers.**
Polarity already exists in the pipeline (R6 confirmed compatible). Deontic
/epistemic modality (UDHR's "should act", "should be protected") has no
field today — A3 requires one. Cost: one field, read off received modal
closed classes (a `priors.js`-register entry, giver lang/en).

**DR3 — undecidable acts stay disclosed.** 16% of golden rows genuinely
carry an alternate. The overlay must carry `alternate`, not collapse it —
P56's asymmetric discipline (refusable, never confirmable) applied to
acts. A reasoning step that needs ONE act treats an alternate-bearing edge
as contested, not as its primary.

## II. Looking at the correct holonic level

This is where the pipeline loses most of its 38 missed/garbled rows, and
every sub-cause is a wrong-holon error — grabbing a sub-part or a
super-part of the participant the assertion is actually about:

**DR4 — subjects are whole NPs, not 2-token windows.** The single largest
measured lever. `extractRelations`'s subject capture is at most 2 tokens;
golden subjects average ~7 tokens (UDHR ~12). Measured consequences:
"disregard and contempt for human rights" → pipeline "human rights" — a
DIFFERENT claim (the golden asserts contempt causes barbarism; the
pipeline asserts human rights do); "the peoples of the United Nations" →
"United Nations"; "So she" as a subject. A sub-holon subject is not a
lower-fidelity reading of the same fact — it is a different fact, often a
false one. Rule: left-expand the subject to its NP boundary (determiner/
possessive/coordination), admit clausal subjects ("that human rights
should be protected…is essential" — 2 golden rows, both missed) as units,
handle extraposition ("it is essential to X" → subject = "to X").

**DR5 — predicates are phrasal.** "is considered", "is centered on",
"drew a parallel to", "took out of", "have pledged themselves to
achieve", "was just in time to see" — the extractor matches single
tokens, so multi-word predicates either miss entirely or truncate the
object at the predicate's own remainder ("pledged themselves to achieve"
lost its whole infinitive complement). Rule: the relation slot holds the
full predicate expression (aux + verb + particles/light-verb complements),
with the HEAD identified for the act lexicon.

**DR6 — the embedded-assertion layer.** 7/49 golden rows are embedded
(appositives, parentheticals, fronted participials); 0/7 extracted.
"(born Emanuel Kant; 22 April 1724 – 12 February 1804)" is a real INS
assertion the pipeline structurally cannot see. Rule: appositive/
parenthetical/participial detection with matrix-subject inheritance,
marked `embedded: true` — a different holonic level of the SAME sentence,
never flattened into the matrix assertion and never dropped.

**DR7 — pronoun and topic resolution at reading time.** Golden resolves
12 rows via pronouns or shared coordinated subjects; the pipeline
resolved none in these windows (its `resolvePronounSubjects` exists but
is gated on third-singular + recurrence floors that these windows'
openings defeat). Two cheap resolution priors the goldens actually used:
the document's own declared topic (a biography's subject — Kant's
article title; `declaredIdentity` already reads Gutenberg headers, the
same move one register over) and coordinated-VP subject sharing ("looked
at it, and then hurried on" — 2 missed rows in one sentence).

**DR8 — register is a declared prior, not a guess.** The ripgrep specimen
is the cleanest demonstration in the whole diff: every one of its 4
pipeline edges has a line-initial imperative verb read as a NAME
("Improves —directory→…", "Fix —gitignore→…", "Don't —check→…") — L2's
own law (capitalisation is a differentiator, never the primary signal)
violated by the anchor step in a register where line-initial capitals are
verbs. The corpus already DECLARES register by directory
(09-source-code, 06-government-legal, 01-literature-books…). Rule: a
register prior per declared corpus kind — changelog/imperative registers
veto line-initial known-verbs as surfaces and resolve subjectless bullets
to the document's own declared actor (the bracketed change label, the
tool itself) — declared, giver-named (the corpus's own manifest), never
inferred per file.

**DR9 — intransitives are legal.** "hurried on", "Release notes have not
yet been written" — no object exists, and the extractor requires one, so
the assertion is unrepresentable. Rule: null object recorded honestly
(the golden's own shape).

**DR10 — furniture at the wiki shape.** Kant's 2 false edges are infobox
caption/wikilink-glue debris ("Signature —written→ in ink…",
"Political —philosophypolitical→ theory"), and the one Kant "match" the
scorer found was the garbled wikilink-glue edge ("Copernican
RevolutionMetaphorical —usagecopernican→ …"). `blankFurniture` exists for
succession boxes; the infobox-fragment/ref-bracket/glued-wikilink classes
need the same treatment. And one wall, not a blanker: a RESTRICTIVE
relative is not an assertion ("her sister was reading" extracted as an
independent edge from "the book her sister was reading" — R1's own
restrictive rule, violated).

## III. Following legality rules

The goldens cannot measure these directly (they judge encoding, not
inference), but they make the requirements concrete:

**DR11 — chemistry is declared per phasepost PAIR, not per relation.**
P60's chemistry was per-relation (`replaces:<office>`), which cannot
scale past hand-declared domains. With DR1's closed vocabulary the
declaration space is at most 27×27 cell pairs, mostly empty — one
GIVEN-affordance table, giver-named, reusable over ANY material that
encodes acts. This is exactly what "we should be able to reason with
anything" requires and what free-text verbs structurally forbid.

**DR12 — production order is already enforced; feed it.**
`checkCubeProgression` exists and is silent on legal chains. A reading
log whose entries carry real phaseposts becomes checkable against it for
free — no new mechanism, one more consumer.

**DR13 — grain crossings need their own licence.** A Pattern-grain law
("All human beings are born free" — INS·Pattern) composes with a
Figure-grain fact only through a declared instantiation affordance, never
silently — the occurrence-vs-entity lesson (P60's fourth amendment: a
uniqueness violation at entity grain is evidence the grain is too coarse)
generalized to all three grains. The goldens carry the grain
distinctions (32 Figure, 9 Ground, 8 Pattern rows — and all nine
operators attested at least once: SIG 16, INS 7, EVA 7, CON 7, SYN 5,
DEF 4, NUL 1, SEG 1, REC 1) that make this checkable at all. The
long-tail operators are real specimens, not padding: the one NUL is
Alice's "There was nothing so very remarkable in that" (A4), the one SEG
is the Rabbit taking the watch OUT OF its pocket, the one REC is the
UDHR's "have REaffirmed their faith" — each found in the material, none
planted.

**DR14 — evidence vetoes, never licenses.** Carried over from P60
unchanged; nothing in the goldens disturbs it.

## Priority, measured not guessed

By gap count in the diff: DR4+DR5 (whole-NP subjects, phrasal predicates)
account for the majority of the 34 misses and most garbles; DR8 accounts
for 100% of the ripgrep register's failures; DR10 for all false edges;
DR6 for the 7 embedded rows; DR1 for the universal no-phasepost. A pass
that landed only DR4+DR5 would move recall more than everything else
combined — and DR1 is the only one that unlocks requirement 3 at all.

## What this pass deliberately did not do

Touch the live pipeline (the scope decision made at the start, honored);
write any DR into a POLICIES.md (proposals are not law); run a second
adjudicator (named, with kappa, as what certification needs); build
`ActPrior@1` (a giver candidate is named, the build is its own pass).
