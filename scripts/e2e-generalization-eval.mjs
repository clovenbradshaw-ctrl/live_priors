#!/usr/bin/env node
// e2e-generalization-eval.mjs — the held-out test: run the REAL, currently
// committed mechanical ladder + POS prior against
// 06-government-legal/world-factbook (Algeria), a family NOTHING in this
// checkout has ever touched — no golden, no sidecar, no frame-table entry
// drawn from it. Answers "do you think these are good priors?" with a
// measurement instead of an assertion.
//
// Each specimen below is a genuine hand read of the real file (verified
// against its actual bytes, quoted in scripts/e2e-generalization-test-
// RESULTS.md), NOT a golden — no R1-R12 discipline applied, no commitment
// as ground truth, no prop/ground/because fields. A pilot sample to score
// the existing classifier against, honestly, including where it has no
// branch at all. Field-value specimens reconstruct the source's own
// elided copula (e.g. "Coastline: 998 km" -> relation "[is]") — flagged
// `reconstructed: true` so a reader never mistakes a bracketed
// reconstruction for something the source actually states.
//
// Full write-up, diagnosis of every refusal against real POS attestation,
// and the verdict: scripts/e2e-generalization-test-RESULTS.md.

import { classify, loadActPrior, loadMorphologyForms } from "./mechanical-ladder.mjs";
import { loadPosForms } from "./build-reading-priors.mjs";

const posForms = loadPosForms();
const actPrior = loadActPrior();
const morphologyForms = loadMorphologyForms();

// ---- specimens, hand-read from the real file ----
const specimens = [
  // -- prose (Background paragraph) --
  { id: "bg-1", register: "prose", sentence: "Algeria has known many empires and dynasties",
    subject: "Algeria", relation: "has known", object: "many empires and dynasties", clause: "main", polarity: "+" },
  { id: "bg-2", register: "prose", sentence: "A bloody eight-year struggle culminated in Algerian independence in 1962",
    subject: "a bloody eight-year struggle", relation: "culminated in", object: "Algerian independence in 1962", clause: "main", polarity: "+" },
  { id: "bg-3", register: "prose", sentence: "FIS membership is now illegal",
    subject: "FIS membership", relation: "is", object: "illegal", clause: "main", polarity: "+" },
  { id: "bg-4", register: "prose", sentence: "BOUTEFLIKA resigned in April 2019",
    subject: "BOUTEFLIKA", relation: "resigned", object: "in April 2019", clause: "main", polarity: "+" },
  { id: "bg-5", register: "prose", sentence: "TEBBOUNE ran for president as an independent",
    subject: "TEBBOUNE", relation: "ran for", object: "president", clause: "main", polarity: "+" },

  // -- field:value fact-sheet, copula ELIDED in the source, reconstructed
  //    honestly and flagged as such (never silently invented as if stated) --
  { id: "fb-1", register: "field-value", reconstructed: true, sentence: "Government type: presidential republic",
    subject: "Algeria's government type", relation: "[is]", object: "a presidential republic", clause: "main", polarity: "+" },
  { id: "fb-2", register: "field-value", reconstructed: true, sentence: "Capital: name: Algiers",
    subject: "Algeria's capital", relation: "[is]", object: "Algiers", clause: "main", polarity: "+" },
  { id: "fb-3", register: "field-value", reconstructed: true, sentence: "Independence: 5 July 1962 (from France)",
    subject: "Algeria's independence", relation: "[was]", object: "5 July 1962", clause: "main", polarity: "+" },
  { id: "fb-4", register: "field-value", reconstructed: true, sentence: "Population: total: 47,735,685",
    subject: "Algeria's population", relation: "[is]", object: "47,735,685", clause: "main", polarity: "+" },
  { id: "fb-5", register: "field-value", reconstructed: true, sentence: "Coastline: 998 km",
    subject: "Algeria's coastline", relation: "[is]", object: "998 km", clause: "main", polarity: "+" },
  { id: "fb-6", register: "field-value", reconstructed: true, sentence: "Climate: arid to semiarid",
    subject: "Algeria's climate", relation: "[is]", object: "arid to semiarid", clause: "main", polarity: "+" },
  { id: "fb-7", register: "field-value", reconstructed: true, sentence: "Suffrage: 18 years of age; universal",
    subject: "Algeria's suffrage", relation: "[is]", object: "18 years of age, universal", clause: "main", polarity: "+" },
  { id: "fb-8", register: "field-value", reconstructed: true, sentence: "Legislature name: Parliament (Barlaman)",
    subject: "Algeria's legislature", relation: "[is named]", object: "Parliament (Barlaman)", clause: "main", polarity: "+" },
];

console.log("=== live scoring against the REAL, currently-committed classifier ===\n");
const results = specimens.map((s) => {
  const r = classify(s, posForms, actPrior, morphologyForms);
  return { ...s, result: r };
});

for (const r of results) {
  const tag = r.result.undecided ? "UNDECIDED" : `${r.result.op}·${r.result.grain ?? "?"} (${r.result.tier})`;
  console.log(`[${r.register}${r.reconstructed ? "/reconstructed" : ""}] ${r.id}: "${r.sentence}"`);
  console.log(`   -> ${tag}${r.result.because ? " — " + r.result.because : ""}`);
}

const decided = results.filter((r) => !r.result.undecided);
console.log(`\n${decided.length}/${results.length} decided (${(decided.length / results.length * 100).toFixed(0)}%)`);
console.log("by register:", JSON.stringify(Object.fromEntries(
  ["prose", "field-value"].map((reg) => {
    const inReg = results.filter((r) => r.register === reg);
    const dec = inReg.filter((r) => !r.result.undecided);
    return [reg, `${dec.length}/${inReg.length}`];
  })
)));
