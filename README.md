# live_priors

A living corpus of source texts, organized by the 17 categories from [`eoPriors/docs/corpus-sources.md`](https://github.com/clovenbradshaw-ctrl/eoPriors/blob/main/docs/corpus-sources.md).

This repo **pulls** the sources — not just catalogs them. Texts are stored as documents with fetch scripts for every API-accessible source.

## What's Here

| Directory | Content |
|---|---|
| `01-literature-books/gutenberg/` | 23 texts (Shakespeare, Pride & Prejudice, Moby Dick, Frankenstein, etc.) |
| `02-encyclopedic/wikipedia/` | 70+ articles across philosophy, science, history, literature |
| `06-government-legal/federal-register/` | 10 recent Federal Register documents |
| `09-source-code/` | 20 repos (Linux, SQLite, CPython, Rust, Go, TypeScript, etc.) |
| `10-audio-music/` | Metadata catalog across 16 categories (200+ items) |
| `14-holy-texts/` | Tanakh (43), Quran (4+114), SBLGNT (109), Nestle1904 (31) |
| `15-western-canon/folger-shakespeare/` | Bulk text + XML + 15 individual plays |

See [`SOURCES.md`](SOURCES.md) for the complete catalog of ~120 sources with pull status.

## Running the Fetchers

```bash
# Fetch everything automatable
node scripts/run-all.mjs

# Fetch specific sources
node scripts/run-all.mjs --only gutenberg sefaria quran

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
