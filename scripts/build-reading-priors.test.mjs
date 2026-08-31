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

// ---- LP8: the adversarial-prior ledger ----
const { adversarialLayers, grainSurvival, HYPOTHESES } = await import("./reading-hypotheses.mjs");

test("grain survival: 20 of 23 construction-splits preserve grain; the 3 breaks are the documented cases", () => {
  const g = grainSurvival(priors);
  assert.equal(g.splits, 23);
  assert.equal(g.grainSurvives, 20);
  assert.deepEqual(g.breaks.map((b) => b.prop).sort(), [
    "udhr:education-directed", "udhr:family-unit-society", "udhr:limitation-purpose",
  ]);
});

test("adversarial ranking (ar): grain-transfer > cell-transfer > structural > frame, by measurement", () => {
  const { ranking } = adversarialLayers(priors, "ar", ["en"]);
  assert.deepEqual(ranking.map((r) => r.hypothesis), ["grain-transfer", "cell-transfer", "structural", "frame"]);
  assert.equal(ranking[0].rate, 1);
  assert.ok(ranking[1].rate > 0.9 && ranking[2].rate > ranking[3].rate);
});

test("a founding reading is unscored, never self-confirmed", () => {
  const { layers, ranking } = adversarialLayers(priors, "en", []);
  assert.equal(ranking.length, 0);
  for (const l of layers) assert.equal(l.scored, false);
});

test("the hypothesis ledger is append-only in shape: every entry dated, ids unique", () => {
  const ids = HYPOTHESES.map((h) => h.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const h of HYPOTHESES) assert.match(h.appended, /^\d{4}-\d{2}-\d{2}$/);
});

test("sidecars carry the layer ledger and the never-done fold", () => {
  const ar = JSON.parse(fs.readFileSync(path.join(ROOT, "06-government-legal/un-udhr/udhr-arb.txt.eot.json"), "utf8"));
  assert.equal(ar.layers[0].layer, 0);
  assert.equal(ar.layers.length, 1 + HYPOTHESES.length + 1); // + the Goal-6 blind-adjudication layer
  assert.match(ar.fold.statement, /never done/);
  assert.equal(ar.fold.ranking[0].hypothesis, "grain-transfer");
  const fra = JSON.parse(fs.readFileSync(path.join(ROOT, "06-government-legal/un-udhr/udhr-fra.txt.eot.json"), "utf8"));
  assert.ok(Array.isArray(fra.layers) && fra.fold.statement.match(/never done/));
});

test("ring-1 sweep summary is coherent", () => {
  const sweep = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/eot-ring1-sweep.json"), "utf8"));
  assert.equal(sweep.editions, 511);
  const sum = Object.values(sweep.articleDistribution).reduce((a, b) => a + b, 0);
  assert.equal(sum, 511);
  assert.equal(sweep.identityUnconfirmed.length, 0);
  assert.equal(sweep.rows.length, 511);
});

test("goal 6: the blind-panel score is coherent and its verdicts honest", () => {
  const score = JSON.parse(fs.readFileSync(path.join(ROOT, "goldens/reading/goal6/score.json"), "utf8"));
  assert.equal(score.floor, 0.4);
  assert.ok(score.panelVsPanel.grain.kappa > score.panelVsPanel.cell.kappa, "grain must out-agree cell — the invariance finding");
  assert.match(score.verdictAgainstFloor.cell, /BELOW/);
  assert.match(score.verdictAgainstFloor.grain, /clears/);
  for (const l of ["en", "ar", "es", "zh", "sw"]) assert.equal(score.panelVsStored[l].n, 40);
  const en = JSON.parse(fs.readFileSync(path.join(ROOT, "06-government-legal/un-udhr/udhr-eng.txt.eot.json"), "utf8"));
  const blind = en.layers.find((l) => l.kind === "blind-adjudication");
  assert.ok(blind && blind.panelKappa.grain === score.panelVsPanel.grain.kappa, "the blind layer rides the sidecar ledger");
  assert.match(en.fold.goal6, /GRAIN clears/);
});

test("the omnilingual closure holds: 27/27 cells, every cell in >=2 languages", () => {
  const LANG = { udhr: "en", "udhr-arb": "ar", "udhr-spa": "es", "udhr-cmn_hans": "zh", "udhr-swh": "sw",
    kant: "en", alice: "en", ripgrep: "en", "gen-1": "he", "gen-2": "he", "gen-6": "he",
    "mark-1-15": "grc", "mark-16-6": "grc", "mark-15-38": "grc",
    "quran-2-37": "ar", "quran-2-37-en": "en", "quran-54-1": "ar", "quran-5-3": "ar", "quran-2-255": "ar",
    "lear-division": "en", "lear-disclaim": "en", "lear-france": "en", "tempest-abjure": "en" };
  const cells = {};
  for (const f of fs.readdirSync(path.join(ROOT, "goldens/reading")).filter((x) => x.endsWith(".golden.json"))) {
    const d = JSON.parse(fs.readFileSync(path.join(ROOT, "goldens/reading", f), "utf8"));
    for (const r of d.rows) {
      if (r.clause === "heading") continue;
      (cells[`${r.phasepost.op}·${r.phasepost.grain}`] ??= new Set()).add(LANG[d.specimen]);
    }
  }
  assert.equal(Object.keys(cells).length, 27);
  for (const [c, langs] of Object.entries(cells)) assert.ok(langs.size >= 2, `${c} attested in only ${[...langs]}`);
});
