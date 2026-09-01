# `digested/` — EOT readings of a sample of this corpus

Fourteen sources from this repository, each read once and committed as an
**EOT event stream** — the-fold's own load-bearing line, one register over
from its `store.js`: *"the reality of the database should be the EOT event
stream, the current state always projected."* What is in each JSON file
under this directory is not a summary of a source. It is the actual
append-only log `hyperlexicon.js::admit()` produced when it read that
source: every assertion heard, its witness, its byte-addressed span into
the excerpt that was read, and every offered assertion turned away, named
why. `folded` alongside it is that log's current projection — the fastest
way for a person to see what it says without replaying the log by hand.

**Standing policy governs what is in here.** `../POLICIES.md` (LP1–LP5) is
the law for this directory: a source is immutable and never replaced by a
reading (LP1); a reading is Talmud — anchored, attributed, append-only,
defeasible — and grows by a gate rather than a cap (LP2); a reading's
addresses must resolve in the source's own coordinates, **and today's do
not** (LP3, measured); what the priors app may and may not do with a reading
(LP4); and why recipe identity is the prerequisite for making this directory
genuinely append-only (LP5). Read it before changing how anything here is
produced or consumed.

Reproduce with `node scripts/eot-digest.mjs` from this repo, checked out as
a sibling of `../the-fold` and `../eoreader7` (see **Organs**, below, for
exactly what those two supply).

## What "EOT reading" means, concretely

Each source becomes ONE passage — a bounded excerpt of that file, addressed
by its own slug — read once by the-fold's `hypergraph.js::makeRelationReader`.
Its output edges (subject/verb/object triples, each with a byte-addressed
span into the excerpt) are handed to `hyperlexicon.js::admit()` against a
fresh log. The admitted log carries real `task-log.js` PROPOSE/SUPERSEDE
entries, each with its cube cell attached (`INS·Figure` on a first sighting,
`SYN·Figure` on a re-sighting — eoreader7's `cube.js::cellOf`, never chosen
by hand). A person reading one of these JSON files is reading the actual
record a checking organ would read, not a paraphrase of it.

