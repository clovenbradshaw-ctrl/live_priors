#!/usr/bin/env node
// diff-golden.mjs — run the REAL pipeline (the same loadOrgans/relationsFor
// recipe the corpus sweep uses, POS gate included) on each golden's own
// window, and classify every disagreement into RULE.md Part IV's gap
// classes. Output is the raw evidence DERIVED-RULES.md works backwards
// from — this driver JUDGES nothing about what rule would fix a gap; it
// only names the gap.
//
// Matching (RULE.md Part IV): normalized token containment on subject and
// object, relation compared on shared head token. Every mechanical match
// is printed so it can be re-read by eye — the windows are small enough
// that the printout IS the hand check.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadOrgans } from "../../scripts/eot-digest.mjs";
import { GOLDENS } from "./hand-readings.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LP_ROOT = path.join(HERE, "..", "..");
const EOREADER7 = path.join(LP_ROOT, "..", "eoreader7");
const FOLD = path.join(LP_ROOT, "..", "the-fold");
const spans = await import(path.join(EOREADER7, "native/adapters/text/spans.js"));
const { stripContainer } = await import(path.join(FOLD, "source.js"));

const organs = await loadOrgans();
const toks = (t) => String(t ?? "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter((w) => w.length > 1);
const overlap = (a, b) => { const B = new Set(toks(b)); return toks(a).filter((w) => B.has(w)).length; };

const PRONOUNS = new Set(["he", "she", "it", "they", "his", "her", "its", "their", "him", "them"]);

const report = { specimens: [] };

for (const g of GOLDENS) {
  const golden = JSON.parse(fs.readFileSync(path.join(HERE, `${g.specimen}.golden.json`), "utf8"));
  const raw = fs.readFileSync(path.join(LP_ROOT, g.path), "utf8");
  let body = raw;
  if (g.gutenberg) body = stripContainer(raw).text;
  const norm = spans.normaliseNewlines(body).text;
  const window = norm.slice(0, golden.window.end);

  // The real pipeline, on exactly the golden's window.
  const passage = { ref: g.specimen, text: window };
  let edges = [];
  try {
    const r = organs.relationsFor([passage], { pool: [passage] });
    edges = r.edges ?? [];
  } catch (err) {
    console.error(`${g.specimen}: pipeline threw: ${err.message}`);
  }

  const rows = golden.rows;
  const matchedEdges = new Set();
  const perRow = [];

  for (const row of rows) {
    // Best pipeline edge for this golden row: subject+object token overlap,
    // relation head token agreement counted double.
    let best = null, bestScore = 0, bestIdx = -1;
    edges.forEach((e, i) => {
      if (matchedEdges.has(i)) return;
      const relGold = toks(row.relation), relPipe = toks(e.verb);
      const relHit = relGold.some((w) => relPipe.includes(w)) ? 2 : 0;
      const score = overlap(row.subject, e.subject) + overlap(row.object ?? "", e.object) + relHit;
      if (score > bestScore) { bestScore = score; best = e; bestIdx = i; }
    });

    if (!best || bestScore < 2) {
      perRow.push({ row: `${row.subject} —${row.relation}→ ${row.object ?? "∅"}`, phasepost: row.phasepost, gap: "missed", embedded: row.embedded });
      continue;
    }
    matchedEdges.add(bestIdx);

    const gaps = [];
    // wrong-relation: pipeline's verb shares no token with the golden relation
    const relGold = toks(row.relation), relPipe = toks(best.verb);
    if (!relGold.some((w) => relPipe.includes(w))) gaps.push("wrong-relation");
    // unresolved-pronoun: pipeline subject is/starts with a bare pronoun where golden resolved
    const pipeSubjToks = toks(best.subject);
    if (row.resolution && pipeSubjToks.length && PRONOUNS.has(pipeSubjToks[0])) gaps.push("unresolved-pronoun");
    // garbled-subject: pipeline subject shares <half its tokens with golden subject (and isn't the pronoun case)
    else if (overlap(row.subject, best.subject) === 0) gaps.push("garbled-subject");
    // garbled-object
    if (row.object && overlap(row.object, best.object) === 0) gaps.push("garbled-object");
    // no-phasepost: structural, always true today — the pipeline carries no act
    gaps.push("no-phasepost");

    perRow.push({
      row: `${row.subject} —${row.relation}→ ${row.object ?? "∅"}`,
      phasepost: row.phasepost,
      matched: `${best.subject} —${best.verb}→ ${best.object}`,
      gaps,
      embedded: row.embedded,
    });
  }

  // false / leftover pipeline edges: assert something no golden row states
  const falseEdges = edges.filter((_, i) => !matchedEdges.has(i)).map((e) => `${e.subject} —${e.verb}→ ${e.object}`);

  const missed = perRow.filter((r) => r.gap === "missed");
  const matched = perRow.filter((r) => !r.gap);
  report.specimens.push({
    specimen: g.specimen,
    goldenRows: rows.length,
    pipelineEdges: edges.length,
    matched: matched.length,
    missed: missed.length,
    falseOrUnmatched: falseEdges.length,
    perRow, falseEdges,
  });

  console.log(`\n===== ${g.specimen}: golden ${rows.length} rows · pipeline ${edges.length} edges · matched ${matched.length} · missed ${missed.length} · unmatched-pipeline ${falseEdges.length} =====`);
  for (const r of perRow) {
    if (r.gap === "missed") console.log(`  MISSED${r.embedded ? " (embedded)" : ""} [${r.phasepost.op}·${r.phasepost.grain}] ${r.row}`);
    else console.log(`  match [${r.phasepost.op}·${r.phasepost.grain}] ${r.row}\n        pipeline: ${r.matched}\n        gaps: ${r.gaps.join(", ") || "none"}`);
  }
  if (falseEdges.length) {
    console.log(`  -- pipeline edges matching no golden row:`);
    for (const f of falseEdges) console.log(`     ? ${f}`);
  }
}

fs.writeFileSync(path.join(HERE, "diff-report.json"), JSON.stringify(report, null, 1));
console.log(`\nwrote goldens/reading/diff-report.json`);
