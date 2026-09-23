#!/usr/bin/env node
// Fetch Wikipedia's encyclopedic coverage of Arthur Koestler (CC BY-SA 4.0).
//
// WHY THIS SCRIPT EXISTS RATHER THAN A NEW ROW IN fetch-wikipedia.mjs's
// ARTICLES LIST: that list is a curated cross-domain diversity sample (one
// or two articles per topic, for structural variety). This is a single-
// author deep pull, requested specifically, and it needed its own research
// pass before a single byte was fetched — see the finding this script's
// output is paired with: digested/KOESTLER-COPYRIGHT-FINDING.md.
//
// THE FINDING, IN ONE PARAGRAPH: Arthur Koestler (1905-1983) has no public-
// domain primary text. Project Gutenberg lists zero Koestler works.
// Standard Ebooks' own placeholder page for "Darkness at Noon" states it
// enters the US public domain on 2036-01-01, not before. The 1968 US
// copyright renewal for "Darkness at Noon" (Catalog of Copyright Entries)
// and the 1977 Catalog of Copyright Entries record for "The Thirteenth
// Tribe" both show active copyright claims well past his death. His UK/EU
// copyright (life+70) runs through the end of 2053. Wikisource carries no
// Koestler text of his own — only quotations of him inside other public-
// domain documents (US Supreme Court opinions, other authors' footnotes).
// So "as much Koestler as is public domain" is, honestly, none of his own
// writing. What Wikipedia offers instead is not Koestler's own words: it
// is the encyclopedia's CC BY-SA 4.0 coverage of him, his life, and his
// major works — openly licensed (attribution required), not public domain,
// and already this repo's own established license for the `02-encyclopedic/
// wikipedia/` category (see e.g. Ludwig_Wittgenstein.txt, William_Shakespeare.txt
// in the same directory — author biographies sit there already).
//
// Source: https://en.wikipedia.org/w/api.php
// License: CC BY-SA 4.0 — https://creativecommons.org/licenses/by-sa/4.0/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', '02-encyclopedic', 'wikipedia');
const MANIFEST_FILE = path.join(__dirname, '..', 'manifests', 'koestler-wikipedia-manifest.json');
const MIN_WORDS = 600; // this repo's own corpus-quality floor (README.md, scripts/enforce-min-words.mjs)

const API_BASE = 'https://en.wikipedia.org/w/api.php';

// Every title below was confirmed to resolve to a real, non-redirect (or
// deliberately-followed-redirect) Wikipedia article before this list was
// finalized — see digested/KOESTLER-COPYRIGHT-FINDING.md for the checked
// candidates that came back missing and were left out (e.g. "The Case of
// the Midwife Toad", "Reflections on Hanging", "Twilight Bar" have no
// standalone article as of this fetch).
const ARTICLES = [
  // Biography
  'Arthur Koestler',

  // Novels
  'Darkness at Noon',
  'The Gladiators (novel)',
  'Arrival and Departure',
  'Thieves in the Night',
  'The Age of Longing',

  // Reportage / memoir of the Spanish Civil War and internment
  'Spanish Testament',
  'Dialogue with Death',
  'Scum of the Earth (book)',

  // Political essays
  'The Yogi and the Commissar',
  'The God that Failed', // Koestler's essay in this multi-author 1949 collection

  // Autobiography
  'Arrow in the Blue',
  'The Invisible Writing',

  // Science, creativity, and the concepts he coined
  'The Act of Creation', // "Bisociation" redirects here — the term has no separate article
  'Holon (philosophy)',
  'The Ghost in the Machine',
  'The Roots of Coincidence',
  'The Lotus and the Robot',

  // History / late nonfiction
  'The Thirteenth Tribe',
  'Janus: A Summing Up',

  // The charity he endowed, carrying his name and his interest in the arts
  'Koestler Arts',
];

