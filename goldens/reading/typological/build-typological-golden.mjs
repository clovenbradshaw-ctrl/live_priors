#!/usr/bin/env node
// build-typological-golden.mjs — hand-rolled, not fetched: three UDHR-style
// specimens composed directly for this golden (Arabic, Mandarin Chinese,
// Swahili — chosen for maximum typological distance from one another and
// from English, per direct user request: "handroll a golden of 3 vastly
// different languages of the UNDHR... one proposition per line"), scored
// under the SAME EOReadingGolden@1 schema and RULE.md phasepost algebra
// goldens/reading/{udhr,alice,kant,ripgrep}.golden.json already use — no
// second format invented for this one.
//
// "One proposition per line" is the CONSTRUCTION PRINCIPLE, not just the
// output shape: each source file is six short, single-clause declaratives,
// one per line, so each row's span IS its whole line — no paragraph
// widening, no sentence-boundary guessing, the atomic case
// propositionLedger's own "a line per proposition" rule (this repo's
// scripts/eot-digest.mjs, added the same day) wants to diff against once
// its own coordinate-space bug is fixed.
//
// NO JUDGMENT LIVES HERE, same as build-goldens.mjs: subject/relation/
// object/polarity/phasepost/because/alternate are hand-derived below (in
// the DATA table), this script only computes and self-verifies REAL UTF-8
// BYTE spans (P5.2) and writes the golden. Byte offsets, not JS string
// indices — Arabic and Chinese are multi-byte in UTF-8, so this matters.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LP_ROOT = path.join(HERE, "..", "..", "..");
const EOREADER7 = "/home/user/eoreader7";

const spans = await import(path.join(EOREADER7, "native/adapters/text/spans.js"));

// Every row's subject/relation/object/anchor is given in the SOURCE
// LANGUAGE (R2/R3/R4: "as the text states it") — `gloss` is a disclosed,
// non-schema EXTRA field for readers of this repo who do not read Arabic,
// Chinese, or Swahili; it carries no evidentiary weight and is never
// consulted by anything that scores against this golden.
//
// Findings worth reading before the rows themselves — see
// TYPOLOGICAL-FINDINGS.md for the full account:
//   - "born free" (row 1, all three) converges on IDENTICAL INS·Pattern.
//   - "has the right to X" (rows 3/5/6, all three) converges on IDENTICAL
//     CON·Pattern through three GRAMMATICALLY DIFFERENT possessive
//     constructions (Arabic dative preposition, Mandarin bare verb 有,
//     Swahili inflected verb ana) — phasepost tracking the ACT and not the
//     surface grammar, exactly as RULE.md's "two walls" demands.
//   - "no one shall be enslaved" (row 4) DIVERGES across all three:
//     Arabic SIG·Figure(−), Mandarin CON·Figure(−), Swahili NUL·Pattern(+)
//     via A4 (existential-negative subject). Same proposition, three
//     different negation STRATEGIES, three different primary phaseposts —
//     a real, disclosed, unresolved question for RULE.md, not smoothed
//     into agreement.
//   - "equal in dignity" (row 2, all three) hits an ambiguity RULE.md's
//     own text does not settle: does universal quantification of the
//     subject promote grain the way habitual aspect does? Disclosed as a
//     primary/alternate split, identically, in all three languages.

