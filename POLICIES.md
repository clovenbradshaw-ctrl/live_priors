# live_priors — standing policies

Standing decisions about **this corpus and the readings taken of it**, each
with the evidence that established it. Entries are numbered `LP<n>` — a
distinct prefix on purpose, so a cross-repo citation is never ambiguous
against the-fold's `P<n>` or eoreader7's `S<n>`.

The discipline is the one the sibling repos already hold: **amendments
append, they do not rewrite.** A later pass that changes a decision adds a
dated amendment under the entry it changes and leaves the original standing
as the record of what was decided and why. A number is never reused and an
entry is never deleted.

Where this file and a sibling disagree: eoreader7's `READING-SPEC.md`
governs how the engine's organs read; the-fold's `POLICIES.md` governs the
workbench that consumes them; this file governs **what a corpus owes a
reading, and what a reading owes a corpus.** On the mechanics of any organ
named here, the sibling wins.

---

## LP1 — The source is the Torah: immutable, native, and never replaced by a reading

This repository's own description is *"Living corpus of source texts."* The
source texts **are** the product. Everything else here — manifests, derived
priors, readings — is apparatus around them.

**The rule.** A source is kept in the format it was received in. No reading,
index, digest, or derived artifact may edit a source, normalise it in place,
re-encode it, reorder it, or stand in for it when a consumer asks for the
document. A source changes only when it is re-fetched or corrected **as a
source** — never to make a reading of it come out better.

**Why it is stated rather than assumed.** The pressure to violate it is real
and specific: readings are easier to take against normalised text. The digest
driver already normalises line endings, strips Gutenberg containers, and
drops catalogue boilerplate before reading — and every one of those is
correct **as a transform applied on the way to a reading**, and would be a
corpus-integrity failure if written back to the file. The corpus keeps the
CRLFs, the licence headers and the Archive.org favourites tags, because they
are what was received.

