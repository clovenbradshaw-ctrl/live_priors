// hand-readings.mjs — the hand-adjudicated golden readings, as data.
//
// Every row here was derived BY HAND from the specimen's own bytes under
// goldens/reading/RULE.md (written first). The builder (build-goldens.mjs)
// only stamps byte spans mechanically and self-verifies them — no judgment
// lives there. `sentence` is the row's own sentence, verbatim from the
// NORMALIZED body text; the builder locates it and addresses it in the raw
// file's own coordinates via eoreader7 S26's toRaw map.
//
// AMENDMENTS TO RULE.md MADE DURING FIRST READING, disclosed here and in
// RULE.md's own amendment section (dated 2026-08-29, before any diff ran):
//   A1 complement clauses of attitude/perception verbs stay inside the
//      object, never separately asserted (intensionality).
//   A2 adjuncts (purpose/time/place/condition) sit OUTSIDE the object
//      unless the verb subcategorizes them; conditions noted in because.
//   A3 deontic/epistemic modality is noted in because, never moves the
//      phasepost (sibling of R6's polarity wall).
//   A4 an existential-negative subject ("there was nothing remarkable")
//      reads as NUL with polarity + — the absence IS the act.
//   A5 translocation verbs (ran, hurried, went) read as SIG, grain from
//      what the motion lands on (a ground for fields/paths, a figure for
//      a target).
//   A6 repair/revision verbs (fix, improve) follow this project's own
//      build-log precedent (a revision is SUPERSEDE·SYN): primary SYN,
//      alternate SEG (defect removed) disclosed.
//
// AMENDMENT 2026-08-31 — four omnilingual UDHR readings added (Arabic,
// Spanish, Mandarin, Swahili: specimens udhr-arb/udhr-spa/udhr-cmn_hans/
// udhr-swh), same Preamble+Article-1 window as the existing "udhr" (English)
// entry. Each was derived INDEPENDENTLY from that language's own OHCHR file
// bytes under RULE.md — never copied from the English golden's structure —
// and each surfaced a real, disclosed structural divergence from English,
// found this way rather than assumed (full reasoning in each entry's own
// `notes` field and per-row `because` fields):
//   - Arabic's Preamble genuinely OMITS the whereas-clause corresponding to
//     English's "it is essential to promote the development of friendly
//     relations between nations" — verified absent from the file's own
//     bytes, not a reading gap. 12 rows, not 13.
//   - Mandarin's paratactic syntax gives "these atrocities sullied
//     humanity's conscience" its OWN independent finite clause (no relative
//     pronoun available to subordinate it, unlike English's "which have
//     outraged..."). 14 rows.
//   - Swahili verbs "born free" and "equal in dignity/rights" SEPARATELY
//     (each its own subject+copula), and its proclamation clause's object
//     is itself a full copula sentence in a separate typographic paragraph
//     ("...ndio nguzo ya juhudi...", "is indeed the pillar of effort...").
//     15 rows.
// All 54 new rows (12+13+14+15) self-verified on the first real
// `build-goldens.mjs` run — see the four new *.golden.json files.

//
// AMENDMENT 2026-08-31 (second pass) — the five UDHR entries grew from
// Preamble+Article 1 to the WHOLE DOCUMENT (Articles 1-30, 651 rows across
// the five languages) and moved into per-language files (hand-udhr-*.mjs),
// imported below. Grounds became holonic dotted addresses (R11), revision
// ledgers were added (R12). The row counts and window notes in the 2026-08-31
// amendment above describe the superseded Preamble+Article-1 state — kept
// per R12's append-only discipline, not rewritten.
//
// AMENDMENT 2026-08-31 (third pass) — the phasepost GAP SUITE
// (hand-gap-suite.mjs, ten windows, 80 rows: Genesis 1 and 2:1-3 in
// Hebrew, Mark 1:14-15 and 16:6 in Koine Greek, Quran 2:37 in Arabic and
// English, King Lear 1.1 ×3 and The Tempest 5.1 from pg100) closed the
// cube: ALL 27 phasepost cells now carry a primary attestation — 767
// rows, 18 goldens, 7 languages. See RULE.md's dated amendment for the
// three rulings it forced and the folger-shakespeare mislabeling it
// caught.
import { UDHR_ENG } from "./hand-udhr-eng.mjs";
import { UDHR_ARB } from "./hand-udhr-arb.mjs";
import { UDHR_SPA } from "./hand-udhr-spa.mjs";
import { UDHR_CMN } from "./hand-udhr-cmn.mjs";
import { UDHR_SWH } from "./hand-udhr-swh.mjs";
import { GAP_SUITE } from "./hand-gap-suite.mjs";

