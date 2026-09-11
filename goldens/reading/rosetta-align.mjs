// rosetta-align.mjs — the alignment key ROSETTA-GOALS.md's own Goal 2 names
// as missing, built for real: joins every language's own hand-adjudicated
// golden.json by `prop` (the language-independent proposition id every
// hand-udhr-*.mjs golden already carries), and — since the join now
// exists — runs the ACTUAL falsification test Goal 0 states as the
// project's own standard, stated first in that document, verbatim:
// "If equivalent propositions do not receive equal phaseposts under
// INDEPENDENT adjudication across languages, the Rosetta stone fails."
//
// NO NEW JUDGMENT. Every op/grain compared here was already hand-declared,
// independently, per-language, in each language's own golden — this file
// only joins and counts; it adjudicates nothing.
//
// usage: node rosetta-align.mjs <golden1.json> <golden2.json> ...

import fs from "node:fs";
import path from "node:path";

const paths = process.argv.slice(2);
if (paths.length < 2) { console.error("usage: node rosetta-align.mjs <golden1.json> <golden2.json> ..."); process.exit(1); }

const goldens = paths.map((p) => ({ path: p, data: JSON.parse(fs.readFileSync(path.resolve(p), "utf8")) }));

// prop -> { [specimen]: row }
const byProp = new Map();
for (const g of goldens) {
  for (const row of g.data.rows ?? []) {
    if (!row.prop) continue;
    if (!byProp.has(row.prop)) byProp.set(row.prop, {});
    byProp.get(row.prop)[g.data.specimen] = row;
  }
}

const specimens = goldens.map((g) => g.data.specimen);
const rows = [];
let agree = 0, disagree = 0, partial = 0;
for (const [prop, byLang] of byProp) {
  const present = specimens.filter((s) => byLang[s]);
  const cells = Object.fromEntries(present.map((s) => [s, {
    subject: byLang[s].subject, relation: byLang[s].relation, object: byLang[s].object,
    phasepost: byLang[s].phasepost, because: byLang[s].because,
  }]));
  // Agreement is measured on op+grain jointly — the phasepost, not either
  // axis alone (an op match with a different grain is still a different
  // phasepost, per this corpus's own 27-cell algebra).
  const posts = present.map((s) => `${byLang[s].phasepost?.op ?? "?"}·${byLang[s].phasepost?.grain ?? "?"}`);
  const distinct = new Set(posts);
  let verdict;
  if (present.length < 2) verdict = "single-language";
  else if (distinct.size === 1) { verdict = "agree"; agree += 1; }
  else if (distinct.size === present.length) { verdict = "disagree"; disagree += 1; }
  else { verdict = "partial"; partial += 1; }
  rows.push({ prop, presentIn: present, missingFrom: specimens.filter((s) => !byLang[s]), verdict, phaseposts: Object.fromEntries(present.map((s, i) => [s, posts[i]])), cells });
}

rows.sort((a, b) => a.prop.localeCompare(b.prop));

const multiLang = rows.filter((r) => r.presentIn.length >= 2);
const out = {
  schema: "RosettaAlignment@1",
  specimens,
  falsificationCondition: "ROSETTA-GOALS.md, Goal 0, verbatim: 'If equivalent propositions do not receive equal phaseposts under INDEPENDENT adjudication across languages, the Rosetta stone fails.'",
  totalProps: rows.length,
  propsInTwoOrMoreLanguages: multiLang.length,
  agree: agree, disagree: disagree, partial: partial,
  agreementRateOverMultiLang: multiLang.length ? +(agree / multiLang.length).toFixed(3) : null,
  disagreements: rows.filter((r) => r.verdict === "disagree" || r.verdict === "partial"),
  rows,
};

const HERE = path.dirname(new URL(import.meta.url).pathname);
const outPath = path.join(HERE, "rosetta-alignment.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 1));
console.log(`${rows.length} distinct props, ${multiLang.length} attested in 2+ languages.`);
console.log(`phasepost agreement: ${agree} agree / ${partial} partial / ${disagree} disagree (rate over multi-lang props: ${out.agreementRateOverMultiLang})`);
console.log(`-> ${outPath}`);
