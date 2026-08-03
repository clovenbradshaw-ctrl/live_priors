# live_priors — Pull Status

This file tracks **what has been pulled** into this repo. The canonical source catalog with URLs, access methods, and legal status is [`eoPriors/docs/corpus-sources.md`](https://github.com/clovenbradshaw-ctrl/eoPriors/blob/main/docs/corpus-sources.md) — this file does not duplicate it.

## Pull Status by Category

| Category | Sources | Pulled | Notes |
|---|---|---|---|
| 1. Literature | 6 | ✅ 23 texts (Gutenberg) | Shakespeare, P&P, Moby Dick, Frankenstein, Meditations, Republic, Origin, Divine Comedy, Les Mis, Faust, Don Quixote, Iliad, Aeneid + more |
| 2. Encyclopedic | 4 | ✅ 70+ articles (Wikipedia) | Philosophy, science, history, literature, religion, music, math, CS, linguistics |
| 3. OER/Textbooks | 8 | ⬜ | No bulk APIs available |
| 4. Pre-aggregated | 2 | ⬜ | Common Pile/RedPajama require local HF datasets |
| 5. Academic papers | 4 | ⬜ | arXiv needs S3; PMC via FTP |
| 6. Government/Legal | 6 | ✅ 10 docs (Federal Register) | CourtListener/LOC returned 401/403 |
| 7. Images/Media | 4 | ⬜ | Not yet scripted |
| 8. News | 4 | ⬜ | No clean rights at volume |
| 9. Source Code | 20 | ✅ 20 repos | Linux, SQLite, CPython, Rust, Go, TypeScript, Spark, Flask, llama.cpp, Postgres, Deno, ripgrep, bat, FastAPI, Ruff, Rails, Zig, Godot + more |
| 10. Audio/Music | 5 | ✅ Metadata (16 categories) | Actual media requires separate download |
| 11. Multi-language | 6 | ✅ 3 languages (Gutenberg) | French, German, Spanish |
| 12. Non-Western Music | 5 | ✅ Great 78 metadata | Other sources not yet pulled |
| 13. Mysticism | 3 | ⚠️ Index pages only | Cloudflare blocks sacred-texts.com |
| 14. Holy Texts | 10 | ✅ 297 files | Tanakh (43), Quran (4+114), SBLGNT (109), Nestle1904 (31). SuttaCentral API changed |
| 15. Western Canon | 8 | ✅ Shakespeare + 8 CCEL | Folger bulk + 15 plays. CCEL short extracts only |
| 16. Organic/Community | 10 | ⬜ | Ganjoor, StoryWeaver, African Storybook not yet scripted |
| 17. Formal Algebraic | 11 | ⬜ | All catalogued, none fetched (PDFs/images/specialized formats) |

**Total:** ~120 sources catalogued in eoPriors. ~150+ texts/documents pulled here + metadata for ~200+ media items. ~87MB of content in-repo.

## Fetched Content Details

### 14. Holy Texts
- **sefaria/** — 43 texts: Torah (5), Neviim (21), Ketuvim (13), other (4), Hebrew + English (JPS)
- **tanzil-quran/** — 4 editions (Arabic Uthmani, Sahih International, Yusuf Ali, Pickthall) + 114 parallel surahs
- **sblgnt/** — 109 files, 7.8M chars (SBL Greek New Testament)
- **nestle1904/** — 31 files, 46M chars (Nestle 1904 Greek NT)

### 15. Western Canon
- **folger-shakespeare/** — Bulk text zip (2.2MB), bulk XML zip (22MB), Gutenberg fallback, 15 individual plays
- **ccel/** — 8 short extracts (Christian Classics Ethereal Library)

### 9. Source Code
20 repos with READMEs, LICENSEs, and representative source files: torvalds/linux, sqlite/sqlite, python/cpython, rust-lang/rust, golang/go, microsoft/TypeScript, apache/spark, pallets/flask, ggerganov/llama.cpp, racket/racket, ghc/ghc, postgres/postgres, denoland/deno, BurntSushi/ripgrep, sharkdp/bat, tiangolo/fastapi, astral-sh/ruff, rails/rails, ziglang/zig, godotengine/godot

## eochat Consumption

eochat consumes this corpus via `live-priors-source.js`:

```js
// Get the directory tree for browsing
import { livePriorsTree } from './server/live-priors-source.js';
const tree = livePriorsTree();

// Read a specific file
import { readLivePrior } from './server/live-priors-source.js';
const result = readLivePrior('14-holy-texts/sefaria/torah/genesis.txt');
```

**Key paths:**
- `livePriorsTree()` — returns the full directory tree with file counts
- `readLivePrior(relPath)` — reads file contents by relative path
- `livePriorsCategories()` — lists the 17 top-level category folders

**Consumption boundary:** eochat reads these files on demand when a user navigates to them in the Priors tab. It does NOT auto-ingest them into the engine. The JSON artifacts in `eoPriors/priors/` are the ingested priors; this corpus is the raw material they were built from.

## Pulling Remaining Content

### Quick wins (API-accessible, no auth)
```bash
node scripts/fetch-wikipedia.mjs  # modify ARTICLES array for other langs
node scripts/fetch-gutenberg.mjs  # add IDs to TEXTS array
```

### Requires local execution
```bash
# HuggingFace datasets (run locally)
pip install datasets
python -c "from datasets import load_dataset; ds = load_dataset('common-pile/doab')"

# Gutenberg bulk via rsync
rsync -av aleph.gutenberg.org::gutenberg ./gutenberg-mirror/
```

### Requires browser/manual download
- sacred-texts.com (Cloudflare protected) — use browser or archive.org mirrors
- CCEL full texts — browse https://ccel.org/ccel/{author}/{work}
- HathiTrust — apply for research access at hathitrust.org

### Requires API keys
- CText (Chinese Text Project) — free key at ctext.org/tools/api
- CORE (academic papers) — free key at core.ac.uk/services/api/
