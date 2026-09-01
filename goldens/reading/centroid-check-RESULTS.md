# Centroid cross-check — what the second opinion turned out to measure

*2026-08-31. Driver: `centroid-check.py`. Centroids:
`external/archetypes-27-*.json`, vendored from eo-lexical-analysis-2.0
commit `4d3c8154` (multilingual embedder
`paraphrase-multilingual-MiniLM-L12-v2`, 384-d; the source repo's own
holdout eval for these centroids: top-1 40%, top-3 65%, chance 3.7%).*

## The numbers

Across all 117 re-adjudicated UDHR rows, the hand-assigned cell appears in
the centroid classifier's **top-1 for 7 rows (6%)** and **top-3 for 12
(10%)** — barely above the 3.7% chance floor, and far below the
instrument's own 40%/65% ceiling on its home corpus.

## Why this convicts the instrument here, not the goldens — the attractor
evidence, not an assumption

Per language, the classifier's own favourite predictions:

| lang | top-1 agree | classifier's dominant outputs |
|---|---|---|
| en | 1/21 | EVA·Pattern ×9, SYN·Pattern ×6 |
| ar | 2/23 | EVA·Pattern ×10, SYN·Pattern ×5 |
| es | 1/24 | EVA·Pattern ×10, SYN·Pattern ×5 |
| zh | 1/24 | EVA·Pattern ×9, SYN·Pattern ×4 |
| sw | 2/25 | **SIG·Figure ×15**, EVA·Pattern ×6 |

An instrument that returns the same cell for *"all human beings are born
free"* (a birth), *"their faith reaffirmed"* (an attitude held), and
*"human rights protected by the rule of law"* (an arrangement) is not
reading the distinctions at all — it has collapsed onto two attractor
cells for the Latin/Han languages and onto a single one for Swahili
(SIG·Figure on 15 of 25 rows regardless of content, which reads as the
embedder's Swahili coverage failing, not as semantics).

Two causes, both anticipated by the source repo's own materials:

1. **Domain shift.** The archetypes were built from web/news clauses
   selected toward *transformations*; its own screening file
   (`data/transformation-judgments.json`) records 97 of 200 natural
   clauses asserting no change at all. The UDHR window is formal
   declaratory legal prose — copular, deontic, static — the register the
   archetype corpus systematically under-represents.
2. **Embedder language coverage** — the Swahili attractor above.

## What survives

- Per protocol every disagreement was to be re-inspected by hand — and
  this pass had just re-read all 117 rows verb-first, so that obligation
  was already discharged; a flag list covering 90% of rows in uniform
  attractor patterns adds no discrimination on top of it.
- One small, honestly-weighted convergence: `faith-reaffirmed` is the one
  prop where the classifier's top-1 OPERATOR matches the hand assignment
  (EVA, in en/es/sw) — a minor independent vote for this pass's REC→EVA
  retyping, worth exactly as much as a weak instrument's vote is worth.
- The instrument remains plausibly useful **in its own domain**: Goal 4's
  deliberately change-heavy specimens (the REC/SEG/NUL gap-fillers), and
  as a floor-check on machine-derived readings. It is NOT a validator for
  declaratory legal prose, and nothing in this project should cite
  agreement-with-these-centroids as evidence about the UDHR goldens.

## The standing conclusion

The only validation that can settle ROSETTA-GOALS' falsification
condition remains Goal 6's independent blind adjudication. This check's
value was negative and real: it establishes that the nearest available
automatic second opinion cannot serve, and why — measured, not assumed.
