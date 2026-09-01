#!/usr/bin/env node
// head-election-eval.mjs — the measurement that decides whether the
// non-English POS priors earn their resolve.
//
// THE QUESTION. Non-English act expectations are keyed by the WHOLE
// relation surface (keyKind: "surface") because head election was gated to
// English — `eot-sidecar2.mjs`: `if (lang === "en") { head = headOf(...) }`.
// Exact-surface keying generalizes only to a relation spelled identically.
// With a POS prior per language, a relation could instead be keyed by its
// elected content head, so two differently-spelled relations sharing a head
// match. That is the hypothesis. It is worth exactly what it measures.
//
// THE TEST IS LEAVE-ONE-OUT, because the goldens are what BUILT the
// expectations — scoring against them directly would be leakage, the same
// trap scripts/e2e-generalization-test-RESULTS.md exists to avoid. For each
// adjudicated row: build the lexicon from every OTHER row, then ask whether
// this row's (op, grain) is predictable from it. Two keyings, same rows,
// same folds, so the only variable is the keying.
//
// Reported per language: COVERAGE (a prediction was available at all) and
// ACCURACY-OF-COVERED (it was right). A keying that predicts more but wrong
// is not an improvement, and the two numbers are never collapsed into one.
//
// Swahili cannot participate: no POS prior exists for it (no UD data
// upstream — scripts/lang-registry.mjs types the gap). Reported as a gap
// row rather than dropped silently.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolvePosPrior, REGISTRY } from "./lang-registry.mjs";
import { headOf, POS_MIN_SHARE } from "./build-reading-priors.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const GOLD = path.join(ROOT, "goldens", "reading");

const SPECIMENS = {
  ar: "udhr-arb", es: "udhr-spa", zh: "udhr-cmn_hans", sw: "udhr-swh", en: "udhr",
};

function rowsFor(specimen) {
  const f = path.join(GOLD, `${specimen}.tuples.jsonl`);
  if (!fs.existsSync(f)) return [];
  return fs.readFileSync(f, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l))
    // a row with no relation surface has nothing to key on either way
    .filter((r) => r.relation && r.op && r.grain);
}

const cell = (r) => `${r.op}·${r.grain}`;

