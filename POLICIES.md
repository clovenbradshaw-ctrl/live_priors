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

**Amended 2026-08-30 — aligned by narrative content, a second recipe
defect closed, and the real, root cause of Russian's referent
fragmentation, run to ground.** User direction: *"get them all aligned,
use deltas to detect issues."* The three sources above cover different
character spans of the SAME opening scene — `en` is the full novel,
`ru`/`fr` are excerpts — so a raw comparison was never comparing the same
narrative content in the first place.

**Alignment is by content, not by chapter number — a real confound,
checked directly rather than assumed.** War and Peace's Part One Chapter
boundaries do not fall at the same narrative point across editions: close
reading found Maude's English Chapter III/IV boundary sitting roughly 72
lines LATER, in narrative terms, than the Russian and French Chapter
III/IV boundary. Comparing "Chapter I–III" by NUMBER across the three
files would silently compare unequal spans. `aligned/{en,ru,fr}/` instead
holds Part One, Chapters I–III, cut at the identical narrative sentence in
all three — Prince Vasíli's closing aside about the bear cub ("Educate
this bear for me!" / its Russian and French equivalents) — verified by
locating that exact sentence in each file before cutting, not by trusting
any edition's own chapter markers. `eot-sidecar.mjs` read each aligned
file at `excerptChars: 33000`, exceeding every file's own length
(31,577 / 28,260 / 32,390 chars — `truncated: false` on all three), so
the comparison below is genuinely over the same content in every
language, fully read, not truncated asymmetrically the way the original
run above (8000-char window) unavoidably was.

**A second recipe defect, found by the alignment itself.** Reading the
Russian aligned excerpt surfaced one spurious 3-token candidate name:
"Пьера Анна Павловна" — Prince Vasíli's aside about Pierre, a comma, then
the scene's real subject newly introduced. The comma sits glued directly
against "Пьера"'s own trailing edge with no space before "Анна", and
eoreader7's `accumulateSurfaceEvidence` read the two names either side of
it as one continuous capitalised run. Reproduced identically on
constructed English prose sharing only the punctuation shape before the
fix was trusted, confirming the defect general rather than
Cyrillic-specific. **Full diagnosis, the fix, and its own tests live in
eoreader7 — `native/READING-SPEC.md` S35 is the law for the mechanism;
this entry is the corpus-side record.**

