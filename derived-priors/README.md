# derived-priors

Everything under this directory is **computed from** the numbered source
categories (`01-literature-books/`, etc.), never itself a source text. It
does not belong to any of the 17 categories the top-level README describes
— those map to `eoPriors/docs/corpus-sources.md`'s own fixed catalog of
*where a text came from*; this directory is *what was measured about* texts
already here, and grows independently of that catalog.

Each subdirectory is one measurement kind. Every file states its own
schema, giver, and the exact declared parameters that produced it — the
same discipline the source corpus holds itself to (frontmatter, provenance,
pull status) — so a reader can tell a measured number from an asserted one.

## `fold-reading-priors/`

`FoldReadingPrior@1` — for one "read" text, how relevant each candidate
prior in this corpus is to predicting what comes next in it, measured two
independent ways (an order-4 interpolated Witten-Bell mixture-of-experts
share via `eoreader6.1/packages/engine/generation/belief.js`, and gzip
Normalized Compression Distance) that do not always agree — both are kept,
disagreement included, rather than collapsed to one number.

**This is a declared recipe and a measured verdict, not a resumable model
snapshot.** `belief.js`'s trained layers have no export/import hook, so
"bootstrapping" from one of these files means re-running training from its
`declared_params` and `priors` list (deterministic, reproducible) — not
loading serialized weights. Each file's own `known_limitation` field says
this again in place, since it's easy to assume otherwise from the name.

Each file's `history` array is meant to grow: a later reading session that
re-measures the same read text appends a new dated entry rather than
overwriting the first one, so the record shows how the verdict moved, not
just where it currently stands.

## `lavar-priors/`

`LaVarPrior@1` — for one text, composition affordances, kind parameters, and
relational structure that a frontier model caught by reading the material
directly, meant to enter the hyperlexicon as given, with LaVar named as the
giver (see `LAVAR.md` at this repo's root — a reading agent that grades a
small structural reader against source material and keeps a curriculum of
its own corrections; the eoreader7-side action items it names live in a
copy at `eoreader7/LAVAR.md`). Every `priors[]` entry carries a byte `address` into
`read.source_path` — a claim with no address behind it is a typed gap here,
not a prior — and a `confidence` note stating how much of the text backs it
(one passage vs. a full read).

`scripts/lavar-prior-scaffold.mjs` does only the part a script can do
honestly: hashing the source file and counting its words, then laying down
a skeleton with `priors: []` and `mistakes: []` for a LaVar session to fill
by hand. It refuses to overwrite an existing file, so a second run can
never blow away hand-written judgment.

`mistakes[]` holds revision records once a `sidecar` (an eoreader7 reading)
exists to disagree with — an empty array here means either a clean read or
no sidecar yet, and the file says which. `history[]` grows the same way
`fold-reading-priors/`'s does: a later pass appends, never overwrites, so
the record shows a verdict moving rather than only where it currently
stands.

This directory holds worked examples ahead of the children's-book corpus
LaVar's ladder (rungs 4 in the directive) is meant to run against; entries
here should not be read as a completed pass over any book.
