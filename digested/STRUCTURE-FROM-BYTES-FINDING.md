# STRUCTURE-FROM-BYTES-FINDING — the structural tier does not need language organs

**Dated:** 2026-09-13
**Giver:** live_priors corpus build (canon fetchers + `scripts/extract-source-structure.mjs`)
**Related law:** LP20, LP19 property 4 ("Structure is INFERRED and carries its basis")

## The finding

The proposition layer of the reading organs is English-shaped. Measured on the
same day the St. John's canon fetchers landed: IAST Sanskrit reads at 1.7–6%
coverage behind a false `clean` gate (LP20), Japanese and Arabic at 0% behind
`gapped_script`. None of that means the *structure* of those sources is
unreadable — because structure is not owned by any language organ. It lives in
bytes: delimiters, reference IDs, and typographic rows that the sources
literally spell out.

## The evidence: every delimiter is in the text

| source | structure carried in raw bytes | detected |
|---|---|---|
| Kaṭha Upaniṣad | `// kau_1.1 //` — danda-wrapped verse IDs at line end | 119 verses |
| Bhagavadgītā | `Bhg_01.001 [=MBh_06,023.001]` — verse IDs + cross-refs, speaker turns (`uvāca`) | 1,455 rows |
| Ṛgveda (Aufrecht) | `\|\| RV_1,003.07` — danda + comma-separated book.hymn.verse | 10,552 verses |
| Vālmīki Rāmāyaṇa | `RV_1.1.1`-style śloka refs | 18,761 verses |
| Meghadūta | `// KMgD_1` — bare danda-wrapped id | 112 verses |
| Nyāya/Vaiśeṣika Sūtras | `1.1.1:` — adhyāya.pāda.sūtra at line start | 65–771 sutras |
| Homer (Greek) | one line per verse, line numbers at intervals, `;` = question mark | 15,226 rows |
| Japanese prose | `。` `、` — no spaces, sentence stops | 9–16,031 units |
| Arabic prose | `.` `،` — clause and period stops | 363–8,110 clauses |
| Latin prose | `.` `;` — ordinary sentence stops | 423–21,891 sentences |

107 sources, 199,169 structural units, zero sources left unsplit — every
boundary byte-anchored and carrying the *basis* that licensed it (the literal
delimiter and its byte position), per LP19 property 4 and property 6.

## Why this matters for LP20

A romanized script passes the reader's script check (its letters are cased) and
fails the proposition layer (its language has no organs), so a Sanskrit sidecar
looks `clean` with 1.7% coverage — a near-empty read wearing a clean label. The
structural tier is the honest counterweight: **regardless of what the
proposition layer can do, the corpus can now always say what a source is made
of — its verses, sutras, clauses, chapters — from bytes alone.** Structure is
the floor under every language. LP20's `romanized_gap` typing should sit on top
of it, never replace it.

## What ships

- `scripts/extract-source-structure.mjs` — the byte-driven structural tier.
  Delimiters are *detected by probing which actually occur in the body*, never
  assumed from a filename; a source with no detectable delimiter is reported
  `unsplit`, never guessed.
- 107 `*.structure.json` sidecars beside the new canon sources, each
  `SourceStructure@1` — byte ranges in the source's own coordinates (offsets
  carried past frontmatter), unit type, the licensing evidence, and the unit id
  where the source names one.
- `manifests/source-structure-manifest.json` — the sweep record.

## What this does not claim

The structural tier is not a reading of content. Verse boundaries are not
propositions. It is the load-bearing scaffold LP19 property 4 already
prescribed — inferred, evidence-carrying, contestable — now demonstrated
across six script families that the proposition layer cannot yet read.