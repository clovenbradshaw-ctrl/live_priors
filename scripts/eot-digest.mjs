#!/usr/bin/env node
// eot-digest.mjs — read a sample of this corpus and commit what was read as
// an EOT event stream (the-fold's hyperlexicon.js, POLICIES.md P57 in the
// sibling `the-fold` repo: "the reality of the database should be the EOT
// event stream, the current state always projected"). What lands under
// `digested/` per source is not a summary — it is the append-only task-log
// hyperlexicon.js::admit() actually produced: every heard assertion with its
// witness and its byte-addressed span, every offered assertion this reader
// turned away, named why.
//
// THIS SCRIPT DOES NOT LIVE ALONE. It reaches into two sibling checkouts —
// `../the-fold` (hyperlexicon.js, hypergraph.js's makeRelationReader) and
// `../eoreader7/native` (the actual linguistic organs: splitSentences,
// extractSurfaces, discoverReferents, discoverRelationVocab,
// extractRelations, kernel/task-log.js, kernel/cube.js). eoreader7's OWN
// root README states the law this follows: "The native implementation
// lives in native/kernel/. It has no implementation dependency on
// EOReader 6.1" — the historical `packages/engine` layout (reached only
// through a submodule pinned "solely for compatibility... while consumers
// migrate") is deliberately never imported here, by direction and by
// eoreader7's own `conformance/native-boundary.test.mjs`, which fails any
// `native/kernel/*.js` file whose raw text so much as names it.
//
// THE ORGAN RECIPE, AND WHAT IS DELIBERATELY LEFT OUT.
//   - determiners + negationWords: injected unconditionally, on every
//     source regardless of language. Both are lang/en closed classes
//     consumed INSIDE hypergraph.js's own endpoint-matching (P41/P43 in
//     the-fold's own POLICIES.md) — engine-layout-agnostic by
//     construction, since the filtering happens after edges arrive, not
//     inside whichever organ extracted them. Disclosed, not assumed: the
//     MEASURED incidents that motivated shipping them on (a shared "the"
//     binding an unstated claim; a post-verbal negation read as its
//     opposite) were observed against the historical engine, not
//     independently reproduced here against eoreader7 native's own
//     `relations.js` — which carries the identical `negationWords`
//     parameter and default (checked directly, not assumed), so the
//     mechanism this correctness argument depends on is present, even
//     though the specific incident was not re-run. On non-English
//     material both closed classes are inert (their tokens essentially
//     never occur) — confirmed per-source below, not assumed.
//   - classifyConnector (the-fold's grammar-lens.js, a Thrax verb-hood
//     lens) is OMITTED. It depends on a local, gitignored build against
//     the real UD_English-EWT treebank that was not run in this
//     environment. hyperlexicon.js's own header names this as a real,
//     honest degradation, not a silent one: "with no lens, the verb-hood
//     check does not run and no edge is refused for it."
//   - verbForms / createLemmatizer (UniMorph-backed recall widening) are
//     OMITTED. the-fold's own CLAUDE.md record: "whether the live app
//     should adopt it by default is a real, undecided question" — a
//     digest meant to be trusted stays on the conservative configuration
//     rather than the higher-recall, disclosed-lower-precision one.
//
// WHAT "EOT READING" MEANS HERE, CONCRETELY. Each source becomes ONE
// passage (its own excerpt, addressed `ref = slug`), read once by
// `hypergraph.js::makeRelationReader`, whose edges (subject/verb/object,
// byte-addressed spans into THAT excerpt) are handed to
// `hyperlexicon.js::admit()` against a FRESH log per source. The admitted
// log — real task-log.js PROPOSE/SUPERSEDE entries, cube cell attached via
// `cube.js::cellOf` — is the artifact. `foldHyperlexicon` (the current
// projection) rides alongside it for a human to read without replaying the
// log by hand.
//
// SELF-VERIFICATION, P5.2's OWN LAW APPLIED HERE: every emitted span is
// checked against the excerpt's own bytes (`excerpt.slice(start,end) ===
// span.text`) before anything is written, and the pass rate is reported —
// never assumed.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LP_ROOT = path.join(HERE, "..");
const FOLD_ROOT = path.join(LP_ROOT, "..", "the-fold");
const NATIVE = path.join(LP_ROOT, "..", "eoreader7", "native");
const DIGEST_DIR = path.join(LP_ROOT, "digested");

