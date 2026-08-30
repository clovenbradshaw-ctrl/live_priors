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

## LP7 — War and Peace, read in three languages: the corpus's own filenames lied again, and the reader was blind to a whole alphabet

The ask, directly: process the-fold's own flagship specimen — War and
Peace — in English, Russian, and a third language through the full EOT
reading process, and use the resultant `.eot.json` files to measure
whether reading is actually omnilingual. Two findings, in the order they
were found, each closed before moving to the next.

**LP1, again — this corpus's own `gutenberg-non-en/` could not be used.**
Checked directly rather than trusted: `en/pg2542_War_and_Peace.txt` is
Henrik Ibsen's *A Doll's House*, exactly as `digested/
CORPUS-INTEGRITY-FINDING.md` already recorded for all 20 of 20 files in
that directory. Real, verified sources were fetched fresh instead —
English from Project Gutenberg (`pg2600`, the Maude translation, the same
file the-fold's own `eval/crosslingual-eval.mjs` and
`eval/atmosphere-chunking-eval.mjs` already use), the Russian original and
a real French translation (Bienstock, 1903) both from Wikisource,
identity confirmed by reading the actual bytes — not a filename or a
search result's own metadata — the identical discipline `declaredIdentity`
already holds English Gutenberg files to. Landed at
`11-multi-language/war-and-peace/{en,ru,fr}/`, named honestly rather than
extending the tainted directory. French Wikisource's own chapter-level
transclusions (`Guerre et Paix (trad. Bienstock)/I/01` … `/I/07`) were
rendered directly rather than the whole six-volume container page — the
same reasoning LP3 already states about addressing a recension rather
than an unbounded transclusion, applied to fetching rather than to
citing.

**The first `eot-sidecar.mjs` run measured a real, sharp asymmetry.**
`en`: clean, 90 edges. `fr`: clean, 60 edges. `ru`: clean, but only **8
edges — every single one in French**, the novel's own embedded
aristocratic dialogue (real Tolstoy code-switching, not corruption), and
**zero from the surrounding Cyrillic narration**, despite the script gate
correctly reporting the excerpt fully cased and `extractSurfaces`
correctly finding ten real Cyrillic surfaces (including the full name
"Анна Павловна Шерер") when tested directly.

**Two plausible causes, both tested and both refuted before the real one
was found (P5.5's own discipline, applied here rather than re-derived).**
Russian's grammatical case declension fragmenting a name across sightings
— refuted: an artificially undeclined, exactly-repeated Cyrillic surface
still nominated zero candidate verbs. The novel's own French dialogue
statistically dominating a short excerpt — refuted: the same zero result
reproduces on pure Russian text with no French anywhere in it. The actual
cause was one line in eoreader7's `discoverRelationVocab`: JavaScript's
`\b` is ASCII-`\w`-only, with no Unicode mode even under `/u`, so a
surface written entirely in a non-Latin script can never be located by
name, at all, regardless of recurrence. Confirmed universal by direct
construction on two more unrelated scripts (Greek, Hebrew) before being
trusted. **Full diagnosis, the fix, and its own tests live in eoreader7 —
`native/READING-SPEC.md` S34 is the law for the mechanism; this entry is
the corpus-side record of what it was measured against and what changed.**

**Re-run after the fix, same three files, same append-only log — the
delta itself is the artifact, not just a before/after table.** Because
the source bytes were unchanged, the second `eot-sidecar.mjs` pass did not
overwrite anything: it read the existing hyperlexicon log and called
`hl.admit()` again under a new witness (the fixed code's own recipeId).
The original 8 French edges are still there, now `SUPERSEDE`d with a
second witness — two independent reads agreeing, LP2's own "one note, two
witnesses" working exactly as designed. Fifty-five new `PROPOSE` entries
landed alongside them, in real Cyrillic, real Russian: *"Анна Павловна
—кашляла→ несколько дней"* (coughed for several days), *"Князь Василий
—говорил→ всегда лениво"* (always spoke languidly), *"Анна Павловна
—назвала→ императрицу"* (named the empress) — genuine SVO triples read
from the novel's own narration, not the dialogue. `ru` moved from 8 edges
to **63** — no longer a rounding error beside `en`'s 90 and `fr`'s 60, the
same order of magnitude as both.

**What this does NOT yet establish, disclosed rather than implied.**
`grammarPrior: false` on all three sidecars — this checkout has no local
`POSPrior@1` build, so the vocabulary-quality gate (LP6: verb-share over a
real treebank, closing 80-99% false "verbs") is not loaded for ANY of the
three languages here, not only Russian. Reading the raw edges by hand
confirms this plainly: English's own 90 include spurious nominations
("if" —you→ …, "how do" —you→ …) at a rate visibly similar to Russian's
("садитесь" —и→ "рассказывайте", where "и" is the conjunction "and", not
a verb). **The fix closes REACHABILITY — a real edge can now be found at
all — never PRECISION**, and precision's own gate is itself English-only
by construction (UD_English-EWT). A Russian equivalent (Universal
Dependencies has a real Russian treebank, UD_Russian-SynTagRus among
others) is real, named, unbuilt future work, on the same footing LP6
already states for the English gate: a one-time vendoring pass, not
attempted here. So: **omnilingual at the script/reachability level, not
yet at the vocabulary-quality level** — a narrower, honestly bounded claim
than "reading is omnilingual" would otherwise suggest, and the correct
one to make until that gate exists for more than one language.

**Files.** `11-multi-language/war-and-peace/{en,ru,fr}/` (3 verified
sources, ~3.5MB total, `en` full text and `ru`/`fr` opening-chapter
excerpts sufficient to exceed `eot-sidecar.mjs`'s own 8000-char reading
window) plus their `.eot.json` sidecars (each carrying both the pre-fix
and post-fix admission as PROPOSE/SUPERSEDE entries on one log, per LP2).
No script in this repo changed — the fix lives entirely in eoreader7
(S34), reached the identical way every other cross-repo dependency here
already is, through `loadOrgans()`'s own sibling-checkout import.

---

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