/** Majority (op·grain) among entries under a key; ties broken by first seen — declared, not silent. */
function predict(index, key) {
  const hits = index.get(key);
  if (!hits?.length) return null;
  const counts = new Map();
  for (const c of hits) counts.set(c, (counts.get(c) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function leaveOneOut(rows, keyOf) {
  let covered = 0, correct = 0;
  for (let i = 0; i < rows.length; i++) {
    const testKey = keyOf(rows[i]);
    if (!testKey) continue;
    const index = new Map();
    for (let j = 0; j < rows.length; j++) {
      if (i === j) continue;
      const k = keyOf(rows[j]);
      if (!k) continue;
      if (!index.has(k)) index.set(k, []);
      index.get(k).push(cell(rows[j]));
    }
    const p = predict(index, testKey);
    if (p == null) continue;
    covered++;
    if (p === cell(rows[i])) correct++;
  }
  return { n: rows.length, covered, correct,
    coverage: rows.length ? covered / rows.length : 0,
    accuracy: covered ? correct / covered : null };
}

/** What head-keying adds on exactly the rows where surface-keying found nothing. */
function marginalLadder(rows, posForms) {
  const sKey = (r) => r.relation.trim().toLowerCase();
  const hKey = (r) => headOf(r.relation, posForms) ?? null;
  let surfaceMissed = 0, fired = 0, correct = 0;
  for (let i = 0; i < rows.length; i++) {
    const sIndex = new Map(), hIndex = new Map();
    for (let j = 0; j < rows.length; j++) {
      if (i === j) continue;
      const sk = sKey(rows[j]);
      if (sk) { if (!sIndex.has(sk)) sIndex.set(sk, []); sIndex.get(sk).push(cell(rows[j])); }
      const hk = hKey(rows[j]);
      if (hk) { if (!hIndex.has(hk)) hIndex.set(hk, []); hIndex.get(hk).push(cell(rows[j])); }
    }
    if (predict(sIndex, sKey(rows[i])) != null) continue; // surface answered; head is not consulted
    surfaceMissed++;
    const p = predict(hIndex, hKey(rows[i]));
    if (p == null) continue;
    fired++;
    if (p === cell(rows[i])) correct++;
  }
  return { surfaceMissed, fired, correct, accuracy: fired ? correct / fired : null };
}

const pct = (x) => x == null ? "  —  " : `${(x * 100).toFixed(1)}%`;

console.log("=== head election vs exact surface, leave-one-out over the real goldens ===");
console.log(`POS share floor: ${POS_MIN_SHARE} (declared, not tuned here)\n`);

const results = [];
for (const [lang, specimen] of Object.entries(SPECIMENS)) {
  const rows = rowsFor(specimen);
  if (!rows.length) { console.log(`${lang}: no rows`); continue; }

  const resolved = await resolvePosPrior(lang);
  if (resolved.refused) {
    console.log(`${lang} (${REGISTRY[lang].name}): GAP — ${resolved.refused.type}: ${resolved.refused.detail}`);
    results.push({ lang, gap: resolved.refused.type, rows: rows.length });
    continue;
  }
  const posForms = resolved.forms;

  const surface = leaveOneOut(rows, (r) => r.relation.trim().toLowerCase());
  const head = leaveOneOut(rows, (r) => headOf(r.relation, posForms) ?? null);
  const headElected = rows.filter((r) => headOf(r.relation, posForms)).length;
  // The LADDER is what eot-sidecar2.mjs actually deploys: surface first,
  // head only where surface missed. Testing head as a REPLACEMENT (above)
  // would be unfair to the shipped design, so the marginal arm is measured
  // separately — the only number that matters for "should we wire this" is
  // what head adds on the rows surface could not answer.
  const ladder = marginalLadder(rows, posForms);

  console.log(`${lang} (${REGISTRY[lang].name}) — ${rows.length} adjudicated rows, head elected on ${headElected} (${pct(headElected / rows.length)})`);
  console.log(`   surface      : coverage ${pct(surface.coverage)} (${surface.covered}/${surface.n})   accuracy ${pct(surface.accuracy)} (${surface.correct}/${surface.covered})`);
  console.log(`   head (alone) : coverage ${pct(head.coverage)} (${head.covered}/${head.n})   accuracy ${pct(head.accuracy)} (${head.correct}/${head.covered})`);
  console.log(`   head (marginal, only where surface missed): fired ${ladder.fired}/${ladder.surfaceMissed}   accuracy ${pct(ladder.accuracy)} (${ladder.correct}/${ladder.fired})`);
  results.push({ lang, rows: rows.length, headElected, surface, head, ladder });
}

console.log("\n=== verdict ===");
for (const r of results) {
  if (r.gap) { console.log(`${r.lang}: no POS prior (${r.gap}) — cannot be tested, not counted either way`); continue; }
  const dCov = r.head.coverage - r.surface.coverage;
  const dAcc = (r.head.accuracy ?? 0) - (r.surface.accuracy ?? 0);
  const verdict = r.head.covered === 0 ? "head election never fires — no gain available"
    : dCov > 0.02 && dAcc >= -0.05 ? "HEAD WINS — more predictions, accuracy held"
    : dCov > 0.02 ? "head covers more but loses accuracy — not a clean win"
    : Math.abs(dCov) <= 0.02 ? "no material difference"
    : "surface wins";
  console.log(`${r.lang}: Δcoverage ${(dCov * 100).toFixed(1)}pp, Δaccuracy ${(dAcc * 100).toFixed(1)}pp — ${verdict}`);
}
