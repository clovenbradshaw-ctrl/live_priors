#!/usr/bin/env node
// build-tuples.mjs — project each hand-adjudicated golden into a flat,
// one-tuple-per-line stream: <specimen>.tuples.jsonl beside its .golden.json.
//
// NO JUDGMENT LIVES HERE, the same discipline build-goldens.mjs states for
// itself. Every subject/relation/object/phasepost/polarity was hand-derived
// in hand-readings.mjs under RULE.md and stamped by build-goldens.mjs; this
// script only RE-SHAPES that already-adjudicated data into a line-oriented
// projection, and adds nothing a caller could not derive:
//
//   - `terrain` and `stance` are computed by the REAL engine
//     (eoreader7 native/kernel/cube.js::cellOf), never restated here — the
//     same posture hyperlexicon.js takes for its own cell fields. A cell
//     the engine refuses is a hard failure, not a silently-written line, so
//     an illegal (op, grain) pair cannot reach a golden's tuple stream.
//   - `lang` is read from the UDHR corpus's own `Language: NAME (code)`
//     header, the file's own declaration — never a mapping typed in here.
//     A source with no such header (kant/alice/ripgrep) gets `null`, an
//     honest absence rather than a guess.
//
// GENERATED, NOT HAND-WRITTEN, for one reason worth stating: the subject/
// relation/object fields are Arabic, Chinese, Swahili and Spanish text, and
// hand-transcribing them into a second file is exactly how a wrong character
// enters a golden. Deriving them means the tuple stream carries the same
// bytes the adjudicated reading already verified against the source. Delete
// the .jsonl and re-run at any time.
//
// WHAT A TUPLE LINE DELIBERATELY OMITS, and where to find it: the `because`
// reasoning, the `resolution` evidence, and the full `alternate` reading are
// prose, and putting them on the line would defeat the format (400+ char
// lines nobody can scan). Each line carries `specimen` + `n`, which address
// the row they came from — `rows[n]` of `<specimen>.golden.json` — so the
// adjudication is one lookup away and nothing is lost, only relocated.
// `alternate` survives as a compact "OP·Grain" string (or null) because R7's
// disclosure — that a reading was genuinely undecidable — is a property of
// the tuple itself, not commentary about it.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LP_ROOT = path.join(HERE, "..", "..");
const EOREADER7 = path.join(LP_ROOT, "..", "eoreader7");

const { cellOf } = await import(path.join(EOREADER7, "native/kernel/cube.js"));

// The UDHR corpus's own fixed header line, read rather than assumed — the
// same declaration eot-sidecar.mjs's stripUdhrHeader parses, matched here
// on its own terms. The LAST parenthesized group on the line is the code
// (a variant line can carry a second one: "German, Standard (1901) (de-1901)").
const LANGUAGE_RE = /^Language:[^\n]*\(([a-zA-Z0-9-]+)\)$/m;

function declaredLang(raw) {
  const m = raw.match(LANGUAGE_RE);
  return m ? m[1].toLowerCase() : null;
}

function tupleLines(golden, lang) {
  return golden.rows.map((row, n) => {
    // The engine decides whether this cell is legal; a refusal throws.
    const cell = cellOf(row.phasepost.op, row.phasepost.grain);
    if (!cell || cell.op !== row.phasepost.op || cell.grain !== row.phasepost.grain) {
      throw new Error(
        `${golden.specimen} row ${n}: engine refused cell ${row.phasepost.op}·${row.phasepost.grain}`,
      );
    }
    return {
      specimen: golden.specimen,
      lang,
      n,
      subject: row.subject,
      relation: row.relation,
      object: row.object ?? null,
      polarity: row.polarity,
      op: cell.op,
      grain: cell.grain,
      terrain: cell.terrain,
      stance: cell.stance,
      // R8's clause role. A scorer that wants the old main-clause-only
      // target filters to clause === "main"; one that wants full
      // propositional coverage takes every line.
      clause: row.clause ?? null,
      // R9's language-independent proposition key: rows sharing a `prop`
      // across specimens are the same claim — the join the Rosetta stone
      // superposes on. R10's structure fields: `ground` names the section
      // the row is read under (on a heading row, the section it OPENS);
      // `role` carries the document's own argument structure
      // (premise / operative / declared).
      prop: row.prop ?? null,
      ground: row.ground ?? null,
      role: row.role ?? null,
      embedded: row.embedded === true,
      unresolved: row.unresolved === true,
      alternate: row.alternate ? `${row.alternate.op}·${row.alternate.grain}` : null,
      span: [row.span.start, row.span.end],
    };
  });
}

let failures = 0;
let written = 0;

const goldens = fs
  .readdirSync(HERE)
  .filter((f) => f.endsWith(".golden.json"))
  .sort();

for (const file of goldens) {
  const golden = JSON.parse(fs.readFileSync(path.join(HERE, file), "utf8"));
  const raw = fs.readFileSync(path.join(LP_ROOT, golden.path), "utf8");
  const lang = declaredLang(raw);

  let lines;
  try {
    lines = tupleLines(golden, lang);
  } catch (err) {
    console.error(`${golden.specimen}: ${err.message}`);
    failures += 1;
    continue;
  }

  // Self-verification, P5.2 at this projection's own door: every span the
  // tuple carries must still resolve in the SOURCE's own coordinates and
  // hold the relation's own words. build-goldens.mjs already proved this
  // when it stamped them — re-proving it here costs nothing and means a
  // .jsonl can never quietly outlive a source revision that moved its bytes.
  let bad = 0;
  for (const t of lines) {
    const slice = raw.slice(t.span[0], t.span[1]);
    const relHead = String(t.relation).split(" ").pop();
    // Case-folded, matching build-goldens.mjs's OWN comparison rather than
    // inventing a second, stricter one here: a paragraph-initial verb is
    // capitalised in the source ("Proclaims") while the reading names the
    // lemma ("proclaims"), and that is not a defect. One comparison rule,
    // in both places.
    const held =
      slice.toLowerCase().includes(relHead.toLowerCase()) || slice.includes(relHead);
    if (!held) {
      console.error(
        `${golden.specimen} row ${t.n}: span [${t.span}] does not hold relation ${JSON.stringify(relHead)}`,
      );
      bad += 1;
    }
  }
  if (bad) {
    failures += bad;
    continue;
  }

  const outPath = path.join(HERE, `${golden.specimen}.tuples.jsonl`);
  fs.writeFileSync(outPath, lines.map((t) => JSON.stringify(t)).join("\n") + "\n");
  written += 1;
  console.log(
    `${golden.specimen}: ${lines.length} tuples${lang ? ` (${lang})` : " (no declared language)"} -> ${path.relative(LP_ROOT, outPath)}`,
  );
}

console.log(`\n${written} tuple stream(s) written from ${goldens.length} golden(s)`);
if (failures) {
  console.error(`${failures} failure(s) — no .jsonl written for the affected specimens`);
  process.exit(1);
}