const SPECIMENS = [
  {
    specimen: "typological-ar",
    file: "ar.txt",
    language: "Arabic (ar)",
    rows: [
      {
        line: "جميع الناس يولدون أحرارًا.",
        gloss: "All people are born free.",
        subject: "جميع الناس",
        relation: "يولدون",
        object: "أحرارًا",
        polarity: "+",
        phasepost: { op: "INS", grain: "Pattern" },
        because: "birth stated as a law over the whole kind — Generate·Existence at pattern grain; matches udhr.golden.json row 10's classification of the identical proposition in English",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        line: "جميع الناس متساوون في الكرامة.",
        gloss: "All people are equal in dignity.",
        subject: "جميع الناس",
        relation: "ø (zero copula)",
        object: "متساوون في الكرامة",
        polarity: "+",
        phasepost: { op: "SIG", grain: "Figure" },
        because: "copula rule 4 (property adjective, zero-copula Arabic nominal sentence) — quality asserted of the class; Figure per the rule's literal text",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "SIG", grain: "Pattern", because: "RULE.md names only habitual/iterative aspect as a Pattern-promotion trigger — whether a universally-quantified subject licenses the same promotion (as row 1's INS·Pattern implicitly assumes) is undecided by the rule's own text" },
      },
      {
        line: "لكل إنسان الحق في الحياة.",
        gloss: "Everyone has the right to life.",
        subject: "لكل إنسان",
        relation: "ø (li- existential-possessive, no verb)",
        object: "الحق في الحياة",
        polarity: "+",
        phasepost: { op: "CON", grain: "Pattern" },
        because: "li- + noun is Arabic's ordinary 'X has Y' construction (no verb 'have' exists); matches udhr.golden.json row 11's CON·Pattern for the structurally identical 'endowed with' possession",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        line: "لا يجوز استرقاق أحد.",
        gloss: "No one shall be held in slavery.",
        subject: "استرقاق أحد",
        relation: "يجوز",
        object: null,
        polarity: "-",
        phasepost: { op: "SIG", grain: "Figure" },
        because: "yajūzu (is permitted) is a standing-as act (Relate·Existence) on one specific act (the nominalized 'enslavement of anyone'); R6: negation is polarity (−), never a different phasepost",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "DEF", grain: "Figure", because: "readable as a bounded prohibition drawn — the operator table's own 'denied that' example — rather than a permission-standing denied" },
      },
      {
        line: "لكل إنسان الحق في جنسية.",
        gloss: "Everyone has the right to a nationality.",
        subject: "لكل إنسان",
        relation: "ø (li- existential-possessive)",
        object: "الحق في جنسية",
        polarity: "+",
        phasepost: { op: "CON", grain: "Pattern" },
        because: "identical construction to row 3 — CON·Pattern",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        line: "لكل إنسان الحق في حرية الفكر.",
        gloss: "Everyone has the right to freedom of thought.",
        subject: "لكل إنسان",
        relation: "ø (li- existential-possessive)",
        object: "الحق في حرية الفكر",
        polarity: "+",
        phasepost: { op: "CON", grain: "Pattern" },
        because: "identical construction to rows 3 and 5 — CON·Pattern",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
    ],
  },
  {
    specimen: "typological-zh",
    file: "zh.txt",
    language: "Mandarin Chinese (zh)",
    rows: [
      {
        line: "人人生而自由。",
        gloss: "All people are born free.",
        subject: "人人",
        relation: "生",
        object: "自由",
        polarity: "+",
        phasepost: { op: "INS", grain: "Pattern" },
        because: "birth stated as a law over the whole kind — Generate·Existence at pattern grain; matches the Arabic row 1 and udhr.golden.json row 10 classifications of the identical proposition",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        line: "人人在尊严上一律平等。",
        gloss: "All people are equal in dignity.",
        subject: "人人",
        relation: "平等",
        object: null,
        polarity: "+",
        phasepost: { op: "SIG", grain: "Figure" },
        because: "stative predicate (Chinese adjectives are a verb subclass functioning as predicates with no copula) — copula-rule-4 analog; 在尊严上 is a locative adjunct, not the object",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "SIG", grain: "Pattern", because: "same undecided universal-quantification-promotion question as the Arabic and Swahili row 2 parallels" },
      },
      {
        line: "人人有生命权。",
        gloss: "Everyone has the right to life.",
        subject: "人人",
        relation: "有",
        object: "生命权",
        polarity: "+",
        phasepost: { op: "CON", grain: "Pattern" },
        because: "yǒu (has) is a possession verb — Relate·Structure, durable entitlement over the whole kind; matches the Arabic construction's CON·Pattern for the same proposition via a genuinely different (overt-verb, not prepositional) grammar",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        line: "任何人不得被奴役。",
        gloss: "No one shall be held in slavery.",
        subject: "任何人",
        relation: "被奴役",
        object: null,
        polarity: "-",
        phasepost: { op: "CON", grain: "Figure" },
        because: "núyì (enslave) binds the patient into a possession-relation — Relate·Structure, one person's status, Figure grain; polarity − from 不得 (R6); deontic 不得 noted, does not itself move the phasepost (A3). Genuinely diverges from the Arabic row 4 reading (SIG·Figure) because Mandarin's passive construction makes 'enslave' itself the main verb, where Arabic's construction makes 'is-permitted' the main verb over a nominalized 'enslavement' — same proposition, different finite verb, different phasepost, disclosed rather than forced to agree",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        line: "人人有权享有国籍。",
        gloss: "Everyone has the right to a nationality.",
        subject: "人人",
        relation: "有权",
        object: "享有国籍",
        polarity: "+",
        phasepost: { op: "CON", grain: "Pattern" },
        because: "yǒu quán (has the right) — same possession construction as row 3",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        line: "人人有思想自由的权利。",
        gloss: "Everyone has the right to freedom of thought.",
        subject: "人人",
        relation: "有",
        object: "思想自由的权利",
        polarity: "+",
        phasepost: { op: "CON", grain: "Pattern" },
        because: "yǒu (has) — same possession construction as rows 3 and 5",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
    ],
  },
  {
    specimen: "typological-sw",
    file: "sw.txt",
    language: "Swahili (sw)",
    rows: [
      {
        line: "Watu wote wamezaliwa huru.",
        gloss: "All people are born free.",
        subject: "Watu wote",
        relation: "wamezaliwa",
        object: "huru",
        polarity: "+",
        phasepost: { op: "INS", grain: "Pattern" },
        because: "birth stated as a law over the whole kind — Generate·Existence at pattern grain; matches the Arabic, Mandarin, and udhr.golden.json row 10 classifications of the identical proposition — third independent confirmation",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        line: "Watu wote ni sawa katika hadhi.",
        gloss: "All people are equal in dignity.",
        subject: "Watu wote",
        relation: "ni",
        object: "sawa",
        polarity: "+",
        phasepost: { op: "SIG", grain: "Figure" },
        because: "ni + property adjective (copula rule 4) — the overt copula particle 'ni' makes this the cleanest copula-rule case of the three languages (Arabic and Mandarin both use zero-copula constructions here)",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "SIG", grain: "Pattern", because: "same undecided universal-quantification-promotion question as the Arabic and Mandarin row 2 parallels" },
      },
      {
        line: "Kila mtu ana haki ya kuishi.",
        gloss: "Everyone has the right to life.",
        subject: "Kila mtu",
        relation: "ana",
        object: "haki ya kuishi",
        polarity: "+",
        phasepost: { op: "CON", grain: "Pattern" },
        because: "ana (has, subject-prefix a- + tense-infix -na-) is a possession verb — Relate·Structure, durable entitlement over the whole kind; matches the Arabic and Mandarin CON·Pattern classifications via a THIRD, again grammatically distinct, possessive construction — inflected verb rather than bare verb or preposition",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        line: "Hakuna mtu atakayefanywa mtumwa.",
        gloss: "No one shall be held in slavery.",
        subject: "mtu",
        relation: "Hakuna",
        object: "atakayefanywa mtumwa",
        polarity: "+",
        phasepost: { op: "NUL", grain: "Pattern" },
        because: "Hakuna (there-is-not) is an existential-negative subject — RULE.md amendment A4: reads as NUL with polarity +, the absence itself IS the act; read at Pattern grain as a durable categorical guarantee over all persons and all time, matching row 1's INS·Pattern promotion; 'atakayefanywa mtumwa' (who will be made a slave) is a restrictive relative clause and folds into the subject NP per R1, not a separate assertion. The ONE row of 18 where A4 fires rather than plain R6 negation, and the ONE row where all three languages' primary phasepost genuinely disagrees (Arabic SIG·Figure(−), Mandarin CON·Figure(−), Swahili NUL·Pattern(+)) — kept as a disclosed finding, not forced into agreement",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "NUL", grain: "Figure", because: "A4's own text describes one individuating instance of absence; Figure is the default grain absent an explicit habitual/universal-promotion argument" },
      },
      {
        line: "Kila mtu ana haki ya uraia.",
        gloss: "Everyone has the right to a nationality.",
        subject: "Kila mtu",
        relation: "ana",
        object: "haki ya uraia",
        polarity: "+",
        phasepost: { op: "CON", grain: "Pattern" },
        because: "same possession construction as row 3",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        line: "Kila mtu ana haki ya uhuru wa mawazo.",
        gloss: "Everyone has the right to freedom of thought.",
        subject: "Kila mtu",
        relation: "ana",
        object: "haki ya uhuru wa mawazo",
        polarity: "+",
        phasepost: { op: "CON", grain: "Pattern" },
        because: "same possession construction as rows 3 and 5",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
    ],
  },
];