// Declared, not tuned: enough for real referent recurrence and real clause
// structure without letting one giant novel dominate the batch's runtime.
// Every source is a named EXCERPT of its file at this size, addressed as
// such — never silently presented as the whole work.
const EXCERPT_CHARS = 8000;

async function loadOrgans() {
  const spans = await import(path.join(NATIVE, "adapters/text/spans.js"));
  const surfaces = await import(path.join(NATIVE, "adapters/text/surfaces.js"));
  const relations = await import(path.join(NATIVE, "adapters/text/relations.js"));
  const material = await import(path.join(NATIVE, "adapters/text/material.js"));
  const priors = await import(path.join(NATIVE, "adapters/text/priors.js"));
  const taskLog = await import(path.join(NATIVE, "kernel/task-log.js"));
  const cube = await import(path.join(NATIVE, "kernel/cube.js"));
  const { makeRelationReader } = await import(path.join(FOLD_ROOT, "hypergraph.js"));
  const { makeHyperlexicon } = await import(path.join(FOLD_ROOT, "hyperlexicon.js"));
  const { stripContainer, declaredIdentity } = await import(path.join(FOLD_ROOT, "source.js"));

  const determiners = new Set([...priors.DEFINITE_DETERMINERS, ...priors.INDEFINITE_DETERMINERS]);
  const relationsFor = makeRelationReader({
    splitSentences: spans.splitSentences,
    extractSurfaces: surfaces.extractSurfaces,
    discoverReferents: surfaces.discoverReferents,
    namesCorefer: surfaces.namesCorefer,
    diaNorm: surfaces.diaNorm,
    discoverRelationVocab: relations.discoverRelationVocab,
    extractRelations: relations.extractRelations,
    tokenize: material.tokenize,
    determiners,
    negationWords: priors.NEGATION_WORDS,
  });
  // taskLog.js exports GRAIN_RANK directly (native/kernel/task-log.js,
  // eoreader7 S23) — hyperlexicon.js reads it to name the Figure grain
  // without hardcoding the string. cellOf lives on cube.js in the native
  // layout (task-log.js's own historical operators.js companion has no
  // native counterpart; cube.js is where cellOf actually lives here).
  const hl = makeHyperlexicon({ ...taskLog, cellOf: cube.cellOf });
  return {
    spans, surfaces, relations, material, priors, taskLog, cube,
    relationsFor, hl, stripContainer, declaredIdentity,
  };
}

// ── catalog boilerplate ─────────────────────────────────────────────────
//
// Measured on grateful-dead-catalog.txt: the `collection:` field is 98.5%
// of the file's bytes, and it is Archive.org favourites-list membership
// ("fav-088milo", "fav-1jasoncutter"...) — bookkeeping about which users
// starred an item, never a description of it. Admitting it as material
// would flood every reading with junk proper-noun-shaped tokens, the same
// class of mistake P5.3 (Gutenberg's licence text) already names for this
// repo's sibling. This is a NEW, local, disclosed decision — not a general
// reading law — kept here rather than in a shared organ because it answers
// a structural fact about Archive.org's own catalogue export, nothing
// about text in general.
function stripCatalogBoilerplate(text) {
  let dropped = 0;
  const out = text.replace(/^collection:.*$/gm, (line) => {
    dropped += line.length;
    const tags = line.slice("collection:".length).split(",").length;
    return `collection: [stripped — ${tags} archive.org favourites-list tags, bookkeeping not description]`;
  });
  return { text: out, droppedChars: dropped };
}

// ── per-source excerpting, disclosed ────────────────────────────────────
// Found by this driver's OWN span self-verification, not assumed: on a
// Gutenberg file with Windows line endings (pg67098, 3,654 CRLF pairs),
// 0/59 emitted spans matched the excerpt's own bytes; on a catalog with a
// handful of CRLFs (met-museum, 9 of them), 14/26 matched — every span
// AFTER the first CRLF drifted by one character per CRLF consumed so far.
// The cause: `spans.js::splitSentences` normalises `\r\n`/`\r` to `\n`
// internally before computing its own offsets, so its offsets are into the
// NORMALISED string — while this driver was self-verifying against the
// RAW excerpt, one character longer per CRLF. The fix is not a patch on
// the comparison; it is making the string this driver hands to the reader
// and the string it checks against THE SAME STRING; normalise once, here,
// before either happens.
const normaliseNewlines = (text) => text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

