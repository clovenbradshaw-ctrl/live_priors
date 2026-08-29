// eot-sidecar.test.mjs — regression coverage for eot-sidecar.mjs's own
// self-verification, found worth pinning after a real, live investigation
// (not a hypothetical) of a committed sidecar's own span addresses.
//
// THE INVESTIGATION THIS PINS. Manually re-deriving a real committed span
// (Les Misérables' own "Their only domestic was a female servant...")
// from its raw bytes and naively comparing against the PERSISTED text
// (what `hyperlexicon.js::foldHyperlexicon` returns) appeared to fail: the
// raw file still carries the source's own line-wrapped
// "...as\r\nMademoiselle..." where the persisted text carries a plain
// space, "...as Mademoiselle...", instead. Traced to the actual cause,
// not assumed: `pushSentence` (eoreader7 native's spans.js) only
// `.trim()`s a sentence's own text and never reflows an internal line
// wrap, so the embedded newline survives all the way to the edge
// hypergraph.js extracts and to `eot-sidecar.mjs::verifyRawSpan`'s own
// check (which correctly compares two PRE-collapse strings and is right
// to do so) — it is `hyperlexicon.js::admit`'s OWN span mapping
// (`text.replace(/\s+/g, " ").trim()`) that collapses it, one step
// LATER, at admission. The self-verification is genuinely correct; this
// pins the END-TO-END invariant a naive re-check would otherwise get
// wrong a second time: an address this driver ships resolves, once
// whitespace is collapsed the same way admission collapses it, to the
// text actually persisted — even when the source line-wraps mid-sentence.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadOrgans } from "./eot-digest.mjs";
import { readSidecar } from "./eot-sidecar.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LP_ROOT = path.join(HERE, "..");

test("a span crossing a raw line wrap: the address resolves (whitespace-collapsed) to the actually-persisted text", async () => {
  const target = path.join(LP_ROOT, "01-literature-books", "gutenberg", "pg135_Les_Mis_rables__French_.txt");
  if (!fs.existsSync(target)) return; // sibling corpus content not present in this checkout — skip, never fail

  const organs = await loadOrgans();
  const { sidecar } = await readSidecar(organs, target, {});
  assert.equal(sidecar.admission.gate, "clean", "this specimen must read clean once the front-matter TOC is skipped (S27)");
  assert.ok(sidecar.spanSelfVerification.rawOk > 0);
  assert.equal(sidecar.spanSelfVerification.rawOk, sidecar.spanSelfVerification.rawChecked, "every emitted span must self-verify — P5.2 at the door");

  const raw = fs.readFileSync(target, "utf8");
  const collapse = (t) => String(t ?? "").replace(/\s+/g, " ").trim();
  let checkedAtLeastOneWrappedSpan = false;
  for (const note of sidecar.folded) {
    for (const span of note.spans) {
      const m = span.at.match(/#(\d+)-(\d+)$/);
      const [start, end] = [Number(m[1]), Number(m[2])];
      const rawSlice = raw.slice(start, end);
      // The address is correct iff the raw bytes, whitespace-collapsed the
      // SAME way admission collapsed them, equal the persisted text —
      // never bare equality against untouched bytes (this file's own
      // eoreader7 sibling, spans-normalise.test.js, already names this
      // class of mistake for CRLF alone; this is the same lesson one
      // transformation further).
      assert.equal(collapse(rawSlice), span.text, `span ${span.at} must resolve to its own persisted text once whitespace is collapsed`);
      if (rawSlice.includes("\n") || rawSlice.includes("\r")) checkedAtLeastOneWrappedSpan = true;
    }
  }
  assert.ok(checkedAtLeastOneWrappedSpan, "this specimen must actually exercise a line-wrapped span, or this test proves nothing about the invariant it claims to pin");
});

// eot-digest.mjs's own loadOrgans() now wires hypergraph.js::makeRelationReader's
// `posPriorFor` — a TYPE-level majority-vote gate over the real UD treebank
// (relations.js::discoverRelationVocab's own `posPrior` param), distinct
// from grammar-lens.js's `classifyConnector` (still disclosure-only, per-EDGE,
// P56's asymmetric rule — untouched by this pass). Measured live before this
// test was written (Shakespeare 90->22 edges, the Iliad 65->25, Alice
// 97->34, all excluded tokens genuine non-verbs: of/the/by/with/in/that/
// this/how/what/either/or); pinned here against a real corpus file so a
// future change to this wiring cannot silently regress to the ungated
// behaviour without a failing test naming it.
const KNOWN_NONVERBS = new Set(["of", "the", "by", "with", "in", "that", "this", "how", "what", "either", "or", "a", "his", "on", "but", "up", "at", "under", "into", "about", "below", "to", "after", "like", "my"]);

test("the POS vocabulary gate demonstrably narrows candidate verbs to real verbs, never refuses an unattested form", async () => {
  const target = path.join(LP_ROOT, "01-literature-books", "gutenberg", "pg11_Alice_s_Adventures_in_Wonderland.txt");
  if (!fs.existsSync(target)) return; // sibling corpus content not present in this checkout — skip, never fail

  const organs = await loadOrgans();
  if (!organs.posPriorLoaded) return; // local gitignored POSPrior@1 build not present — skip, never fail (byte-identical degradation is the design, not this test's to enforce)

  // fresh: true — this test is about the GATE's own correctness, not about
  // whatever an on-disk sidecar happens to carry from a prior sweep (a
  // recipe change never retroactively cleans an already-admitted fact —
  // see readSidecar's own comment on `fresh`), so it must not be able to
  // pass or fail depending on when it happens to run relative to a sweep.
  const { sidecar } = await readSidecar(organs, target, { fresh: true });
  assert.ok(sidecar.reading.vocabulary, "a vocabulary reading must be present on a clean specimen");
  assert.ok(
    sidecar.reading.vocabulary.candidates > sidecar.reading.vocabulary.verbs,
    `the gate must demonstrably narrow the vocabulary on real prose (candidates=${sidecar.reading.vocabulary.candidates}, verbs=${sidecar.reading.vocabulary.verbs}) — equality would mean the gate never ran`,
  );

  for (const note of sidecar.folded) {
    const verb = note.verb ?? note.payload?.verb;
    if (typeof verb === "string") {
      assert.ok(!KNOWN_NONVERBS.has(verb.toLowerCase()), `"${verb}" is a known non-verb and must not survive the gate as an admitted relation`);
    }
  }

  assert.equal(
    typeof sidecar.recipe.descriptor.posPriorGate,
    "string",
    "the recipe descriptor must disclose that the vocabulary gate ran, so recipeId's own hash moves with this behavior",
  );
});
