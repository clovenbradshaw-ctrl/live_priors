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

### Language and script — a real, three-tier finding, not a guess

`surfaces.js`'s referent-candidate detector gates on Unicode case:
`CAP_TOKEN = /^[\p{Lu}][\p{L}'']*$/u`, `LOWER_TOKEN` the lowercase mirror
(checked directly in `eoreader7/native/adapters/text/surfaces.js`). Six
languages were picked to test this — two cased-Latin, one cased-non-Latin,
three genuinely uncased — and the result is not the flat "case scripts
work, uncased scripts don't" a reader might expect from that fact alone:

1. **Cased Latin, real content (fr).** 54 surfaces over 50 sentences, 5
   referents, 84 edges — genuine French subjects and objects ("amour —du→
   savoir", "Au cours —du→ temps"). Reading is real. The connectors are
   often prepositions rather than verbs (`extractRelations`'s clause
   matching is English-SVO-shaped, not universal), so the *shape* of a
   French edge is frequently loose — disclosed, not hidden by the count.

2. **Cased non-Latin, genuinely foreign prose (el).** Greek has real
   Unicode case, so `CAP_TOKEN` *can* fire — and still: 1 edge from 81
   sentences, and that edge is `The Death —of→ Socrates`, an **English**
   image caption ("Αρχείο:David - The Death of Socrates.jpg") riding in
   the raw file, not a sentence of the Greek article itself. Case alone
   does not make this pipeline read a language — `discoverRelationVocab`'s
   own anchor vocabulary and closed classes (negation, determiners) are
   English, so genuinely Greek prose offers it nothing to anchor on, and
   only incidental English fragments surface.

3. **Uncased scripts (he, ko, fa).** Hebrew and Korean collapse almost to
   nothing — 6 and 15 surfaces over 79 and 129 sentences — confirming the
   Unicode-category fact directly: neither script has a single `\p{Lu}` or
   `\p{Ll}` character, so `CAP_TOKEN`/`LOWER_TOKEN` are structurally inert
   on them. What little surfaces is, again, English residue: `"Internet
   Encyclopedia —of→ Philosophy..."`, `"The School —of→ Athens\" by
   Raffaello Sanzio..."` (he); a garbled, first-letter-eaten citation,
   `"enny Teichmann —and→ Katherine C"` (ko, from "Jenny Teichmann"). Farsi
   surfaces more (42, vs. Hebrew's 6 and Korean's 15) because more Latin-
   script citation debris happens to sit in that particular article, not
   because Farsi script itself is being read — its own folded edges are
   the same English caption/citation shape (`"Avicenna Portrait —on→
   Silver Vase..."`), plus one case where a garbled English/numeric
   citation swept up a long, genuine run of real Farsi prose as its
   "object" — a span-selection failure, not evidence the clause was read.

4. **Cased Latin, agglutinative morphology (tr).** 178 surfaces, 17
   referents — real per-language detection is working — but the *edges*
   are a mix of genuine (garbled) Turkish and plain English citation debris
   side by side: `"Afrika —demografisiafrikalı→ insanlar tarafından
   yapılan"` (a real Turkish sentence, but the "verb" is a run-on
   agglutinated span the English-clause-boundary heuristic could not
   segment) next to `"0739136682 Philosophy —in→ an African Place]"` (an
   ISBN plus a citation title). Referent-level reading is real; clause-
   level extraction is not reliable on this language's syntax.

**The honest summary:** this pipeline's identity layer generalizes exactly
as far as Unicode's own `Lu`/`Ll` categories reach, and no further — its
relation-extraction layer additionally needs the material's own clause
shape to resemble English SVO, which French mostly does, Turkish partly
does, and nothing else tested here does at all. Neither limit was fixed;
both are named so the next reader does not have to re-measure them.

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