function excerptOf(fullText, { gutenberg = false, catalog = false, stripContainerFn }) {
  let text = fullText;
  let bodyOffset = 0;
  let catalogDropped = 0;
  if (gutenberg) {
    const { text: body, offset } = stripContainerFn(fullText);
    text = body;
    bodyOffset = offset;
  }
  if (catalog) {
    const { text: stripped, droppedChars } = stripCatalogBoilerplate(text);
    text = stripped;
    catalogDropped = droppedChars;
  }
  text = normaliseNewlines(text);
  const excerpt = text.slice(0, EXCERPT_CHARS);
  return {
    excerpt,
    bodyOffset,
    catalogDropped,
    fullChars: fullText.length,
    bodyChars: text.length,
    excerptChars: excerpt.length,
    truncated: text.length > EXCERPT_CHARS,
  };
}

// ── self-verification (P5.2) ────────────────────────────────────────────
function verifySpans(excerpt, edges) {
  let checked = 0, ok = 0;
  const bad = [];
  for (const e of edges) {
    for (const s of e.spans ?? []) {
      checked += 1;
      if (excerpt.slice(s.start, s.end) === s.text) ok += 1;
      else bad.push({ edge: `${e.subject} —${e.verb}→ ${e.object}`, span: s });
    }
  }
  return { checked, ok, bad };
}

async function digestOne(organs, spec) {
  const { relationsFor, hl, spans, surfaces, stripContainer } = organs;
  const rawPath = path.join(LP_ROOT, spec.path);
  const raw = fs.readFileSync(rawPath, "utf8");
  const { excerpt, bodyOffset, catalogDropped, fullChars, bodyChars, excerptChars, truncated } =
    excerptOf(raw, { gutenberg: spec.kind === "text-gutenberg", catalog: spec.kind === "catalog", stripContainerFn: stripContainer });

  const identity = spec.kind === "text-gutenberg" ? organs.declaredIdentity(spec.slug, raw) : null;

  const sentences = spans.splitSentences(excerpt);
  const surfaceEvidence = surfaces.extractSurfaces(sentences);
  const { events } = surfaces.discoverReferents(surfaceEvidence, {});
  const referentIds = new Set(events.map((e) => e.referent_id));

  const passage = { ref: spec.slug, text: excerpt };
  let report;
  try {
    report = relationsFor([passage], { pool: [passage] });
  } catch (err) {
    report = { edges: [], examined: 0, error: String(err?.message ?? err) };
  }

  const spanCheck = verifySpans(excerpt, report.edges ?? []);

  const admitEdges = (report.edges ?? []).map((e) => ({
    subject: e.subject, verb: e.verb, object: e.object, spans: e.spans, because: null,
  }));
  let log = hl.createHyperlexicon();
  const { log: nextLog, heard, turnedAway } = hl.admit(log, admitEdges, { witness: spec.slug });
  log = nextLog;
  const folded = hl.foldHyperlexicon(log);

  return {
    schema: "EOTDigest@1",
    source: {
      slug: spec.slug,
      kind: spec.kind,
      path: spec.path,
      language: spec.language,
      note: spec.note,
      declaredIdentity: identity,
    },
    excerpting: {
      fullChars, bodyChars, bodyOffset, excerptChars, truncated,
      catalogBoilerplateCharsDropped: catalogDropped || undefined,
    },
    organs: {
      engine: "eoreader7/native (adapters/text, kernel/task-log.js, kernel/cube.js)",
      determiners: "injected — priors.js DEFINITE_DETERMINERS + INDEFINITE_DETERMINERS (giver lang/en, P41)",
      negationWords: "injected — priors.js NEGATION_WORDS (giver lang/en, P43)",
      classifyConnector: "omitted — POSPrior fixture (UD_English-EWT build) not present in this environment",
      verbForms: "omitted — opt-in only, undecided default per the-fold CLAUDE.md",
      createLemmatizer: "omitted — opt-in only, undecided default per the-fold CLAUDE.md",
    },
    reading: {
      sentences: sentences.length,
      surfaces: surfaceEvidence?.length ?? (Array.isArray(surfaceEvidence) ? surfaceEvidence.length : undefined),
      referentEvents: events.length,
      distinctReferents: referentIds.size,
      examined: report.examined ?? null,
      edgesFound: (report.edges ?? []).length,
      extractionError: report.error ?? null,
    },
    spanSelfVerification: {
      checked: spanCheck.checked,
      ok: spanCheck.ok,
      passRate: spanCheck.checked ? spanCheck.ok / spanCheck.checked : null,
      bad: spanCheck.bad.slice(0, 5),
    },
    admission: {
      heard: heard.length,
      turnedAway: turnedAway.length,
      turnedAwayReasons: turnedAway.reduce((acc, t) => { acc[t.reason] = (acc[t.reason] ?? 0) + 1; return acc; }, {}),
    },
    log,
    folded,
    excerpt,
  };
}

