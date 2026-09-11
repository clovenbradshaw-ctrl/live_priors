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
// CONSTRUCTION FAMILY, added after reading every Swahili disagreement by
// hand (2026-09-11). FIRST PASS, by eye: 13 of the run's 23 partial-
// agreement cases had Swahili diverging from the majority somewhere —
// eyeballed as "Swahili is the outlier". THAT COUNT WAS WRONG, caught by
// building this mechanism rather than trusting the hand tally: several of
// those 13 were cases where TWO languages diverged from the majority in
// DIFFERENT directions at once (e.g. udhr:act-not-offence-then: Arabic
// lands EVA·Pattern, Swahili lands CON·Pattern, both against a 3-language
// SIG·Pattern majority) — genuinely a 3-way split, not "Swahili vs.
// everyone else". `outlier` below is null whenever more than one language
// dissents, on purpose (S64/P94's own rule, applied here: a number that
// looks right from the wrong computation is still wrong, and a script
// that quietly counts it is worse than eyeballing, which at least invites
// a second look). The STRICT count — languages where every OTHER present
// language agrees and this one alone does not — is smaller and more
// defensible: Swahili is the sole dissenter in 4 cases, not 13. Of those
// 4, THREE are unanimous 4-vs-1 splits where Swahili alone verbs a
// predicate every other language states as a copula-plus-property
// (udhr:children-protection, udhr:education-free, udhr:elementary-
// compulsory — "itolewe"/"ahifadhiwe"/etc., vs. English's "shall be
// compulsory"/"shall be free"): a real, well-known Bantu typological
// pattern (verb-centric predication), not a labeling slip. The fourth
// (udhr:technical-available) runs the OTHER way — Swahili alone takes the
// stative/copula reading against a unanimous INS·Pattern everywhere
// else — a genuine counter-example, kept rather than dropped: the lean is
// real and disclosed, never claimed as absolute. `constructionFamily`
// computes the eventive-vs-stative axis (CON/INS/REC/SEG vs. SIG/DEF/EVA/
// NUL — cube.js's own operator semantics, not invented here) for every
// STRICT single-outlier case, for every language, so nobody has to
// re-derive this by hand next time, and a future eyeball count can be
// checked against it before it gets repeated as fact. n=4 is small; read
// as a real, disclosed pattern in this corpus, not a proven cross-
// linguistic law.
//
// usage: node rosetta-align.mjs <golden1.json> <golden2.json> ...

import fs from "node:fs";
import path from "node:path";

// cube.js's own operator semantics, not re-derived: CON (bind/relate),
// INS (bring into being), REC (re-zero/change), SEG (cut/differentiate an
// extent) are each an ACT — eventive. SIG (sign/mark), DEF (differentiate
// a bound, classificatory), EVA (evaluate against a bound), NUL (null/
// absence) are each a STATE or a classification — stative. This is a
// property of the nine operators themselves (packages/engine/operators.js
// / native/kernel/cube.js), not invented for this file.
const EVENTIVE_OPS = new Set(["CON", "INS", "REC", "SEG"]);
const STATIVE_OPS = new Set(["SIG", "DEF", "EVA", "NUL"]);
const constructionFamily = (op) => (EVENTIVE_OPS.has(op) ? "eventive" : STATIVE_OPS.has(op) ? "stative" : "other");

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
  // OUTLIER, and its construction family — computed only for a genuine
  // majority split (>=3 present, so "majority" means something), never for
  // a bare 2-vs-1 (a tie with n=2 has no majority to be the outlier from).
  let outlier = null, outlierFamily = null, majorityFamily = null;
  if (present.length >= 3 && verdict === "partial") {
    const tally = new Map();
    for (const p of posts) tally.set(p, (tally.get(p) ?? 0) + 1);
    const [majPost, majCount] = [...tally.entries()].sort((a, b) => b[1] - a[1])[0];
    const outliers = present.filter((s, i) => posts[i] !== majPost);
    if (outliers.length === 1) {
      outlier = outliers[0];
      outlierFamily = constructionFamily(byLang[outlier].phasepost?.op);
      majorityFamily = constructionFamily(majPost.split("·")[0]);
    }
  }
  rows.push({ prop, presentIn: present, missingFrom: specimens.filter((s) => !byLang[s]), verdict, phaseposts: Object.fromEntries(present.map((s, i) => [s, posts[i]])), outlier, outlierFamily, majorityFamily, cells });
}

rows.sort((a, b) => a.prop.localeCompare(b.prop));

// OUTLIER SUMMARY, per language: how often is this language the single
// dissenter from an otherwise-agreeing group, and when it is, how often
// does the disagreement follow the eventive-vs-stative split. A language
// that is BOTH a frequent outlier AND consistently on one side of that
// split (as Swahili is, this reading found) is showing a real, systematic
// construction preference — worth reading by hand (as this pass did for
// Swahili) before assuming it is adjudication noise; a language that is a
// frequent outlier with NO consistent family split is a better candidate
// for actually re-checking the golden's own rows.
const outlierSummary = {};
for (const s of specimens) outlierSummary[s] = { outlierCount: 0, eventiveWhenOutlier: 0, stativeWhenOutlier: 0 };
for (const r of rows) {
  if (!r.outlier) continue;
  outlierSummary[r.outlier].outlierCount += 1;
  if (r.outlierFamily === "eventive") outlierSummary[r.outlier].eventiveWhenOutlier += 1;
  if (r.outlierFamily === "stative") outlierSummary[r.outlier].stativeWhenOutlier += 1;
}

const multiLang = rows.filter((r) => r.presentIn.length >= 2);
const out = {
  schema: "RosettaAlignment@1",
  specimens,
  falsificationCondition: "ROSETTA-GOALS.md, Goal 0, verbatim: 'If equivalent propositions do not receive equal phaseposts under INDEPENDENT adjudication across languages, the Rosetta stone fails.'",
  totalProps: rows.length,
  propsInTwoOrMoreLanguages: multiLang.length,
  agree: agree, disagree: disagree, partial: partial,
  agreementRateOverMultiLang: multiLang.length ? +(agree / multiLang.length).toFixed(3) : null,
  outlierSummary,
  disagreements: rows.filter((r) => r.verdict === "disagree" || r.verdict === "partial"),
  rows,
};

const HERE = path.dirname(new URL(import.meta.url).pathname);
const outPath = path.join(HERE, "rosetta-alignment.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 1));
console.log(`${rows.length} distinct props, ${multiLang.length} attested in 2+ languages.`);
console.log(`phasepost agreement: ${agree} agree / ${partial} partial / ${disagree} disagree (rate over multi-lang props: ${out.agreementRateOverMultiLang})`);
console.log(`-> ${outPath}`);
