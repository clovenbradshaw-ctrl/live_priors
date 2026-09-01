// multilingual-priors.test.mjs — conformance for the language registry and
// its resolve-on-demand POS priors (no stubs, no network: everything here
// reads the committed registry, the committed lock, and whatever cache the
// resolver has already built locally — a fresh checkout passes with skips
// that SAY they skipped, never with silent green).
// Full account: scripts/multilingual-priors-RESULTS.md.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REGISTRY, resolvePosPrior, readLock, posPriorPath } from "./lang-registry.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

test("registry: every rosetta language has a row, and every absence is typed, never blank", () => {
  for (const code of ["en", "ar", "es", "zh", "sw"]) {
    const e = REGISTRY[code];
    assert.ok(e, `${code} missing from registry`);
    assert.ok(e.iso && e.name);
    // each resource is either a real address or a typed gap with checked evidence
    for (const kind of ["ud", "unimorph"]) {
      const r = e[kind];
      assert.ok(r, `${code}.${kind} absent entirely — an absence must be typed, not blank`);
      if (r.gap) {
        assert.ok(r.gap.status, `${code}.${kind} gap has no status`);
        assert.ok(r.gap.because, `${code}.${kind} gap has no because`);
        assert.ok(Array.isArray(r.gap.checked) && r.gap.checked.length, `${code}.${kind} gap lists nothing checked`);
      } else {
        assert.ok(r.repo, `${code}.${kind} has neither repo nor gap`);
      }
    }
  }
});

test("registry: Swahili's double gap carries the actual findings, not just a shrug", () => {
  const sw = REGISTRY.sw;
  assert.equal(sw.ud.gap.status, "no_usable_data");
  assert.ok(sw.ud.gap.checked.some((c) => c.repo === "UD_Swahili-OPUSGV"));
  assert.equal(sw.unimorph.gap.status, "no_matching_register");
  assert.ok(sw.unimorph.gap.checked.some((c) => c.repo === "unimorph/swc"),
    "the dialectal find must stay on the record — refusing it was a decision, not an oversight");
});

test("resolution: sw refuses with the typed gap; en resolves from the committed artifact", async () => {
  const sw = await resolvePosPrior("sw", { allowFetch: false });
  assert.equal(sw.refused?.type, "no_usable_data");
  const en = await resolvePosPrior("en", { allowFetch: false });
  assert.ok(!en.refused, "en is the committed, consumed prior — it must resolve offline in any checkout");
  assert.equal(en.from, "committed");
  assert.ok(en.counts.forms > 15000);
});

test("resolution: never another language — an unknown code is a typed refusal, not a fallback", async () => {
  const r = await resolvePosPrior("xx", { allowFetch: false });
  assert.equal(r.refused?.type, "unknown_language");
});

test("vendoring rule: only the consumed prior is committed; the rest resolve on demand", () => {
  // en has a consumer (build-reading-priors.mjs::loadPosForms, every run) —
  // committed. ar/es/zh have none yet (POLICIES.md LP10: a prior with no
  // consumer is not coverage) — gitignored, resolved on demand, pinned by
  // the lock instead of by bytes in git.
  const gitignore = fs.readFileSync(path.join(ROOT, ".gitignore"), "utf8");
  for (const code of ["ar", "es", "zh"]) {
    assert.ok(gitignore.includes(`pos-prior-${code}.json`), `${code} artifact must be gitignored`);
  }
  assert.ok(!gitignore.includes("pos-prior-en.json"), "the consumed English prior stays committed");
  assert.ok(!fs.existsSync(path.join(ROOT, "derived-priors/pos-priors/pos-prior-sw.json")),
    "no sw artifact may exist — a gap must never be silently filled with a placeholder file");
});