This is a genuine recipe-level correctness defect (a false admission,
not new material) on the three aligned files specifically, so LP6's own
licence applies: `--fresh` was used to re-read exactly these three
sidecars — never corpus-wide, never routine — validated first by
eoreader7's own S35 test suite (12 cases in `rich-referents.test.js`,
including the comma specimen and a plain-whitespace regression control)
before being trusted against real material. Re-run, same `excerptChars`,
same organs, only the fix changed: `en` 351 → **382** edges, `fr` 407 →
**435** edges, both real gains from genuine dialogue-tag constructions
this file's own grep confirms are present in both languages ("Well,
Prince" / "Pierre, Anna Pavlovna"). `ru` stayed flat at **285** — checked
directly rather than assumed: the aligned Russian excerpt's own text
never contains a comma-glued capitalised pair inside its window (the
specimen above lives in the aside sentence, which this alignment cuts
before). **Disclosed, not silently left ambiguous:** the ORIGINAL,
already-committed `ru/voyna-i-mir_Tolstoy_wikisource.txt.eot.json` (the
8-then-63-edge reading this entry's own numbers above are built on) is
UNAFFECTED and was not re-read — its specimen ("Пьера, Анна Павловна",
found by direct search) sits at character offset 25,306, past that
file's own 8000-char `excerptChars` window entirely, so the recipe
defect never fired within what it actually read. Nothing in the numbers
above this amendment needs correcting.

**Finding: a raw surface count is not a valid cross-language comparison
metric on its own — checked, not merely suspected.** `extractSurfaces`
found 86 candidate surfaces in the aligned English excerpt, 87 in
Russian, 53 in French — English and Russian look alike, French looks like
an outlier. Direct grep resolves why, and it is orthography, not
narrative content: French systematically writes a title before a name in
LOWERCASE ("prince Vassili", "prince André"), while English and Russian
both capitalise it ("Prince Vasíli", "князь Василий"). Every one of this
instrument's surface candidates is found by capitalisation — L2's own
standing rule, "capitalisation is a differentiator, never the primary
signal" — so a language whose own writing convention does not capitalise
titles will structurally extract fewer candidate surfaces for the
identical set of real people, with nothing wrong in the reading. A raw
surface count is a fact about writing conventions before it is a fact
about content; referent counts, admitted below the surface layer, are the
closer (though still imperfect, see next finding) comparison.

**Finding: the real, root cause of Russian's referent fragmentation is
grammatical case, and it acts through TWO mechanisms sharing one cause —
checked by running the real pipeline organs directly, not assumed from
counts.** `discoverReferents`, run with its own DERIVED fences (no
override — the same way the real reading pipeline runs it) over each
aligned excerpt, admits Anna Pávlovna's own name as: **2 distinct
referents in English** (`Anna` + `Anna Pávlovna` correctly merge by
containment; `Annette` — her own French nickname, used in this novel's
own embedded French dialogue — stays separate, the ALREADY-DISCLOSED
descriptor-synonymy MODEL-tier gap this file's own header names, not a
defect); **2 in French** (identical shape: `Anna` + `Anna Pavlovna`
merge, `Annette` stays separate); **6 in Russian**, across eight admitted
surface forms spanning three grammatical cases (nominative `Анна
Павловна`/`Анна`/`Павловна`; dative `Анне Павловне`/`Анне`; genitive
`Анны Павловны`/`Анны`; plus `Annette`) — one person read as six.

The FIRST mechanism is direct: `namesCorefer` (eoreader7,
`adapters/text/surfaces.js`) matches two surfaces by exact-token
containment or a shared final token, over `diaNorm`'d text — folding
ONLY the five Latin-vowel diacritics, by the file's own disclosed scope.
It has no morphological layer. "Анна" (nominative) and "Анны" (genitive)
share zero tokens after normalisation — they are, token-for-token,
different strings — so containment never fires between a name's declined
forms and its dictionary form, and each case-form becomes its own
referent by default.

The SECOND mechanism is indirect, and was found only by computing the
actual fence values rather than trusting the earlier summary that
attributed the whole effect to mechanism one alone: `genericTokens`'s
partner-count fence is DERIVED from the excerpt's own token
co-occurrence spread (an IQR-style statistic, by design — see
`surfaces.js`'s own header on why a fixed number would be wrong). Because
declension explodes Anna Pávlovna's own name into six-plus distinct
2-token surfaces instead of English's or French's one, the Russian
partner-count pool is diluted with many partner-count-1 tokens (each
case-form's own two tokens pairing only with each other) — measured
directly: **fence = 1 in Russian** (17 distinct partner-bearing tokens,
Q1=1, Q3=1) versus **fence = 3 in English** (34 tokens, Q1=1, Q3=2) on
the identical scene. At fence 1, "анна" and "павловна"'s own genuine,
unambiguous partner-count of 2 (each other, plus "шерер" from her own
full name "Анна Павловна Шерер") EXCEEDS the fence and both are wrongly
read as generic — the ordinary co-occurrence of one person's own first
name, patronymic and surname, misread as breadth of reference the way a
real title or family name earns it. At fence 3 the identical partner
count of 2 does not exceed it, and English correctly reads "anna" as
individuating. **Declension is the cause of both:** it fragments a name's
surface forms directly, AND — by proliferating those fragments as
low-partner-count tokens — it tightens the very fence meant to catch
genuine ambiguity, until it catches the one pairing that was never
ambiguous at all.

**What this does NOT establish, disclosed rather than silently left
open.** No fix is proposed or attempted here. A morphological
(case-declension) folder for `namesCorefer` is real, scoped, unbuilt
future work, and it is NOT the same thing as the `createLemmatizer`
organ the-fold's `hypergraph.js` already carries (the-fold's own CLAUDE.md,
"MINE-1 gap" sections): that organ is UniMorph-backed, English-default,
and lemmatises VERBS for relation-edge matching in a completely
different module — nothing in either repository lemmatises or declines a
Russian PROPER NAME today, and building that (a real Russian
morphological resource, with its own giver, the same standard LP6
already holds the English POS-prior gate to) is unattempted here. This
finding narrows LP7's original bottom line one level further: reading
here is **omnilingual at the script/reachability level (S34) and at the
punctuation-boundary level (S35), not yet at the referent-identity level
for a morphologically rich language** — a third, honestly bounded clause,
alongside the original entry's vocabulary-quality caveat, rather than a
claim that referent identity is now solved for every language this
instrument can read.

**Files.** `11-multi-language/war-and-peace/aligned/{en,ru,fr}/` (3
content-aligned excerpts, Part One Chapters I–III, cut at the identical
narrative sentence) plus their `.eot.json` sidecars, generated `--fresh`
under LP6's licence against eoreader7's post-S35 commit. No script in
this repo changed for either fix; both live in eoreader7 (S34, S35),
reached through `loadOrgans()`'s own sibling-checkout import exactly as
before.

---

## LP8 — all 516 UN UDHR translations, read for blind spots rather than for one more universal-reading claim

The ask, directly: apply the same process to every version of the UN
Declaration of Human Rights this corpus already holds — `06-government-
legal/un-udhr/`, 516 real OHCHR translations, pulled once and never
re-read since — and this time the target is not "does it read the same
everywhere," it is **where does it not, and why.** Two real, general
defects were found and fixed; the corpus's own 516 readings were
regenerated under both; the result is a census, not a single specimen.

**The corpus's own front matter was cased debris on every one of the 516
reads, unnoticed because it never happened to matter until a script had
nothing else.** Every file under this directory opens with the identical
four-line OHCHR header ("Universal Declaration of Human Rights" /
"Language: NAME (code)" / "Adopted: UN General Assembly resolution 217 A
(III), Paris, 10 December 1948" / "Publisher: Office of the United
Nations High Commissioner for Human Rights (OHCHR)"), byte-identical
across every language, only the Language line varying. Left unstripped,
this is exactly the "cased debris" surfaces.js's own header already
warns a caseless script produces (P5.3's Gutenberg-licence problem, a
different container): on the real Georgian translation, EVERY ONE of the
18 candidate surfaces `extractSurfaces` found ("Human Rights", "UN
General Assembly", "Paris"...) came from this four-line header, zero
from the document's own 106 sentences of real Georgian prose. `stripUdhrHeader`
(`scripts/eot-sidecar.mjs`, offset-carrying like `stripContainer`, not
length-preserving like `blankCatalogLines` — the header sits at the
start, so a caller that drops it also stops spending `excerptChars`
budget on four lines that are never the material) closes it, anchored to
the exact literal text so it is a safe no-op on every source outside
this one corpus.

**The corpus-wide sweep this stripping made possible surfaced a second,
larger, genuinely new defect — not in this repo's code, but in the
engine's own `scriptCoverage` gate.** Stripped of its own header debris,
the Georgian translation's real body still produced ZERO surfaces —
because Georgian's everyday alphabet, Mkhedruli, is Unicode
General_Category `Ll` (lowercase), so `scriptCoverage`'s existing test
(does this material have `Cased_Letter` letters at all) reported
`casedShare: 1.0, gap: null` — "fine" — while the mechanism this gate
exists to protect had structurally nothing to work with, because
ordinary published Georgian never uses the OTHER member of that case
pair (Mtavruli, a monumental/decorative variant) to mark anything. The
identical shape recurred on two more, completely unrelated specimens in
this exact corpus: a Cherokee translation using the syllabary's
traditional block (every character defaults `Lu`, the mirror-image
failure), and the Uyghur Latin-script translation (an ordinary romanised
Latin alphabet that simply is not capitalised in this transcription — no
exotic script involved at all). **Full diagnosis, the fix (a third,
parameter-free `scriptCoverage` gap — "zero distinct sentences carry a
non-sentence-initial capitalised token" — reusing `accumulateSurfaceEvidence`'s
own walk, never a second one), and its tests live in eoreader7 —
`native/READING-SPEC.md` S36 is the law for the mechanism; this entry is
the corpus-side census of what it was measured against.**

**The full census, before and after, both fixes together.** All 516
sidecars regenerated `--fresh` (LP6's licence: a genuine recipe defect —
false admissions from unread header debris, and a false "no gap" on
material the extraction mechanism cannot in fact read — never new
material layered on old; validated first against eoreader7's own 20 new
test cases across S35/S36 plus a dozen real specimens driven through the
live pipeline before the corpus-wide re-read, matching this entry's own
prior POS-gate sweep's practice of committing the validation as a
record).

| | before (stale, pre-S34/S35/S36, header unstripped) | after (current code, both fixes) |
|---|---|---|
| `clean` (real edges extracted) | 324 | **390** |
| `gapped_script` (honestly typed, script blind) | 66 — all `script_mostly_without_case` | **90** — 60 `script_without_case`, 24 `script_case_unused` (NEW), 6 `script_mostly_without_case` |
| `empty` (0 edges, no gap named) | 126 | **36** |

The `gapped_script` growth (66 → 90) is not the mechanism reading LESS —
it is the mechanism NAMING what it could never read in the first place,
honestly, instead of leaving it silent inside `empty`: `script_case_unused`'s
own 24 languages were ALL counted as unexplained `empty` results before this
pass. And the header fix sharpened the existing gap itself: with the
English debris gone, a genuinely, purely caseless script (Arabic, Hebrew,
Chinese, Thai, Hindi, Korean, Khmer...) now correctly reads `casedShare:
0` and lands the STRONGER `script_without_case` rather than the weaker
"mostly" variant that debris alone used to force it into — 60 languages
moved from a hedge to a precise statement.

**`script_case_unused`'s own 24 languages, read together, are not a
random list — checked directly, not merely counted.** Beyond Georgian,
Cherokee (uppercase) and Uyghur (Latin), the other 21 are overwhelmingly
languages whose current written form is a 20th-century orthography —
often missionary or post-colonial linguistic work giving a previously
unwritten language its first script — rather than an alphabet that
inherited a centuries-old European print convention: Zarma, Dendi, Fon,
Fulfulde, Kabiyé, Mbundu, Mòoré, Nyemba, Susu, Ditammari, Umbundu (West
and Central African); Waorani, Tsimané, Huastec, Mam, Pipil, Ambo-Pasco
Quechua, Záparo (Indigenous American); Central Atlas Tamazight and Adlam
Pular (a script and a language, respectively, whose modern written
standard is itself recent). Spot-checked rather than assumed for two of
these: Tamazight and Adlam Pular both render their document's own TITLE
in a genuine, deliberate all-caps run (correctly excluded by the
extractor's own pre-existing all-caps-typography filter, built for an
unrelated reason — a heading quoted mid-paragraph), while their real body
prose never again distinguishes case for a name — a real, additional
mechanism feeding the same outcome, disclosed rather than folded into a
single story for all 24. **The pattern is a fact about writing-system
history, not about any one script or language family, and it is worth
stating plainly: capitalisation-marks-a-name is a specific European
typographic convention that a language's own alphabet does not
automatically inherit just because that alphabet happens to be Latin —
and the languages this leaves silent are disproportionately smaller,
more recently written, and more likely to belong to communities already
under-served by NLP tooling generally.** This instrument's entire
proper-name layer — and everything built on it, referent identity and
relation extraction alike — depends on a convention roughly two dozen of
516 real UN-translated languages do not share, honestly named now
instead of reading as an unremarkable zero.

**The matched pairs already in this corpus are a natural experiment this
pass did not have to construct — same language, different script or
different era, read side by side.** Bosnian, Azerbaijani, Uzbek,
Turkmen and Serbian each exist here in BOTH Cyrillic and Latin
transliteration; every pair reads `clean` on both sides with closely
matched edge counts (Azerbaijani and Uzbek: EXACT matches, 51/51 and
19/19; the rest within a few edges either way) — real, direct evidence
that S34's fix reads a language's own structure consistently regardless
of which cased script carries it, the strongest confirmation this
project has produced yet that the fix is about the mechanism, never the
alphabet. Malay exists in both Arabic (Jawi) and Latin script: Jawi
correctly `gapped_script` (Arabic script is genuinely caseless), Latin
correctly `clean` — the SAME language legible in one script and honestly
refused in the other, exactly the outcome a script-level gate should
produce. Uyghur, uniquely, gaps in BOTH of its scripts here — Arabic for
the structural reason, Latin for the convention reason — two different
gap types landing on one language's two written forms. German (1901 vs
1996 spelling reform) and Romanian (1953 vs 1993 vs 2006 orthographic
standards) each show near-identical or IDENTICAL edge counts across their
historical variants — a within-language orthographic reform, unlike a
script change, does not perturb this reading at all.

**Disclosed, not chased further.** 36 sources still land `empty` after
both fixes; 14 of them report zero surfaces without triggering
`script_case_unused`, meaning SOME raw capitalised-run evidence exists
(clearing scriptCoverage's zero-threshold gate) but nothing survives
`surfacesFromEvidence`'s own downstream admission filters — a real,
different, narrower question than "can this script be seen at all," and
correctly landing in `empty` rather than `gapped_script` because it is a
distinct fact. One outlier is named rather than smoothed over: the
Chiltepec Chinantec translation reports 43 candidate surfaces and zero
edges — evidence the surface layer found real names while the relation
tier still extracted nothing usable from them, a vocabulary-level gap,
not a script-level one, and genuinely unexplored here. And this corpus's
own genre limits what a referent-identity audit (LP7's own Anna
Pavlovna-shaped finding) can even ask here: UDHR is thirty short
declarative articles with almost no recurring named people, so the kind
of within-document referent fragmentation War and Peace exposed simply
has little material to bite on in this corpus — a fact about the
material, not a clean bill of health for the mechanism.

**Files.** `scripts/eot-sidecar.mjs` (`stripUdhrHeader`, offset-carrying;
wired into `readSidecar` right after `stripContainer`; `attemptWindow`'s
`scriptCoverage`/`extractSurfaces` calls folded into one
`accumulateSurfaceEvidence` pass, fed to both). `scripts/eot-digest.mjs`
(the identical fold, for its own separate call site). All 516
`06-government-legal/un-udhr/*.txt.eot.json` sidecars regenerated
`--fresh`, source `.txt` files untouched (LP1). No script here changed
`scriptCoverage` itself — that fix is eoreader7's own (S36), reached the
same way every other cross-repo dependency here already is.

**Amended same day — the actual content of the 516 readings compared
against each other, not just their gates; three real, distinct causes
found behind one symptom, and a caution about the metric that would have
hidden the third.** User direction: *"learn lessons from the full
comparison of the UDHR."* UDHR is a genuinely rare corpus for this — 516
near-word-for-word translations of the SAME thirty articles — so a
length-normalised edge count (`edgesFound` per 1,000 body characters)
across the 390 `clean` languages was computed as the first cut at
"which languages, un-gated, still read worse than their peers." Median
2.29 edges/1k, but the tails needed reading, not just ranking, and
reading them found the metric itself confounded before either tail could
be trusted.

**The caution first, because it changes how to read everything else:
edge count is not a validated quality signal anywhere in this sweep,
English included.** The HIGH tail (Dangme, Twi, Bulu, Low Saxon, ...) was
checked by hand against its own raw edges rather than trusted from the
count — Twi's own top-frequency "verbs" are `no`, `ne`, `de`, `a`, `mu`,
ordinary Twi particles and postpositions, not predicates; English's OWN
62 edges in this exact run break down `and`: 30, `of`: 25, `as`: 4,
`have`: 2, `constantly`: 1 — 89% grammatical particles. This is not a
new defect: LP6's own POS-vocabulary gate exists precisely to close it,
and this whole 516-language sweep confirms it directly — `posPriorGate`
loaded in **0 of 516** sidecars, English included, because this checkout
carries no local `POSPrior@1` build. A high edge count in this corpus is
not evidence of richer extraction; absent the gate, it is more likely
evidence of MORE unfiltered particle noise, and the median offers no
safe harbour either — it was never measured against the gate any more
than the tails were.

**What IS a reliable comparison — because nothing downstream can inflate
it — is the SURFACE layer: how many real, recurring capitalised name
components a language's own translation of "United Nations" yields, read
directly rather than inferred from a count.** Read by hand across a
sample of the low-surface languages, three genuinely distinct mechanisms
were found behind the identical symptom (a near-empty surface list),
never conflated into one story:

1. **Statistical under-power, not absence of evidence.** Czech's own
   "spojených" (United) appears 4 times capitalised, 1 lowercase, in the
   whole document — real, strong evidence by eye — and
   `capitalisationIsSignificant` (surfaces.js's own binomial test) computes
   `pHat = 0.8` against a required bound of `0.868` at n=5: genuinely
   under-powered, not genuinely absent. The SAME mechanism this file's own
   War-and-Peace work already found sample-size-sensitive
   (`deriveMinPartners`'s IQR fence, disclosed and deliberately unfixed
   there) recurs here in its sibling test, and for the identical reason —
   UDHR's own short, thirty-article length gives every within-document
   frequency statistic in this file far less power than a book does.
2. **Morphological declension, confirmed on a SECOND, unrelated language
   family.** Finnish's own "Yhdistyneiden"/"Yhdistyneet" (genitive vs.
   nominative plural of United) split into two never-merging surfaces;
   North Saami's own "Ovttastuvvon Naššuvnnaid" splits into FIVE distinct
   spellings across its five real occurrences, no two identical. This is
   the-fold's own P72/LP7 Russian-declension finding (`namesCorefer` has
   no morphological layer), now independently reproduced on Uralic
   languages wholly unrelated to Russian's Slavic case system — the
   cross-family confirmation that finding's own disclosure named as
   real, unbuilt future work, not invented here.
3. **Genuine paucity of proper-noun material, not a defect.** Yoruba and
   Xhosa each yield exactly ONE raw candidate in their entire document —
   not a filtered-out true positive, a genuinely near-empty capitalised-run
   count. This is the material, not the mechanism: a thirty-article
   declaration whose own translation may render "United Nations" only
   once, or with wording that does not repeat verbatim, gives this
   organ almost nothing to find regardless of how well it works — the
   same limit this entry's own original text already named for
   referent-fragmentation analysis generally, now traced to its precise
   mechanism for two specific languages rather than asserted in general.

**No code changed for any of this pass's three mechanisms, and that is
the deliberate, disclosed decision, not an oversight.** (1) would need
`capitalisationIsSignificant`'s own fixed-alpha bound reconsidered
against corpus LENGTH, which this file's own standing rule already
forbids doing by tuning against one specimen's own score. (2) is
already-disclosed, already-scoped future work (a per-language
morphological folder), not something a "lessons learned" pass invents
on the spot. (3) is a fact about the material, and there is nothing to
fix. Building the POS-vocabulary gate for even one more language (this
pass's own caution above names exactly why that would matter most) is,
per LP6's own text, "a one-time vendoring pass" — real, scoped,
deliberately not attempted here either.

**One more thing noticed, not chased: two apparent duplicates.** The
corpus carries TWO separate files both self-identifying "Language:
Finnish (fi)" (`udhr-067.txt` and `udhr-fin.txt`) and two both
self-identifying "Language: [North] Saami (se)" (`udhr-059.txt` and
`udhr-sme.txt`) — real OHCHR-published files under this corpus's own
walk, not a fetch artifact of this repo's own scripts (unchanged from
before this pass). Named here because a future pass computing per-
language statistics naively by short ISO code, rather than by filename,
would silently double-count these two languages — this pass's own
analysis above used filenames throughout for exactly this reason.

---

## LP9 — the three blind spots LP8 diagnosed, closed: an exact statistical test, a declension-folding organ, and a live POS-vocabulary gate

User direction, verbatim: *"fix the issues."* LP8 diagnosed three defects
by comparing the CONTENT of 516 real UDHR readings against each other
rather than stopping at gate-level statistics; this entry is their close.
Two live in eoreader7 (READING-SPEC.md S37/S38 carry the full account —
summarized and pointed at here, not restated); the third is this repo's
own wiring, fixed here.

**(1) `capitalisationIsSignificant`'s normal approximation — closed as
S37, eoreader7.** The triggering Czech specimen (cap=4/lower=1) never
actually flipped between the old approximation and an exact test (both
refuse it, p=0.1875) — the REAL defect, found by widening from one
specimen to an exhaustive sweep of the function's whole practical domain
(every `(cap, lower)` pair, n<=60), was a systematic bias: 24 pairs where
the old z-bound wrongly called a split "significant" and the exact
binomial tail correctly refuses it, zero pairs in the other direction.
Fixed with an exact one-sided binomial tail computed in log-space.
Nothing in this repo changed for this fix; it is entirely
`native/adapters/text/surfaces.js`.

**(2) Declension fragmenting a name's own case forms into strangers —
closed as S38, eoreader7, wired here.** LP8 found this on real material
(Russian's "Anna Pavlovna" and, separately, Finnish/[North] Saami
place-and-organisation names) and named it a real, general defect:
`namesCorefer`'s containment/shared-final-token check compares tokens as
exact strings, so a bare Russian surname's own case forms —
"Кутузов"/"Кутузова"/"Кутузову" — read as three unrelated referents.
`declension.js::createDeclensionFolder` (eoreader7, new) mines
suffix-transformation rules from UniMorph's real Russian noun paradigm
table and checks them PAIRWISE against two actually-observed surfaces
(never as a per-word canonical lemma — S38's own header explains why that
would be unsafe: the dominant Russian genitive-PLURAL pattern, "ов"->"",
would corrupt an already-nominative surname like "Кутузов" itself if
applied to a bare word in isolation). Verified against real fetched
Russian War and Peace: 38 correct merges (Anna, Pierre, Kutuzov, Vasily,
Andrei, Boris, Bolkonsky, Bonaparte, Napoleon, and more), zero false
merges, across a floor sweep from 10 to 200 kept rules.

**Wired here, into `loadOrgans`.** `namesCorefer(a, b, { sameStem })` and
`discoverReferents(surfaces, { sameStem })` both take the fold as an
optional organ; `eot-digest.mjs::loadOrgans` now builds it from
`native/priors/declension-rus.json` (Russian only — no other language has
a built prior yet, a disclosed absence, not a silent one) and exposes
`organs.sameStemFor(languageCode)`, consumed by both `digestOne` (keyed
off `spec.language`, already a per-document field there) and
`readSidecar` (keyed off the UDHR corpus's own header code — see (3)
below). **Honest residue, found while wiring, not glossed over:**
`readSidecar` has no language signal for a NON-UDHR document (the War and
Peace file this whole finding was measured against has no UDHR-style
header), so it falls through to English and applies neither the POS gate
nor the declension fold for that file today — `digestOne`, called with an
explicit `spec.language: "ru"`, is what actually exercises the fix
end-to-end against that file (verified directly: `organs.sameStem`
correctly reports "injected" and the POS gate correctly reports "active"
when called this way). A LP8-scale referent-count delta on that file
through `digestOne`'s own DEFAULT 8000-char excerpt window did not
materialize (`distinctReferents` held at 4 either way, on a 43,343-char
document) — checked, not assumed: the mechanism's own correctness is
proven directly (the 38-merge sweep above, and eoreader7's own
`declension.test.js` end-to-end `discoverReferents` case), and the null
result here is a real, disclosed finding about the EXCERPT WINDOW, not
about the fold — an 8000-char slice of a 43K-char book is not guaranteed
to contain both a name's nominative and declined forms together, and this
one apparently does not. Widening the excerpt window for narrative
material with recurring characters is real, unattempted, scoped future
work, not silently claimed done.

**(3) The POS-vocabulary gate — closed here.** LP8 found `loadOrgans`'s
own header comment describing a measured, working gate (Shakespeare
90→22 edges, the Iliad 65→25, Alice 97→34) that was true of some past
build, while the CODE imported `legacy-eoreader6.1/scripts/corpus/
pos-eng.json` and `legacy-eoreader6.1/packages/engine/perceiver/text/
wordclass.js` — both paths into a submodule confirmed empty in this
checkout — so the gate had been silently loading for NEITHER English nor
any of the other 515 languages, ever, in this environment. Fixed at the
source: `native/adapters/text/wordclass.js` is already self-contained (no
legacy import, confirmed directly) and exports exactly what
`makeGrammarLens` needs; `native/scripts/build-pos-prior.mjs` (new,
eoreader7, language-general — one script, zero per-language code) built
real `POSPrior@1` files for English (UD_English-EWT), Russian
(UD_Russian-GSD) and Finnish (UD_Finnish-TDT). `loadOrgans` now builds a
`posByLang` map from these three files and exposes `organs.
relationsForLang(languageCode)` / `organs.posGateFor(languageCode)`,
consumed the same way as `sameStemFor` above; the flat `relationsFor`/
`classifyConnector`/`posPrior`/`posPriorLoaded` fields stay for backward
compatibility, now pointing at real English data instead of a dead path.

**A pre-existing test that had been silently skipping now genuinely
passes, and is independent confirmation.**
`scripts/eot-sidecar.test.mjs`'s own "POS vocabulary gate" case has an
explicit `if (!organs.posPriorLoaded) return;` skip — before this fix,
`posPriorLoaded` was always `false`, so this test had never once actually
exercised its own assertions in this environment despite existing on
disk. It now runs for real and passes: on the real Alice in Wonderland
excerpt, candidates (22) genuinely narrow past kept verbs (8), and every
one of the 22 held-back tokens (`of`/`the`/`by`/`with`/`in`/`that`/...) is
a real, listed non-verb. On the real War and Peace Russian excerpt
(digestOne, `spec.language: "ru"`), `edgesFound` narrowed 63 -> 12 with
the gate active — the same class of effect, a second language, the
identical unmodified mechanism.

**A `Language:` header two-letter code, needed for real, found by
checking rather than assuming.** `stripUdhrHeader`'s own regex gained a
capture group for the header's trailing `(code)` — checked directly
against real files first: `udhr-rus.txt`'s own header reads "Language:
Russian (ru)" and `udhr-fin.txt` reads "Language: Finnish (fi)" — ISO
639-1, NOT the ISO 639-3 this corpus's own FILENAMES use
(`un-udhr/udhr-rus.txt`), a real mismatch between the two conventions
this corpus mixes, disclosed in the code's own comment rather than
assumed consistent. The initial capture class (`[a-zA-Z-]+`) silently
narrowed `stripUdhrHeader`'s own matching for two real files
(`udhr-deu_1901.txt`/`udhr-deu_1996.txt`, whose header carries a second
parenthetical — "Language: German, Standard (1901) (de-1901)" — with
DIGITS in the actual code) — caught by testing the new regex against all
516 real files before trusting it, not assumed safe from reading it;
fixed to `[a-zA-Z0-9-]+`, re-verified at 516/516 matched, zero regression.
A small `LANG_ALIAS` table (`en`/`ru`/`fi` -> the priors' own ISO 639-3
keys) bridges the two schemes — three entries, not a general ISO 639
table, honest about its own narrow scope.

**Measured, not assumed: the full 516-file UDHR corpus re-swept with
`--fresh`** (LP6's own licensed escape hatch — a recipe change that adds
a gate rather than removing one still needs `--fresh` for the *disclosure
fields* on already-clean files to update, even though this specific
recipe change could only narrow, never fabricate) in 20.5 seconds (388
clean, 90 gapped_script, 38 empty — the same shape LP8's own census
already found, this pass added a gate and a fold, not a new script-
coverage defect). `udhr-rus.txt`'s own recipe descriptor now reads
`language: "ru"`, `posPriorGate: "active — ...pos-rus.json..."`,
`sameStem: "...declension-rus.json..."`; `udhr-fin.txt` and `udhr-eng.txt`
correctly show `posPriorGate` active and `sameStem` correctly "omitted —
no declension prior for language..." (Finnish declension folding is real,
scoped, unbuilt future work, not silently claimed). Every other one of
the 513 remaining UDHR languages shows the identical honest "omitted" —
this pass built three languages' worth of received data, not 516, and
says so on every file rather than only in this document.

**Files.** `scripts/eot-sidecar.mjs` (`stripUdhrHeader`'s captured
`language`; `readSidecar`'s per-document `relationsFor`/`sameStem`/
`posGate` selection; the `recipe.descriptor` disclosure fields, now
dynamic rather than a hardcoded string). `scripts/eot-digest.mjs`
(`loadOrgans`'s `posByLang`/`declensionByLang` construction,
`relationsForLang`/`posGateFor`/`sameStemFor`/`normalizeLangCode`;
`digestOne`'s per-`spec.language` selection and dynamic `organs`
disclosure block). No new test file — this repo's own existing
`scripts/eot-sidecar.test.mjs` (2/2, one of them now genuinely exercised
for the first time) plus a live batch run of `eot-digest.mjs`'s own
14-source SAMPLE and a full, fresh 516-file UDHR re-sweep are this pass's
verification, matching this repo's own established posture for these
driver scripts (a re-runnable driver against real data, not a fixture
suite) — eoreader7's own `declension.test.js`/`pos-prior.test.js` (16
cases, S38) carry the mechanism-level regression coverage for the two
new organs themselves.

**Amended same day — hand-reading a real committed file found the EOT
log covers a small SLICE of a document, not the document.** User
question, verbatim, after being handed the English UDHR's real committed
`folded`/`log` content: *"How do we have five edges for 72 sentences??
It's supposed to convert the entire thing into eot."* Checked directly,
not assumed: `hyperlexicon.js::admit()` only ever receives what
`relationsFor` OFFERS it, and `relationsFor` only offers a sentence that
matched a recognisable subject-verb-object shape — a sentence with
nothing SVO-shaped in it is never turned away (that would show up in
`admission.turnedAway`, which reads 0), it is simply never REACHED.
Counted precisely on the two real files already read by hand: English's
5 log entries land on only **4 of 72 sentences (5.6%)** — one sentence
("...have in the Charter reaffirmed... and have determined...") produced
two coordinated-clause edges, which is why 5 entries and not 4; Russian's
2 entries land on **2 of 67 sentences (3.0%)**. The other ~95% of each
document was genuinely READ (chunked, byte-addressed, and — per LP8/LP9
above — 100% self-verified) by the reading layer, but carries no entry of
any kind in the append-only admission log.

**The reframe, and the decision.** This is not a bug LP9's own three
fixes introduced — `hyperlexicon.js`'s own header (P57, the-fold's
POLICIES.md) already states the design plainly: it is a log of HEARD
ASSERTIONS with byte-addressed spans, never a mirror of the source text.
What was missing was saying so this bluntly next to a real number: a
document is not "converted into EOT" in the sense of every sentence
becoming a queryable unit — it is FILTERED through relation extraction
first, and only the shard that survives that filter is ever addressed as
an admission-log entry. For a narrative specimen (War and Peace) that
shard is large enough to reason over usefully; for a legal-preamble
document built from long coordinate clauses (the UDHR) it is not.

Asked directly whether every sentence should get SOME log entry — a real
PROPOSE where a relation was found, a typed "no relation extracted" gap
otherwise — the user's own call: **leave it gapped for now**, so a later
pass can try to assign real structure to what is currently invisible,
rather than papering over the gap with a placeholder entry that would
still carry no actual content. Real, deferred, unstarted work — not
fixed here, and not silently left unstated either.

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
