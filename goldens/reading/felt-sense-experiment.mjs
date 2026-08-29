#!/usr/bin/env node
// felt-sense-experiment.mjs — can a LEXICON GAP's act be inferred from its
// occurrence's own company, by similarity to attested acts in the same
// material? The direction, received directly (2026-08-29, near-verbatim):
// "things like 'born' is a gap, but i bet we can infer what type of
// transformation it is by the shape and its similarity to other things —
// we need to build towards a true felt sense of meaning."
//
// SEARCH-FIRST: the organ for exactly this already exists —
// eoreader6.1 roles.js::resolveSpanRole ("given a span of unknown role and
// other spans already known to fill declared roles, resolves which role
// THIS occurrence's own local vocabulary resembles, by the same causal
// one-hop activation.js recall pronouns.js already trusts"). Role is a
// caller-declared label — so THE NINE ACTS are declared as the roles, and
// every verb the lexicon holds UNANIMOUSLY, found in the material, is
// evidence. The gap verb is the unknown. Nothing new is built; the
// engine's own felt-sense machinery is pointed at a new question.
//
// THE KNOWN CONSTRAINT, on record before running (eoreader6.1's own
// CLAUDE.md, measured): "the mechanism needs same-role vocabulary to
// actually recur within the material, which book-length text has and a
// single short passage often does not." The golden windows are ~2 KB.
// So this experiment runs at BOTH scales — the golden window alone, and
// the specimen's full first 8000 chars (the pipeline's own excerpt size)
// — so the scale dependence is measured, not assumed.
//
// Numbers: minActivation 0.05 / minMargin 0.2 — host/corpus.js's own
// declared, disclosed-as-unvalidated operating point, reused (P38's own
// precedent), never invented here.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LP_ROOT = path.join(HERE, "..", "..");
const FOLD = path.join(LP_ROOT, "..", "the-fold");
const EOREADER7 = path.join(LP_ROOT, "..", "eoreader7");
const LEGACY = path.join(EOREADER7, "legacy-eoreader6.1", "packages", "engine", "perceiver", "text");

const { resolveSpanRole } = await import(path.join(LEGACY, "roles.js"));
const spans = await import(path.join(EOREADER7, "native/adapters/text/spans.js"));
const { stripContainer } = await import(path.join(FOLD, "source.js"));

const actPrior = JSON.parse(fs.readFileSync(path.join(FOLD, "eval/fixtures/act-prior-en.json"), "utf8"));

const MIN_ACTIVATION = 0.05, MIN_MARGIN = 0.2; // host/corpus.js's own point

const cases = [
  { specimen: "udhr", path: "06-government-legal/un-udhr/udhr-eng.txt", gutenberg: false, gapForm: "born", want: "INS" },
  { specimen: "kant", path: "02-encyclopedic/wikipedia/Immanuel_Kant.txt", gutenberg: false, gapForm: "born", want: "INS" },
  { specimen: "alice", path: "01-literature-books/gutenberg/pg11_Alice_s_Adventures_in_Wonderland.txt", gutenberg: true, gapForm: "ran", want: "SIG" },
];

const wordRe = (w) => new RegExp(`\\b${w}\\b`, "i");

function runAt(label, text, gapForm, want) {
  const sents = spans.splitSentences(text).map((s, i) => ({ text: typeof s === "string" ? s : s.text, offset: s.offset ?? 0, order: i }));

  // evidence: every token in the material whose ActPrior standing is
  // UNANIMOUS declares its act as a known role at its own sentence
  const occurrences = [];
  let evidenceCount = 0;
  const evidenceActs = new Map();
  for (const s of sents) {
    const words = s.text.toLowerCase().match(/[\p{L}'’-]+/gu) ?? [];
    for (const w of new Set(words)) {
      if (w === gapForm) continue;
      const e = actPrior.forms[w];
      if (e?.standing === "unanimous") {
        occurrences.push({ sentenceOrder: s.order, role: e.op, id: `${w}@${s.order}`, offset: 0 });
        evidenceCount += 1;
        evidenceActs.set(e.op, (evidenceActs.get(e.op) ?? 0) + 1);
      }
    }
    if (wordRe(gapForm).test(s.text)) {
      occurrences.push({ sentenceOrder: s.order, role: null, id: `GAP:${gapForm}@${s.order}`, offset: 0 });
    }
  }

  const unknowns = occurrences.filter((o) => o.role == null).length;
  const { bindings, gaps } = resolveSpanRole(sents, occurrences, { minActivation: MIN_ACTIVATION, minMargin: MIN_MARGIN });
  const gapBindings = bindings.filter((b) => String(b.id).startsWith("GAP:"));
  const gapGaps = gaps.filter((g) => String(g.id).startsWith("GAP:"));

  console.log(`  [${label}] sentences=${sents.length} evidence=${evidenceCount} (${[...evidenceActs.entries()].map(([k, v]) => `${k}:${v}`).join(" ")}) "${gapForm}" occurrences=${unknowns}`);
  for (const b of gapBindings) {
    const hit = b.role === want ? "HIT" : "MISS";
    console.log(`    ${hit}: ${b.id} -> ${b.role} (want ${want}) activation=${b.activation?.toFixed(3)} margin=${b.margin?.toFixed(3)}`);
  }
  for (const g of gapGaps) {
    console.log(`    refused: ${g.id} — ${g.reason ?? JSON.stringify(g).slice(0, 90)}`);
  }
  return { bound: gapBindings.length, hits: gapBindings.filter((b) => b.role === want).length, refused: gapGaps.length };
}

const normalise = (t) => t.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
let total = { bound: 0, hits: 0, refused: 0 };
for (const c of cases) {
  const raw = fs.readFileSync(path.join(LP_ROOT, c.path), "utf8");
  let body = raw;
  if (c.gutenberg) body = stripContainer(raw).text;
  const norm = normalise(body);
  const golden = JSON.parse(fs.readFileSync(path.join(HERE, `${c.specimen}.golden.json`), "utf8"));

  console.log(`\n=== ${c.specimen}: "${c.gapForm}" (golden act: ${c.want}) ===`);
  const w = runAt("golden window", norm.slice(0, golden.window.end), c.gapForm, c.want);
  const f = runAt("full 8000-char excerpt", norm.slice(0, 8000), c.gapForm, c.want);
  for (const r of [w, f]) { total.bound += r.bound; total.hits += r.hits; total.refused += r.refused; }
}

console.log(`\nTOTAL: bound ${total.bound} (hits ${total.hits}, wrong ${total.bound - total.hits}), refused ${total.refused}`);
console.log(`(a refusal is the organ's honest answer at these declared numbers — never counted against the hypothesis, never for it)`);
