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
