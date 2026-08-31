# EOTReading@2 — the seed checkpoint and the first two rings, measured

*Re-runnable: `node scripts/build-pos-prior.mjs && node
scripts/build-reading-priors.mjs && node scripts/eot-sidecar2.mjs --ring0
--ring1-sample`; conformance: `node --test
scripts/build-reading-priors.test.mjs` (9/9). Law: POLICIES.md LP7 and its
two same-day amendments (surprise is hypergraph delta; priors are
checkpoints, never weights). Grammar: goldens/reading/RULE.md R1-R12 +
the fourth amendment (the triadic minimum).*

## What was built

Three artifacts, each a **checkpoint** — a content-addressed projection of
live sources, regenerated never edited:

1. **`derived-priors/pos-priors/pos-prior-en.json`** (POSPrior@1) —
   UD_English-EWT (CC BY-SA 4.0) counted per surface form: 19,341 forms,
   254,820 tokens, 16,622 sentences, ambiguity preserved. Built here
   because the canonical eoreader6.1 build is unreachable in this
   checkout (uninitialized submodule, output gitignored there); committed
   with giver and per-file shas, matching act-prior-en.json's precedent.
2. **`derived-priors/reading-priors/reading-priors-v1.json`**
   (ReadingPriors@1, 558KB) — the seed, compiled from the 18 hand goldens
   with the UDHR five as the core: 477 act-expectation keys (per-language
   relation surfaces + POS-elected English heads, every entry witnessed
   `specimen@ground`), per-specimen/per-family frames, the **Rosetta
   matrix** (107 props × 5 languages, full rows; 31 acts; 23
   construction-splits; 21 props absent in ≥1 language, precomputed),
   the surprise event vocabulary, the spiral ring declaration, and the
   firewalls (Goal 5 derived-never-adjudicated; Goal 6 one-reader caveat;
   self-evidence exclusion).
3. **18 `*.eot.json` sidecars** beside their sources — ring 0 (13
   hand-golden source files, 369/369 spans re-verified fresh against raw
   bytes) and a 5-edition ring-1 sample.

## No stop lists — head extraction is measurement

User direction mid-build: "I don't like stop lists, they're a hack." The
hand-typed aux/modal array was deleted the same hour. `headOf` now elects
an English relation's content head from treebank counts alone: among
tokens whose UD dominant class is VERB at the declared 0.5 floor, the
**maximal verb share** wins (earliest on ties). That one rule handles
aux-capable verbs without naming any: "have" is genuinely VERB-dominant
in EWT (963 VERB / 745 AUX — main-verb *have* is real English), but in
"have resulted in" it loses to "resulted" (1.0 vs 0.56) by measurement.
"shall"/"is"/"has" are AUX-dominant and never electable; "the" is DET;
"right" never reaches VERB; an unattested form is never elected (no
evidence, no election). Junk expectation keys (`en|the` existed under the
hand list) are now structurally impossible — pinned by test, not
filtered.

**Disclosed cost, not smoothed over:** EWT's ~19K-form vocabulary misses
real predicates — "compelled" and "endowed" are unattested, so
"is not to be compelled to have recourse" elects "have" (the best
attested verb present) and "are endowed with" elects nothing. Both
outcomes are typed (a lesser head, or `no-verb-head`), never guessed. The
fix ring is a larger treebank checkpoint or per-occurrence resolution
(eoreader7's roles.js — the instance-level organ wordclass.js's own
header already names), not a hand list.

## Ring 0 — the Rosetta graph, built sequentially

