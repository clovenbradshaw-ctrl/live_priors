# GROUND-EXPERIMENT-FINDING — what ground actually helps a reading, measured

**Dated:** 2026-09-13
**Giver:** live_priors canon build + eoreader7 `eot-jsonl.mjs` (the S95 ledger reader)
**Related law:** S112 (the received floor), LP7 ("declared priors are its GROUND, not merely its filter"), LP19 (the shape of a good reading), LP20 (romanized script)

## The question

LP7's rule: a reading's declared priors must be its **ground** — the expectation
it reads *with*, not a filter applied afterward. The reader's one implemented
ground is the **received verb floor** (S112): every form whose (VERB+AUX) share
in a POS prior clears a share floor is admitted to the verb vocabulary before
the read begins. This experiment asks which ground actually helps, on the
canon's languages, by swapping the ground and measuring the same material.

The mechanism: `eot-jsonl.mjs` gained a `--pos=<path>` override, so the floor
can be pointed at a different prior. All reads below are the same driver, same
chapter (whole-document fallback for chapter-less verse), only the ground moves.

## The measurement

| read | ground | propositions | referent purity | voids | per-sentence | verdict |
|---|---|---|---|---|---|---|
| Sappho (Ancient Greek) | **UD grc** (15,253 verb forms) | **61** | 0.09 | 0.08 | 0.19 | reads |
| Sappho (Ancient Greek) | UniMorph grc (0 verb forms) | **0** | — | — | — | **ground collapse** |
| Sappho (Ancient Greek) | earned only (`--no-received-verbs`) | 38 | — | — | — | floor = +60% |
| Tacitus (Latin) | eng (no Latin prior exists) | 275 | **0.99** | 0.00 | 0.38 | **reads well** |
| al-Ghazālī (Arabic) | UD arb (3,338 verb forms) | 452 | **0.00** | 0.14 | 1.08 | **over-emits — confidently wrong** |
| Kaṭha Upaniṣad (Sanskrit IAST) | eng (no IAST prior exists) | 13 | 0.14 | 0.00 | 0.11 | romanized gap — near-empty, honest |

Every read: recoverability 100% (the address layer is language-general, S103
again). The differences are all in what the ground let the reader *hear*.

## Findings

1. **The ground that supplies VERBS is the ground that enables reading.** Greek
   with the UD verb floor reads 61 propositions; swap the floor to UniMorph
   grc — which contains 33,328 nouns and adjectives and **zero verbs**
   (measured, not assumed) — and the reading collapses to **0**. The floor is
   not decoration: remove its verb coverage and the reader has no vocabulary to
   find a relation with. This is S112's finding reproduced on Ancient Greek,
   and it also retro-justifies LP7: a prior named but not *expected with* is
   not ground.

2. **UniMorph is not the ground for Greek or Sanskrit verbs — measured, not
   assumed.** UniMorph `grc` and `san` are noun/adjective paradigm tables with
   no V rows at all. The LAVAR 2026-09-12 note's plan (fetch UniMorph full
   forms to complete the received floor for rich inflection) holds for
   languages where UniMorph carries verbs — jpn (10,848 verb-dominant) and fas
   (26,486) — but **not** for grc or san. The four UniMorph priors were built
   and committed anyway (`pos-{grc,san,jpn,fas}-unimorph.json`), because their
   measured content is itself the finding: grc/san supply nouns, jpn/fas supply
   verbs. Sanskrit's UniMorph is additionally **Devanagari**, while the canon is
   IAST — a second, independent reason it cannot widen the IAST floor without a
   transliteration transform (named, not built — LP20's work).

3. **Latin reads well on an English ground — S40's prediction does not hold
   here.** S40 warned the positional reader breaks on case-marked languages
   (Latin's six cases). Measured on Tacitus: **referent purity 0.99** (121 real
   beings — Tiberius, Germanicus, the actual cast), 275 propositions, zero
   voids. Latin's SVO order and capitalised proper names survive the
   English-shaped reader intact. The prediction was about *role assignment*
   under case marking; the measured read shows the failure is not where it was
   predicted, which is the point of measuring rather than asserting.

4. **Arabic over-emits — the S103 "confidently wrong" shape, not a ground
   problem.** 452 propositions in 419 sentences (per-sentence 1.08) with
   **referent purity 0.00**: the positional reader finds verbs and binds
   paragraph-sized run-on objects, so the count looks rich and is mostly wrong.
   More ground would not fix this; an Arabic-shaped end-role adapter would. This
   is worse than the honest near-empty (S103's own lesson) because it looks
   like a full reading.

5. **The visual system is not the fix here — its gate says so.** LAVAR §14
   licenses "looking" only on a *measured* formatting misread, and
   `weirdFormattingScore` returns **0 on all four** sources: the bytes are
   ordinary prose. The failures above are language-shape, not layout — reaching
   for the visual system would be speculative, which §14 forbids.

## What this licenses

- Greek and Latin are **readable now** on the ground that exists (UD grc; the
  English floor for Latin).
- Arabic needs a **shape adapter** (end-role assignment for a pro-drop,
  case-marked, no-capitalisation language), not more priors.
- Sanskrit IAST is **LP20's romanized gap made concrete**: the only Sanskrit
  verb evidence available is Devanagari (UniMorph) and does not match the IAST
  bytes; the honest read is near-empty and says so (13 propositions, 103 typed
  absences).
- The ground experiment is **re-runnable**: `--pos=` on the same material is
  the whole apparatus, and a future language's ground is scored the same way.
