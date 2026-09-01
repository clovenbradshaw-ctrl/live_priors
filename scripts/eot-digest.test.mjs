import test from "node:test";
import assert from "node:assert/strict";
import { loadOrgans } from "./eot-digest.mjs";

// THE DARK-GATE TEST (2026-09-01). loadOrgans has always REPORTED whether
// its grammar gate found its ground (`posPriorLoaded`) — and for the gate's
// whole life that report said `false`, truthfully, to nobody, because the
// path carried a one-word filename error ("pos-eng.json" for
// "pos-prior-eng.json") and no test ever read the flag. 12,696 real Dracula
// edges were admitted with "the"/"and"/"of" as labels while the gate that
// removes exactly those sat dark beside them.
//
// The rule this test enforces, stated once: A DATA-GATED ORGAN'S GROUND IS
// ASSERTED WHERE THE GROUND IS COMMITTED. A flag someone could check is not
// enforcement; a test that fails the checkout is. (Same lesson at a smaller
// grain as eo-constitution III.4: what is passed is derived and checked,
// never assumed from what was meant.)

const organs = await loadOrgans();

test("the grammar gate is LIT in this checkout — a dark gate is a failure, not a report", () => {
  assert.equal(organs.posPriorLoaded, true,
    "posPriorLoaded is false: the POS prior did not load from any candidate path. " +
    "The gate will run dark and admit function-word labels. Fix the path; do not skip this test.");
  assert.equal(typeof organs.classifyConnector, "function",
    "classifyConnector is not a function — a dark gate hands its consumers null, which is typeof 'object' and passes truthy-object checks");
});

test("the lit gate actually refuses — a function word is turned away, a real verb is not", () => {
  // Not just "loaded": the organ must DO its one job. Control built to fail
  // (eo-constitution II.23) — if "and" ever classifies as a plausible verb
  // label, the prior file is the wrong artifact regardless of having loaded.
  // classifyConnector takes an EDGE (it reads edge.verb) — first draft of
  // this very test passed bare strings, both probes came back found:false
  // identically, and the control caught its own author. Kept as the shape
  // reminder.
  const and_ = organs.classifyConnector({ verb: "and" }, { minShare: organs.GRAMMAR_MIN_SHARE });
  const married = organs.classifyConnector({ verb: "married" }, { minShare: organs.GRAMMAR_MIN_SHARE });
  assert.equal(and_.found, true, "'and' is missing from the prior — wrong artifact loaded");
  assert.equal(married.found, true, "'married' is missing from the prior — wrong artifact loaded");
  assert.notEqual(and_.thraxClass, "verb", "'and' settled as a VERB — the gate admits function words");
  assert.equal(married.thraxClass, "verb", "'married' failed to settle as a verb — the gate would refuse real labels");
});