The five UDHR readings enter in the declared adjudication order (en → ar
→ es → zh → sw — a construction order, **not** a claim of independence;
Goal 6's caveat rides every figure here). Each sidecar carries the typed
hypergraph deltas its reading contributed:

| reading | corroborated | cell-variant | polarity-variant | absent | unique-so-far |
|---|---|---|---|---|---|
| en (founds) | — | — | — | — | 94 founded |
| ar | 81 | 7 | 1 | 5 | 4 |
| es | 92 | 2 | 0 | 4 | 1 |
| zh | 86 | 10 | 0 | 3 | 4 |
| sw | 87 | 9 | 0 | 7 | 4 |

Readings of the same findings the hand adjudication made, now as
measured graph events rather than prose:

- **The one polarity-variant is `udhr:marriage-consent`** (ar) — same
  cell, mirrored polarity: en "only with the free and full consent" (+)
  vs the Arabic لا…إلا restriction (−). The event carries both rows'
  `because` fields; it is a disclosed construction, not a contradiction.
  A polarity difference riding a cell change (the A4
  negative-existential family, e.g. `udhr:no-distinction-status`
  SEG·Pattern− → NUL·Pattern+) folds into its construction-split event —
  pinned by test.
- **Arabic's absences** include the famous one
  (`udhr:friendly-relations-essential` — the whereas-clause the
  translation genuinely lacks) plus four others
  (`elections-suffrage`, `entitled-realization`,
  `promote-understanding`, `further-un-activities`).
- **An `absent` is a prop-grain fact, not always a hole in the
  translation**: props were pivoted on English verb-spans (R9), so a
  language that folds a predication into another prop's row lands
  absent-here + unique-there. The zh/sw pairing shows it clearly: zh is
  unique on `no-distinction-kind`/`rights-violated`/
  `no-attacks-honour`/`order-realizes-rights` where sw reads those absent
  and is unique on four of its own (`declaration-standard`,
  `nations-make-known`, `dignity-equal`, `rights-set-forth`).
- zh carries the largest cell-variant count (10) — the making-vs-holding
  construction splits the adjudication already recorded.

## Ring 0 — act expectations (non-self + received VerbNet only)

English (the only language the received tiers cover):
**14 act-agreement, 7 act-departure, 31 no-expectation, 42 no-verb-head**
across 94 propositions. All seven departures are readable tensions, not
noise:

| ground | key (tier) | expected | adjudicated |
|---|---|---|---|
| preamble.2.2.1 | enjoy (verbnet) | EVA | SIG |
| preamble.3.1.2 | have (golden) | DEF NUL SEG SIG | INS |
| article-2.2.1 | made (golden) | INS SYN SIG | SEG |
| article-11.2.1.1 | constitute (verbnet) | CON INS | SIG |
| article-21.3.2.2 | held (verbnet) | CON SIG EVA | INS |
| article-25.2.2 | enjoy (verbnet) | EVA | SIG |
| article-26.2.2 | promote (verbnet) | SYN | REC |

`enjoy` (×2) is the known enjoy-frame precedent — the adjudication reads
right-holding (SIG), VerbNet reads experiencing (EVA). `promote` →
REC·Pattern is the promote-frame ruling (ROSETTA-GOALS Goal 1's own
re-typed group). These are the type-level prior meeting the adjudication
frames — the disagreement is the measurement working, and none of it
gates anything. Non-English rows are almost all `no-expectation` (ar
97/97, es 96, zh 102, sw 107): the received tiers are English-only, and
the Goal-5 per-language lexicon (already seeded — the rosetta's surface
keys ARE it) is the named path.

## Ring 1 — five diverse editions, structural claims only

`derived: true` on every one; zero propositions offered; the prop
expectations land as typed `no_lexicon` gaps (LP4: absence of a reading
is a fact about the reader).

| edition | language | articles found | missing | note |
|---|---|---|---|---|
| udhr-fra | French | 29/30 | [1] | "Article premier" — unnumbered first article, disclosed not repaired |
| udhr-rus | Russian | 30/30 | — | Cyrillic headings, ASCII digits |
| udhr-jpn | Japanese | 21/30 | [1–9] | 第一条…第九条 use kanji numerals — outside the received decimal blocks; a disclosed DETECTION gap, not a file defect |
| udhr-007 | Sãotomense | 30/30 | — | "Artigo 1º" |
| udhr-hin | Hindi | 30/30 | — | Devanagari text, ASCII article digits |

Digit detection covers the received Unicode decimal blocks (ASCII,
Arabic-Indic, Extended Arabic-Indic, Devanagari, Bengali — tables closed
by their giver, which is what distinguishes them from the stop list this
pass removed); a mixed-block run refuses as noise. Kanji numerals are a
named absence, not silently special-cased — per-language heading
conventions are the trap succession.js is condemned for.

## What this pass does NOT claim

- **No independence.** One reader adjudicated all five languages with the
  others in view; every agreement figure above measures that reader's
  consistency until Goal 6's blind adjudication runs.
- **No corpus sweep.** 511 UDHR editions remain unread; this 5-edition
  sample IS the LP6-style diverse validation the sweep requires first.
- **No sequential surprise organs yet.** Ring-0 surprise is graph deltas
  against the languages before it — the right measure at this grain; the
  tier-stack/expectation organs (eoreader7 expectations.js,
  emergence/surprise.js) join when readings start arriving
  increment-by-increment rather than golden-at-a-time.
- **Nothing here is a weight.** Every artifact is a checkpoint of the
  live record (LP7 second amendment); the goldens and the sidecars' own
  logs stay the reality, and the next checkpoint is a recompile.
