// build-reading-priors.test.mjs — conformance for the seed checkpoint and
// the EOTReading@2 generator's organs, against the REAL artifact, the REAL
// goldens, the REAL POS prior, and the REAL generated sidecars (no stubs —
// the walls themselves). Run: node --test scripts/build-reading-priors.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { headOf, loadPosForms, POS_MIN_SHARE } from "./build-reading-priors.mjs";
import { digitRunValue, rosettaEvents } from "./eot-sidecar2.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const priors = JSON.parse(fs.readFileSync(path.join(ROOT, "derived-priors/reading-priors/reading-priors-v1.json"), "utf8"));
const posForms = loadPosForms();

test("checkpoint standing: the artifact declares itself a projection, never weights", () => {
  assert.equal(priors.standing.kind, "checkpoint");
  assert.match(priors.standing.statement, /never a weight/i);
  assert.match(priors.standing.regenerate, /build-reading-priors\.mjs/);
});

test("rosetta: every prop present in >=1 language and the matrix agrees with a recount", () => {
  const props = Object.keys(priors.rosetta.props);
  assert.equal(props.length, 107);
  for (const p of props) {
    const langs = Object.keys(priors.rosetta.props[p].languages);
    assert.ok(langs.length >= 1, `${p} has no language`);
    assert.deepEqual([...langs].sort(), [...priors.rosetta.matrix[p].presentIn].sort());
  }
  const splits = Object.values(priors.rosetta.matrix).filter((m) => m.agreement === "construction-split").length;
  const recount = Object.values(priors.rosetta.matrix)
    .filter((m) => new Set(Object.values(m.cellsByLang).flat()).size > 1).length;
  assert.equal(splits, recount);
});

test("actExpectations: every entry carries a specimen@ground witness", () => {
  for (const entries of Object.values(priors.actExpectations.expectations)) {
    for (const e of entries) assert.match(e.witness, /^[a-z0-9_-]+@[a-z0-9-]+(\.\d+)*$/i);
  }
});

test("head extraction is measurement: dominance elects, maximal share beats aux-capable forms", () => {
  // "subjected" is VERB-only in the treebank; "shall"/"be" are AUX-dominant
  assert.equal(headOf("shall be subjected to", posForms), "subjected");
  // "have" IS verb-dominant (963 VERB vs 745 AUX) but loses to an
  // unambiguous verb by maximal share — no list anywhere
  assert.equal(headOf("have resulted in", posForms), "resulted");
  assert.equal(headOf("have pledged themselves to achieve", posForms), "pledged");
  // a bare aux/copula chain has no verb-dominant token
  assert.equal(headOf("is", posForms), null);
  assert.equal(headOf("shall be", posForms), null);
  // DET-dominant and never-verb tokens are not electable
  assert.equal(headOf("the", posForms), null);
  assert.equal(headOf("has the right to", posForms), null); // has=AUX-dom, right never VERB
  // an unattested token is never elected — no evidence, no election
  assert.equal(headOf("endowed with", posForms), null);
});

test("no junk head keys: every en| head key is VERB-dominant in the treebank", () => {
  const headKeys = Object.entries(priors.actExpectations.expectations)
    .filter(([k, v]) => k.startsWith("en|") && v.some((e) => e.keyKind === "head"))
    .map(([k]) => k.slice(3));
  assert.ok(headKeys.length > 0);
  for (const form of headKeys) {
    const counts = posForms[form];
    assert.ok(counts, `head key ${form} unattested`);
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const verbShare = (counts.VERB ?? 0) / total;
    assert.ok(verbShare >= POS_MIN_SHARE, `head key ${form} not VERB-dominant (${verbShare})`);
  }
  assert.ok(!headKeys.includes("the"));
});

test("graph events: ar's contribution matches the adjudication", () => {
  const ev = rosettaEvents("ar", ["en"]);
  assert.equal(ev["polarity-variant"].length, 1);
  assert.equal(ev["polarity-variant"][0].prop, "udhr:marriage-consent");
  assert.ok(ev["polarity-variant"][0].becauseHere && ev["polarity-variant"][0].becauseBefore,
    "a polarity variant must carry both sides' reasons");
  assert.ok(ev.absent.some((e) => e.prop === "udhr:friendly-relations-essential"),
    "the known Arabic absence must land as an absence event");
  // a polarity difference riding a cell change folds into the split
  const cellVariantProps = ev["cell-variant"].map((e) => e.prop);
  assert.ok(cellVariantProps.includes("udhr:no-distinction-status"));
  assert.ok(!ev["polarity-variant"].some((e) => e.prop === "udhr:no-distinction-status"));
});

test("graph events: the founding reading founds, later readings never do", () => {
  const en = rosettaEvents("en", []);
  assert.equal(en.founded.length, 94);
  assert.equal(en["unique-so-far"].length, 0);
  const sw = rosettaEvents("sw", ["en", "ar", "es", "zh"]);
  assert.equal(sw.founded.length, 0);
});

test("digit runs: per-script decimal blocks parse, mixed blocks refuse", () => {
  assert.equal(digitRunValue("12"), 12);
  assert.equal(digitRunValue("٢٣"), 23); // Arabic-Indic
  assert.equal(digitRunValue("२९"), 29); // Devanagari
  assert.equal(digitRunValue("1٢"), null); // mixed-block run is noise, not a number
  assert.equal(digitRunValue("一"), null); // kanji numerals: outside the received decimal blocks — the disclosed jpn gap
});

test("sidecars on disk: spans verified, derived firewall typed, checkpoint named", () => {
  const en = JSON.parse(fs.readFileSync(path.join(ROOT, "06-government-legal/un-udhr/udhr-eng.txt.eot.json"), "utf8"));
  assert.equal(en.schema, "EOTReading@2");
  assert.equal(en.spanSelfVerification.ok, en.spanSelfVerification.checked);
  assert.equal(en.reader.kind, "hand-adjudication");
  assert.match(en.ground.seed, /checkpoint/);
  const fra = JSON.parse(fs.readFileSync(path.join(ROOT, "06-government-legal/un-udhr/udhr-fra.txt.eot.json"), "utf8"));
  assert.equal(fra.reader.derived, true);
  assert.equal(fra.propositions.length, 0);
  assert.equal(fra.gaps[0].type, "no_lexicon");
  assert.deepEqual(fra.structure.articleRegions.missingNumbers, [1]); // Article premier, disclosed not repaired
});
