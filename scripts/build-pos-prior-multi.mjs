#!/usr/bin/env node
// build-pos-prior-multi.mjs — the same measured-not-listed head-extraction
// discipline build-pos-prior.mjs already proved for English, extended to
// as many of this project's other rosetta languages (LANG_OF in
// eot-sidecar2.mjs: ar/es/zh/sw) as a REAL, verified Universal Dependencies
// treebank actually supports. User direction, verbatim (2026-09-01): "what
// about unimorph? can we do this for as many languages as possible?"
//
// EVERY repo/file path below was checked live before this script was
// written, not assumed from a naming convention — the org's own contents
// API is scoped to four unrelated repos in this session (api.github.com
// returns "GitHub access to this repository is not enabled for this
// session" for ANY other repo, not a real 404), so verification here is by
// direct raw.githubusercontent.com fetch (unrestricted, the same channel
// build-pos-prior.mjs already uses) plus the UD project's own public site
// and GitHub org search where a repo name had to be found rather than
// guessed. Full transcript of every check: scripts/multilingual-priors-
// RESULTS.md.
//
//   ar (Arabic, arb — Modern Standard, matching udhr-arb.txt exactly):
//     UD_Arabic-PADT, prefix ar_padt — train/dev/test all verified 200.
//   es (Spanish, spa): UD_Spanish-AnCora, prefix es_ancora — all 200.
//   zh (Chinese, cmn_hans — Simplified, matching udhr-cmn_hans.txt's own
//     script): UD_Chinese-GSD is TRADITIONAL script (verified by reading
//     real bytes: "簡單", "決擇" — would silently fail to match this
//     project's Simplified corpus). UD_Chinese-GSDSimp is the real
//     Simplified variant UD itself publishes; prefix zh_gsdsimp — all 200,
//     script-checked.
//   sw (Swahili, swh — matching udhr-swh.txt): NO real data. The only
//     Swahili entry in the UD org, UD_Swahili-OPUSGV, contains no .conllu
//     file anywhere — confirmed twice independently (repo root listing,
//     and its /tree/master listing) — despite its own README metadata
//     claiming "Data available since: UD v2.8". This is a genuine defect
//     in the upstream resource, disclosed rather than routed around by
//     guessing at an undocumented file name. Recorded as a typed gap in
//     the output manifest, never silently absent.
//
// CONLL-U reading is byte-identical to build-pos-prior.mjs: FORM = column
// 2, UPOS = column 4, comment/range/empty-node lines skipped, forms
// lowercased. One implementation, parameterized over a language table —
// not four near-copies (the P22/P24 two-copies lesson this project's own
// mechanical-ladder.mjs header already invokes).

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, "..");
const OUT_DIR = path.join(ROOT, "derived-priors", "pos-priors");

const sha256 = (b) => crypto.createHash("sha256").update(b).digest("hex");

const LANGS = [
  {
    code: "ar", iso: "arb", name: "Arabic (Modern Standard) — PADT",
    repo: "UD_Arabic-PADT", prefix: "ar_padt",
    matchesSource: "udhr-arb.txt (this project's own hand golden)",
  },
  {
    code: "es", iso: "spa", name: "Spanish — AnCora",
    repo: "UD_Spanish-AnCora", prefix: "es_ancora",
    matchesSource: "udhr-spa.txt (this project's own hand golden)",
  },
  {
    code: "zh", iso: "cmn_hans", name: "Chinese, Mandarin, Simplified — GSDSimp",
    repo: "UD_Chinese-GSDSimp", prefix: "zh_gsdsimp",
    matchesSource: "udhr-cmn_hans.txt (this project's own hand golden) — script-checked: UD_Chinese-GSD proper is Traditional and was rejected for this reason",
  },
];

