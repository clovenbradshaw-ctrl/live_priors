#!/usr/bin/env node
// build-goldens.mjs — stamp byte addresses onto the hand-adjudicated rows
// and self-verify every one (P5.2 at the golden's own door), then write
// <specimen>.golden.json beside this file.
//
// NO JUDGMENT LIVES HERE. Every subject/relation/object/phasepost/because
// was hand-derived in hand-readings.mjs under RULE.md; this script only:
//   1. locates each row's `sentence` anchor in the normalized body,
//   2. widens to the enclosing sentence-ish region (paragraph-bounded),
//   3. maps the span to RAW-file coordinates via eoreader7 S26's toRaw,
//   4. verifies the raw slice (whitespace-collapsed) contains the row's
//      own subject/relation words — refusing to write a golden whose
//      addresses do not resolve (LP3's own law, applied to ourselves).
//
// windowEnd is computed from windowEndText the same way — declared as text
// in hand-readings.mjs BEFORE any row was written, resolved to an offset
// mechanically here.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GOLDENS } from "./hand-readings.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LP_ROOT = path.join(HERE, "..", "..");
const EOREADER7 = path.join(LP_ROOT, "..", "eoreader7");
const FOLD = path.join(LP_ROOT, "..", "the-fold");

const spans = await import(path.join(EOREADER7, "native/adapters/text/spans.js"));
const { stripContainer } = await import(path.join(FOLD, "source.js"));

// `_` stripped for COMPARISON only: Gutenberg italics markers (`_very_`)
// are formatting, not words, and R2 forbids them in a golden's own fields
// — so the raw slice is de-emphasized before containment is tested, never
// the golden's text edited to include them.
const collapse = (t) => String(t ?? "").replace(/_/g, "").replace(/\s+/g, " ").trim();

let failures = 0;

for (const g of GOLDENS) {
  const rawPath = path.join(LP_ROOT, g.path);
  const raw = fs.readFileSync(rawPath, "utf8");

  // The same window construction the pipeline itself uses: container strip
  // (Gutenberg only), then offset-carrying newline normalisation (S26).
  let bodyRaw = raw;
  let bodyOffset = 0;
  if (g.gutenberg) {
    const r = stripContainer(raw);
    bodyRaw = r.text;
    bodyOffset = r.offset;
  }
  const { text: norm, toRaw } = spans.normaliseNewlines(bodyRaw);

  const windowEndIdx = norm.indexOf(g.windowEndText);
  if (windowEndIdx === -1) { console.error(`${g.specimen}: windowEndText not found`); failures++; continue; }
  const windowEnd = windowEndIdx + g.windowEndText.length;

  const rows = [];
  for (const row of g.rows) {
    const anchorIdx = norm.indexOf(row.sentence);
    if (anchorIdx === -1) {
      console.error(`${g.specimen}: anchor not found: ${JSON.stringify(row.sentence.slice(0, 60))}`);
      failures++; continue;
    }
    if (anchorIdx >= windowEnd) {
      console.error(`${g.specimen}: anchor past windowEnd: ${JSON.stringify(row.sentence.slice(0, 60))}`);
      failures++; continue;
    }
    // Widen to a paragraph-bounded region around the anchor so the span
    // holds the whole predication, not just the anchor fragment.
    const paraStart = Math.max(norm.lastIndexOf("\n\n", anchorIdx), 0);
    const paraEndRaw = norm.indexOf("\n\n", anchorIdx + row.sentence.length);
    const paraEnd = paraEndRaw === -1 ? Math.min(norm.length, windowEnd) : Math.min(paraEndRaw, windowEnd + 200);
    const normStart = paraStart === 0 ? 0 : paraStart + 2;
    const normEnd = paraEnd;

    const rawStart = bodyOffset + toRaw(normStart);
    const rawEnd = bodyOffset + toRaw(normEnd);
    const rawSlice = collapse(raw.slice(rawStart, rawEnd));

    // Self-verification: the raw slice must contain the relation's words
    // and at least the head tokens of the subject (a resolved pronoun's
    // NAME may legitimately be absent from the sentence — that is what
    // resolution MEANS — so a row carrying `resolution` verifies on the
    // relation and object instead).
    const mustContain = [];
    if (!row.resolution) {
      const subjHead = collapse(row.subject).split(" ").slice(-2).join(" ");
      mustContain.push(subjHead);
    }
    const relHead = collapse(row.relation).split(" ").pop();
    mustContain.push(relHead);
    if (row.object) {
      const objWords = collapse(row.object).replace(/[^\p{L}\p{N} ]/gu, " ").split(/\s+/).filter((w) => w.length > 2);
      if (objWords.length) mustContain.push(objWords[0]);
    }
    const missing = mustContain.filter((m) => !rawSlice.toLowerCase().includes(m.toLowerCase().replace(/[^\p{L}\p{N} ';’-]/gu, "").trim()) && !rawSlice.includes(m));
    if (missing.length) {
      console.error(`${g.specimen}: span fails self-verify for ${JSON.stringify(row.sentence.slice(0, 50))} — missing ${JSON.stringify(missing)} in slice`);
      failures++; continue;
    }

    const { sentence, ...rest } = row;
    rows.push({ ...rest, span: { start: rawStart, end: rawEnd }, anchor: sentence });
  }

  const out = {
    schema: "EOReadingGolden@1",
    specimen: g.specimen,
    path: g.path,
    rule: "goldens/reading/RULE.md",
    window: { end: windowEnd, endText: g.windowEndText, coordinates: "normalized body (container-stripped, CRLF-normalized); spans in RAW file coordinates" },
    notes: g.notes,
    rows,
  };
  const outPath = path.join(HERE, `${g.specimen}.golden.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 1));
  console.log(`${g.specimen}: ${rows.length}/${g.rows.length} rows stamped and self-verified -> ${path.relative(LP_ROOT, outPath)}`);
}

if (failures) {
  console.error(`\n${failures} failure(s) — goldens with failures were written WITHOUT the failing rows; fix hand-readings.mjs and re-run`);
  process.exit(1);
}
