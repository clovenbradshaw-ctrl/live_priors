# Goal 6 — blind adjudication: the falsification test, run (LLM-proxy)

*2026-08-31. Method and materials: `scripts/goal6-blind-panel.mjs` built
the sheets; five context-isolated readers (one language each — en, ar,
es, zh, sw) adjudicated 40 aligned propositions blind to every other
language, blind to the stored goldens, from RULE.md Part II's decision
procedure and their own language's rows alone; `scripts/goal6-score.mjs`
scored. Verdicts committed verbatim (`verdicts-*.json`); the key the
readers never saw is `key.json`. ROSETTA-GOALS' falsification condition,
verbatim: "If equivalent propositions do not receive equal phaseposts
under INDEPENDENT adjudication across languages, the Rosetta stone
fails."*

## The sample

40 props present in all five languages: all 22 full-presence
construction-splits (the hard cases, the three grain-breaks included) +
18 unanimous props at stride 3 in document order. One row per prop per
language (first row, declared). Sheets carry sentence, subject, relation,
object, clause, polarity, role — no op, no grain, no because, no prop id,
no hint that other languages exist.

## Panel vs panel — the falsification test

Fleiss' kappa, five raters (languages), 40 items, declared floor 0.4
(agency-civic's discipline: below the floor is reported, never certified):

| level | kappa | verdict |
|---|---|---|
| cell (op·grain) | **0.310** | **BELOW the 0.4 floor — not certified** |
| op alone | 0.323 | below the floor — not certified |
| **grain alone** | **0.525** | **clears the floor** |

Strata: stored-unanimous props — cell 0.321, grain **0.610**;
construction-split props — cell 0.292, grain 0.440. The splits are harder
for everyone, at both levels, as they should be.

**The honest verdict: at CELL level the Rosetta claim is not certified by
independent adjudication.** The op is reader-dependent where the rule
text underdetermines recurring frames. **At GRAIN level it clears the
floor** — and this converges, from a completely independent direction,
with the adversarial-prior ladder's own result (LP8: grain-transfer
97–100% across languages within one reader; cell-transfer 90–99%). Two
different measurements, one conclusion twice: **the grain is the robust
invariant of the phasepost; the op carries convention.**

## Panel vs stored — reproducibility of the original adjudication

| language | cell | op | grain |
|---|---|---|---|
| en | 16/40 (40%) | 40% | 95% |
| ar | 25/40 (63%) | 68% | 90% |
| es | 14/40 (35%) | 38% | 93% |
| zh | 28/40 (70%) | 73% | 90% |
| sw | 21/40 (53%) | 55% | 88% |

**82 of 96 disagreements (85%) keep the grain.** Even where a blind
reader lands a different op, the grain survives.

## Where the disagreement actually lives

Not noise — one convention dominates:

- **stored SIG·Pattern → blind EVA·Pattern: 23 rows (en 11, es 12)** —
  the right-holding frame. The stored adjudication reads "has the right
  to" as a standing held (SIG); the en and es blind readers BOTH read it
  as a claim held against a holder (EVA) — consistently, and consistent
  with each other. RULE.md Part II genuinely underdetermines this: both
  readings survive the mode/domain ladder, and the stored choice is a
  project frame-precedent that lives OUTSIDE the published rule text.
  This one frame accounts for ~24% of all panel-vs-stored disagreement.
- Second family: CON→SIG and INS→SIG drifts on the subjection/endowment/
  imposition frames (the Relate/Generate boundary on caused states) —
  the same frames the construction-split adjudication already marks as
  the cross-language op-variant zone.
- ar's blind reader independently reproduced the negative-existential
  reading (لن يكون هناك → NUL, ليس في هذا الإعلان → NUL) — A4 transfers
  through the rule text alone.

## What follows (the repair path, not taken silently)

The concrete, rule-level repair: **codify the adjudication frame
precedents into RULE.md Part II itself** — a frame table (right-holding →
SIG·Pattern with its reason; subjection; endowment; inclusion; the
promote-frame) so the convention is part of the published rule rather
than the adjudicator's private consistency. Then re-run the panel with
FRESH readers against the amended rule. That is a Goal-1-class amendment
(R12 appends where any stored row changes), and it must never be done by
briefing readers on stored answers — the fix is publishing the
convention, not teaching the test.

Until that runs, the standing consequence for every consumer of these
goldens: **treat the grain as the certified-at-proxy content of a
phasepost, and the op as convention-bearing** — which is exactly the
posture the sidecars' fold already prints ("an op-level variant is
ordinary translation information; a grain break is an alarm").

## Caveats, all of them

- **LLM proxy, one base model.** Five context-isolated sessions of the
  same underlying model are an UPPER bound on independence for agreement
  claims — which cuts two ways: the below-floor cell kappa is thereby
  STRONGER evidence (even same-model readers diverge on ops), and the
  above-floor grain kappa is WEAKER evidence (same-model correlation
  could inflate it). A human pass remains what certification needs.
- **Blindness was instructed, not sandboxed.** Readers were forbidden to
  open any file but their own prompt; the phasepost vocabulary exists
  nowhere outside this repo, so stored-answer leakage has no external
  channel, but the prohibition itself is a residual trust.
- One reader per language, one row per prop, n=40. The kappas carry the
  sample size they carry.