export { loadOrgans, digestOne, excerptOf, stripCatalogBoilerplate, verifySpans, EXCERPT_CHARS, LP_ROOT, DIGEST_DIR };

// ── the sample manifest ─────────────────────────────────────────────────
//
// A DECLARED sample, not a claim of coverage. Chosen to spread across the
// three requested axes (language/script, audio, image, code) and to be
// SMALL enough that every entry is individually reviewable rather than a
// wall of files nobody will read.
//
// TEXT — languages/scripts. All six read from `wikipedia-lang`, verified
// by direct inspection to actually be in-language content before being
// selected (unlike `gutenberg-non-en`, below). Two are cased Latin
// (fr, tr — real diacritics, real case), one is cased non-Latin (el —
// Greek has case), three are UNCASED scripts (he, ko, fa) chosen
// specifically to test whether `surfaces.js`'s CAP_TOKEN/LOWER_TOKEN gate
// — `\p{Lu}`/`\p{Ll}`, checked directly in eoreader7 native's own source —
// can fire at all where a script has no case distinction.
//
// ONE Gutenberg specimen is kept from `11-multi-language/gutenberg-non-en`
// DESPITE a corpus-integrity finding that makes the rest of that directory
// unusable for "across languages" (see digested/README.md): every one of
// its 20 files' real Project-Gutenberg-declared Title disagrees with its
// path — `pg67098_Die_Verwandlung__Kafka_.txt` is Winnie-the-Pooh; `pg8800
// _De_Rerum_Natura__Lucretius_.txt` is Cary's English Divine Comedy;
// `it/..._Dorian_Gray.txt` is genuinely Dorian Gray but in English, not
// Italian; `la/..._Metamorphoses__Ovid__Latin_.txt` is Kafka's
// Metamorphosis in English, not Ovid's Latin. The one kept here is chosen
// PRECISELY because `declaredIdentity` catches it — reading the file's own
// header rather than trusting its path — which is the point this whole
// pass is making about labels versus bytes, demonstrated rather than
// merely stated.
export const SAMPLE = [
  { slug: "wikipedia-lang/fr/philosophie", kind: "text", path: "11-multi-language/wikipedia-lang/fr/Philosophie.txt", language: "fr", note: "French Wikipedia, Philosophy — Latin script, cased, real diacritics" },
  { slug: "wikipedia-lang/tr/felsefe", kind: "text", path: "11-multi-language/wikipedia-lang/tr/Felsefe.txt", language: "tr", note: "Turkish Wikipedia, Philosophy (felsefe) — Latin script, cased, agglutinative morphology" },
  { slug: "wikipedia-lang/el/socrates-related", kind: "text", path: "11-multi-language/wikipedia-lang/el/_________.txt", language: "el", note: "Greek Wikipedia article (filename lost to non-ASCII stripping upstream; opens on Socrates/epistemology) — Greek script, HAS case" },
  { slug: "wikipedia-lang/he/philosophy", kind: "text", path: "11-multi-language/wikipedia-lang/he/_________.txt", language: "he", note: "Hebrew Wikipedia, Philosophy (based on opening text) — Hebrew script, NO case distinction" },
  { slug: "wikipedia-lang/ko/philosophy", kind: "text", path: "11-multi-language/wikipedia-lang/ko/__.txt", language: "ko", note: "Korean Wikipedia, Philosophy (opens 昒62學/哲學) — Hangul, NO case distinction" },
  { slug: "wikipedia-lang/fa/philosophy", kind: "text", path: "11-multi-language/wikipedia-lang/fa/_____.txt", language: "fa", note: "Farsi Wikipedia, Philosophy (based on opening text) — Arabic script, NO case distinction" },
  { slug: "gutenberg-non-en/de-path/pg67098", kind: "text-gutenberg", path: "11-multi-language/gutenberg-non-en/de/pg67098_Die_Verwandlung__Kafka_.txt", language: "en", note: "CORPUS-INTEGRITY SPECIMEN: path claims Kafka's Die Verwandlung (German); the file's own declared header, read here by declaredIdentity rather than trusted from the path, says Winnie-the-Pooh (A. A. Milne, English). Kept deliberately as a demonstration, not corrected." },

  { slug: "images-media/nasa-catalog", kind: "catalog", path: "07-images-media/nasa-catalog.txt", language: "en", note: "NASA Image and Video Library — consolidated catalogue, collection: field is not present in this catalogue's own schema" },
  { slug: "images-media/met-museum-catalog", kind: "catalog", path: "07-images-media/met-museum-catalog.txt", language: "en", note: "The Met Open Access Collection — consolidated catalogue" },
  { slug: "audio-music/grateful-dead-catalog", kind: "catalog", path: "10-audio-music/grateful-dead-catalog.txt", language: "en", note: "Internet Archive grateful dead collection — 98.5% of this file's own bytes are the collection: field (Archive.org favourites-list tags), stripped before reading" },
  { slug: "audio-music/classical-music-catalog", kind: "catalog", path: "10-audio-music/classical-music-catalog.txt", language: "en", note: "Internet Archive classical music collection — smaller than grateful-dead's, same schema" },

  { slug: "source-code/rails-readme", kind: "text", path: "09-source-code/rails_rails/README.md", language: "en", note: "rails/rails README.md — real prose about the project, markdown syntax unstripped" },
  { slug: "source-code/flask-quickstart", kind: "text", path: "09-source-code/pallets_flask/docs_quickstart.rst.txt", language: "en", note: "pallets/flask docs/quickstart.rst — real prose documentation, reStructuredText syntax unstripped" },
  { slug: "source-code/flask-app-py-RAW", kind: "text", path: "09-source-code/pallets_flask/src_flask_app.py", language: "en", note: "NEGATIVE CONTROL: raw Python source, not prose. Kept to disclose the boundary honestly — these organs read English sentence structure, not code syntax; whatever edges land here are riding the file's own docstrings and comments, not the code." },
];