test("lock: every non-vendored resolve is pinned by source sha256, so upstream drift is detectable", () => {
  const lock = readLock();
  for (const code of ["ar", "es", "zh"]) {
    const row = lock.resolved[code];
    assert.ok(row, `${code} missing from resolved.lock.json — the lock is the committed record of what was fetched`);
    assert.equal(row.source.length, 3, "train/dev/test all pinned");
    for (const s of row.source) {
      assert.match(s.sha256, /^[0-9a-f]{64}$/);
      assert.ok(s.url.startsWith("https://raw.githubusercontent.com/UniversalDependencies/"));
    }
    assert.ok(row.counts.forms > 1000);
  }
});

test("locally-resolved artifacts match their lock rows (skips honestly on a fresh checkout)", async (t) => {
  const lock = readLock();
  let checked = 0;
  for (const code of ["ar", "es", "zh"]) {
    if (!fs.existsSync(posPriorPath(code))) continue;
    const r = await resolvePosPrior(code, { allowFetch: false });
    assert.ok(!r.refused);
    assert.equal(r.counts.forms, lock.resolved[code].counts.forms,
      `${code}: cached artifact disagrees with the lock — a drifted or corrupted cache must not pass silently`);
    checked++;
  }
  if (!checked) t.diagnostic("no local cache present (fresh checkout) — run `node scripts/lang-registry.mjs ar es zh` to exercise this");
});

test("real specimen words from this project's own hand goldens are attested (skips honestly if not cached)", async (t) => {
  const specimens = { ar: ["ينبغي", "VERB"], es: ["derechos", "NOUN"], zh: ["是", null] };
  let checked = 0;
  for (const [code, [word, upos]] of Object.entries(specimens)) {
    if (!fs.existsSync(posPriorPath(code))) continue;
    const { forms } = await resolvePosPrior(code, { allowFetch: false });
    const entry = forms[word];
    assert.ok(entry, `${code}: "${word}" (from this project's own UDHR golden) must be attested`);
    if (upos) assert.ok(entry[upos] > 0, `${code}: "${word}" should attest ${upos}`);
    else assert.ok((entry.VERB ?? 0) + (entry.AUX ?? 0) > 0, `${code}: "${word}" should attest VERB or AUX`);
    checked++;
  }
  if (!checked) t.diagnostic("no local cache present — resolve first to exercise this");
});

test("the Object.prototype collision fix is pinned at the source, not only in a cache byte", async (t) => {
  // "constructor" is a genuine attested Spanish word in UD_Spanish-AnCora —
  // a plain {} accumulator resolves forms['constructor'] through the
  // prototype chain to the Object function instead of a fresh counter,
  // silently losing that word's counts (measured: the first build was one
  // distinct form short). Source-scan pin, this repo's own house style for
  // regression tripwires (cf. the-fold's term.test.mjs ternary scan).
  const src = fs.readFileSync(path.join(ROOT, "scripts/lang-registry.mjs"), "utf8");
  const accumulators = src.match(/= Object\.create\(null\)/g) ?? [];
  assert.ok(accumulators.length >= 2, "both accumulator levels (forms, per-form counts) must be null-prototype");
  assert.ok(!/const forms = \{\}/.test(src), "the vulnerable plain-object accumulator must not return");
  // and when the es cache is present, the collision word itself is real data
  if (fs.existsSync(posPriorPath("es"))) {
    const { forms } = await resolvePosPrior("es", { allowFetch: false });
    assert.deepEqual(forms["constructor"], { NOUN: 2 });
  } else {
    t.diagnostic("es cache not present — collision-word content check skipped (source pin above still ran)");
  }
});

test("no morphology prior ships for any non-English language, and that is the point", () => {
  // A morphology prior exists in this project for exactly one purpose:
  // bridging an inflected surface form to a lemma so ActPrior@1 (VerbNet)
  // can be looked up. VerbNet is English-only by construction, so a
  // non-English morphology prior is a bridge to a destination that does
  // not exist. One WAS built for Spanish from real unimorph/spa data
  // (873,811 forms, 24.5MB) and deleted unbuilt-upon rather than committed
  // as coverage. Pinned so it returns only alongside a real consumer.
  assert.ok(!fs.existsSync(path.join(ROOT, "derived-priors/morphology-priors")),
    "if this directory is back, a consumer for it must exist too — see multilingual-priors-RESULTS.md");
});
