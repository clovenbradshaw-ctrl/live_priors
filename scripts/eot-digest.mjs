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
//   - posPriorFor (hypergraph.js's own VOCABULARY-level POS gate, feeding
//     relations.js::discoverRelationVocab's `posPrior` parameter) IS
//     INJECTED, when the local POSPrior@1 build is present. This is a
//     narrower, safer mechanism than it first looks like being the same
//     thing as `classifyConnector` below — measured on real material
//     before shipping (Shakespeare 90→22 edges, the Iliad 65→25, Alice
//     97→34; the excluded tokens on all three are exactly what a reader
//     would refuse by hand: of/the/by/with/in/that/this/how/what/either/
//     or; the survivors on Alice are was/started/had/think/fallen/got/
//     began/opened — real verbs, none lost). It gates the CANDIDATE SET a
//     verb is drawn from (a majority-vote-over-the-real-treebank
//     type-level fact, exactly the standing already held for
//     `determiners`/`negationWords` above), never a per-occurrence verdict
//     on an already-extracted edge — an unattested word is explicitly NOT
//     refused (`discoverRelationVocab`'s own docstring: "a witness cannot
//     refuse what it never saw"), only a word the treebank clearly says is
//     NOT a verb across its real attested uses is excluded from ever being
//     tried as one. See `loadOrgans`'s own comment at the load site for
//     why this is NOT the same decision as `classifyConnector`'s
//     disclosure-only posture, immediately below.
//   - classifyConnector (the-fold's grammar-lens.js, a Thrax verb-hood
//     lens) still runs DISCLOSURE-ONLY, on the edges that survive the
//     vocabulary gate above — P56's asymmetric rule (a settled part of
//     speech is refusable, never confirmable) governs a PER-EDGE verdict,
//     which this never computes; `mismatchedConnectors` only flags edges
//     whose verb landed in the vocabulary as an unattested "gap" (never
//     refused there) but still reads as non-dominant on a closer look —
//     surfaced for a later reasoning step to weigh, never baked into the
//     append-only log as a refusal.
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
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LP_ROOT = path.join(HERE, "..");
const FOLD_ROOT = path.join(LP_ROOT, "..", "the-fold");
const EOREADER7_ROOT = path.join(LP_ROOT, "..", "eoreader7");
const NATIVE = path.join(EOREADER7_ROOT, "native");
const DIGEST_DIR = path.join(LP_ROOT, "digested");

/**
 * repoState(dir) — the exact git commit of a sibling repo whose code
 * directly ran to produce a reading, plus whether its working tree carried
 * uncommitted changes at the moment it ran.
 *
 * WHY THIS EXISTS, user-directed: "make sure all EOT have the exact state
 * of eoreader7 that encoded this AND the state of the priors repo to know
 * what contributed to the reading." recipeId (LP5) already hashes a PROSE
 * description of which organs ran ("priors.js DEFINITE_DETERMINERS...");
 * it says nothing about which COMMIT of those organs' own code was
 * checked out. This session's own history is the proof this matters: S25,
 * S26, S27, and the ATX-heading fix all landed in eoreader7's spans.js
 * within one sitting — a reading taken before any of them and a reading
 * taken after would carry an IDENTICAL prose recipe description while
 * producing different edges from the identical bytes. Recording the
 * commit closes that gap without needing to enumerate every function that
 * changed; the commit already names everything.
 *
 * Three repos are recorded, not two, because all three directly run code
 * that shapes a reading: eoreader7 (the linguistic organs), the-fold
 * (hypergraph.js's relation reader, hyperlexicon.js's admission door,
 * source.js's container/identity readers), and live_priors itself (this
 * driver's own excerpting, blanking, and front-matter logic — a
 * `git log` on eot-sidecar.mjs this same session shows it changing just
 * as often as the sibling engines did).
 *
 * `dirty: true` is disclosed rather than hidden: a reading taken against
 * uncommitted local edits has no commit a future reader could check out
 * to reproduce it — real during active development (this session's own
 * repeated push-while-sweeping pattern), and the honest thing is to say
 * so, not to silently record a commit that does not actually match what
 * ran.
 */