const SWAHILI_GAP = {
  code: "sw", iso: "swh", name: "Swahili",
  status: "no_usable_data",
  checked: [
    { repo: "UD_Swahili-UCB", finding: "does not exist under this name (an unverified guess, refused rather than assumed real)" },
    { repo: "UD_Swahili-OPUSGV", finding: "the only real Swahili entry in the UniversalDependencies GitHub org; contains CONTRIBUTING.md, LICENSE.txt, README.md and NO .conllu file anywhere, confirmed by two independent listings (repo root, /tree/master) — despite the README's own metadata claiming 'Data available since: UD v2.8'. A real defect in the upstream resource, not a naming guess that failed." },
  ],
  because: "no fetchable, real Universal Dependencies annotation exists for Swahili in this environment as of 2026-09-01 — disclosed as a typed gap rather than silently omitted or substituted with an unrelated language's data",
};

const manifestLangs = [];

for (const lang of LANGS) {
  // Object.create(null), not {}: a real corpus token CAN collide with an
  // Object.prototype key ("constructor" is a genuine, attested Spanish
  // word in UD_Spanish-AnCora — measured, not hypothetical: this exact
  // bug was caught live building the sibling UniMorph script and traced
  // back here before this artifact was ever committed). A plain {} would
  // let `forms[form] ??= {}` silently resolve to the inherited
  // Object.prototype.constructor function instead of creating a new
  // counting object, corrupting that one word's counts without an error.
  const forms = Object.create(null);
  const sources = [];
  let tokens = 0, sentences = 0;
  const base = `https://raw.githubusercontent.com/UniversalDependencies/${lang.repo}/master`;
  for (const split of ["train", "dev", "test"]) {
    const file = `${lang.prefix}-ud-${split}.conllu`;
    const url = `${base}/${file}`;
    const res = await fetch(url);
    if (!res.ok) { console.error(`fetch failed ${res.status}: ${url}`); process.exit(1); }
    const text = await res.text();
    sources.push({ file, url, sha256: sha256(text), bytes: Buffer.byteLength(text) });
    for (const line of text.split("\n")) {
      if (!line || line.startsWith("#")) { if (line.startsWith("# sent_id")) sentences++; continue; }
      const cols = line.split("\t");
      if (cols.length < 5) continue;
      const id = cols[0];
      if (id.includes("-") || id.includes(".")) continue;
      const form = cols[1].toLowerCase();
      const upos = cols[3];
      if (!form || !upos || upos === "_") continue;
      (forms[form] ??= {})[upos] = (forms[form][upos] ?? 0) + 1;
      tokens++;
    }
  }

  const artifact = {
    schema: "POSPrior@1",
    language: lang.iso,
    giver: {
      resource: `Universal Dependencies ${lang.repo}`,
      resourceLicense: "CC BY-SA 4.0",
      url: `https://github.com/UniversalDependencies/${lang.repo}`,
      files: sources,
      note: "per-form UPOS attestation counts; ambiguity preserved, no winner picked at build time — same consumer contract as pos-prior-en.json (eoreader7 native/adapters/text/wordclass.js, caller-declared share floor)",
      matchesSource: lang.matchesSource,
    },
    counts: { forms: Object.keys(forms).length, tokens, sentences },
    forms,
    builtAt: new Date().toISOString(),
  };

  const outFile = path.join(OUT_DIR, `pos-prior-${lang.code}.json`);
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(artifact, null, 1));
  console.log(`POSPrior@1[${lang.code}] -> ${path.relative(ROOT, outFile)}: ${artifact.counts.forms} forms, ${tokens} tokens, ${sentences} sentences`);
  manifestLangs.push({ code: lang.code, iso: lang.iso, name: lang.name, repo: lang.repo, forms: artifact.counts.forms, tokens, sentences, file: path.relative(ROOT, outFile) });
}

const manifest = {
  schema: "POSPriorManifest@1",
  built: manifestLangs,
  gaps: [SWAHILI_GAP],
  note: "one row per language actually built (real, committed, giver-named), one row per language checked and honestly found absent — never silently skipped. Full verification transcript: scripts/multilingual-priors-RESULTS.md.",
  builtAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(OUT_DIR, "MULTILINGUAL-MANIFEST.json"), JSON.stringify(manifest, null, 1));
console.log(`\nMULTILINGUAL-MANIFEST.json -> ${manifestLangs.length} languages built, ${manifest.gaps.length} gap(s) disclosed`);