async function fetchArticle(title) {
  const params = new URLSearchParams({
    action: 'query',
    prop: 'revisions',
    rvprop: 'content',
    rvslots: 'main',
    redirects: '1',
    format: 'json',
    titles: title,
  });

  const url = `${API_BASE}?${params}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'live_priors corpus builder (https://github.com/clovenbradshaw-ctrl/live_priors)',
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  if (page.missing) return null;
  const revision = page.revisions?.[0];
  const redirectedFrom = data.query?.redirects?.find((r) => r.to === page.title)?.from ?? null;
  return {
    title: page.title,
    requestedTitle: title,
    redirectedFrom,
    pageid: page.pageid,
    content: revision?.slots?.main?.['*'] || '',
  };
}

function stripWikiMarkup(wikitext) {
  let text = wikitext
    .replace(/\{\{[^}]*\}\}/g, '')           // templates
    .replace(/\[\[File:[^\]]*\]\]/g, '')      // file links
    .replace(/\[\[Image:[^\]]*\]\]/g, '')     // image links
    .replace(/\[\[Category:[^\]]*\]\]/g, '')  // categories
    .replace(/\[\[([^\]|]*)\|?([^\]]*)\]\]/g, '$1$2')  // wikilinks
    .replace(/'''(.+?)'''/g, '$1')            // bold
    .replace(/''(.+?)''/g, '$1')              // italic
    .replace(/\*+/g, '')                       // bullets
    .replace(/#+/g, '')                        // numbered lists
    .replace(/={2,}(.+?)={2,}/g, '\n$1\n')    // section headers
    .replace(/<!--[\s\S]*?-->/g, '')           // comments
    .replace(/\|[^=]*=/g, '')                  // table/infobox params
    .replace(/<[\/]?[a-z]+[^>]*>/gi, '')       // HTML tags
    .replace(/\n{3,}/g, '\n\n')                // collapse blank lines
    .trim();
  return text;
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

async function main() {
  console.log('=== Arthur Koestler Wikipedia Fetcher ===\n');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const manifest = {
    source: 'Wikipedia',
    subject: 'Arthur Koestler (1905-1983) — biography, works, and concepts',
    url: 'https://en.wikipedia.org',
    api: 'https://en.wikipedia.org/w/api.php',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    licenseNote:
      'CC BY-SA 4.0 requires attribution and share-alike; it is NOT public domain. ' +
      'See digested/KOESTLER-COPYRIGHT-FINDING.md for why no Koestler primary text ' +
      '(novel, memoir, essay collection) could be added: none is yet public domain ' +
      'in the US (95-year rule; renewal confirmed for at least Darkness at Noon) or ' +
      'the UK/EU (life+70, runs through 2053).',
    fetched_at: new Date().toISOString(),
    min_words_floor: MIN_WORDS,
    articles: [],
    skipped_under_floor: [],
    skipped_missing: [],
  };

  for (const title of ARTICLES) {
    process.stdout.write(`Fetching: ${title}... `);
    const article = await fetchArticle(title);
    if (!article) {
      console.log('MISSING');
      manifest.skipped_missing.push(title);
      await new Promise((r) => setTimeout(r, 300));
      continue;
    }
    const cleaned = stripWikiMarkup(article.content);
    const words = wordCount(cleaned);

    // declaredIdentity-style check (LP1): confirm the fetched page is
    // actually about Koestler before trusting the title match alone — a
    // redirect or a disambiguation mishap should not slip a wrong article
    // into the corpus under a Koestler-shaped filename.
    const mentionsKoestler = /koestler/i.test(cleaned);

    if (!mentionsKoestler) {
      console.log(`SKIPPED (no "Koestler" mention in body — refusing to trust the title alone)`);
      manifest.skipped_missing.push(`${title} (fetched but body never mentions Koestler)`);
      await new Promise((r) => setTimeout(r, 300));
      continue;
    }

    if (words < MIN_WORDS) {
      console.log(`SKIPPED (${words} words, under the ${MIN_WORDS}-word floor)`);
      manifest.skipped_under_floor.push({ title: article.title, words });
      await new Promise((r) => setTimeout(r, 300));
      continue;
    }

    const filename = `${article.title.replace(/ /g, '_').replace(/[\\/:*?"<>|]/g, '')}.txt`;
    const file = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(file, cleaned, 'utf8');
    manifest.articles.push({
      title: article.title,
      requestedTitle: article.requestedTitle,
      redirectedFrom: article.redirectedFrom,
      pageid: article.pageid,
      words,
      chars: cleaned.length,
      file: path.relative(path.join(__dirname, '..'), file),
      wikipediaUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title.replace(/ /g, '_'))}`,
    });
    console.log(`OK (${words} words)`);
    await new Promise((r) => setTimeout(r, 300)); // rate-limit courtesy
  }

  fs.mkdirSync(path.dirname(MANIFEST_FILE), { recursive: true });
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n=== Done: ${manifest.articles.length} articles saved, ` +
    `${manifest.skipped_under_floor.length} under the floor, ` +
    `${manifest.skipped_missing.length} missing/rejected ===`);
  console.log(`Manifest: ${path.relative(path.join(__dirname, '..'), MANIFEST_FILE)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
