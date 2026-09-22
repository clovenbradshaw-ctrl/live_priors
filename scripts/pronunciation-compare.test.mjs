// pronunciation-compare.test.mjs — conformance for the COMPARATIVE layer over
// PronunciationPrior@1. No network, no synthesis, no stubs: everything reads
// the committed manifests and the local cache (the pronunciation.test.mjs
// posture). The point of these tests is not that a particular distance value
// is "right" — it is that the layer is DETERMINISTIC, that its feature space
// is language-neutral, that a same-script cognate measures CLOSER than an
// unrelated root, and that a phone outside the received table is a COUNTED
// gap, never a silent zero.
import test from "node:test";
import assert from "node:assert/strict";
import { phonesOf, phoneDistance, wordDistance, inventoryOf, inventoryDistance, matrix, articlePhones, articleDistance } from "./pronunciation-compare.mjs";
import { manifestOf } from "./pronunciation.mjs";

test("segmentation: IPA -> phone tokens; stress, syllable dots, and espeak-ng artifacts are prosody, not phones", () => {
  const ps = phonesOf("fɹˈiːdəm");
  assert.deepEqual(ps.map((p) => p.phone), ["f", "ɹ", "i", "d", "ə", "m"]);
  const cmn = phonesOf("tɕˈiɛ5n"); // tone digits attach as modifiers, not phones
  assert.equal(cmn.length, 5, "t ɕ i ɛ n are the phones");
  assert.equal(cmn[3].phone, "ɛ");
  assert.equal(cmn[3].modifiers, "5", "the cmn tone digit is a modifier on its vowel, never a phone");
  const ru = phonesOf("ɭʲˈu\"dʲɪ"); // espeak-ng soft-sign artifact is skipped
  assert.ok(!ru.some((p) => p.phone === '"'));
  const fra = phonesOf("lˈa-"); // continuation mark is skipped
  assert.ok(!fra.some((p) => p.phone === "-"));
});

test("feature space: the same phone is 0, a vowel is 1 from a consonant, voice and place differences are measured", () => {
  assert.equal(phoneDistance("t", "t"), 0);
  assert.equal(phoneDistance("t", "a"), 1, "V vs C is maximally far — the class gap is not a small number");
  const tv = phoneDistance("t", "d"); // same place+manner, voice only
  assert.ok(tv > 0 && tv < 0.4, `t~d voice distance should be small but nonzero (got ${tv})`);
  const tk = phoneDistance("t", "k"); // both vl plosive, place proximity
  assert.ok(tk > 0 && tk < 0.35, `t~k place proximity should be small (got ${tk})`);
  assert.equal(phoneDistance("t", "K"), 1, "an unknown symbol is a typed gap: maximally far, not silently equal");
});

test("inventory: every Rosetta manifest projects with zero unknown phones (no silent gaps)", () => {
  for (const lang of ["eng", "fra", "spa", "rus", "arb", "cmn_hans"]) {
    const inv = inventoryOf(lang);
    assert.ok(inv, `${lang} manifest must exist`);
    assert.equal(inv.unknownSize, 0, `${lang}: ${Object.keys(inv.unknown).join(" ")} are espeak-ng artifacts leaking into the inventory`);
    assert.ok(inv.size >= 20, `${lang} should have a real phone inventory, got ${inv.size}`);
  }
});

test("language distance: the matrix is symmetric, diagonal 0, and Arabic is not pinned at 0 against any language", () => {
  const langs = ["eng", "fra", "spa", "rus", "arb", "cmn_hans"];
  const m = matrix(langs);
  for (const a of langs) {
    assert.equal(m[a][a], 0);
    for (const b of langs) assert.equal(m[a][b], m[b][a], "symmetric");
  }
  for (const b of langs) if (b !== "arb") assert.ok(m.arb[b] > 0, `arb~${b} must be a positive distance`);
});

test("word distance: a same-script cognate measures CLOSER than an unrelated root (the comparative works)", () => {
  const got = (a, wa, b, wb) => {
    const ea = manifestOf(a).words[wa], eb = manifestOf(b).words[wb];
    return ea && eb ? wordDistance(ea.ipa, eb.ipa).distance : null;
  };
  const equal_igual = got("eng", "equal", "spa", "igual");      // cognate
  const dignity_dignidad = got("eng", "dignity", "spa", "dignidad"); // cognate
  const rights_prava = got("eng", "rights", "rus", "права");    // unrelated root
  assert.ok(equal_igual != null && dignity_dignidad != null && rights_prava != null, "all four words must be in the manifests");
  assert.ok(equal_igual < 0.4, `equal~igual are cognates, should be close (got ${equal_igual})`);
  assert.ok(dignity_dignidad < 0.4, `dignity~dignidad are cognates, should be close (got ${dignity_dignidad})`);
  assert.ok(rights_prava > 0.5, `rights~права are unrelated roots, should be far (got ${rights_prava})`);
});

test("meaning alignment: the same UDHR article covers fully in every language (the alignment key is the article number)", () => {
  for (const lang of ["eng", "fra", "spa", "rus", "arb", "cmn_hans"]) {
    const a = articlePhones(lang, 1);
    assert.ok(!a.refused, `${lang} Article 1 must parse`);
    assert.ok(a.coverage >= 0.9, `${lang} Article 1 coverage ${a.coverage} — the same proposition is the comparison's shared meaning`);
    assert.ok(a.phones.length > 20, `${lang} Article 1 should yield a real phone sequence`);
  }
});

test("article distance: pairwise and finite, with full coverage reported (never silently gappy)", () => {
  const d = articleDistance("eng", "spa", 1);
  assert.ok(!d.refused);
  assert.ok(Number.isFinite(d.distance) && d.distance > 0 && d.distance < 1);
  assert.equal(d.coverageA, 1);
  assert.equal(d.coverageB, 1);
});