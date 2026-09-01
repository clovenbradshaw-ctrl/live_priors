# live_priors — Pull Status

This file tracks **what has been pulled** into this repo. The canonical source catalog with URLs, access methods, and legal status is [`eoPriors/docs/corpus-sources.md`](https://github.com/clovenbradshaw-ctrl/eoPriors/blob/main/docs/corpus-sources.md) — this file does not duplicate it.

## The 600-word floor

Every document in this corpus carries at least **600 words**. `scripts/enforce-min-words.mjs`
measures the corpus and, with `--prune`, deletes anything under the floor; the fetchers apply
the same check before writing, so nothing under it comes back. 886 fragments were removed in
the pass that introduced the floor — image accession records, paper abstracts, single verses,
one-paragraph gazette notices — and replaced with the whole works they were fragments of.

Word counting is script-aware (`countWords()` in `scripts/lib/corpus-util.mjs`): Han, Kana,
Hangul and Thai text is counted per codepoint rather than split on spaces, so unspaced scripts
are not mistaken for empty documents.

## Pull Status by Category

| Category | Sources | Pulled | Notes |
|---|---|---|---|
| 1. Literature | 6 | ✅ 43 complete works | 23 via Gutenberg + 20 via GITenberg (War and Peace, Ulysses, Jane Eyre, Crime and Punishment, Federalist Papers, Wealth of Nations …) |
| 2. Encyclopedic | 4 | ✅ 54 articles | Wikipedia + 1911 Britannica |
| 3. OER/Textbooks | 8 | ⬜ | No bulk APIs available |
| 4. Pre-aggregated | 2 | ⬜ | Common Pile/RedPajama require local HF datasets |
| 5. Academic papers | 4 | ✅ 94 book chapters | arXiv/PLOS abstracts removed (under the floor); replaced with open-licensed monographs — see below |
| 6. Government/Legal | 6 | ✅ **1,220 documents** | 449 statutes from 28 jurisdictions, 516 UDHR translations (all re-read for reading-pipeline blind spots — see POLICIES.md LP8), 255 World Factbook profiles |
| 7. Images/Media | 4 | ✅ 2 collection catalogues | NASA (185 items) and Met Museum (140 items) folded into catalogue documents |
| 8. News | 4 | ⚠️ 1 document | Wikinews items were under the floor; wikinews.org is not reachable to refetch |
| 9. Source Code | 20 | ✅ 55 files across 20 repos | Source files, licences and substantive upstream documentation |
| 10. Audio/Music | 5 | ✅ 13 collection catalogues | Per-item metadata folded into catalogues; 2 collections were too thin even consolidated |
| 11. Multi-language | 6 | ✅ 35 texts | Gutenberg non-English + Wikipedia in 16 languages + War and Peace (en/ru/fr), content-verified, at `war-and-peace/` — see POLICIES.md LP7; the `gutenberg-non-en/` row above it is 20/20 mislabeled, see `digested/CORPUS-INTEGRITY-FINDING.md` |
| 12. Non-Western Music | 5 | ✅ Great 78 catalogue | Other sources not yet pulled |
| 13. Mysticism | 3 | ⬜ | Cloudflare blocks sacred-texts.com |
| 14. Holy Texts | 10 | ✅ 492 files | Whole books: Tanakh (38), SBLGNT (23), Qur'an by sura (81), Pali suttas (186) + earlier pulls |
| 15. Western Canon | 8 | ✅ 18 files | Folger Shakespeare bulk + individual plays. CCEL extracts were under the floor and were removed |
| 16. Organic/Community | 10 | ⬜ | Ganjoor, StoryWeaver, African Storybook not yet scripted |
| 17. Formal Algebraic | 11 | ⬜ | All catalogued, none fetched (PDFs/images/specialized formats) |

**Total:** 2,044 documents, all at or above the 600-word floor.

## Fetched Content Details

### 6. Government & Legal

The largest section of the corpus, and the one most recently rebuilt. It previously held nine
Federal Register abstracts; it now holds documents published by institutions in 28
jurisdictions plus two multi-country instruments.

- **world-legislation/** — 449 statutes, codes and regulations, one directory per jurisdiction:
  Andorra, Argentina, Austria, Belgium, Chile, Colombia, Czechia, European Union, Finland,
  France, Germany, Greece, Italy, Latvia, Liechtenstein, Luxembourg, Netherlands, Norway,
  Poland, Portugal, Romania, Slovakia, Spain, Sweden, Switzerland, United Kingdom, United
  States, Uruguay. Each file carries YAML frontmatter with the publishing institution, official
  source URL, publication date and in-force status.
- **un-udhr/** — the Universal Declaration of Human Rights in 516 languages, as encoded by
  OHCHR. Public domain.
- **world-factbook/** — 255 country and region profiles from the CIA World Factbook, rendered
  from JSON to prose. Public domain (US federal work).

Rights are not uniform. Official legal texts are outside copyright in most of these
jurisdictions (Germany §5 UrhG, US 17 USC §105, Poland, Czechia, Sweden, Switzerland and
others); the United Kingdom (OGL v3.0), European Union (CC BY 4.0), France (Etalab v2.0) and
Spain publish under open licences that require attribution. Every publisher's required notice
is reproduced in [`06-government-legal/ATTRIBUTION.md`](06-government-legal/ATTRIBUTION.md),
which is generated from the manifest.

Legislation is read from the [legalize.dev](https://legalize.dev) mirrors, which convert each
publisher's official XML/HTML feed to Markdown. Converted text is not the authentic instrument;
only the version published in the issuing institution's official gazette is authoritative.

### 14. Holy Texts

Verse- and section-level fragments were replaced with whole books:

- **wlc-tanakh/** — 38 books of the Hebrew Bible, Westminster Leningrad Codex (public domain)
- **sblgnt-books/** — 23 books of the Greek New Testament, SBLGNT via MorphGNT
- **quran-suras/** — 81 suras with Arabic text, transliteration and English translation
- **pali-suttas/** — 186 discourses from the Dīgha and Majjhima Nikāya, Pali with Bhikkhu
  Sujato's English translation (CC0)

### 5. Academic Papers

arXiv and PLOS were stored as abstracts of 60–200 words. Neither host is reachable from the
build environment to fetch full texts, so the abstracts were removed and the category is now
carried by open-licensed scholarly books, chapter by chapter:

- **open-access-books/d2l/** — *Dive into Deep Learning* (CC BY-SA 4.0)
- **open-access-books/paip/** — *Paradigms of Artificial Intelligence Programming*, Norvig (MIT)

### 7 & 10. Images, Media, Audio

Per-item metadata records — one JSON file per photograph, artwork or recording — were folded
into one catalogue document per collection by `scripts/consolidate-media-catalogs.mjs`. The
information is preserved; the unit of a prior is now the collection rather than the accession
record.

### 9. Source Code

20 repos with source files, licences, and substantive upstream documentation: kernel coding
style and patch-submission process, the CPython tutorial and data model reference, PostgreSQL
subsystem READMEs, the Flask and FastAPI tutorials, the ripgrep guide, and more.

## Running the fetchers

```bash
node scripts/run-all.mjs                        # everything, then catalogues + prune
node scripts/fetch-world-government.mjs         # legislation, UDHR, Factbook
node scripts/fetch-world-government.mjs --jurisdictions de,fr,uk
node scripts/fetch-replacements.mjs --only scripture
node scripts/enforce-min-words.mjs              # audit; add --prune to delete
```

## eochat Consumption

eochat consumes this corpus via `live-priors-source.js`:

```js
// Get the directory tree for browsing
import { livePriorsTree } from './server/live-priors-source.js';
const tree = livePriorsTree();

// Read a specific file
import { readLivePrior } from './server/live-priors-source.js';
const result = readLivePrior('06-government-legal/world-legislation/de/GG.md');
```

**Key paths:**
- `livePriorsTree()` — returns the full directory tree with file counts
- `readLivePrior(relPath)` — reads file contents by relative path
- `livePriorsCategories()` — lists the 17 top-level category folders

**Consumption boundary:** eochat reads these files on demand when a user navigates to them in the Priors tab. It does NOT auto-ingest them into the engine. The JSON artifacts in `eoPriors/priors/` are the ingested priors; this corpus is the raw material they were built from.

## Network reachability

The build environment reaches `raw.githubusercontent.com`, `gitlab.com`, `registry.npmjs.org`
and `pypi.org`. Direct government portals — legislation.gov.uk, EUR-Lex, Légifrance, e-Gov
Japan, Wikisource, arXiv, archive.org — are refused at the egress proxy. Every source used
here is therefore read from a mirror on one of the reachable hosts, with the originating
institution recorded per document.

## Pulling Remaining Content

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
- HathiTrust — apply for research access at hathitrust.org

### Requires API keys
- CText (Chinese Text Project) — free key at ctext.org/tools/api
- CORE (academic papers) — free key at core.ac.uk/services/api/