function repoState(dir) {
  try {
    const commit = execFileSync("git", ["-C", dir, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
    const dirty = execFileSync("git", ["-C", dir, "status", "--porcelain"], { encoding: "utf8" }).trim().length > 0;
    return { commit, dirty };
  } catch (err) {
    return { commit: null, dirty: null, error: String(err?.message ?? err) };
  }
}

// Declared, not tuned: enough for real referent recurrence and real clause
// structure without letting one giant novel dominate the batch's runtime.
// Every source is a named EXCERPT of its file at this size, addressed as
// such — never silently presented as the whole work.
const EXCERPT_CHARS = 8000;

async function loadOrgans({ phrasalPredicates = false, nounPhraseSubjects = false } = {}) {
  const spans = await import(path.join(NATIVE, "adapters/text/spans.js"));
  const surfaces = await import(path.join(NATIVE, "adapters/text/surfaces.js"));
  const relations = await import(path.join(NATIVE, "adapters/text/relations.js"));
  const material = await import(path.join(NATIVE, "adapters/text/material.js"));
  const priors = await import(path.join(NATIVE, "adapters/text/priors.js"));
  const taskLog = await import(path.join(NATIVE, "kernel/task-log.js"));
  const cube = await import(path.join(NATIVE, "kernel/cube.js"));
  // The activation tier (eo-constitution Article III.4, 2026-09-01): the
  // one occurrence-level organ makeRelationReader accepts and this file had
  // never imported at all, let alone passed.
  const pron = await import(path.join(NATIVE, "adapters/text/pronouns.js"));
  const { makeRelationReader } = await import(path.join(FOLD_ROOT, "hypergraph.js"));
  const { makeHyperlexicon } = await import(path.join(FOLD_ROOT, "hyperlexicon.js"));
  const { makeReferentIndex } = await import(path.join(FOLD_ROOT, "cast.js"));
  const { stripContainer, declaredIdentity } = await import(path.join(FOLD_ROOT, "source.js"));
  const { makeGrammarLens, mismatchedConnectors } = await import(path.join(FOLD_ROOT, "grammar-lens.js"));

  // Loaded OPTIONALLY — a missing local POSPrior@1 build degrades this
  // driver to exactly its prior behaviour (posPriorFor / classifyConnector
  // both null), never a hard failure, since a fresh checkout of this repo
  // has no reason to have run that local build yet (one curl, one node
  // invocation, matching eoreader7's own build-pos-prior.mjs usage
  // comment).
  //
  // TWO DIFFERENT GATES, ONE FIXTURE — DO NOT CONFLATE THEM AGAIN. An
  // earlier pass here reasoned about only one of them (`classifyConnector`,
  // hyperlexicon.js::admit's per-EDGE verb-hood check) and correctly
  // declined it on P56's own asymmetric rule: a settled part of speech is
  // refusable, never confirmable, and admission is exactly the place a
  // wrong per-occurrence refusal would be hardest to walk back. That
  // reasoning still holds for `classifyConnector`/`mismatchedConnectors`
  // below — disclosure only, no refusal, unchanged.
  //
  // It does NOT extend to `posPriorFor`, wired into `makeRelationReader`
  // just below — a genuinely different, coarser mechanism the same
  // reasoning does not cover. `relations.js::discoverRelationVocab`'s own
  // `posPrior` parameter gates the CANDIDATE VOCABULARY a verb is drawn
  // from, by a TYPE-level majority vote over the real UD treebank
  // (`verbShare > 0.5` — hardcoded, not a tuned knob, and unattested forms
  // are explicitly NOT refused: "a witness cannot refuse what it never
  // saw"). This is structurally the SAME class of gate `determiners`/
  // `negationWords` above already are — closing a vocabulary-level false
  // admission, never convicting one already-extracted edge — and P43's own
  // distinguishing test names exactly why it belongs here: "does the prior
  // close a false binding, or does it widen what the reader hears?" A
  // preposition or article wrongly treated as a verb is a false binding
  // closed, not a recall-widening move (that class — verbForms/
  // createLemmatizer — stays omitted below, unchanged).
  //
  // Measured before shipping, on real material, not assumed: gating
  // dropped garbage connectors (of/the/by/with/in/that/this/how/what/
  // either/or, among others) from three real Gutenberg excerpts —
  // Shakespeare 90→22 edges, the Iliad 65→25, Alice 97→34 — while every
  // surviving verb on Alice (was/started/had/think/fallen/got/began/
  // opened) is a genuine one; `candidates` (the full nominated set, gated
  // or not) is unchanged, so nothing about what was NOMINATED moved, only
  // what was ADMITTED to the vocabulary extraction actually draws from.
  const POS_PRIOR_PATH = path.join(EOREADER7_ROOT, "legacy-eoreader6.1", "scripts", "corpus", "pos-eng.json");
  const GRAMMAR_MIN_SHARE = 0.5;
  let classifyConnector = null;
  let posPriorLoaded = false;
  let posPrior = null;
  try {
    const wordclass = await import(path.join(EOREADER7_ROOT, "legacy-eoreader6.1", "packages/engine/perceiver/text/wordclass.js"));
    posPrior = JSON.parse(fs.readFileSync(POS_PRIOR_PATH, "utf8"));
    classifyConnector = makeGrammarLens({
      classifyWord: wordclass.classifyWord,
      dominantClass: wordclass.dominantClass,
      posPrior,
      posPriorMeta: wordclass.POS_PRIOR_META,
      thraxMeta: wordclass.THRAX_META,
    });
    posPriorLoaded = true;
  } catch {
    classifyConnector = null; // disclosed absence, not a guess — see recipe.descriptor.grammar
    posPrior = null;
  }

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
    // See the WHY DISCLOSE-ONLY / WHY GATE comment above this function —
    // a type-level majority-vote vocabulary gate, not a per-edge verdict.
    // `posPriorFor` is a zero-arg accessor (app.js's own lazy-prior
    // pattern) so a caller that never loaded a POSPrior@1 fixture pays
    // nothing; `posPrior === null` here degrades makeRelationReader to
    // byte-identical prior behaviour (checked at hypergraph.js's own
    // `organs.posPriorFor ? organs.posPriorFor() : null`).
    posPriorFor: posPriorLoaded ? () => posPrior : null,
    // Both default false, threaded straight from this function's own
    // caller-declared `opts` — see this file's own header for what they are
    // (DR4/DR5, live_priors/goldens/reading/DERIVED-RULES.md) and hypergraph.js's
    // own `makeRelationReader` header for the backward-compatibility contract
    // (native relations.js's own AUXILIARY_VERBS/DEFINITE_DETERMINERS/etc.
    // defaults apply — nothing further injected here). The corpus-wide sweep
    // (this file's own `main`, below) omits both, so every already-digested
    // sidecar's shape is untouched; `diff-golden.mjs` opts in explicitly to
    // measure DR4/DR5 against the hand-rolled goldens.
    phrasalPredicates,
    nounPhraseSubjects,
    // THE ACTIVATION TIER, WIRED (eo-constitution Article III.4, 2026-09-01).
    // A cross-repo survey found this call site passing eleven of the
    // twenty-five organs hypergraph.js::makeRelationReader accepts, with no
    // record anywhere that the rest had been omitted — every 2026-08-29
    // corpus sweep ran purely type-level (surfaces, POS-gated vocabulary,
    // slot-position relations), with the one occurrence-level organ
    // (`resolvePronouns` — kernel/activation.js's one-hop recall through
    // kernel/contest.js's co-presence veto) never once reaching it.
    // `resolvePronouns`/`thirdPersonSingular` are wired now — measured
    // effect, real and honestly small at this window: 0 additional edges
    // across a 10-file, 8000-char sample (Aristotle, Dante, Byzantine
    // Empire, Christianity, Buddhism, Cold War, Confucianism, Drama,
    // Hamlet, UK 2008 c.27 — every file identical edge count with the
    // organ on or off). Its value is NOT raw yield; `resolvePronouns`'s own
    // `regime` block (framesWithPronouns/framesCoPresent/framesAdjudicated)
    // is real, disclosed evidence about how often co-presence vetoes a
    // candidate binding, and nothing before this pass captured it anywhere
    // — that block should ride the sidecar once `eot-sidecar.mjs` is
    // extended to keep it (named, not done in this pass).
    resolvePronouns: pron.resolvePronouns,
    thirdPersonSingular: priors.THIRD_PERSON_SINGULAR,
  });

  // UNION_OMITTED — eo-constitution/conformance/composition.test.mjs reads
  // this literal object directly off this file's own source text (parsed,
  // never executed by the audit) and fails if any organ
  // hypergraph.js::makeRelationReader accepts is neither passed above nor
  // named here with a real reason. A bare list of names is refused by that
  // test; every entry below carries why.
  const UNION_OMITTED = {
    // A REAL BUG, found wiring this pass, not a design choice: `blankFurniture`
    // (the-fold's `source.js::blankLabelRows`) is byte-length-preserving but
    // NOT sentence-COUNT-preserving on real material — measured on the same
    // Aristotle excerpt, it blanks 40 sentences down to 36 by erasing
    // terminal punctuation inside label-cell lines that `splitSentences`
    // was using as boundaries. hypergraph.js's own span-pairing check
    // (`readSentences.length === originalSentences.length`) then refuses
    // EVERY triple's address on the affected passage — confirmed live:
    // wiring `blankFurniture` alone turned 37 addressed edges into 37
    // edges with `spans: []`, silently unadmittable at hyperlexicon.js's
    // own UNADDRESSED door. Leaving it out is the safe choice until
    // `blankLabelRows` is made sentence-count-preserving or the pairing
    // check gains a fallback; the bug itself is filed as
    // eo-constitution/claims/blank-furniture-sentence-drift.claim.json.
    blankFurniture: "real bug, 2026-09-01: blankLabelRows changes splitSentences' sentence count on real material, which silently zeroes every edge's span under makeRelationReader's own count-pairing check — see claims/blank-furniture-sentence-drift.claim.json",
    // Widens what the reader HEARS rather than closing a false binding
    // (the-fold P43's own distinguishing test) — a real, measured, LARGE
    // effect (319 -> 737 edges across the same 10-file sample, matching
    // this project's own MINE-1 finding), and a genuinely separate
    // decision from wiring the activation tier: whether the corpus should
    // read with a widened English-only lexical prior is not answered by
    // "the organ exists and works." Left to a deliberate follow-up pass,
    // not bundled silently into "turn activation on."
    verbForms: "available (the-fold/eval/fixtures/unimorph-eng-verb-forms.json, 103,318 forms) and measured (319->737 edges on the 10-file sample) but withheld from THIS pass — widens recall rather than closing a false binding, and shipping it needs its own decision, not a side effect of wiring activation",
    createLemmatizer: "available (eoreader7/legacy-eoreader6.1 .../morphology.js::createLemmatizer, UniMorph-backed) but not yet paired with a verified lemma index for this corpus's own vocabulary — the-fold's own MINE-1 findings used a lemma pass tuned to that corpus, not this one",
    morphologyIndex: "no organ produces this shape on any engine path today (checked: legacy-eoreader6.1 exports createLemmatizer and loadMorphology, neither returns a morphologyIndex)",
    morphologyLanguage: "unused while morphologyIndex is unset — see morphologyIndex above",
    classifyConnector: "grammar-lens.js's disclosure-only lens (P56), already loaded above for classifyConnector's OTHER call site in this file; not the same organ makeRelationReader accepts under this name and not re-wired here without checking that distinction first",
    minShare: "the classifyConnector threshold; moot while classifyConnector is unset above",
    extractLeadingSurfaces: "no organ under this name exists on the native adapters/text/surfaces.js path as of this pass — checked, absent",
    casePrior: "Latin case-marking prior (the-fold P77) — this composition calls makeRelationReader, the English positional reader, never makeCaseMarkedRelationReader; not applicable to an English-majority sweep, named rather than silently absent",
    extractCaseMarkedRelation: "same reason as casePrior — this composition calls the English positional reader",
  };
  // taskLog.js exports GRAIN_RANK directly (native/kernel/task-log.js,
  // eoreader7 S23) — hyperlexicon.js reads it to name the Figure grain
  // without hardcoding the string. cellOf lives on cube.js in the native
  // layout (task-log.js's own historical operators.js companion has no
  // native counterpart; cube.js is where cellOf actually lives here).
  const hl = makeHyperlexicon({ ...taskLog, cellOf: cube.cellOf });
  // Computed ONCE per process, not per source — the three repos' commits
  // are invariant across a whole batch/sweep, and re-shelling to git for
  // every one of 2,207 files would be pure waste for a fact that cannot
  // change mid-run.
  const repoStates = {
    eoreader7: repoState(EOREADER7_ROOT),
    theFold: repoState(FOLD_ROOT),
    livePriors: repoState(LP_ROOT),
  };
  // makeHyperlexicon and makeReferentIndex are exposed as CONSTRUCTORS, not
  // only `hl` (a single fixed instance without noteIdentity, built above for
  // the corpus-wide sweep's own recipe-identity use). eo-constitution
  // Article III.4's own referent-identity wiring (2026-09-01) needs a FRESH
  // hyperlexicon per file, closed over THAT file's own referent index —
  // coreference is passage-scoped and must never be shared across
  // documents (cast.js's own referent index is built fresh per call for
  // exactly this reason). eot-sidecar.mjs builds the per-file instance;
  // this function only hands over the parts.
  return {
    spans, surfaces, relations, material, priors, taskLog, cube,
    relationsFor, hl, makeHyperlexicon, makeReferentIndex,
    stripContainer, declaredIdentity, repoStates,
    classifyConnector, mismatchedConnectors, posPriorLoaded, GRAMMAR_MIN_SHARE,
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
  // Whether the surface layer can see this material's script AT ALL, asked
  // BEFORE its counts are read — eoreader7 native surfaces.js::scriptCoverage
  // (S24). Every candidate-surface filter in that organ reads capitalisation,
  // so on a caseless script the count it returns is about whatever cased
  // debris sits in the file, never about the material's own language. This
  // digest's first run reported exactly such counts for Hebrew, Korean and
  // Farsi with nothing marking them; the gap is now carried per source.
  const script = surfaces.scriptCoverage(sentences);
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
    // What fraction of this material's own writing the surface layer could
    // see, and the typed gap when the answer is "little or none". Sits ABOVE
    // `reading` deliberately: a surface count read without this is the exact
    // silent failure it exists to close.
    script: {
      casedLetters: script.casedLetters,
      caselessLetters: script.caselessLetters,
      casedShare: script.casedShare,
      gap: script.gap,
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

export { loadOrgans, digestOne, excerptOf, stripCatalogBoilerplate, verifySpans, EXCERPT_CHARS, LP_ROOT, DIGEST_DIR, repoState };

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
      casedShare: out.script.casedShare,
      scriptGap: out.script.gap?.reason ?? null,
    });
    const gapNote = out.script.gap
      ? `  [${out.script.gap.reason}: only ${(out.script.casedShare * 100).toFixed(1)}% of letters carry case]`
      : "";
    console.log(`${spec.slug}: ${out.reading.sentences} sentences, ${out.reading.distinctReferents} referents, ${out.reading.edgesFound} edges found, ${out.admission.heard} heard, spans ${out.spanSelfVerification.ok}/${out.spanSelfVerification.checked}${gapNote} -> ${outPath}`);
  }
  fs.writeFileSync(path.join(DIGEST_DIR, "index.json"), JSON.stringify({ schema: "EOTDigestIndex@1", generatedAt: new Date().toISOString(), sources: index }, null, 1));
  console.log(`\nwrote ${index.length} digests + index.json to ${DIGEST_DIR}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await runBatch();
}