export const GOLDENS = [
  {
    specimen: "kant",
    path: "02-encyclopedic/wikipedia/Immanuel_Kant.txt",
    gutenberg: false,
    windowEndText: "conform to its objects.",
    notes: "Window includes ~800 chars of infobox debris carrying no finite main clause (R1 yields nothing there). Three prose paragraphs follow.",
    rows: [
      {
        sentence: "was a German philosopher.",
        subject: "Immanuel Kant", relation: "was", object: "a German philosopher",
        polarity: "+", phasepost: { op: "SIG", grain: "Pattern" },
        because: "copula rule 2: standing-as-a-kind (philosopher, German) — Relate·Existence at kind grain",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "(born Emanuel Kant; 22 April 1724",
        subject: "Immanuel Kant", relation: "born", object: "Emanuel Kant; 22 April 1724 – 12 February 1804",
        polarity: "+", phasepost: { op: "INS", grain: "Figure" },
        because: "parenthetical asserts birth (name + lifespan): one individual comes into being — Generate·Existence at figure grain",
        embedded: true, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "Born in Königsberg in the Kingdom of Prussia, he is considered",
        subject: "Immanuel Kant", relation: "born in", object: "Königsberg in the Kingdom of Prussia",
        polarity: "+", phasepost: { op: "INS", grain: "Figure" },
        because: "fronted participial asserts his birth (one individual); the place is the act's adjunct, kept in object as the participle's own complement",
        embedded: true, unresolved: false,
        resolution: "\"he\"-chain: the fronted participle attaches to the main clause subject, resolved to the article's own established topic (Immanuel Kant)", alternate: null,
      },
      {
        sentence: "he is considered one of the central thinkers of the Age of EnlightenmentEnlightenment.",
        subject: "Immanuel Kant", relation: "is considered", object: "one of the central thinkers of the Age of Enlightenment",
        polarity: "+", phasepost: { op: "EVA", grain: "Figure" },
        because: "copula rule 1: participle of consider — a claim held (by unnamed holders) about one figure — Relate·Interpretation at figure grain",
        embedded: false, unresolved: false,
        resolution: "\"he\" → Immanuel Kant, the sentence-1 subject and the article's topic", alternate: null,
      },
      {
        sentence: "have made him one of the most influential and highly discussed figures in modern Western philosophy.",
        subject: "Kant's comprehensive and systematic works in epistemology, metaphysics, logic, ethics, aesthetics, political theory, and the philosophy of religion",
        relation: "have made", object: "him one of the most influential and highly discussed figures in modern Western philosophy",
        polarity: "+", phasepost: { op: "SYN", grain: "Figure" },
        because: "the works PRODUCE his standing — a position within the field's arrangement — Generate·Structure landing on one figure",
        embedded: false, unresolved: false,
        resolution: "\"His\" → Kant's; \"him\" → Kant — both from the paragraph's established topic",
        alternate: { op: "REC", grain: "Figure", because: "readable as producing a new interpretive standing rather than a structural position" },
      },
      {
        sentence: "Kant's philosophy is centered on the human subject",
        subject: "Kant's philosophy", relation: "is centered on", object: "the human subject",
        polarity: "+", phasepost: { op: "CON", grain: "Ground" },
        because: "the philosophy as a whole is held in arrangement around a center — Relate·Structure at ground grain",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "motivated by the desire to secure the possibility of both knowledge and morality against the threats of skepticism and determinism.",
        subject: "Kant's philosophy", relation: "is motivated by", object: "the desire to secure the possibility of both knowledge and morality against the threats of skepticism and determinism",
        polarity: "+", phasepost: { op: "EVA", grain: "Ground" },
        because: "relates the whole philosophy to its aim — an interpretive relation over the whole project",
        embedded: false, unresolved: false, resolution: "coordinated predicate shares sentence-subject \"Kant's philosophy\"",
        alternate: { op: "CON", grain: "Ground", because: "readable as a structural relation between the philosophy and its motive force" },
      },
      {
        sentence: "Kant argues for transcendental idealism",
        subject: "Kant", relation: "argues for", object: "transcendental idealism",
        polarity: "+", phasepost: { op: "DEF", grain: "Figure" },
        because: "advocating a position bounds a claim — Differentiate·Interpretation on one doctrine; the in-the-Critique adjunct stays outside the object (A2)",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "the doctrine that space and time are mere",
        subject: "transcendental idealism", relation: "is", object: "the doctrine that space and time are mere \"forms of intuition\" that structure all experience and that we have knowledge only of \"appearances\" and not of the nature of things in themselves",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" },
        because: "non-restrictive appositive identifies one named doctrine — copula rule 3, unique identity; the that-clause content stays inside the identity (A1)",
        embedded: true, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "Kant drew a parallel to the Copernican Revolution",
        subject: "Kant", relation: "drew a parallel to", object: "the Copernican Revolution",
        polarity: "+", phasepost: { op: "CON", grain: "Figure" },
        because: "places his proposal and the Copernican Revolution in explicit relation — one link made — Relate·Structure at figure grain; the in-his-proposal material is adjunct (A2)",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "EVA", grain: "Figure", because: "a drawn parallel is also an interpretive comparison" },
      },
    ],
  },

  {
    specimen: "alice",
    path: "01-literature-books/gutenberg/pg11_Alice_s_Adventures_in_Wonderland.txt",
    gutenberg: true,
    windowEndText: "under the hedge.",
    notes: "Window includes title page and chapter TOC carrying no finite main clause. Three narrative paragraphs follow (S3 is the long multi-clause sentence).",
    rows: [
      {
        sentence: "Alice was beginning to get very tired of sitting by her sister on the",
        subject: "Alice", relation: "was beginning to get", object: "very tired of sitting by her sister on the bank, and of having nothing to do",
        polarity: "+", phasepost: { op: "INS", grain: "Ground" },
        because: "a condition (tiredness) comes into being, landing on her whole state — Generate·Existence at ground grain",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "once or twice she had peeped into",
        subject: "Alice", relation: "had peeped into", object: "the book her sister was reading",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" },
        because: "brief attention to one figure's presence; \"her sister was reading\" is restrictive and folds into the NP (R1)",
        embedded: false, unresolved: false, resolution: "\"she\" → Alice, sentence subject", alternate: null,
      },
      {
        sentence: "but it had no pictures or",
        subject: "the book", relation: "had", object: "pictures or conversations in it",
        polarity: "-", phasepost: { op: "CON", grain: "Pattern" },
        because: "possession of kinds of content, negated — polarity carries the \"no\", never NUL (R6); kinds, not one picture — pattern grain",
        embedded: false, unresolved: false, resolution: "\"it\" → the book, prior clause's object", alternate: null,
      },
      {
        sentence: "thought Alice",
        subject: "Alice", relation: "thought", object: "\"and what is the use of a book without pictures or conversations?\"",
        polarity: "+", phasepost: { op: "EVA", grain: "Figure" },
        because: "a judgment held by its holder; quoted complement stays inside the object (A1)",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "So she was considering in her own mind",
        subject: "Alice", relation: "was considering", object: "whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies",
        polarity: "+", phasepost: { op: "EVA", grain: "Figure" },
        because: "weighing one question — Relate·Interpretation at figure grain; complement clause stays inside object (A1)",
        embedded: false, unresolved: false, resolution: "\"she\" → Alice", alternate: null,
      },
      {
        sentence: "the\nhot day made her feel very sleepy and stupid",
        subject: "the hot day", relation: "made", object: "her feel very sleepy and stupid",
        polarity: "+", phasepost: { op: "INS", grain: "Ground" },
        because: "parenthetical asserts a state produced in her — Generate·Existence at ground grain (a felt condition)",
        embedded: true, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "suddenly a White Rabbit with pink eyes ran\nclose by her.",
        subject: "a White Rabbit with pink eyes", relation: "ran close by", object: "her",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" },
        because: "a figure arrives into presence beside her — translocation as presence-in-relation (A5), landing on the figure passed",
        embedded: false, unresolved: false, resolution: "\"her\" → Alice", alternate: null,
      },
      {
        sentence: "There was nothing so _very_ remarkable in that;",
        subject: "nothing so very remarkable", relation: "was", object: "in that",
        polarity: "+", phasepost: { op: "NUL", grain: "Ground" },
        because: "existential-negative subject: the absence IS the act (A4) — Differentiate·Existence over the situation as ground",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "nor did Alice think it\nso _very_ much out of the way to hear the Rabbit say to itself",
        subject: "Alice", relation: "think", object: "it so very much out of the way to hear the Rabbit say to itself, \"Oh dear! Oh dear! I shall be late!\"",
        polarity: "-", phasepost: { op: "EVA", grain: "Figure" },
        because: "negated judgment (\"nor did\"); the Rabbit's speech is inside the perception complement and stays in the object (A1)",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "it occurred to her that she ought to have wondered at this",
        subject: "that she ought to have wondered at this", relation: "occurred to", object: "her",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" },
        because: "parenthetical: a realization presents itself to her — a thought arriving into presence",
        embedded: true, unresolved: false, resolution: "\"her\"/\"she\" → Alice", alternate: null,
      },
      {
        sentence: "time it all seemed quite natural",
        subject: "it all", relation: "seemed", object: "quite natural",
        polarity: "+", phasepost: { op: "SIG", grain: "Ground" },
        because: "parenthetical: appearing-as over the whole situation — seeming is presence-in-relation at ground grain",
        embedded: true, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "the Rabbit actually _took a\nwatch out of its waistcoat-pocket_",
        subject: "the Rabbit", relation: "took out of", object: "a watch … its waistcoat-pocket",
        polarity: "+", phasepost: { op: "SEG", grain: "Figure" },
        because: "removal of one part from its container — Differentiate·Structure at figure grain",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "and looked at it, and then hurried\non",
        subject: "the Rabbit", relation: "looked at", object: "it",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" },
        because: "attention to one figure (the watch)",
        embedded: false, unresolved: false, resolution: "\"it\" → the watch, previous clause's object", alternate: null,
      },
      {
        sentence: "then hurried\non, Alice started",
        subject: "the Rabbit", relation: "hurried on", object: null,
        polarity: "+", phasepost: { op: "SIG", grain: "Ground" },
        because: "motion continuing through the scene (A5); no complement — the golden records an intransitive with a null object rather than inventing one",
        embedded: false, unresolved: false, resolution: "shared subject of the coordinated VP chain (the Rabbit)",
        alternate: { op: "SEG", grain: "Figure", because: "readable as departure — separating from her vicinity" },
      },
      {
        sentence: "Alice started to her feet",
        subject: "Alice", relation: "started to", object: "her feet",
        polarity: "+", phasepost: { op: "INS", grain: "Figure" },
        because: "a sudden new bodily state springs into being — Generate·Existence at figure grain",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "it flashed across her mind that she\nhad never before seen a rabbit",
        subject: "that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it",
        relation: "flashed across", object: "her mind",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" },
        because: "a realization arrives; the that-clause is the arriving thing and its own content stays inside it (A1)",
        embedded: false, unresolved: false, resolution: "\"her\"/\"she\" → Alice", alternate: null,
      },
      {
        sentence: "burning with curiosity, she ran across the\nfield after it",
        subject: "Alice", relation: "was burning with", object: "curiosity",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" },
        because: "free adjunct asserts a quality standing with her (copula rule 4 shape)",
        embedded: true, unresolved: false, resolution: "\"she\" → Alice", alternate: null,
      },
      {
        sentence: "she ran across the\nfield after it, and fortunately",
        subject: "Alice", relation: "ran across", object: "the field",
        polarity: "+", phasepost: { op: "SIG", grain: "Ground" },
        because: "translocation over a ground (A5); \"after it\" is the pursuit adjunct (A2), noted not objectified",
        embedded: false, unresolved: false, resolution: "\"she\" → Alice; \"it\" → the Rabbit", alternate: null,
      },
      {
        sentence: "was just in time to see it pop down a\nlarge rabbit-hole under the hedge.",
        subject: "Alice", relation: "was just in time to see", object: "it pop down a large rabbit-hole under the hedge",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" },
        because: "perception of one event; the perceived event stays inside the object (A1)",
        embedded: false, unresolved: false, resolution: "\"it\" → the Rabbit", alternate: null,
      },
    ],
  },

  {
    specimen: "ripgrep",
    path: "09-source-code/BurntSushi_ripgrep/CHANGELOG.md.txt",
    gutenberg: false,
    windowEndText: "across multiple directories.",
    notes: "Window: the TBD header and the 15.2.0 section. Changelog register: header fragments carry no finite clause; bullets are often subjectless imperatives whose implied subject is the named change or ripgrep itself.",
    rows: [
      {
        sentence: "Release notes have not yet been written.",
        subject: "Release notes", relation: "have been written", object: null,
        polarity: "-", phasepost: { op: "SYN", grain: "Figure" },
        because: "writing produces a document (Generate·Structure); negated (\"not yet\") — polarity carries it (R6); passive with no agent, null object recorded honestly",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "This release fixes a number of bugs related to gitignore matching",
        subject: "This release", relation: "fixes",
        object: "a number of bugs related to gitignore matching as well as some performance improvements in directory tree traversal",
        polarity: "+", phasepost: { op: "SYN", grain: "Pattern" },
        because: "repair follows the build-log precedent (a revision is SYN — A6) over a class of defects; the source's own zeugma (\"fixes…improvements\") kept whole in the object per R4",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "SEG", grain: "Pattern", because: "readable as defects removed" },
      },
      {
        sentence: "is now included in the release binaries for",
        subject: "aarch64-unknown-linux-musl", relation: "is included in", object: "the release binaries for ripgrep",
        polarity: "+", phasepost: { op: "CON", grain: "Figure" },
        because: "one target now inside the binaries set — containment, Relate·Structure at figure grain",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "Improves directory traversal time on very large corpora.",
        subject: "the change PERF #3293", relation: "improves", object: "directory traversal time on very large corpora",
        polarity: "+", phasepost: { op: "SYN", grain: "Ground" },
        because: "a working characteristic re-made better across a whole regime (A6's revision precedent, ground grain); subjectless bullet resolved to its own labeled change",
        embedded: false, unresolved: false,
        resolution: "changelog convention: the bullet's bracketed label [PERF #3293] names the acting change",
        alternate: { op: "REC", grain: "Ground", because: "readable as re-grounding the performance regime" },
      },
      {
        sentence: "ripgrep now respects",
        subject: "ripgrep", relation: "respects", object: "GIT_CONFIG_GLOBAL and GIT_CONFIG_SYSTEM",
        polarity: "+", phasepost: { op: "EVA", grain: "Pattern" },
        because: "deference: holds its own behavior against the named configs — Relate·Interpretation as a standing rule over kinds of configuration",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "CON", grain: "Pattern", because: "readable as a standing structural coupling to the configs" },
      },
      {
        sentence: "Don't check for the existence of",
        subject: "ripgrep", relation: "check for", object: "the existence of .jj",
        polarity: "-", phasepost: { op: "EVA", grain: "Figure" },
        because: "checking is a test (Relate·Interpretation) on one thing, negated behavior; the when---no-ignore-is-used condition is adjunct (A2); imperative changelog register resolved to ripgrep",
        embedded: false, unresolved: false,
        resolution: "changelog imperative: the behaving subject is ripgrep itself", alternate: null,
      },
      {
        sentence: "Fix gitignore matching bug when searching across multiple directories.",
        subject: "the changes BUG #3320, BUG #3376, BUG #3419", relation: "fix", object: "gitignore matching bug",
        polarity: "+", phasepost: { op: "SYN", grain: "Figure" },
        because: "one defect repaired (A6's revision precedent, figure grain); the when-searching condition is adjunct (A2); subjectless bullet resolved to its own labeled changes",
        embedded: false, unresolved: false,
        resolution: "changelog convention: the bullet's bracketed labels name the acting changes", alternate: null,
      },
    ],
  },

  UDHR_ENG,
  UDHR_ARB,
  UDHR_SPA,
  UDHR_CMN,
  UDHR_SWH,
  ...GAP_SUITE,
];