**Self-verification (P5.2's law, applied here).** Every emitted span is
checked against the excerpt's own bytes — `excerpt.slice(start, end) ===
span.text` — before anything is written, and the pass rate is reported
per source (`spanSelfVerification` in each JSON). This caught a real bug
while this digest was being built (below); every source in the committed
batch now verifies at 100%, or 0/0 where a source yielded no edges at all.

## Organs — eoreader7 native only, nothing legacy

This digest reaches into two sibling checkouts: `../the-fold`
(`hyperlexicon.js`, `hypergraph.js::makeRelationReader`, `source.js`'s
`stripContainer`/`declaredIdentity`) and `../eoreader7/native` — never
`eoreader7`'s `legacy-eoreader6.1` submodule. eoreader7's own root README
states the law this follows: *"The native implementation lives in
native/kernel/. It has no implementation dependency on EOReader 6.1"* — the
historical layout is pinned "solely for compatibility... while consumers
migrate," and `eoreader7/native/conformance/native-boundary.test.mjs`
enforces it by scanning every `kernel/*.js` file's raw text for any mention
of it at all.

One thing was genuinely missing from `native/kernel/task-log.js` for this to
work — `GRAIN_RANK`, which `hyperlexicon.js` reads to name the Figure grain
without hardcoding the string — and it was added there rather than shimmed
locally (eoreader7 PR, spec entry S23): the fact was already implicit in
that file's own imported `GRAINS` ordering, so the export is
`Object.fromEntries(GRAINS.map((g, i) => [g, i]))`, nothing invented.

**What is injected, and why:**
- `determiners` (DEFINITE + INDEFINITE, lang/en) and `negationWords`
  (lang/en) — both consumed inside `hypergraph.js`'s own endpoint-matching,
  after edges arrive, so they are engine-layout-agnostic by construction.
  Native's own `relations.js` carries the identical `negationWords`
  parameter and default (checked directly). On non-English material both
  are inert — confirmed per-source below, not assumed.
- `classifyConnector` (a Thrax verb-hood lens) is **omitted** — it needs a
  local, gitignored build against the real UD_English-EWT treebank that was
  not run in this environment. `hyperlexicon.js`'s own header names the
  consequence plainly: "with no lens, the verb-hood check does not run and
  no edge is refused for it."
- `verbForms` / `createLemmatizer` (UniMorph-backed recall widening) are
  **omitted** — the-fold's own CLAUDE.md records this as a real, undecided
  default; a digest meant to be trusted stays on the conservative
  configuration.

## The sample

| slug | kind | language | sentences | referents | edges heard | spans verified |
|---|---|---|---|---|---|---|
| wikipedia-lang/fr/philosophie | text | fr | 50 | 5 | 84 | 86/86 |
| wikipedia-lang/tr/felsefe | text | tr | 86 | 17 | 69 | 73/73 |
| wikipedia-lang/el/socrates-related | text | el | 81 | 5 | 1 | 1/1 |
| wikipedia-lang/he/philosophy | text | he | 79 | 4 | 2 | 2/2 |
| wikipedia-lang/ko/philosophy | text | ko | 129 | 6 | 3 | 3/3 |
| wikipedia-lang/fa/philosophy | text | fa | 79 | 21 | 8 | 8/8 |
| gutenberg-non-en/de-path/pg67098 | text-gutenberg | en (see below) | 129 | 9 | 61 | 61/61 |
| images-media/nasa-catalog | catalog | en | 56 | 16 | 22 | 31/31 |
| images-media/met-museum-catalog | catalog | en | 77 | 22 | 18 | 26/26 |
| audio-music/grateful-dead-catalog | catalog | en | 18 | 2 | 2 | 2/2 |
| audio-music/classical-music-catalog | catalog | en | 33 | 1 | 0 | 0/0 |
| source-code/rails-readme | text | en | 50 | 6 | 37 | 39/39 |
| source-code/flask-quickstart | text | en | 118 | 5 | 44 | 45/45 |
| source-code/flask-app-py-RAW | text (negative control) | en | 74 | 5 | 16 | 16/16 |

`index.json` carries this same table as data.

## What was actually found, per axis

### Language and script — two different failures, now told apart

An earlier version of this document ran these together and got one of them
wrong. They are separate layers, they fail for separate reasons, and only one
of them is about script at all.

**Layer 1 — the surface/referent layer, which reads capitalisation.** Every
candidate-surface filter in `surfaces.js` reads case: `CAP_TOKEN`/
`LOWER_TOKEN`, the sentence-initial exclusion, the all-caps typography rules,
and `capitalisationIsSignificant`'s binomial. On a script with no case, none
of them can fire — the organ is not degraded, it is structurally inert, and
every count it returns is about whatever cased debris happens to sit in the
file.

This layer works on **any bicameral script, not just Latin**. Greek reads
genuinely well: 169 candidate surfaces, 5 referents, and the top surfaces are
real Greek proper nouns — `Παπανούτσος`, `Μιλήσιος`, `Αθηναίος`, `Νόηση`.
(An earlier draft of this file claimed Greek "surfaces almost nothing
genuine." That was wrong, and it was wrong because it read Greek's *edge*
count and attributed it to the surface layer. Greek's surface layer is fine.)

It fails on **caseless** scripts, and it used to fail silently. Hebrew
returned 6 surfaces from 79 sentences; Korean 15 from 129 — small, plausible,
and entirely false. The six Hebrew "surfaces" were `School`, `Athens`,
`Raffaello`, `Internet`: an English image caption, never the article.

**This is now a typed gap, not a silent number** — `scriptCoverage` in
eoreader7 native `surfaces.js` (spec entry S24), carried on every digest
under `script` and echoed in `index.json`:

| material | cased letters | gap |
|---|---|---|
| French, Turkish, Greek, English | 100% | none |
| Korean | 16.8% | `script_mostly_without_case` |
| Farsi | 12.7% | `script_mostly_without_case` |
| Hebrew | 3.5% | `script_mostly_without_case` |

The giver for the distinction is the Unicode Character Database's own
`General_Category`: `\p{Cased_Letter}` is exactly the set of letters that
have case. It is looked up per character, not a list of scripts maintained
anywhere. Both boundaries are structural rather than dials — zero cased
letters means the mechanism cannot fire at all; caseless letters in the
majority means most of the material is invisible to it.

**What this deliberately does NOT do is make those scripts readable.**
`surfaces.js`'s own header records that a blanket algorithmic generalisation
across scripts was tried and *reverted*, because a silent claim of
cross-script generality is a worse failure than a disclosed narrow scope.
Inventing a caseless substitute for capitalisation — recurrence, n-gram
salience, position — would be that same reverted move under a new name, and
would need a giver and an invariance fixture per script to be admissible.
So the instrument reports the boundary instead of crossing it, which is what
its own tier discipline already requires: *a missing prior produces a gap,
never a guessed number.*

**Layer 2 — the relation/edge layer, which is English-shaped.** This is the
failure Greek actually has, and it is not about script. `extractRelations`
matches an English SVO clause shape and `discoverRelationVocab` anchors its
candidate verbs on capitalised surfaces. French mostly survives it (84
edges, though its connectors are frequently prepositions rather than verbs —
"amour —du→ savoir"). Turkish partly survives it, with real Turkish subjects
whose "verb" is an agglutinated run the English clause-boundary heuristic
cannot segment ("Afrika —demografisiafrikalı→ insanlar tarafından yapılan").
Greek does not survive it at all: 169 good surfaces, 5 good referents, and
**1** edge — an English image caption. Nothing in this pass fixes that; it
would need a real per-language grammar prior with its own giver, and naming
it is the honest stopping point.

**The summary, in one line each.** The surface layer generalises exactly as
far as Unicode's own case property reaches, and now *says so* where it does
not. The relation layer generalises about as far as English clause shape
reaches, and does not yet say so.

### Catalogs — a boilerplate field 98.5% of one file's own bytes

Both audio catalogs and both image catalogs share one schema (`Institution
/ Rights / Items catalogued`, then one block per item). One field,
`collection:`, is Archive.org's own favourites-list membership for that
item ("fav-088milo", "fav-1jasoncutter"...) — bookkeeping about who starred
something, never a description of it. Measured directly on
`grateful-dead-catalog.txt`: **163,997 of 166,486 bytes (98.5%)** are this
one field. `eot-digest.mjs::stripCatalogBoilerplate` drops it before
reading (disclosed per source as `catalogBoilerplateCharsDropped`) — the
same class of decision P5.3 already names for Gutenberg's own licence text
in this project's sibling repo, applied here to a corpus-specific structural
fact rather than restated as a general reading law.

`classical-music-catalog` legitimately reads as **zero edges**: its whole
15-item catalogue fits inside the excerpt (5,337 of 8,000 characters
available), each item names a distinct artist once, and with nothing
recurring, `discoverReferents`' own recurrence floor admits no referent to
anchor a relation on. `examined: true, edgesFound: 0` — a real check that
found nothing, not a failure to check.

### Code — the boundary, kept visible rather than hidden

Two prose sources (`rails/README.md`, `flask/docs/quickstart.rst`) read
cleanly — they are prose, markdown/RST syntax riding along unstripped, and
produced real edges about the projects they describe. One source,
`pallets_flask/src_flask_app.py`, is a **deliberate negative control**: raw
Python, not prose. It still produced 16 edges, all self-verified — but they
are drawn from the file's own docstrings and comments (`"an SQL —query→ in
debug mode"`, `"as BaseResponse —from→ werkzeug"`), never from the code's
actual syntax, which this pipeline has no notion of at all. Kept in the
sample specifically so that boundary is demonstrated, not asserted.

### A real bug, caught by this digest's own self-verification, and fixed

The first full run of this batch found `spans self-verified: 0/59` on the
Gutenberg source and `14/26` on `met-museum-catalog` — everything else was
100%. Both files have Windows line endings (`\r\n`): 3,654 pairs in the
Gutenberg file, 9 in the catalog. `eoreader7/native/adapters/text/spans.js`'s
own `splitSentences` normalises `\r\n`/`\r` to `\n` *before* computing its
own offsets — so its spans are addresses into the **normalised** string,
while this driver was self-verifying them against the **raw** excerpt, one
character longer per CRLF consumed so far. The fix was not a patched
comparison; it was making the string handed to the reader and the string
checked against it the same string — `eot-digest.mjs` now normalises line
endings once, at excerpt-build time, before either happens. Every source in
the committed batch verifies at 100% (or 0/0) after the fix. This is P5.5
in miniature: the discrepancy was in this driver, not in eoreader7 or
the-fold, and the self-check that exists specifically to catch a silently
wrong address did exactly that.

## A major, separate finding this sample deliberately routes around

Building the language sample, the first source picked from
`11-multi-language/gutenberg-non-en/` turned out to be mislabeled — and
turned out not to be alone. **See `CORPUS-INTEGRITY-FINDING.md`** in this
directory: all 20 of 20 files checked in that subdirectory disagree with
what their own path claims (wrong book, wrong author, and often wrong
language entirely). This sample's own text sources are drawn from
`wikipedia-lang/` instead, each verified by direct inspection before being
selected. One `gutenberg-non-en` file is kept anyway
(`gutenberg-non-en/de-path/pg67098`), labeled honestly as what it actually
is — Winnie-the-Pooh, not Kafka — specifically because it demonstrates
`declaredIdentity` catching exactly this class of problem.

## Reproducing

```
cd live_priors
node scripts/eot-digest.mjs
```

Requires `../the-fold` and `../eoreader7` as sibling checkouts (no
submodule population needed — `eoreader7/native` has no dependency on
`legacy-eoreader6.1`). Writes one `<slug>.json` per source plus
`index.json` to this directory, overwriting what is there.
