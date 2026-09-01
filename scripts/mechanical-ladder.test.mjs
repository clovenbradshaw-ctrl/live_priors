// mechanical-ladder.test.mjs — conformance against the real POS prior and
// the real goldens (no stubs). Pins the three measured corrections so a
// future edit cannot silently reintroduce a defect this pass found and
// fixed by running against real data.
import test from "node:test";
import assert from "node:assert/strict";
import { classify, loadActPrior, loadMorphologyForms } from "./mechanical-ladder.mjs";
import { loadPosForms } from "./build-reading-priors.mjs";

const posForms = loadPosForms();
const actPrior = loadActPrior();
const morphologyForms = loadMorphologyForms();
const c = (row) => classify(row, posForms, actPrior, morphologyForms);
const cNoVerbnet = (row) => classify(row, posForms); // actPrior omitted — tier must not fire

test("A4 fires only on the intersection: negative-quantifier subject AND pure copula", () => {
  const alice = c({ subject: "nothing so very remarkable", relation: "was", object: "in that", polarity: "+" });
  assert.equal(alice.op, "NUL");
  assert.equal(alice.tier, "A4");
});

test("A4 does NOT fire on a negative-quantifier subject over an ordinary content verb (the bug this pass found and fixed)", () => {
  const r = c({ subject: "No one", relation: "shall be subjected to", object: "torture", polarity: "-" });
  assert.notEqual(r.op, "NUL");
  // "subjected to" is a real frame-table phrase — it should still be decided, just not as NUL
  assert.equal(r.op, "CON");
});

test("frame table matches only its own named phrases — no analogy-extension", () => {
  const r = c({ subject: "someone", relation: "shall be held guilty of", object: "an offence" });
  assert.equal(r.undecided, true, "held guilty of was removed — it belongs to an unpublished EVA/judgment family, not subjection");
});

test("the making-infliction narrowing does not swallow a distinguishing act", () => {
  const r = c({ subject: "no distinction", relation: "shall be made", object: "on the basis of status" });
  assert.equal(r.undecided, true, "bare 'shall be made' is not the same sense as 'made a slave' — narrowed on purpose");
});

test("copula rule 5 fires only on the closed locative/temporal ADP subset", () => {
  const loc = c({ subject: "the meeting", relation: "was", object: "in the harbor" });
  assert.equal(loc.op, "SIG"); assert.equal(loc.grain, "Ground");
  const degree = c({ subject: "x", relation: "was", object: "of the greatest importance" });
  assert.notEqual(degree.grain, "Ground", "'of' is not a locative/temporal preposition — must not fire rule 5");
});

test("copula rule 3 (definite predicate) and rule 2 (indefinite/bare-plural) still decide", () => {
  const r3 = c({ subject: "Paris", relation: "is", object: "the capital" });
  assert.deepEqual([r3.op, r3.grain], ["SIG", "Figure"]);
  const r2 = c({ subject: "he", relation: "is", object: "a physician" });
  assert.deepEqual([r2.op, r2.grain], ["SIG", "Pattern"]);
});

test("undecided is a real outcome, never a forced guess", () => {
  const r = c({ subject: "the moon", relation: "orbits", object: "the earth" });
  assert.equal(r.undecided, true);
});

test("VerbNet tier: unanimous ActPrior entries decide (op only, grain undetermined)", () => {
  const r = c({ subject: "the bear", relation: "ate", object: "the fish" });
  assert.equal(r.op, "NUL");
  assert.equal(r.grain, null);
  assert.equal(r.tier, "verbnet");
  assert.match(r.because, /lemma "eat" \(UniMorph\)/);
});

test("VerbNet tier: contested entries are refused, never resolved by picking a candidate (R7)", () => {
  const r = c({ subject: "TEBBOUNE", relation: "ran for", object: "president" });
  assert.equal(r.undecided, true);
  assert.match(r.because, /contested/);
});

test("VerbNet tier is off by default — omitting actPrior never fires it", () => {
  const withVerbnet = c({ subject: "the bear", relation: "ate", object: "the fish" });
  const without = cNoVerbnet({ subject: "the bear", relation: "ate", object: "the fish" });
  assert.equal(withVerbnet.tier, "verbnet");
  assert.equal(without.undecided, true);
});

test("VerbNet tier never fires inside a pure copula chain (no verb to look up)", () => {
  const r = c({ subject: "Paris", relation: "is", object: "the capital" });
  assert.notEqual(r.tier, "verbnet");
});