let failures = 0;

for (const spec of SPECIMENS) {
  const rawPath = path.join(HERE, spec.file);
  const raw = fs.readFileSync(rawPath); // Buffer — real bytes, not a JS string yet.
  const rawText = raw.toString("utf8");
  const { text: norm } = spans.normaliseNewlines(rawText);
  if (norm !== rawText) {
    console.error(`${spec.specimen}: normaliseNewlines changed a file this script wrote as LF-only — investigate before trusting offsets`);
    failures++;
    continue;
  }

  const lines = rawText.split("\n").filter((l) => l.length > 0);
  if (lines.length !== spec.rows.length) {
    console.error(`${spec.specimen}: ${lines.length} non-empty lines in ${spec.file}, but ${spec.rows.length} rows declared — one-proposition-per-line is broken`);
    failures++;
    continue;
  }

  const rows = [];
  let byteCursor = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const row = spec.rows[i];
    if (line !== row.line) {
      console.error(`${spec.specimen} row ${i + 1}: file line ${JSON.stringify(line)} does not match declared row.line ${JSON.stringify(row.line)}`);
      failures++;
      continue;
    }
    const start = byteCursor;
    const end = start + Buffer.byteLength(line, "utf8");
    // Self-verification (P5.2): slice the REAL raw buffer at the computed
    // byte offsets and decode — must equal the line exactly. Byte offsets,
    // not string indices, because Arabic and Chinese characters are
    // multi-byte in UTF-8 and a string-index-based span would silently
    // misalign the moment either script's bytes diverge from its char count.
    const sliceText = raw.slice(start, end).toString("utf8");
    if (sliceText !== line) {
      console.error(`${spec.specimen} row ${i + 1}: byte span [${start},${end}) decoded to ${JSON.stringify(sliceText)}, expected ${JSON.stringify(line)}`);
      failures++;
    } else {
      const { line: _line, ...rest } = row;
      rows.push({ ...rest, anchor: line, span: { start, end } });
    }
    byteCursor = end + 1; // +1 for the \n separator (single byte in UTF-8).
  }

  const out = {
    schema: "EOReadingGolden@1",
    specimen: spec.specimen,
    path: `goldens/reading/typological/${spec.file}`,
    rule: "goldens/reading/RULE.md",
    language: spec.language,
    handrolled: true,
    handrolledNote:
      "Composed directly for this golden by the authoring session from linguistic knowledge of the language, NOT fetched from an authoritative source (OHCHR or otherwise). Structural ground truth (what proposition each line asserts, its phasepost) is authored with the same intent-by-construction standing this project's other synthetic goldens use (asserted-eval.mjs, hl-acquire.test.mjs's invented chronicle). Grammaticality is NOT independently native-speaker-verified — treat as reviewed-in-good-faith, not certified.",
    window: {
      end: byteCursor - 1,
      coordinates: "raw file bytes (UTF-8) — no container to strip, no CRLF to normalize; each row's span is its whole source line",
    },
    notes:
      "One proposition per line, by construction — six short single-clause declaratives loosely drawn from UDHR Articles 1, 3, 4, 15 and 18, simplified to one clause each rather than quoted from the dense legal-register original. See TYPOLOGICAL-FINDINGS.md for the cross-linguistic phasepost comparison across this file's three sibling specimens.",
    rows,
  };
  const outPath = path.join(HERE, `${spec.specimen}.golden.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 1));
  console.log(`${spec.specimen}: ${rows.length}/${spec.rows.length} rows self-verified -> ${path.relative(LP_ROOT, outPath)}`);
}

if (failures) {
  console.error(`\n${failures} failure(s) — fix the DATA table above and re-run before trusting any output written`);
  process.exit(1);
}