// ── batch runner ─────────────────────────────────────────────────────────
async function runBatch() {
  fs.mkdirSync(DIGEST_DIR, { recursive: true });
  const organs = await loadOrgans();
  const index = [];
  for (const spec of SAMPLE) {
    const out = await digestOne(organs, spec);
    const outPath = path.join(DIGEST_DIR, `${spec.slug.replace(/\//g, "__")}.json`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(out, null, 1));
    const rel = path.relative(LP_ROOT, outPath);
    index.push({
      slug: spec.slug, kind: spec.kind, language: spec.language, path: rel,
      sentences: out.reading.sentences, referents: out.reading.distinctReferents,
      edgesFound: out.reading.edgesFound, heard: out.admission.heard,
      turnedAway: out.admission.turnedAway,
      spanSelfVerifyRate: out.spanSelfVerification.passRate,
    });
    console.log(`${spec.slug}: ${out.reading.sentences} sentences, ${out.reading.distinctReferents} referents, ${out.reading.edgesFound} edges found, ${out.admission.heard} heard, spans ${out.spanSelfVerification.ok}/${out.spanSelfVerification.checked} -> ${outPath}`);
  }
  fs.writeFileSync(path.join(DIGEST_DIR, "index.json"), JSON.stringify({ schema: "EOTDigestIndex@1", generatedAt: new Date().toISOString(), sources: index }, null, 1));
  console.log(`\nwrote ${index.length} digests + index.json to ${DIGEST_DIR}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await runBatch();
}
