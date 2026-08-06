# live_priors

A living corpus of source texts, organized by the 17 categories from [`eoPriors/docs/corpus-sources.md`](https://github.com/clovenbradshaw-ctrl/eoPriors/blob/main/docs/corpus-sources.md).

This repo **pulls** the sources — not just catalogs them. Texts are stored as documents with fetch scripts for every API-accessible source.

**Every document carries at least 600 words.** A prior you cannot measure structure against is
not a prior; see [The 600-word floor](#the-600-word-floor) below.

## What's Here

2,044 documents. The largest section is government and legal, which holds official texts
published by institutions in 28 jurisdictions.

| Directory | Content |
|---|---|
| `01-literature-books/` | 43 complete works (Gutenberg + GITenberg) |
| `02-encyclopedic/` | 54 articles (Wikipedia, 1911 Britannica) |
| `05-academic-papers/open-access-books/` | 94 chapters from open-licensed scholarly books |
| `06-government-legal/world-legislation/` | **449 statutes and codes from 28 jurisdictions** |
| `06-government-legal/un-udhr/` | **516 translations of the Universal Declaration of Human Rights** |
| `06-government-legal/world-factbook/` | **255 CIA World Factbook country profiles** |
| `09-source-code/` | 20 repos: source, licences and upstream documentation |
| `14-holy-texts/` | 492 files — whole books of the Tanakh, Greek NT, Qur'an and Pali canon |
| `15-western-canon/folger-shakespeare/` | Bulk text + XML + 15 individual plays |

See [`SOURCES.md`](SOURCES.md) for the complete catalog with pull status, and
[`06-government-legal/ATTRIBUTION.md`](06-government-legal/ATTRIBUTION.md) for the rights notice
each publishing institution requires.

## Government & Legal

`06-government-legal/` holds 1,220 documents from institutions around the world:

- **National legislation** — Andorra, Argentina, Austria, Belgium, Chile, Colombia, Czechia,
  European Union, Finland, France, Germany, Greece, Italy, Latvia, Liechtenstein, Luxembourg,
  Netherlands, Norway, Poland, Portugal, Romania, Slovakia, Spain, Sweden, Switzerland,
  United Kingdom, United States, Uruguay. Each file keeps the publisher's YAML frontmatter:
  official source URL, publishing department, publication date, in-force status.
- **UN Universal Declaration of Human Rights** in 516 languages, as encoded by OHCHR.
- **CIA World Factbook** country and region profiles, rendered from JSON to prose.

Rights vary by publisher. Official legal texts are outside copyright in most of these
jurisdictions (Germany §5 UrhG, US 17 USC §105, Poland, Czechia, Sweden, Switzerland and
others). The UK (OGL v3.0), EU (CC BY 4.0), France (Etalab v2.0) and Spain publish under open
licences that require attribution, and those notices are carried in `ATTRIBUTION.md`.

Converted Markdown is not the authentic legal instrument — only the text published in the
issuing institution's official gazette is authoritative.

## The 600-word floor

`scripts/enforce-min-words.mjs` is the corpus quality gate:

```bash
node scripts/enforce-min-words.mjs           # audit: what is under the floor
node scripts/enforce-min-words.mjs --prune   # delete it, and record what went
node scripts/enforce-min-words.mjs --min 800 # a different floor
```

The pass that introduced the floor removed 886 fragments — museum accession records, arXiv
abstracts, single scripture verses, one-paragraph gazette notices — and replaced them with the
whole works they were fragments of: complete books of the Tanakh rather than verses, complete
novels rather than excerpts, statutes rather than summaries. Media metadata, which is
legitimately short per item, was folded into one catalogue document per collection by
`scripts/consolidate-media-catalogs.mjs` rather than discarded.

Word counting is script-aware, so Chinese, Japanese, Korean and Thai documents are measured by
codepoint rather than split on spaces. `manifests/min-words-audit.json` records every removal.

## Running the Fetchers

```bash
# Fetch everything automatable, then build catalogues and enforce the floor
node scripts/run-all.mjs

# Fetch specific sources
node scripts/run-all.mjs --only gutenberg sefaria quran

# World legislation, UDHR and Factbook (optionally a subset of jurisdictions)
node scripts/fetch-world-government.mjs
node scripts/fetch-world-government.mjs --jurisdictions de,fr,uk

# Whole books, works and chapters that replaced the pruned fragments
node scripts/fetch-replacements.mjs --only scripture

# Download actual media files
node scripts/download-archive-media.mjs --category classical-music --limit 5
```

## eochat Consumption

eochat reads this corpus via `live-priors-source.js`:

```
live_priors/
  └── [numbered category folders]
        └── [source subfolders]
              └── [actual text files]
```

The `livePriorsTree()` function exposes the directory structure for browsing. `readLivePrior(relPath)` reads file contents by relative path. eochat never ingests these files directly — it reads them on demand when a user navigates to them in the Priors tab.

Directory layout is unchanged by the government expansion — `world-legislation/` adds one
subfolder per jurisdiction, which browses the same way as any other source subfolder.

**Two-layer consumption model:**
- **eoPriors/priors/** — JSON artifacts (corpus-prior.json, coref/*.json) ingested into the engine's priors pool via `priors-source.js`
- **live_priors/** — Raw corpus texts browsable via `live-priors-source.js`, never auto-ingested

The boundary matters: a prior is witness-tier knowledge ABOUT a corpus, not evidence FROM one.

## Multi-Dimensional Prior Similarity

The `src/priors-similarity.js` module implements three-axis similarity navigation:

| Axis | Metric | What it captures |
|---|---|---|
| **Phasepost** | Asymmetric compression (DL) in 27-cell space | *How* content is structured |
| **Surprise** | KL divergence from corpus prior | *How expected* content is |
| **Entity** | Jaccard overlap on coref surfaces | *Who* content is about |

### Why Asymmetric Compression?

Cosine is symmetric; compression isn't:
- **DL(content | prior)**: "is this content an instance of what the prior knows?"
- **DL(prior | content)**: "does this content reveal the structure the prior gestured at?"

The **asymmetry** = `DL(prior|content) - DL(content|prior)` is the signal cosine loses.

```js
import { queryPriors, compressionDistance } from './src/priors-similarity.js';

const result = await queryPriors({
  measurements: { /* 27-cell phasepost measurements */ },
  textStats: { bins: { veryLow, low, mid, high, veryHigh }, mean },
  surfaces: 'raw text or Set of entity surfaces',
}, '/path/to/eoPriors/priors', {
  weights: { phasepost: 0.4, surprise: 0.3, entity: 0.3 },
  topK: 10,
});
```

## Relationship to eoPriors

- **eoPriors** = "how we measure what we know" (ledger, compression, projection)
- **live_priors** = "what we know" (the actual texts)
