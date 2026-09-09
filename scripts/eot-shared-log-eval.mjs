// eot-shared-log-eval.mjs — a re-runnable driver, not a committed test
// (this repo's own posture for these — eot-digest.mjs, eot-sidecar.mjs).
//
// Reads N documents NOT in eot-digest.mjs's own SAMPLE into ONE SHARED
// hyperlexicon log (unlike digestOne, which gives every source a fresh
// log) so a re-sighting across two independent documents has a real
// chance to union into one corroborated note (LP2's own union rule) —
// the question this driver answers is whether the log this corpus can
// currently produce is rich enough to be worth projecting through the
// holograph (eoreader7 THE-HOLOGRAPH.md / P170-171): many real
// propositions, real corroboration, real connector diversity, not a
// thin scatter of singletons.
//
// Reuses loadOrgans/excerptOf/verifySpans from eot-digest.mjs directly —
// no re-derived reading logic — and replicates only the ~15-line
// passage-to-admitEdges step already in digestOne's own body, because
// digestOne itself always opens a FRESH log per source and this driver's
// whole point is not doing that.

import fs from "node:fs";
import path from "node:path";
import { loadOrgans, excerptOf, verifySpans, LP_ROOT } from "./eot-digest.mjs";

const DOCS = [
  { slug: "encyclopedic/wikipedia/mathematics", path: "02-encyclopedic/wikipedia/Mathematics.txt", language: "en" },
  { slug: "encyclopedic/wikipedia/neuroscience", path: "02-encyclopedic/wikipedia/Neuroscience.txt", language: "en" },
  { slug: "encyclopedic/wikipedia/renaissance", path: "02-encyclopedic/wikipedia/Renaissance.txt", language: "en" },
  { slug: "encyclopedic/wikipedia/mongol-empire", path: "02-encyclopedic/wikipedia/Mongol_Empire.txt", language: "en" },
  { slug: "encyclopedic/wikipedia/thermodynamics", path: "02-encyclopedic/wikipedia/Thermodynamics.txt", language: "en" },
  { slug: "encyclopedic/britannica1911/economics", path: "02-encyclopedic/1911-britannica/EB1911_Economics.txt", language: "en" },
  { slug: "encyclopedic/britannica1911/sociology", path: "02-encyclopedic/1911-britannica/EB1911_Sociology.txt", language: "en" },
  { slug: "encyclopedic/britannica1911/law", path: "02-encyclopedic/1911-britannica/EB1911_Law.txt", language: "en" },
  { slug: "academic/ioannidis-2005", path: "05-academic-papers/handbook-citations/ioannidis-2005-why-most-published-research-findings-are-false.txt", language: "en" },
  { slug: "academic/d2l/mlp", path: "05-academic-papers/open-access-books/d2l/multilayer-perceptrons-mlp.txt", language: "en" },
  { slug: "western-canon/julius-caesar", path: "15-western-canon/folger-shakespeare/Julius_Caesar.txt", language: "en" },
  { slug: "western-canon/romeo-and-juliet", path: "15-western-canon/folger-shakespeare/Romeo_and_Juliet.txt", language: "en" },
  { slug: "holy-texts/sblgnt-books/matthew", path: "14-holy-texts/sblgnt-books/61-Mt.txt", language: "grc", note: "Koine Greek New Testament, real running prose (14-holy-texts/sblgnt/Matt.txt was tried first and is a textual-critical variant apparatus, not prose — zero real sentences in it at all, a bad specimen unrelated to the gate) — gated with UD_Ancient_Greek-PROIEL, not the Modern Greek prior" },
  { slug: "source-code/bitcoin/developer-notes", path: "09-source-code/bitcoin_bitcoin/doc_developer-notes.md", language: "en" },
  { slug: "source-code/ghc/readme", path: "09-source-code/ghc_ghc/README.md", language: "en" },
];

const EXCERPT_CHARS = 8000;

