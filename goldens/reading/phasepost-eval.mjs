#!/usr/bin/env node
// phasepost-eval.mjs — score the phasepost overlay (the-fold/phasepost.js +
// ActPrior@1) against the 49 hand-adjudicated golden phaseposts. This is
// the validation DR1 named: the mapping was declared from VerbNet's own
// class semantics (never tuned against these goldens); this driver is the
// after-the-fact check.
//
// SCORED APART, so nothing hides inside a combined number:
//   op       — exact match of the golden's op against the verdict's op
//   op-cand  — for contested verdicts: does the golden op appear in the
//              candidate set? (candidate-level accuracy — what a caller
//              holding the set could recover, never what the overlay
//              asserted)
//   grain    — exact match, scored on every row the overlay produced a
//              grain for
//   alt-credit — rows where the overlay's op missed the golden primary but
//              hit the golden's own DISCLOSED alternate (RULE.md R7 — the
//              golden itself says those are arguable)
// Per-standing breakdown (mechanical / copula / lexical / contested / gap)
// so each tier's real contribution is visible.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LP_ROOT = path.join(HERE, "..", "..");
const FOLD = path.join(LP_ROOT, "..", "the-fold");
const EOREADER7 = path.join(LP_ROOT, "..", "eoreader7");

const { makePhasepost } = await import(path.join(FOLD, "phasepost.js"));
const { cellOf } = await import(path.join(EOREADER7, "native/kernel/cube.js"));
const priors = await import(path.join(EOREADER7, "native/adapters/text/priors.js"));
const morph = await import(path.join(EOREADER7, "legacy-eoreader6.1/packages/engine/perceiver/text/morphology.js"));

const actPrior = JSON.parse(fs.readFileSync(path.join(FOLD, "eval/fixtures/act-prior-en.json"), "utf8"));
const morphPrior = JSON.parse(fs.readFileSync(path.join(FOLD, "eval/fixtures/unimorph-morphology-prior.json"), "utf8"));
const { lemmasOf } = morph.createLemmatizer(morphPrior.forms, { language: morphPrior.language });

const pp = makePhasepost({
  actPrior, cellOf,
  definiteDeterminers: priors.DEFINITE_DETERMINERS,
  indefiniteDeterminers: priors.INDEFINITE_DETERMINERS,
  lemmasOf: (f) => lemmasOf(f),
});

const specimens = ["kant", "alice", "udhr", "ripgrep"];
const tally = {
  rows: 0, opExact: 0, opAlt: 0, contestedHit: 0, contestedMiss: 0, gap: 0,
  grainScored: 0, grainExact: 0,
  byStanding: {},
};
const misses = [];

for (const s of specimens) {
  const g = JSON.parse(fs.readFileSync(path.join(HERE, `${s}.golden.json`), "utf8"));
  for (const row of g.rows) {
    tally.rows += 1;
    const v = pp.classify({ subject: row.subject, verb: row.relation, object: row.object });
    const st = v.standing;
    tally.byStanding[st] = tally.byStanding[st] ?? { n: 0, opExact: 0, opAlt: 0, candHit: 0, grainExact: 0, grainScored: 0 };
    const b = tally.byStanding[st];
    b.n += 1;

    if (v.grain) {
      tally.grainScored += 1; b.grainScored += 1;
      if (v.grain === row.phasepost.grain) { tally.grainExact += 1; b.grainExact += 1; }
    }

    if (st === "gap") {
      tally.gap += 1;
      misses.push({ s, row: `${row.subject} —${row.relation}→ ${row.object ?? "∅"}`, want: row.phasepost, got: "GAP", why: v.because });
      continue;
    }
    if (st === "contested") {
      const ops = v.candidates.map((c) => c.op);
      if (ops.includes(row.phasepost.op) || (row.alternate && ops.includes(row.alternate.op))) {
        tally.contestedHit += 1; b.candHit += 1;
      } else {
        tally.contestedMiss += 1;
        misses.push({ s, row: `${row.subject} —${row.relation}→ ${row.object ?? "∅"}`, want: row.phasepost, got: `contested[${ops.join(",")}]` });
      }
      continue;
    }
    if (v.op === row.phasepost.op) { tally.opExact += 1; b.opExact += 1; }
    else if (row.alternate && v.op === row.alternate.op) { tally.opAlt += 1; b.opAlt += 1; }
    else {
      misses.push({ s, row: `${row.subject} —${row.relation}→ ${row.object ?? "∅"}`, want: row.phasepost, got: `${v.op}·${v.grain} (${st})`, why: v.because?.slice(0, 100) });
    }
  }
}

const asserted = tally.opExact + tally.opAlt + (tally.rows - tally.gap - tally.contestedHit - tally.contestedMiss - tally.opExact - tally.opAlt) + tally.opExact + tally.opAlt; // not used; kept honest below

console.log(`golden rows: ${tally.rows}`);
const assertedRows = tally.rows - tally.gap - tally.contestedHit - tally.contestedMiss;
console.log(`\nOP — asserted verdicts (${assertedRows} rows):`);
console.log(`  exact:      ${tally.opExact}/${assertedRows} (${(100 * tally.opExact / assertedRows).toFixed(0)}%)`);
console.log(`  alt-credit: ${tally.opAlt} more hit the golden's own disclosed alternate -> ${tally.opExact + tally.opAlt}/${assertedRows} (${(100 * (tally.opExact + tally.opAlt) / assertedRows).toFixed(0)}%)`);
console.log(`contested (${tally.contestedHit + tally.contestedMiss} rows): golden op in candidate set ${tally.contestedHit}/${tally.contestedHit + tally.contestedMiss}`);
console.log(`gaps (typed, never guessed): ${tally.gap}/${tally.rows}`);
console.log(`\nGRAIN (scored on ${tally.grainScored} rows the overlay grained): ${tally.grainExact}/${tally.grainScored} (${(100 * tally.grainExact / tally.grainScored).toFixed(0)}%)`);
console.log(`\nby standing:`);
for (const [st, b] of Object.entries(tally.byStanding)) {
  console.log(`  ${st.padEnd(18)} n=${String(b.n).padEnd(3)} opExact=${b.opExact} opAlt=${b.opAlt} candHit=${b.candHit} grain=${b.grainExact}/${b.grainScored}`);
}
console.log(`\nmisses (${misses.length}):`);
for (const m of misses) {
  console.log(`  [${m.s}] ${m.row}\n     want ${m.want.op}·${m.want.grain}  got ${typeof m.got === "string" ? m.got : JSON.stringify(m.got)}${m.why ? `\n     why: ${m.why}` : ""}`);
}
