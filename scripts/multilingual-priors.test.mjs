// multilingual-priors.test.mjs — conformance against the real, committed
// multilingual POS priors (no stubs, no re-fetch — the build script already
// verified live network access; this suite pins what actually landed on
// disk). Full account, including why no morphology prior ships for any
// language: scripts/multilingual-priors-RESULTS.md.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));

test("POS priors: three real languages built, each with full giver metadata", () => {
  for (const [code, iso] of [["ar", "arb"], ["es", "spa"], ["zh", "cmn_hans"]]) {
    const d = load(`derived-priors/pos-priors/pos-prior-${code}.json`);
    assert.equal(d.schema, "POSPrior@1");
    assert.equal(d.language, iso);
    assert.equal(d.giver.resourceLicense, "CC BY-SA 4.0");
    assert.ok(d.giver.url.startsWith("https://github.com/UniversalDependencies/"));
    assert.equal(d.giver.files.length, 3, "train/dev/test — all three splits");
    for (const f of d.giver.files) assert.match(f.sha256, /^[0-9a-f]{64}$/);
    assert.ok(d.counts.forms > 1000, `${code}: suspiciously small vocabulary`);
  }
});

test("POS priors: real specimen words from this project's own hand goldens are attested", () => {
  const ar = load("derived-priors/pos-priors/pos-prior-ar.json").forms;
  assert.ok(ar["ينبغي"]?.VERB > 0, "a real UDHR Arabic verb must be attested");
  const es = load("derived-priors/pos-priors/pos-prior-es.json").forms;
  assert.ok(es["derechos"]?.NOUN > 0, "a real UDHR Spanish noun must be attested");
  const zh = load("derived-priors/pos-priors/pos-prior-zh.json").forms;
  assert.ok(zh["是"]?.VERB > 0 || zh["是"]?.AUX > 0, "a real UDHR Chinese copula token must be attested");
});

test("POS priors: the Object.prototype collision is real data, not corrupted", () => {
  // 'constructor' is a genuine attested Spanish word in UD_Spanish-AnCora —
  // a plain {} accumulator silently resolves forms['constructor'] to
  // Object.prototype.constructor instead of a counter object (measured
  // live, not hypothetical: this crashed a sibling build on first run, and
  // left this very artifact one distinct form short before it was caught).
  // Pinned so the Object.create(null) fix can never silently regress.
  const es = load("derived-priors/pos-priors/pos-prior-es.json").forms;
  assert.deepEqual(es["constructor"], { NOUN: 2 });
});

test("POS priors: the Swahili gap is typed and disclosed, not silently absent", () => {
  const manifest = load("derived-priors/pos-priors/MULTILINGUAL-MANIFEST.json");
  assert.equal(manifest.built.length, 3);
  assert.equal(manifest.gaps.length, 1);
  assert.equal(manifest.gaps[0].code, "sw");
  assert.equal(manifest.gaps[0].status, "no_usable_data");
  assert.ok(manifest.gaps[0].checked.some((c) => c.repo === "UD_Swahili-OPUSGV"));
  assert.ok(!fs.existsSync(path.join(ROOT, "derived-priors/pos-priors/pos-prior-sw.json")),
    "no sw artifact should exist — a gap must never be silently filled with a placeholder file");
});

test("no morphology prior ships for any non-English language, and that is the point", () => {
  // A morphology prior exists in this project for exactly one purpose:
  // bridging an inflected surface form to a lemma so ActPrior@1 (VerbNet)
  // can be looked up. VerbNet is English-only by construction — Levin
  // classes are a theory of ENGLISH verb alternations — so a non-English
  // morphology prior is a bridge to a destination that does not exist.
  // One was built for Spanish from real unimorph/spa data, measured at
  // 24.5MB, and deleted unbuilt-upon rather than committed as coverage.
  // Pinned so a future pass re-adds one only alongside a real consumer.
  assert.ok(!fs.existsSync(path.join(ROOT, "derived-priors/morphology-priors")),
    "if this directory is back, a consumer for it must exist too — see multilingual-priors-RESULTS.md");
});
