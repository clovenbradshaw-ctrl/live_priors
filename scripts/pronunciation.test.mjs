// pronunciation.test.mjs — conformance for PronunciationPrior@1: the
// committed manifests, the lookup API's resolve discipline, and the registry
// rows. No stubs, no network, no synthesis: everything here reads the
// COMMITTED manifests and the CACHE the builder has already built locally.
// A fresh checkout with no cache passes with skips that SAY they skipped,
// never with silent green (the multilingual-priors.test.mjs posture).
// Full account: scripts/pronunciation-RESULTS.md (see below).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REGISTRY } from "./lang-registry.mjs";
import { LANGUAGES, cachePath } from "./build-pronunciation-prior.mjs";
import { manifestOf, resolvePronunciation, coverage } from "./pronunciation.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRIOR_DIR = path.join(ROOT, "derived-priors", "pronunciation-priors");

test("manifests: every Rosetta language has a committed PronunciationPrior@1", () => {
  for (const lang of ["eng", "fra", "spa", "rus", "arb", "cmn_hans"]) {
    const m = manifestOf(lang);
    assert.ok(m, `${lang} manifest missing — run node scripts/build-pronunciation-prior.mjs`);
    assert.equal(m.schema, "PronunciationPrior@1");
    assert.ok(m.giver.engine === "espeak-ng" && m.giver.engineLicense, `${lang} giver must name engine + license`);
    assert.ok(m.counts.synthesized === m.counts.words, `${lang}: every word must have been synthesized (${m.counts.words} words, ${m.counts.synthesized} synthesized)`);
    assert.equal(m.counts.refused, 0, `${lang}: zero refusals on the Rosetta word list`);
  }
});

test("manifests: every entry carries the surface + provenance — ipa, sha256, bytes, source, unit", () => {
  for (const lang of Object.keys(LANGUAGES)) {
    const m = manifestOf(lang);
    assert.ok(m);
    for (const [word, e] of Object.entries(m.words)) {
      assert.ok(e.sha256 && /^[0-9a-f]{64}$/.test(e.sha256), `${lang}/${word}: sha256`);
      assert.ok(Number.isInteger(e.bytes) && e.bytes > 0, `${lang}/${word}: bytes`);
      assert.ok(e.source?.kind === "synthesized" && e.source?.engine === "espeak-ng" && e.source?.voice, `${lang}/${word}: source`);
      assert.ok(e.unit === "word" || e.unit === "clause", `${lang}/${word}: unit`);
    }
  }
});

test("manifests: the header junk is stripped — the OHCHR labels are NOT in the word list", () => {
  const m = manifestOf("eng");
  for (const junk of ["english", "adopted", "publisher", "office", "en", "iii"]) {
    assert.ok(!(junk in m.words), `"${junk}" is OHCHR header metadata, not the declaration's own words`);
  }
  assert.ok("freedom" in m.words && "dignity" in m.words && "rights" in m.words, "real body words are present");
});

test("lookup: a cached word resolves to real WAV bytes pinned by the manifest", () => {
  const m = manifestOf("eng");
  const word = Object.keys(m.words).find((w) => w.length > 3) ?? "freedom";
  const entry = m.words[word];
  const r = resolvePronunciation("eng", word);
  assert.ok(!r.refused, `eng/${word} must resolve: ${r.refused?.detail ?? ""}`);
  assert.equal(r.from, "cache", "the committed manifest + built cache resolves from cache, offline");
  assert.ok(Buffer.isBuffer(r.wav) && r.wav.length === entry.bytes, "served bytes match the manifest's pinned size");
  assert.equal(r.sha256, entry.sha256, "served hash matches the manifest");
  // minimal RIFF sniff — the repo's wav.js is the real decoder
  assert.equal(r.wav.readUInt32LE(0), 0x46464952, "RIFF magic");
});

test("lookup: a word absent from the manifest is a TYPED gap, never another language, never fabricated", () => {
  const gap = resolvePronunciation("eng", "supercalifragilistic");
  assert.equal(gap.refused?.type, "word_gap");
  const cross = resolvePronunciation("fra", "freedom"); // English word, French manifest
  assert.equal(cross.refused?.type, "word_gap", "never answered from another language");
  const unknown = resolvePronunciation("xx", "freedom");
  assert.equal(unknown.refused?.type, "unknown_language");
});

test("lookup: cache-miss without allowSynthesis is a typed refusal, not a silent synth", () => {
  // Point the resolver at a manifest that has no cache behind it: remove one
  // cache file, resolve, expect not_cached (then restore the file).
  const m = manifestOf("eng");
  const word = Object.keys(m.words).find((w) => w.length > 3) ?? "freedom";
  const entry = m.words[word];
  const p = cachePath("eng", entry.sha256);
  const keep = fs.readFileSync(p);
  try {
    fs.rmSync(p);
    const r = resolvePronunciation("eng", word);
    assert.equal(r.refused?.type, "not_cached");
  } finally {
    fs.writeFileSync(p, keep);
  }
});

test("coverage: full cache reports 0 missing; absent cache reports the gap honestly", () => {
  const c = coverage("eng");
  assert.equal(c.total, c.cached + c.missing);
  assert.equal(c.missing, 0, "the built cache covers the whole manifest");
  assert.equal(c.resolvable, c.total);
});

test("registry: every row states its pronunciation source, and Swahili's absence is typed", () => {
  assert.equal(REGISTRY.en.pronunciation.prior, "pronunciation-eng.json");
  assert.equal(REGISTRY.ar.pronunciation.voice, "ar");
  assert.equal(REGISTRY.zh.pronunciation.unit, "clause");
  assert.equal(REGISTRY.sw.pronunciation.gap.status, "no_udhr_corpus");
  assert.ok(REGISTRY.sw.pronunciation.gap.because, "the gap must say why, not shrug");
});