**Already true, pinned here so it stays true.** `/api/priors/doc`
(the-fold's `explore-server.mjs:1354`) reads the file off disk and serves its
bytes. It consults no reading and no index. That is the correct shape and
LP4 makes it a rule rather than an accident.

**The corollary that has already cost something.** If a source is what was
received, then what a path *claims* about a source is not evidence about it.
All 20 of 20 files in `11-multi-language/gutenberg-non-en/` disagree with
their own filenames — wrong book, wrong author, often wrong language
(`digested/CORPUS-INTEGRITY-FINDING.md`). The organ that caught it,
`declaredIdentity`, works by reading the file's own declared header instead
of trusting its name. **A label is not a source, and the corpus is the
bytes.**

---

## LP2 — A reading is Talmud: commentary, anchored, attributed, append-only

A reading is not a summary of a source, a cache of it, or a substitute for
it. It is **a record of an encounter with it by a named reader** — and it
relates to the source the way commentary relates to a fixed text: it
accumulates, it never overwrites, and every layer can be traced to both a
locus in the source and the reader who produced it.

**What keeps commentary from becoming sprawl is not a size limit.** It is
two properties, and they are the two this corpus's readings must hold:

1. **Anchored** — every increment carries a span that verifies against real
   bytes. An increment that cannot produce a verifying address has nothing
   to attach to and does not land.
2. **Attributed** — every increment names the reader that produced it, so
   two readers disagreeing about the same locus both survive, distinguishable,
   the way Rashi and Tosafot sit on one page without collapsing into each
   other.

Two further properties follow from those:

3. **Append-only** — re-reading a source under a changed recipe appends;
   it never replaces. `hyperlexicon.js::hear` already implements exactly
   this: first sighting is `PROPOSE`, a later sighting of the same assertion
   is `SUPERSEDE`, and its own comment (line 128) states the invariant —
   *"Witnesses and spans UNION, never replace: a merge that overwrote them"*
   would lose precisely what makes the record worth keeping. Two readings
   agreeing become one note with two witnesses, not two notes.
4. **Defeasible** — a reading records what a reader heard, never a property
   of the source. A reading may be wrong about a source without the source
   changing at all.

**How much should a reading grow? It is not a size question.** The bound is
a gate, not a cap:

> An increment may land if and only if it (a) resolves against real bytes and
> (b) names the recipe that produced it. A pass that produces increments
> satisfying neither has begun commenting on the commentary, and has nothing
> to append.

Growth is therefore bounded by *the source's own extent × the number of
distinct recipes ever run against it*, and it is self-limiting in the way
that matters: **a recipe that hears nothing appends nothing.** The measured
case is already on record — `classical-music-catalog` yields zero edges
against 33 sentences, because its fifteen items each name a distinct artist
once and nothing recurs. That reading is one line long and correct.

**A refuted reading is conceded, never deleted.** The vocabulary exists:
`RETRACT` in the task log, and `concedeEvaluation`/REC for "this ground is
conceded." A bad pass goes on the record as refuted, in the same way the
Talmud preserves a rejected opinion rather than erasing it. The record of
having been wrong is part of what the record is for.

**Consequence, stated plainly:** the reading is not a cache. A cache is
regenerated when the code changes; a record is appended to. Today's digest
is *written* like a cache (`eot-digest.mjs:234` creates a fresh log per run;
`:356` overwrites the file) and *typed* like a record. That inconsistency is
real and unresolved — see LP5 for the prerequisite that must land first.

---

## LP3 — An address is only an address if it resolves in the source's own coordinates — and today's readings do not

**Measured, not argued.** Take the first span of the Gutenberg specimen in
`digested/`. Its address is `gutenberg-non-en/de-path/pg67098#196-256`:

| resolves against | result |
|---|---|
| the excerpt carried **inside the digest** | ✅ |
| the source file at the same offsets | ❌ |
| the source file corrected by the recorded `bodyOffset` | ❌ |

The span's true offset in the source file is **1165**; the address records
**196**. The recorded correction does not reconcile it —
`bodyOffset (952) + CRLF pairs before that point (42) = 994`, against an
actual drift of **969**.

**Why.** `excerptOf` applies three transforms before anything is addressed:
`stripContainer` (offset recorded), `stripCatalogBoilerplate` (recorded only
as a total character count, not as positions), and `normaliseNewlines`
(**length-changing and not recorded at all** — 3,654 CRLF pairs in this one
file). The composition is not invertible from what is written down.

**So the addresses live in a coordinate space that exists nowhere except
inside the reading itself.** Three consequences follow, and the second is the
one that matters:

1. The embedded `excerpt` is **load-bearing, not decorative.** Remove it to
   make the reading "pure commentary" and every address becomes
   unresolvable. The question of whether the Torah should live inside the
   Talmud is not currently a matter of taste.
2. **"The reading links through to the source" is aspirational, not true.**
   A reading that cannot point at the text it comments on is not commentary
   on that text; it is commentary on a private copy of a fragment of it.
   This is the same failure class as the CRLF bug that
   `spanSelfVerification` caught while this digest was built — two different
   strings, one set of offsets — one level up.
3. A reading whose addresses do not resolve in the source cannot be used to
   accelerate anything (LP4), because nothing it points at can be checked.

**The rule.** A reading must address the source's own coordinates. Two
honest ways to satisfy it, and the second is probably right:

- **Address the raw bytes.** Take the reading against the source as received
  and let the organs cope with container text and line endings. Simple, and
  it costs reading quality.
- **Name the derived text as a recension.** If a transform is applied, the
  transformed text is a *thing in its own right* — content-address it, give
  it an identity, record its derivation, and let the reading address **the
  recension**, while the recension names the source it derives from. That is
  precisely what a critical edition does, and it is honest in a way that an
  unrecorded normalisation is not: the commentary attaches to a named
  recension of the text, and the recension attaches to the text.

**Until one of those lands:** the excerpt stays embedded, and a reading must
not claim to point at the source file. Naming a limit is cheap; a reading
that silently misaddresses is the expensive kind of wrong.

---

## LP4 — What may and may not be hardcoded into the priors app

The question this entry settles: should readings be baked into the priors
app as data it depends on? **The answer is not binary, and the line that
matters is not "committed vs. computed" — it is `offered` vs. `substituted`
vs. `gated on`.**

### The case for, taken seriously

The priors app's own code already names this as the open problem.
`/api/priors/check`'s header (`explore-server.mjs:1408`) records the measured
cost against a corpus it puts at 2,047 documents and 183.4MB: listing is
~20ms warm and reading every byte ~1.1s, but *the sentence walk over the
whole corpus is ~9s per claim — not an interactive check.* So the check
consults only a mechanically ranked candidate slice, and the header says
outright what would fix it:

> A PROPER index would be [engine] host ingestion … at the engine's measured
> 8.4s per 3.3MB, admitting 183MB is a minutes-long one-time build **whose
> persistence and staleness story this server does not own** — named future
> work, not half-built here.

That blocker is **staleness**, and LP2 dissolves it. If readings are
append-only, anchored and attributed, a reading taken under an older recipe
is not stale — it is *older*, and it is still a true record of what that
reader heard. Nothing has to be invalidated when the organs change; a new
layer is added. **A Talmudic reading is the persistence story that a
regenerated index cannot have.**

### The case against, also measured

Of the fourteen sources read into `digested/`, **six carry little or
nothing**: `classical-music-catalog` 0 edges, Greek 1, Hebrew 2,
`grateful-dead-catalog` 2, Korean 3, Farsi 8. Three of those are worse than
empty — the "content" is English caption debris. The six Hebrew surfaces
were `School`, `Athens`, `Raffaello`, `Internet`: an image caption, never
the article.

Had those readings been hardcoded as what the app knows about those
documents, the app would have advertised *School, Athens, Raffaello,
Internet* as the subject of a Hebrew philosophy article — small, plausible,
and wholly false. That is the exact failure `scriptCoverage` (eoreader7 S24)
now types as a gap, and it is the reason a reading may never be the thing
the app trusts.

### The rules

**MAY** — a reading may be *offered* beside a source, typed as a reading,
with its recipe named. A reader who wants to know what an organ heard is
entitled to see it, labelled as a claim by that organ.

**MAY** — a reading may be used as an **index or accelerator**: to rank
candidates, to narrow a walk, to answer "which documents are worth opening."
Conditional on one thing — **any result reached through a reading is
re-verified against source bytes before it is asserted.** A reading may
decide where to look. It may never decide what is true.

**MAY NOT** — a reading may never be **served in place of source bytes.**
`/api/priors/doc` serves the file. A consumer asking for a document gets the
document.

**MAY NOT** — a reading may never **gate** what the corpus offers. Whether a
document is listed, toggleable, attachable or consultable must not depend on
whether a reading of it exists or on what that reading found.

> **A document with no reading is not a document with nothing in it.**

This is the-fold's own constitutional statement about checking organs
(*"a checking organ may say 'I have nothing to compare this against'
(withhold), or 'I compared it and it failed' (convict). It may never
manufacture the second out of the first"*), applied one level out: **absence
of a reading is a fact about the reader, never about the document.** The
Hebrew article is not empty. The reader is blind to it, and now says so.

**MUST** — a reading carries its recipe or it is unusable as evidence. See
LP5.

**MUST** — a reading's own gaps travel with it. A digest that reports
`edgesFound: 2` without the `script_mostly_without_case` gap beside it is a
number that lies by omission; the gap is not an annotation on the reading,
it is part of it.

### What this leaves open, deliberately

Whether to pre-digest the **whole** corpus rather than a sample is not
decided here, and should not be until LP3 and LP5 land — a 2,047-document
append-only reading store whose addresses do not resolve and whose passes
are not attributable would be a large artifact that cannot be checked, which
is worse than not having one. The order of work is: **coordinates, then
recipe identity, then scale.**

---

## LP5 — Recipe identity is the missing primitive, and the prerequisite for append-only

Today a reading is admitted with `admit(log, edges, { witness: spec.slug })`
— the witness names **what was read**, never **who read it**. Every digest
already carries an `organs` block naming which organs ran, which priors were
injected, and which were deliberately omitted. **That block is the recipe.**

**The rule.** Content-address the recipe and make the witness
`slug@recipe`. Then:

- two passes under different organs are distinguishable increments on one
  log rather than an unattributable pile;
- witness-unioning (LP2, already implemented) yields **cross-recipe
  corroboration for free** — "two independent recipes both heard this" is
  the strongest signal this apparatus can produce, and today it is discarded
  on every re-run;
- a reading can be read *as evidence about the organs*, not only about the
  source. That is not hypothetical: this digest's own first run found a real
  CRLF offset bug in its driver, and it found it because a reading had been
  committed and checked.

**Ordering, stated as a rule because getting it wrong is expensive:** do not
make the digest append-only until recipes are identified. Append-only
without attribution produces a log whose increments cannot be told apart —
strictly worse than today's honest overwrite, because it *looks* like an
accumulating record while being an unreadable one.

---

## LP6 — A recipe defect is not new material: append-only cannot self-correct one, and must not be asked to

LP2 states the standing law: a reading accumulates, a recipe that hears
nothing appends nothing, a refuted reading is conceded (REC), never
deleted. This entry names the one case that law does not, by itself,
cover: **when the RECIPE itself was wrong** — not a source revised, not a
new organ widening what is heard, but the same organs mis-admitting facts
they should never have admitted in the first place.

**What happened, concretely.** `eot-digest.mjs`'s recipe called
`hypergraph.js::makeRelationReader` without its own `posPriorFor`
accessor — an already-built, already-tested TYPE-level gate
(`relations.js::discoverRelationVocab`'s `posPrior` param: a candidate
verb is admitted only if VERB+AUX account for more than half its
attested uses in the real UD_English-EWT treebank; an unattested form is
never refused, only a form the treebank clearly says is NOT a verb). An
earlier pass here loaded the fixture only for `classifyConnector`
(the-fold's grammar-lens.js, correctly kept disclosure-only per P56's
own asymmetric rule — a settled part of speech is refusable, never
confirmable) and, in doing so, never separately considered this coarser,
safer mechanism — conflating two different gates and declining both.

Measured on real corpus files before this was found: **80-99% of
extracted "relation verbs" were prepositions, conjunctions, articles, or
pronouns** — `of`, `the`, `by`, `with`, `in`, `that`, `this`, `how`,
`what`, among others — because `discoverRelationVocab`'s own
slot-anchoring (the token immediately following a recurring surface) has
no notion of grammatical category on its own. Wiring `posPriorFor` closes
this at the source: on Shakespeare, the Iliad and Alice's Adventures in
Wonderland (three real Gutenberg excerpts), gated edges fell from
90/65/97 to 22/25/34 while every surviving verb on Alice
(`was, started, had, think, fallen, got, began, opened`) is genuine — see
`POS-VOCABULARY-GATE-VALIDATION.md` for the full 10-specimen diverse
validation this fix was checked against before the corpus was re-swept,
including two real, disclosed limits the gate does NOT close (non-English
text passes through entirely ungated; an uncommon ENGLISH noun absent
from the treebank's own ~16,654-word vocabulary passes through exactly
the same way a foreign word does — both are `posStanding: "gap"`, never
a refusal, by the gate's own conservative design).

**The problem this created for LP2's own append-only rule.** The corpus
had already been swept once (task #8, before this fix), and every one of
those readings is keyed by `witness = slug@recipe` where `recipe` did not
yet include the gate. Because the source bytes never changed,
`eot-sidecar.mjs`'s own reuse rule (`existing.source.sha256 === hash` →
reuse the existing log, only append) means an ORDINARY re-run under the
new, corrected recipe would have kept every stale false-verb admission
from the old recipe forever, merely ADDING the newly-gated facts beside
them — confirmed live: Alice's own sidecar, re-swept with the gate
wired in, still carried `"to"` as an admitted relation verb from the
prior sweep, even though the gate correctly excluded `"to"` from the
FRESH vocabulary computed on that same read (`verbShare` for `"to"` in
the real treebank: 0.0002).

**The rule, stated generally.** LP2's append-only discipline governs
what a reading learns about a STABLE source under a STABLE or WIDENING
recipe. It was never a promise that an admission made under a recipe
later found to mis-admit facts stays admitted forever — that would make
correctness debt permanent by construction. **A recipe correction is not
new material layered onto old material; it is a claim that the old
material's own admissions were wrong**, and the honest response is the
same one LP2 already names for a refuted reading: concession, not
silent accumulation.

**What shipped, since no per-edge REC-driving mechanism exists yet at
corpus scale (HL/void-loop tooling that could adjudicate 2,207 files'
worth of individual admissions is real, unbuilt future work — see the
27-cells reference in the-fold's own CLAUDE.md for where that capability
would live).** `readSidecar`/`processFile` gained an explicit, named
`fresh` option (CLI: `--fresh`) that skips reading the existing sidecar
entirely rather than reusing its log — a deliberate, disclosed,
one-time corpus-wide re-read, treating the WHOLE prior sweep as
conceded because the recipe itself was the defect, never the routine
mode. This is not a bulk deletion: each source's sidecar is regenerated
file-by-file, under its own real bytes, self-verified exactly as before
(P5.2 at the door, unchanged) — the file that lands is a genuinely fresh
reading, not a patched one.

**What this does NOT license.** `--fresh` is not a general-purpose reset
button. Reaching for it again requires the same standing this pass
met: a demonstrated recipe-level correctness defect (not merely a wider
recipe, which append-only already handles correctly), validated on a
deliberately diverse sample before the corpus-wide re-read, with the
validation itself committed as a record (this repo's own standing
practice — `eot-sidecar-sweep-RESULTS.md`, `eot-legal-text-anomaly-NOTE.md`,
and now `POS-VOCABULARY-GATE-VALIDATION.md` all exist for exactly this
reason: a reader should never have to trust a claim about corpus quality
without the evidence that produced it).

---

## LP7 — There is no reading from nowhere: the sidecars erased, and the bar any successor must clear

**Two user directions, one entry (2026-08-31).** First: "erase all our eot
sidecars since they don't align to this" — "this" being the proposition
bar stated the same day in `goldens/reading/RULE.md`'s fourth amendment:
a proposition is a difference that makes a difference, the TRIADIC
MINIMUM of assertions (a term, an operator, and the state or ground the
move lands against; fewer than three and nothing has moved). Second, the
forward half: "there is no reading from nowhere — any reading needs to
leverage declared priors and have things like surprise etc."

**What was erased, and why it failed the bar.** All 2,208 `*.eot.json`
sidecars, corpus-wide, in one commit. The specimen that decided it,
examined row by row the same day: `06-government-legal/un-udhr/
udhr-eng.txt.eot.json` read 73 sentences of the English UDHR and emitted
five edges — every one the auxiliary "have" glued to its neighbours,
every one stamped INS·Figure, two subjects ("compelled to", "women and")
not referring phrases at all, two edges sharing one byte span. Those
rows are extractor patterns, not propositions: no row names a
transformation landed against a ground, so under the triadic minimum the
sidecars asserted nothing — while LOOKING like readings, which is worse
than absence. LP4's own line — "a document with no reading is not a
document with nothing in it" — cuts both ways: an absent sidecar claims
nothing, where a wrong one claimed plenty.

The erasure is a `git rm`: history keeps every byte (the event stream is
the reality, the working tree the projection — store.js's frame, already
this repo's own R12), and the projection now honestly shows no reading
where none worth the name exists.

**What stays, condemned or cleared by name.** The generator
(`scripts/eot-sidecar.mjs`) and its tooling (eot-digest,
eot-coverage-summary, eot-sidecar-sample, the sweep RESULTS docs, and
`goldens/reading/MINED-PATTERNS.md`) remain in the tree as the record of
the generation that was tried — the-fold's succession.js precedent:
condemned, present, disclosed; it must not run again until the bar below
is met. The apparatus it built is NOT condemned: recipe identity (LP5),
S26 raw-coordinate spans, the typed admission gate all held (the specimen
self-verified 5/5 and turned nothing away) — what failed is what walked
through them. A gate can only refuse what its reader flags; the reader
had no ground to flag against.

**The law: no reading from nowhere.** A reading enters this corpus only
when all three hold:

1. **Its rows meet the proposition bar.** RULE.md's triadic minimum;
   `goldens/reading/` is the target grammar and the scorer.
2. **Its declared priors are its GROUND, not merely its filter.** The
   erased recipes NAMED priors with givers (determiners, negation, the
   POS vocabulary gate) but used them only to filter candidate verbs.
   Leveraging a prior means reading WITH the expectation the prior
   supplies — the reader can say what it expected before it says what it
   found. A recipe that names priors it does not expect with is
   provenance for a reading from nowhere.
3. **Difference is measured, not assumed: surprise runs.** A reader that
   cannot say what it expected cannot say what differed — and a
   proposition IS a difference. The organs exist and are named, not
   aspirational: eoreader7's `emergence/surprise.js` (Shannon novelty and
   Bayesian surprise, kept apart, provably identical only at full
   commitment), the tier-stack meters the-fold already wires
   (reflex.js/aperture.js — declared window, gamma, draws, seed, givers
   named). What a row's difference moved against belongs on the row.

**What this entry does not decide:** the successor reader's design —
whether the goldens seed its expectations, whether surprise gates
admission or only rides rows, what a prior-expectation concretely is at
corpus scale. Those are the next pass's to measure, not this entry's to
guess.

**Amended 2026-08-31, same day — surprise is hypergraph delta, never
n-gram frequency.** User direction, verbatim: "things are surprising to
the extent they change our hypergraph, not ngram frequency." This
sharpens clause 3 above from "surprise runs" to WHAT surprise is: the
ground a reading measures difference against is the accumulated
hypergraph — propositions, referents, cells, polarities, standings — and
an increment's surprise is the TYPED CHANGE it makes to that graph: a new
proposition founded, a witness added to a standing one (near-zero
surprise — LP2's union, two readings agreeing become one note), a cell or
polarity variant landed on an existing proposition, an expected
proposition found ABSENT, a language-unique proposition added, a
departure from the declared frame or act expectation. Token-frequency
novelty (FoldReadingPrior@1's Witten-Bell mixture, Shannon surprisal over
forms) is NOT this measure: it may still rank candidates — LP4's
accelerator posture, decide where to look, never what is true — but a
reading's surprise field carries graph deltas, each one typed and
witnessed, never a perplexity score. This closes the loop with RULE.md's
fourth amendment: a proposition is a difference that makes a difference
(admission asks "did anything land"); surprise is how much difference it
made (what the landing changed) — Bateson's own second clause, "the
difference that figure made to the NEXT ground," read as the definition
of the measurement. The kernel already carries the right vocabulary:
`expectations.js` (open/fulfilled/violated/reframed — EVA transitions,
REC on reframe) is the per-expectation form of the same law.

**Amended 2026-08-31 (second, same day) — priors are checkpoints, never
weights.** User direction, near-verbatim: build a universe of meaning
where as much as possible lives LIVE, not as permanent weights — but with
a bootstrap/checkpoint to start from. The rule: the reality is always the
event stream — the source bytes (LP1), the hand goldens with their
append-only revisions (R12), the readings' own appended logs (LP2) — and
every compiled prior (ReadingPriors@1, ActPrior@1, POSPrior@1) is a
PROJECTION of those live sources at a named moment: content-addressed,
carrying its regeneration path (build script + input shas + repo commit),
superseded by RECOMPILING from the live sources, never by editing the
artifact. No figure in a checkpoint is a permanent weight: a later ring's
readings extend the graph, the goldens revise by append, and the next
checkpoint is a fresh projection (v1, v2, … — versions of a projection,
not editions of a truth). A consumer that treats a checkpoint as truth
rather than as "where the live record stood when I started" has rebuilt
the cache LP2 forbids, one level up. store.js's own law, applied to
priors: the log is truth, projection is convenience — and a bootstrap is
just the first projection.

---

## LP8 — A sidecar is never done: layered readings, adversarial priors, and the fold

**User direction (2026-08-31, near-verbatim):** as we spiral out, assess
whether the sidecars contain what is meaningful about READING; hold alt
versions as ADVERSARIAL PRIORS, built on other genuinely decent
hypotheses about minimizing hypergraphical surprise; amend earlier
sidecars via APPENDS so their folds improve; **no sidecar ever needs to
be "done."**

**The shape.** A sidecar carries `layers`: an append-only ledger of
reading passes, each under a NAMED HYPOTHESIS with its own recipe —
layer 0 the favored reading, later layers adversarial priors: competing
expectation structures scored against the same rows. The `fold` is the
projection across layers (per-hypothesis surprise rates, the current
ranking) — recomputed on every append, never hand-edited. Appending a
layer is the only way a sidecar changes meaning; deleting or rewriting
one is forbidden (LP2's discipline, one level up). Because ring-0
sidecars are themselves projections of the live goldens (LP7's
checkpoint law), the append-only reality is the LAYER-RECIPE LEDGER in
the generator plus the goldens' own R12 revisions; the file is their
fold, regenerated deterministically — adding a hypothesis appends to the
ledger, never edits a prior entry.

**Adversarial priors are hypotheses about what minimizes hypergraph
surprise, ranked by MEASUREMENT, never by preference.** The first four,
measured the day this entry landed — each language's adjudicated cells
predicted from what the languages before it know (Goal 6's one-reader
caveat rides every figure):

| hypothesis | knows | ar | es | zh | sw |
|---|---|---|---|---|---|
| frame | the family modal cell alone | 49% | 48% | 49% | 50% |
| structural | (role x clause x polarity) -> modal, no lexicon, no join | 66% | 65% | 58% | 59% |
| cell-transfer | the Rosetta prop join: prior languages' cells | 93% | 99% | 90% | 92% |
| **grain-transfer** | the prop join, GRAIN only | **100%** | **100%** | **97%** | **100%** |

**The finding this bought immediately:** the GRAIN is the near-invariant
axis of translation; the OP carries the construction. On the 23
construction-splits — exactly where the op varies — grain survives
20/23, and each of the three grain-breaks has a documented adjudication
reason (family-unit-society: the rule-3 definiteness split;
education-directed; limitation-purpose). Consequence for every future
ring: an op-level variant is ordinary translation information; a GRAIN
break against the join is rare enough to be an alarm, in a way an op
variant never is.

**What this does not decide:** whether grain-transfer's win survives
independent adjudication (Goal 6); which hypotheses join the ledger next
(named candidate: the mechanical copula/A4/A5 ladder proper, which needs
predicate-shape fields the rows do not yet carry).

---

## LP9 — Metacognition on the spiral: testing before trusting, and where surprise actually lived

**User direction (2026-08-31), near-verbatim:** use what this project has
learned to spiral out and create sidecars for more files in this corpus;
exercise metacognition on the process itself, adjusting it and drawing
real lessons about reducing surprise; do it "as Friston possessed by
Vivekananda."

**The two teachers, named once, translated into this project's own
vocabulary rather than invoked as decoration.** Friston's active
inference: a generative model is not asserted, it is tested against
evidence before it is trusted with precision — a model given full
confidence before it has met data is exactly the failure LP7 diagnosed
in the erased sidecars, and the right response to a risky, informative
policy is to run it at the smallest reversible scale first, not to avoid
it or to commit to it blind. Vivekananda's practical Vedanta: work done
as its own end, without attachment to whether the fruit is flattering
(the mechanical ladder's first run scored 74.6%, with one tier at 8.3% —
published here exactly as measured, not quietly improved before anyone
saw the bad number); and the discipline this project had ALREADY
rediscovered on its own before either name was invoked — LP4's own
sentence, "a document with no reading is not a document with nothing in
it... the reader is blind to it, and now says so," is viveka (discrimination
between the veil one's own instrument casts and the thing itself) in
this project's native register. Both ideas earned their place by
predicting what actually happened in this pass, not by being asserted
over it.

**What was tested before anything was trusted.** Two checks, both run
BEFORE building anything, both answerable from records already on disk:

1. *Is the raw extractor ready for ring 2?* DERIVED-RULES.md already
   answers this (10 golden Kant rows, 4 pipeline edges, 1 genuine
   correspondence, 1 clean match) — re-run, not re-derived, to confirm
   nothing had changed. It had not. Conclusion held without spending a
   single token reproducing the failure LP7 exists to prevent: no raw
   mechanical extraction on new files this pass, named as the boundary
   ring 3 must clear first (DR4/DR5, in the-fold's own extractor, not
   fixable from this repo).
2. *Does a structural detector, built from general principles and never
   shown this specific file's answer, land where a hand adjudicator
   independently did?* `scripts/spiral-ring2-wikipedia.mjs` was run
   against `Immanuel_Kant.txt` FIRST, alone, before the other 48 files —
   its detected debris/prose boundary (567 bytes) landed within ONE BYTE
   of `kant.golden.json`'s own first row (568). Unplanned, and the
   strongest kind of validation this pass could ask for: a model tested
   against ground truth it was never fitted to.

**Where surprise actually lived: not where it was expected.**
`scripts/mechanical-ladder.mjs` (LP8's own named next candidate, built
this pass) implements the copula rules + A3/A4 + the frame table (RULE.md
sixth amendment) as a real classifier — every closed class either REUSED
from eoreader7's own received register (`AUXILIARY_VERBS`,
`DEFINITE_DETERMINERS`, `INDEFINITE_DETERMINERS` — imported, not
re-typed) or declared with its own giver as a genuinely closed
grammatical paradigm (negative existential quantifiers), never an
open-class sample. First run against the 173 English rows across all
committed goldens: 74.6% accuracy-of-decided, and its A4 tier scored
8.3% (1/12) — a prior asserted with far more confidence than it had
earned. READING THE MISSES rather than discarding the number (prediction
error is information, not noise) found the real fault: the rule fired on
"does the SUBJECT lead with a negative quantifier" alone, when the real
positive shape (Alice's own "nothing so very remarkable | was | in
that") needs the quantifier to pair WITH a bare copula/existential
predicate — "No one shall be subjected to X" is the ordinary subjection
frame with a negative-quantifier subject, never NUL. RULE.md's own
seventh amendment records the corrected rule. Two more faults were the
author's own, named as such rather than smoothed over: a "held guilty
of" pattern was added to the subjection frame by analogy, not because
the published table names it, and it fired on a real EVA-family row the
frame table has no coverage for yet; a bare "shall be made" swallowed
"no distinction shall be made" (SEG, the ordinary distinguishing act,
not INS). Both removed rather than patched into a different guess.
Corrected: 94.7% accuracy-of-decided, 32.9% coverage — a small, honest
instrument, not a sweeping one.

**The generalizable lesson, stated once:** a prior is worth holding
exactly to the degree it CAN be surprised — the mechanical ladder's
first cut minimized its own apparent surprise by matching broadly (three
guessed extensions, one over-eager rule), which is the same failure
shape as the erased sidecars at a smaller scale: confidence purchased by
not looking closely enough at what it actually covers. The fix, both
times, was the same move: read the misses, trace each one to its actual
cause, and either correct the rule with the evidence in hand or DISCLOSE
the limit rather than paper over it with a guess. Testing at the
smallest reversible scale (one file against its own golden, 173 rows
against a classifier before any new file was touched) is what makes that
move affordable — a wrong prior discovered on 173 already-graded rows
costs nothing; the same prior discovered after being asserted as a
reading of new material is LP7 all over again.

**What this pass adds to the spiral, concretely.** `02-encyclopedic/
wikipedia` (49 files, one already a hand golden) joins the corpus with
STRUCTURAL-ONLY sidecars — declared identity (this family's own
convention: the filename is the identity, disclosed as such, since no
in-file header exists the way OHCHR's does for `un-udhr`), a real
infobox/wikilink-glue debris detector (DR10's own named finding, now a
working organ rather than a filed observation), heading detection, and —
new this pass — an ONLINE structural posterior: each file's heading
count and debris fraction is compared against the family's own RUNNING
mean/spread (a plain Welford update, disclosed as exactly that, not a
validated test), then folded into the posterior for the next file. Three
real structural outliers surfaced this way (Cell_biology.txt, sparser
than the family's own norm; Industrial_Revolution.txt and Taoism.txt,
denser) — checked by hand against the actual files rather than trusted
blind, and confirmed real rather than detector error. Propositions stay
empty, corpus-wide, per the standing DR4/DR5 evidence above.

**What this does not license.** The mechanical ladder is scored against
existing ground truth only — it is not run on unread files as a reading,
and its `undecided` outcomes are real refusals, not a coverage figure to
chase upward by loosening the ladder's own walls. The Wikipedia sweep's
propositions stay empty until DR4/DR5 land in the-fold's own extractor;
that boundary is named, not worked around. The next ring this entry
licenses is MORE of the same discipline — more structural families, more
mechanical-ladder tiers scored against rows this corpus already has —
never a shortcut past the evidence that keeps saying content extraction
on unread material is not ready yet.

**Addendum, same pass — the discipline caught its own author mid-act.**
`git status` before staging (this repo's own standing practice, not a
special step for this pass) showed `Immanuel_Kant.txt.eot.json` as
MODIFIED rather than newly added — the tell that `spiral-ring2-
wikipedia.mjs`'s first run had silently overwritten the real ring-0
hand-adjudicated sidecar (10 propositions) with a zero-proposition
structural stub, because both generators write the identical
`<file>.eot.json` path with no coordination between them. This is LP2's
own law ("layers append, never overwrite") and LP8's own law ("a
sidecar is never done" — never a sidecar SILENTLY UNDONE) violated by
the very pass written to honor them, caught only because staging is
never trusted blind in this project. Fixed at the generator, not just
the file: ring 2 now checks for an existing `reader.kind ===
"hand-adjudication"` sidecar and skips rather than writes, named in the
script's own comment so the next generator sharing this corpus does not
repeat it. The corrected sweep: 48 structural sidecars (Kant excluded,
correctly, as ring 2's own log now states plainly: "a ring-0
hand-adjudicated sidecar already exists here"). Kept here rather than
quietly folded into a clean final number, because the honest account of
testing a process is not only what the process got right.

**Addendum, next day — the held-out test this entry's own claims were
waiting on.** User question, direct: "do you think these are good
priors?" — followed by the instruction to answer it with an e2e test on
a net-new corpus rather than an opinion. `scripts/e2e-generalization-
eval.mjs` + `scripts/e2e-generalization-test-RESULTS.md`: 13 hand-read
specimens from `06-government-legal/world-factbook` (a family with no
golden, no sidecar, no frame-table phrase drawn from it), scored live
against the currently-committed mechanical ladder. Coverage collapsed
from 32.9% in-family to 15%, as expected for a classifier tuned on
legal-declarative prose. **What was not assumed and had to be measured:
zero of the two decisions made on unseen material were wrong** — the
discipline (never guess; refuse and type the cause rather than decide
past the evidence) held under the one kind of pressure this whole
project had not yet put it under. Three genuinely new construction
classes surfaced this way, each with a nameable cause rather than a
vague miss: no branch exists for an ordinary transitive verb at all (the
ladder's real coverage is copula constructions plus a dozen phrases
lifted from one register); rule 3's definiteness test only recognizes an
article, so a bare proper-noun predicate ("Algiers" as capital) has no
path to SIG·Figure at all; and no rule anticipates a bare numeric or
date predicate ("998 km", "5 July 1962"), which turns out to be the
single most common predicate shape in a reference-fact register. One
already-disclosed gap (dispositional/Pattern-promotion) fired again,
exactly as documented — a confirmation, not a new find. The verdict,
stated precisely rather than as a rating: the measurement DISCIPLINE is
good and just proved itself outside the distribution it was built on;
the COVERAGE is narrow and was previously only argued, now measured.

## LP10 — A received lexicon is wired where it decides; a prior with no consumer is not coverage

User direction, verbatim: "yeah let's use verbnet, why not? I thought we
were. what about unimorph? can we do this for as many languages as
possible?" Two separate corrections, one entry.

**ActPrior@1 (VerbNet) existed since LP7's own seed pass but was only
ever consulted by the SCORING function** (`eot-sidecar2.mjs::checkAct`),
never the GENERATING one (`mechanical-ladder.mjs::classify`) — a
resource built to answer "what act does this verb perform" sat unused
at the one place that question is actually asked. Fixed: a new tier,
after the frame table/copula/A3/A4 tiers and before the final undecided
fallback, electing the relation's head the same measured way (`headOf`)
and looking it up directly in ActPrior, falling back through
MorphologyPrior@1 (UniMorph) to the head's lemma when the surface form
itself is absent. A `contested` entry is refused by name (R7's own
disclosed-alternate discipline), never resolved by picking. Measured
both in-family (32.9% → 34.7% coverage, all 173 hand-adjudicated English
rows, the new tier itself 3/3 correct) and held-out (the same untouched
`world-factbook` specimens LP9's addendum already scored: 15% → 23%,
0 wrong, one new decision honestly flagged as a debatable word-sense
call rather than a clean win). Full numbers:
`scripts/eot-sidecar2-RESULTS.md`, `scripts/e2e-generalization-test-
RESULTS.md`.

**"As many languages as possible" has a structural answer, not a
coverage answer, and finding it took building the wrong thing first.**
The act-typing tier rests on VerbNet, which is English-only BY
CONSTRUCTION — Levin classes are a theory of English verb alternations,
not a universal inventory. So this capability cannot be extended to
another language by adding data; it would need a different theory of
that language's verbs. What extends is the layer beneath it (POS priors
→ head election), built this pass for Arabic, Spanish, and Chinese — but
that layer classifies nothing alone, since the ladder above it (frame
table, copula rules) is hand-adjudicated English. Honest scorecard:
**capability extended to one language, substrate to three, wall named.**

**The lesson that cost the most, and the rule it earns.** A Spanish
morphology prior was built from real, verified `unimorph/spa` data
(873,811 forms, cross-checked against real UDHR inflections — `fueron`
→ `{ser, ir}`, ambiguity correctly preserved) and measured 24.5MB, ~34x
the largest artifact otherwise committed here. Effort then went into
COMPACTING it — while simultaneously writing a long disclosure
explaining why it matched neither an existing consumer nor the
established design (eoreader7's `morphology-eng.json` stores only the
irregular tail: 5,531 kept of 224,550 pairs). Both facts were visible
the whole time. A morphology prior does exactly one job in this project
— bridge a surface form to a lemma so ActPrior can be looked up — so
with no non-English ActPrior it is a bridge to a destination that does
not exist. Deleted rather than committed. **The rule: when the
disclosure explaining why an artifact does not fit runs longer than the
case for shipping it, the artifact is the thing to cut — and a prior
with no consumer is not coverage, however real its data.** Pinned as a
test so it is re-added only alongside a consumer.

**Two register refusals worth keeping.** Arabic and Swahili each HAVE a
real, live UniMorph repository — for the wrong register (Egyptian/Gulf
Arabic, not Modern Standard; Congo Swahili, not standard Kiswahili).
Substituting either fails silently rather than loudly, so both were
refused. Chinese has no UniMorph repo under any code — a principled
absence (little inflection for that schema to tabulate), not chased with
a sixth guess. And on the UD side, `UD_Chinese-GSD` answers HTTP 200 on
every file but is TRADITIONAL script where this project's golden is
Simplified — caught only by reading the actual bytes rather than
trusting the 200, and replaced with `UD_Chinese-GSDSimp`. Swahili has no
UD data at all: `UD_Swahili-OPUSGV` contains no `.conllu` file anywhere,
confirmed twice, despite its README claiming a v2.8 release.

**A real, live bug, caught before it shipped:** every prior-build
script accumulates per-form counts into a plain object via
`forms[form] ??= {}`. `"constructor"` is a genuine attested word in both
UD_Spanish-AnCora and UniMorph's Spanish paradigm table, and a plain
`{}` resolves that key through `Object.prototype` instead of creating a
fresh accumulator — silently losing that one word's counts with no
error anywhere, not merely a crash (the UniMorph script's stricter
`.add()` call happened to throw; the POS-prior script's `[upos] = ...`
shape would NOT have thrown, and did not throw when English's own build
was checked, because English's own vocabulary has no colliding word).
Fixed with `Object.create(null)` everywhere the pattern appears,
including the pre-existing, already-committed English script
(reconfirmed byte-identical after the fix — it was never actually
corrupted, the collision never occurred in that corpus). Pinned as
regression tests so it cannot silently regress.

**What this entry does not claim:** the three new POS priors are wired
into nothing — `headOf` is called only from the English ladder. They are
committed because they are small, in-norm, verified against real words
from this project's own hand goldens, and the honest substrate for
future non-English work; calling them "three more languages supported"
would be false. Building a construction ladder for Arabic, Spanish, or
Chinese is real, larger, unattempted work. Full account, every URL and
HTTP status checked: `scripts/multilingual-priors-RESULTS.md`.

## What no entry here decides

- **Whether the whole corpus should be read.** LP4 names the order of work
  and stops there.
- **How a recension is identified** (LP3's second option) — content hash of
  the transformed text is the obvious candidate and is not yet specified.
- **Whether readings live in this repo or beside it.** `digested/` is here
  today because the sample is small and reviewable. At corpus scale that is
  a real question about repository size and is not answered.
- **Anything about the fetch scripts.** The corpus-integrity finding
  (`digested/CORPUS-INTEGRITY-FINDING.md`) names a systemic problem in one
  subdirectory and explicitly does not diagnose or fix its cause.