async function main() {
  const organs = await loadOrgans();
  const { relationsForLang, sameStemFor, morphologyFor, hl, spans, surfaces, stripContainer } = organs;

  let log = hl.createHyperlexicon();
  const perDoc = [];

  for (const spec of DOCS) {
    const rawPath = path.join(LP_ROOT, spec.path);
    if (!fs.existsSync(rawPath)) { perDoc.push({ slug: spec.slug, error: "file not found" }); continue; }
    const raw = fs.readFileSync(rawPath, "utf8");
    const { excerpt } = excerptOf(raw, { gutenberg: false, catalog: false, stripContainerFn: stripContainer });
    const excerptClamped = excerpt.slice(0, EXCERPT_CHARS);

    const relationsFor = relationsForLang(spec.language);
    const passage = { ref: spec.slug, text: excerptClamped };
    let report;
    try {
      report = relationsFor([passage], { pool: [passage] });
    } catch (err) {
      report = { edges: [], examined: 0, error: String(err?.message ?? err) };
    }
    const spanCheck = verifySpans(excerptClamped, report.edges ?? []);
    const admitEdges = (report.edges ?? []).map((e) => ({
      subject: e.end1 ?? e.subject, verb: e.label ?? e.verb, object: e.end2 ?? e.object, spans: e.spans, because: null,
    }));
    const { log: nextLog, heard, turnedAway } = hl.admit(log, admitEdges, { witness: spec.slug });
    log = nextLog;

    perDoc.push({
      slug: spec.slug, language: spec.language, note: spec.note,
      excerptChars: excerptClamped.length,
      edgesFound: (report.edges ?? []).length,
      heard: heard.length,
      turnedAway: turnedAway.length,
      turnedAwayReasons: turnedAway.reduce((acc, t) => { acc[t.reason] = (acc[t.reason] ?? 0) + 1; return acc; }, {}),
      spanSelfVerification: spanCheck.checked ? spanCheck.ok / spanCheck.checked : null,
      extractionError: report.error ?? null,
    });
  }

  const folded = hl.foldHyperlexicon(log);
  const witnessCounts = folded.map((n) => (n.witnesses ?? []).length);
  const corroborated = folded.filter((n) => (n.witnesses ?? []).length >= 2);
  const labelCounts = new Map();
  for (const n of folded) {
    const lab = n.verb ?? n.label;
    labelCounts.set(lab, (labelCounts.get(lab) ?? 0) + 1);
  }

  console.log("=== per-document ===");
  for (const d of perDoc) console.log(JSON.stringify(d));
  console.log("\n=== shared log summary ===");
  console.log("documents read:", perDoc.filter((d) => !d.error).length, "of", DOCS.length);
  console.log("total propositions in shared log (folded):", folded.length);
  console.log("total heard (raw, across all docs):", perDoc.reduce((a, d) => a + (d.heard ?? 0), 0));
  console.log("total turned away:", perDoc.reduce((a, d) => a + (d.turnedAway ?? 0), 0));
  console.log("distinct connector labels:", labelCounts.size);
  console.log("corroborated (>=2 witnesses):", corroborated.length, "of", folded.length);
  console.log("witness-count distribution:", JSON.stringify([...new Set(witnessCounts)].sort((a, b) => a - b).map((w) => [w, witnessCounts.filter((x) => x === w).length])));
  if (corroborated.length) {
    console.log("\n=== corroborated notes (>=2 witnesses) ===");
    for (const n of corroborated) console.log(" ", n.subject ?? n.end1, "—", n.verb ?? n.label, "→", n.object ?? n.end2, " witnesses:", n.witnesses);
  }
  console.log("\n=== top 15 connector labels ===");
  for (const [lab, n] of [...labelCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15)) console.log(" ", n, JSON.stringify(lab));

  fs.writeFileSync(
    path.join(LP_ROOT, "scripts", "eot-shared-log-eval-output.json"),
    JSON.stringify({ perDoc, log, folded, summary: { documentsRead: perDoc.filter((d) => !d.error).length, totalPropositions: folded.length, corroborated: corroborated.length, distinctLabels: labelCounts.size } }, null, 2),
  );
  console.log("\nwrote scripts/eot-shared-log-eval-output.json");
}

main();
