// hand-gap-suite.mjs — the phasepost gap suite: ten tight windows, five
// languages (Hebrew, Koine Greek, Quranic Arabic, English ×2 registers),
// hand-adjudicated under RULE.md R1-R12 to give the remaining phasepost
// cells REAL attestations — and to give cells that were English-only a
// second language. Every window is R8-complete within its own bounds;
// windowStartText (built for exactly this) scopes each to its slice.
//
// What this suite fills, and where (primary assignments):
//   REC·Ground  — tempest-abjure (en: "this rough magic I here abjure")
//   REC·Figure  — lear-disclaim (en: disclaim), quran-2-37 (ar: فتاب عليه),
//                 quran-2-37-en (en: "He relented toward him"),
//                 gen-2 (he: וַיְבָרֶךְ — blessing generates an interpretive
//                 standing, the promote/secure-recognition family)
//   SEG·Ground  — lear-division (en: "divided In three our kingdom"),
//                 gen-1 (he: וַיַּבְדֵּל, twice — light/darkness, waters)
//   NUL·Figure  — lear-france (en: "we Have no such daughter"),
//                 mark-16-6 (grc: οὐκ ἔστιν ὧδε),
//                 tempest-abjure (en: "I'll drown my book"),
//                 gen-2 (he: וַיִּשְׁבֹּת — the working's cessation)
//   and second languages for INS·Ground (he), SYN·Ground (he, grc),
//   SYN·Figure (he), EVA·Figure (he), INS·Figure (grc, he, en), SEG·Figure
//   (en), NUL·Pattern (en), REC·Pattern (grc).
//
// RULINGS this suite forced, appended to RULE.md's amendments:
//   - a SITUATIONAL directive ("Give me the map there", Μὴ ἐκθαμβεῖσθε)
//     performs rather than asserts and FOLDS per R11's assertion wall,
//     disclosed — distinct from a NORMATIVE deontic over a kind (the
//     usifanye/μετανοεῖτε class), which asserts a norm and rows;
//   - an INTERROGATIVE asserts nothing and folds, disclosed;
//   - QUOTED PROCLAMATION content rows with embedded: true (the UDHR
//     proclamation precedent: performative proclamation enacts its
//     content), the report-frame rowed separately;
//   - clause role `temporal-adjunct` (a finite temporal clause that
//     asserts: "while we Unburden'd crawl toward death").
//
// SOURCE DISCLOSURE (caught scouting this suite, not repaired): the whole
// 15-western-canon/folger-shakespeare/ directory is MISLABELED — every
// file is a Project Gutenberg text (not Folger) and the filename↔content
// mapping is scrambled (Romeo_and_Juliet.txt holds King Lear;
// The_Tempest.txt holds Othello; Much Ado, Shrew, Tempest and Twelfth
// Night contents are absent while John, Richard II, Henry VI.3 and Comedy
// of Errors are present under other names). This suite therefore reads
// both plays from the canonical pg100 Complete Works. SBLGNT critical
// sigla (⸀ ⸂ ⸃) are part of that file's bytes and stay verbatim in field
// strings where they fall.

// 2026-08-31 EXTENSION — the omnilingual closure of the five English-only
// cells (user direction: "get omnilingual examples of all phaseposts";
// lead-generation via the eo-lexical-analysis exemplar signatures, used
// only to FIND candidate passages, never to adjudicate them):
//   SEG·Figure  — mark-15-38 (grc: the veil torn), quran-54-1 (ar: the
//                 moon split)
//   CON·Ground  — quran-2-255 (ar: the kursi encompassing heavens+earth)
//   EVA·Ground  — gen-6 (he: the ambient wickedness seen)
//   SYN·Pattern — quran-5-3 (ar: the din perfected)
//   REC·Ground  — gen-6 (he: the Maker's repenting, narrated AND quoted
//                 first-person — the tempest-abjure cell in Hebrew)
// Every field string in these five was derived mechanically from source
// bytes by word index (the combining-mark lesson, held to). A1's
// intensionality wall decided gen-6's shape: what was SEEN and what was
// REGRETTED stay inside their attitude verbs' objects (the gen-1
// saw-that-good precedent), so the window's rows are the acts themselves.

export const GAP_SUITE = [
  {
    specimen: "gen-1",
    path: "14-holy-texts/wlc-tanakh/Gen.txt",
    gutenberg: false,
    windowStartText: "Gen.1.1 ",
    windowEndText: "י֥וֹם שֵׁנִֽי",
    notes: "Genesis 1:1-8, Westminster Leningrad Codex (pointed Hebrew with cantillation — field strings carry the exact accents of their own occurrence). The creation window: INS·Ground (the whole world-field brought into being), SEG·Ground twice (the primal divisions), EVA·Figure (saw-that-good), the naming acts, and the vayehi refrain. Verse labels (Gen.1.N) are reference furniture, not predications — folded by note. Ground addresses mirror the source's own chapter.verse.predication containment.",
    revisions: [],
    rows: [
      {
        sentence: "בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ",
        subject: "אֱלֹהִ֑ים", relation: "בָּרָ֣א", object: "אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ",
        polarity: "+", phasepost: { op: "INS", grain: "Ground" }, clause: "main",
        prop: "gen:created-heavens-earth", ground: "gen-1.1.1", role: "declared",
        because: "בָּרָא (created) brings THE WHOLE FIELD OF BEING into existence — heavens-and-earth is the totality, not one thing: Generate·Existence at GROUND grain; בְּרֵאשִׁית (in the beginning) is a temporal adjunct (A2)",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "INS", grain: "Figure", because: "readable as two named creata rather than the world-field" },
      },
      {
        sentence: "וְהָאָ֗רֶץ הָיְתָ֥ה תֹ֨הוּ֙ וָבֹ֔הוּ",
        subject: "וְהָאָ֗רֶץ", relation: "הָיְתָ֥ה", object: "תֹ֨הוּ֙ וָבֹ֔הוּ",
        polarity: "+", phasepost: { op: "NUL", grain: "Ground" }, clause: "main",
        prop: "gen:earth-formless", ground: "gen-1.2.1", role: "declared",
        because: "copula + a predicate of PRIVATION (תֹהוּ וָבֹהוּ, unformed-and-void) — the field's formlessness stated as its condition: the absence of order IS the asserted state, A4's family at ground grain",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "SIG", grain: "Ground", because: "copula rule 4: formlessness read as a plain property held" },
      },
      {
        sentence: "וְחֹ֖שֶׁךְ עַל פְּנֵ֣י תְה֑וֹם",
        subject: "וְחֹ֖שֶׁךְ", relation: "עַל פְּנֵ֣י", object: "תְה֑וֹם",
        polarity: "+", phasepost: { op: "SIG", grain: "Ground" }, clause: "coordinate",
        prop: "gen:darkness-on-deep", ground: "gen-1.2.2", role: "declared",
        because: "a verbless nominal clause (the Arabic سواسية precedent): darkness [was] upon the face of the deep — presence held over a field, Relate·Existence at ground grain",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "וְר֣וּחַ אֱלֹהִ֔ים מְרַחֶ֖פֶת עַל פְּנֵ֥י הַמָּֽיִם",
        subject: "וְר֣וּחַ אֱלֹהִ֔ים", relation: "מְרַחֶ֖פֶת", object: "עַל פְּנֵ֥י הַמָּֽיִם",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "coordinate",
        prop: "gen:spirit-hovering", ground: "gen-1.2.3", role: "declared",
        because: "מְרַחֶפֶת (hovering) — one identified figure's presence held over the waters, the A5 landing family: Relate·Existence at figure grain",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "וַיֹּ֥אמֶר אֱלֹהִ֖ים יְהִ֣י א֑וֹר",
        subject: "אֱלֹהִ֖ים", relation: "וַיֹּ֥אמֶר", object: "יְהִ֣י א֑וֹר",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "main",
        prop: "gen:god-said-light", ground: "gen-1.3.1", role: "declared",
        because: "the say-act: a sign emitted — Relate·Existence at figure grain; the jussive content (let there be light) stays inside the quoted object (A1) — what it commands is then separately asserted by the narrative's own וַיְהִי",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "DEF", grain: "Figure", because: "the fiat readable as a bounded public act of definition, the proclaims family" },
      },
      {
        sentence: "וַֽיְהִי אֽוֹר",
        subject: "אֽוֹר", relation: "וַֽיְהִי", object: null,
        polarity: "+", phasepost: { op: "INS", grain: "Ground" }, clause: "coordinate",
        prop: "gen:light-came-to-be", ground: "gen-1.3.2", role: "declared",
        because: "וַיְהִי (and there was) — light's coming-to-be: Generate·Existence; ground grain because this primal light is an ambient field (the next verse divides it from darkness as field from field), not a lamp",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "INS", grain: "Figure", because: "readable as one created luminosity" },
      },
      {
        sentence: "וַיַּ֧רְא אֱלֹהִ֛ים אֶת הָא֖וֹר כִּי ט֑וֹב",
        subject: "אֱלֹהִ֛ים", relation: "וַיַּ֧רְא", object: "אֶת הָא֖וֹר כִּי ט֑וֹב",
        polarity: "+", phasepost: { op: "EVA", grain: "Figure" }, clause: "main",
        prop: "gen:saw-light-good", ground: "gen-1.4.1", role: "declared",
        because: "seeing-that-it-was-good: perception carrying a VERDICT — a judgment held over one identified thing, Relate·Interpretation at figure grain (the perception family, with lear-france's never-see); the כִּי־טוֹב assessment stays inside the seen content (A1)",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "וַיַּבְדֵּ֣ל אֱלֹהִ֔ים בֵּ֥ין הָא֖וֹר וּבֵ֥ין הַחֹֽשֶׁךְ",
        subject: "אֱלֹהִ֔ים", relation: "וַיַּבְדֵּ֣ל", object: "בֵּ֥ין הָא֖וֹר וּבֵ֥ין הַחֹֽשֶׁךְ",
        polarity: "+", phasepost: { op: "SEG", grain: "Ground" }, clause: "coordinate",
        prop: "gen:divided-light-darkness", ground: "gen-1.4.2", role: "declared",
        because: "וַיַּבְדֵּל (divided-between) CUTS two primal fields apart — Differentiate·Structure at GROUND grain: the object is not a thing but the light-field and dark-field themselves, held apart",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "וַיִּקְרָ֨א אֱלֹהִ֤ים לָאוֹר֙ י֔וֹם",
        subject: "אֱלֹהִ֤ים", relation: "וַיִּקְרָ֨א", object: "לָאוֹר֙ י֔וֹם",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "main",
        prop: "gen:called-light-day", ground: "gen-1.5.1", role: "declared",
        because: "naming — a sign attached to and held over one identified thing: the heading-row family's own act (a name stands over what it names), Relate·Existence at figure grain",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "DEF", grain: "Figure", because: "naming readable as bounding the named thing" },
      },
      {
        sentence: "וְלַחֹ֖שֶׁךְ קָ֣רָא לָ֑יְלָה",
        subject: "אֱלֹהִ֤ים", relation: "קָ֣רָא", object: "לָ֑יְלָה",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "coordinate",
        prop: "gen:called-darkness-night", ground: "gen-1.5.2", role: "declared",
        because: "the second naming of the pair — same act, its own proposition",
        embedded: false, unresolved: false,
        resolution: "the verb's subject carries from וַיִּקְרָא's אֱלֹהִים", alternate: null,
      },
      {
        sentence: "וַֽיְהִי עֶ֥רֶב וַֽיְהִי בֹ֖קֶר י֥וֹם אֶחָֽד",
        subject: "עֶ֥רֶב", relation: "וַֽיְהִי", object: "וַֽיְהִי בֹ֖קֶר",
        polarity: "+", phasepost: { op: "INS", grain: "Ground" }, clause: "coordinate",
        prop: "gen:evening-morning", ground: "gen-1.5.3", role: "declared",
        because: "the refrain: evening came-to-be and morning came-to-be — two ambient day-states arriving, Generate·Existence at ground grain; the paired וַיְהִי verbs are kept as one row (the Swahili serial precedent), and 'יוֹם אֶחָד' (day one) is a verbless count-apposition, folded (A2)",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "וַיֹּ֣אמֶר אֱלֹהִ֔ים יְהִ֥י רָקִ֖יעַ בְּת֣וֹךְ הַמָּ֑יִם",
        subject: "אֱלֹהִ֔ים", relation: "וַיֹּ֣אמֶר", object: "יְהִ֥י רָקִ֖יעַ בְּת֣וֹךְ הַמָּ֑יִם וִיהִ֣י מַבְדִּ֔יל בֵּ֥ין מַ֖יִם לָמָֽיִם",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "main",
        prop: "gen:god-said-firmament", ground: "gen-1.6.1", role: "declared",
        because: "the say-act again; both jussives (let there be a firmament; let it be dividing) stay inside the quoted object (A1) — the making and the dividing are then asserted by the narrative in verse 7",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "וַיַּ֣עַשׂ אֱלֹהִים֮ אֶת הָרָקִיעַ֒",
        subject: "אֱלֹהִים֮", relation: "וַיַּ֣עַשׂ", object: "אֶת הָרָקִיעַ֒",
        polarity: "+", phasepost: { op: "INS", grain: "Figure" }, clause: "main",
        prop: "gen:made-firmament", ground: "gen-1.7.1", role: "declared",
        because: "וַיַּעַשׂ (made) — ONE identified thing brought into being: Generate·Existence at figure grain",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "וַיַּבְדֵּ֗ל בֵּ֤ין הַמַּ֨יִם֙ אֲשֶׁר֙ מִתַּ֣חַת לָרָקִ֔יעַ",
        subject: "אֱלֹהִים֮", relation: "וַיַּבְדֵּ֗ל",
        object: "בֵּ֤ין הַמַּ֨יִם֙ אֲשֶׁר֙ מִתַּ֣חַת לָרָקִ֔יעַ וּבֵ֣ין הַמַּ֔יִם אֲשֶׁ֖ר מֵעַ֣ל לָרָקִ֑יעַ",
        polarity: "+", phasepost: { op: "SEG", grain: "Ground" }, clause: "coordinate",
        prop: "gen:divided-waters", ground: "gen-1.7.2", role: "declared",
        because: "the second primal division — the waters-below cut from the waters-above: Differentiate·Structure at ground grain; the locative אֲשֶׁר relatives are micro-relatives, folded (R1)",
        embedded: false, unresolved: false,
        resolution: "the verb's subject carries from וַיַּעַשׂ's אֱלֹהִים", alternate: null,
      },
      {
        sentence: "וַֽיְהִי כֵֽן",
        subject: "כֵֽן", relation: "וַֽיְהִי", object: null,
        polarity: "+", phasepost: { op: "INS", grain: "Ground" }, clause: "coordinate",
        prop: "gen:it-was-so", ground: "gen-1.7.3", role: "declared",
        because: "and-it-was-SO: the declared state of affairs realized — Generate·Existence at ground grain (the whole arrangement came to hold)",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "SYN", grain: "Ground", because: "readable as word and world closing into one whole" },
      },
      {
        sentence: "וַיִּקְרָ֧א אֱלֹהִ֛ים לָֽרָקִ֖יעַ שָׁמָ֑יִם",
        subject: "אֱלֹהִ֛ים", relation: "וַיִּקְרָ֧א", object: "לָֽרָקִ֖יעַ שָׁמָ֑יִם",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "main",
        prop: "gen:called-firmament-heaven", ground: "gen-1.8.1", role: "declared",
        because: "the third naming — the sign held over the made thing",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "וַֽיְהִי עֶ֥רֶב וַֽיְהִי בֹ֖קֶר י֥וֹם שֵׁנִֽי",
        subject: "עֶ֥רֶב", relation: "וַֽיְהִי", object: "וַֽיְהִי בֹ֖קֶר",
        polarity: "+", phasepost: { op: "INS", grain: "Ground" }, clause: "coordinate",
        prop: "gen:evening-morning", ground: "gen-1.8.2", role: "declared",
        because: "the refrain's second occurrence — a second row on the same prop (R9's multi-row rule); 'יוֹם שֵׁנִי' folds as before",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
    ],
  },

  {
    specimen: "gen-2",
    path: "14-holy-texts/wlc-tanakh/Gen.txt",
    gutenberg: false,
    windowStartText: "Gen.2.1 ",
    windowEndText: "אֲשֶׁר בָּרָ֥א אֱלֹהִ֖ים לַעֲשֽׂוֹת",
    notes: "Genesis 2:1-3, the completion-and-rest coda: SYN·Ground (the whole finished), SYN·Figure (the work finished), NUL·Figure (the ceasing from work), REC·Figure (blessing as generated interpretive standing) and DEF·Figure (hallowing as the boundary of the holy). The two אֲשֶׁר עָשָׂה relatives are formulaic restatements of makings already asserted at chapter scale — folded (R1, noted).",
    revisions: [],
    rows: [
      {
        sentence: "וַיְכֻלּ֛וּ הַשָּׁמַ֥יִם וְהָאָ֖רֶץ וְכָל צְבָאָֽם",
        subject: "הַשָּׁמַ֥יִם וְהָאָ֖רֶץ וְכָל צְבָאָֽם", relation: "וַיְכֻלּ֛וּ", object: null,
        polarity: "+", phasepost: { op: "SYN", grain: "Ground" }, clause: "main",
        prop: "gen:heavens-earth-finished", ground: "gen-2.1.1", role: "declared",
        because: "וַיְכֻלּוּ (were FINISHED) — the whole world-field and all its host brought to completion as ONE closed whole: Generate·Structure at GROUND grain; the passive states the totality's own closure",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "וַיְכַ֤ל אֱלֹהִים֙ בַּיּ֣וֹם הַשְּׁבִיעִ֔י מְלַאכְתּ֖וֹ",
        subject: "אֱלֹהִים֙", relation: "וַיְכַ֤ל", object: "מְלַאכְתּ֖וֹ אֲשֶׁ֣ר עָשָׂ֑ה",
        polarity: "+", phasepost: { op: "SYN", grain: "Figure" }, clause: "main",
        prop: "gen:god-finished-work", ground: "gen-2.2.1", role: "declared",
        because: "וַיְכַל (finished) — ONE work completed into a whole: Generate·Structure at figure grain; 'בַּיּוֹם הַשְּׁבִיעִי' is a temporal adjunct (A2) and the formulaic relative 'אֲשֶׁר עָשָׂה' folds (R1)",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "וַיִּשְׁבֹּת֙ בַּיּ֣וֹם הַשְּׁבִיעִ֔י מִכָּל מְלַאכְתּ֖וֹ",
        subject: "אֱלֹהִים֙", relation: "וַיִּשְׁבֹּת֙", object: "מִכָּל מְלַאכְתּ֖וֹ אֲשֶׁ֥ר עָשָֽׂה",
        polarity: "+", phasepost: { op: "NUL", grain: "Figure" }, clause: "coordinate",
        prop: "gen:god-rested", ground: "gen-2.2.2", role: "declared",
        because: "וַיִּשְׁבֹּת (ceased/rested) — the CESSATION of one identified activity: the working's absence begun, and the absence IS the act (A4's family) at figure grain, polarity +",
        embedded: false, unresolved: false,
        resolution: "the verb's subject carries from וַיְכַל's אֱלֹהִים",
        alternate: { op: "REC", grain: "Figure", because: "readable as the re-zero into rest — the sabbath as a new ground begun" },
      },
      {
        sentence: "וַיְבָ֤רֶךְ אֱלֹהִים֙ אֶת י֣וֹם הַשְּׁבִיעִ֔י",
        subject: "אֱלֹהִים֙", relation: "וַיְבָ֤רֶךְ", object: "אֶת י֣וֹם הַשְּׁבִיעִ֔י",
        polarity: "+", phasepost: { op: "REC", grain: "Figure" }, clause: "main",
        prop: "gen:blessed-seventh-day", ground: "gen-2.3.1", role: "declared",
        because: "וַיְבָרֶךְ (blessed) GENERATES an interpretive standing — blessedness — upon one identified day: Generate·Interpretation at figure grain, the same cell-arithmetic as the UDHR's promote-respect and secure-recognition rows (fostering/creating a standing of regard); performative, not a report of a held view",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "DEF", grain: "Figure", because: "readable as a bounded standing assigned, the proclaims-as family" },
      },
      {
        sentence: "וַיְקַדֵּ֖שׁ אֹת֑וֹ",
        subject: "אֱלֹהִים֙", relation: "וַיְקַדֵּ֖שׁ", object: "אֹת֑וֹ",
        polarity: "+", phasepost: { op: "DEF", grain: "Figure" }, clause: "coordinate",
        prop: "gen:hallowed-day", ground: "gen-2.3.2", role: "declared",
        because: "וַיְקַדֵּשׁ (hallowed) — holiness is SET-APARTNESS: the day's standing bounded off from the ordinary six, Differentiate·Interpretation at figure grain",
        embedded: false, unresolved: false,
        resolution: "'אֹתוֹ' → יוֹם הַשְּׁבִיעִי, the blessed day",
        alternate: { op: "SEG", grain: "Figure", because: "readable as the cut itself rather than the boundary of meaning" },
      },
      {
        sentence: "כִּ֣י ב֤וֹ שָׁבַת֙ מִכָּל מְלַאכְתּ֔וֹ",
        subject: "אֱלֹהִים֙", relation: "שָׁבַת֙", object: "מִכָּל מְלַאכְתּ֔וֹ",
        polarity: "+", phasepost: { op: "NUL", grain: "Figure" }, clause: "reason-adjunct",
        prop: "gen:god-rested", ground: "gen-2.3.2.1", role: "declared",
        because: "the reason clause (כִּי, for-on-it-he-rested) restates the ceasing — a second row on gen:god-rested (R9's multi-row rule); the closing relative 'אֲשֶׁר בָּרָא אֱלֹהִים לַעֲשׂוֹת' is formulaic and folds (R1)",
        embedded: false, unresolved: false,
        resolution: "'בוֹ' → the seventh day; subject carries from the matrix", alternate: null,
      },
    ],
  },

  {
    specimen: "mark-1-15",
    path: "14-holy-texts/sblgnt-books/62-Mk.txt",
    gutenberg: false,
    windowStartText: "02:1:14 ",
    windowEndText: "ἐν τῷ εὐαγγελίῳ.",
    notes: "Mark 1:14-15, SBLGNT (Koine Greek; the ⸂ ⸃ and ⸀ critical sigla are the file's own bytes and stay verbatim where they fall in field strings). The proclamation window: SYN·Ground in Greek (Πεπλήρωται ὁ καιρὸς), SIG·Ground (ἤγγικεν), and the re-zero verb itself as a normative deontic (μετανοεῖτε — REC·Pattern, the usifanye precedent). The quoted proclamation's clauses row with embedded: true per the UDHR proclamation precedent; 'μετὰ τὸ παραδοθῆναι τὸν Ἰωάννην' is a presupposed temporal frame, folded (A2).",
    revisions: [],
    rows: [
      {
        sentence: "ἦλθεν ὁ Ἰησοῦς εἰς τὴν Γαλιλαίαν",
        subject: "ὁ Ἰησοῦς", relation: "ἦλθεν", object: "εἰς τὴν Γαλιλαίαν",
        polarity: "+", phasepost: { op: "SIG", grain: "Ground" }, clause: "main",
        prop: "mark:jesus-came-galilee", ground: "mark-1.14.1", role: "declared",
        because: "translocation (A5): came INTO Galilee — the motion lands on a territory-field, so ground grain by A5's own letter",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "κηρύσσων τὸ ⸀εὐαγγέλιον τοῦ θεοῦ",
        subject: "ὁ Ἰησοῦς", relation: "κηρύσσων", object: "τὸ ⸀εὐαγγέλιον τοῦ θεοῦ",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "participial-adjunct",
        prop: "mark:proclaiming-gospel", ground: "mark-1.14.1.1", role: "declared",
        because: "κηρύσσων (heralding) — the gospel-sign publicly emitted: Relate·Existence at figure grain; the participle shares the matrix subject",
        embedded: false, unresolved: false,
        resolution: "the participle agrees with ὁ Ἰησοῦς",
        alternate: { op: "DEF", grain: "Figure", because: "proclamation readable as the bounded public act of definition, the assembly-proclaims family" },
      },
      {
        sentence: "Πεπλήρωται ὁ καιρὸς",
        subject: "ὁ καιρὸς", relation: "Πεπλήρωται", object: null,
        polarity: "+", phasepost: { op: "SYN", grain: "Ground" }, clause: "complement",
        prop: "mark:time-fulfilled", ground: "mark-1.15.1", role: "declared",
        because: "Πεπλήρωται (has been FULFILLED, perfect passive) — the season brought to completed fullness as one closed whole: Generate·Structure at GROUND grain (the καιρός is a whole time-field, not an event); quoted proclamation, rowed with embedded per the UDHR proclamation precedent — the frame is the λέγων ὅτι of the matrix",
        embedded: true, unresolved: false, resolution: null,
        alternate: { op: "INS", grain: "Ground", because: "readable as the era's arrival rather than its closure into wholeness" },
      },
      {
        sentence: "ἤγγικεν ἡ βασιλεία τοῦ θεοῦ",
        subject: "ἡ βασιλεία τοῦ θεοῦ", relation: "ἤγγικεν", object: null,
        polarity: "+", phasepost: { op: "SIG", grain: "Ground" }, clause: "complement",
        prop: "mark:kingdom-near", ground: "mark-1.15.2", role: "declared",
        because: "ἤγγικεν (has drawn near) — translocation (A5) of a whole reign-field toward the present: ground grain; quoted, embedded as above",
        embedded: true, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "μετανοεῖτε",
        subject: "the hearers", relation: "μετανοεῖτε", object: null,
        polarity: "+", phasepost: { op: "REC", grain: "Pattern" }, clause: "complement",
        prop: "mark:repent", ground: "mark-1.15.3", role: "declared",
        because: "the re-zero verb ITSELF, as a plural normative imperative: μετάνοια is the re-grounding of one's whole mind — Generate·Interpretation, and PATTERN grain because the norm ranges over the hearers as a kind (the Swahili usifanye precedent: a normative deontic over a kind asserts and rows; a situational directive would fold)",
        embedded: true, unresolved: false,
        resolution: "the imperative's 2pl subject is the proclamation's generic audience",
        alternate: { op: "REC", grain: "Ground", because: "each act commanded lands on one hearer's whole interpretive ground — the distributive reading" },
      },
      {
        sentence: "πιστεύετε ἐν τῷ εὐαγγελίῳ",
        subject: "the hearers", relation: "πιστεύετε", object: "ἐν τῷ εὐαγγελίῳ",
        polarity: "+", phasepost: { op: "EVA", grain: "Pattern" }, clause: "complement",
        prop: "mark:believe-gospel", ground: "mark-1.15.4", role: "declared",
        because: "believing is a content held by a holder — the keep-in-mind/faith family: Relate·Interpretation, pattern grain over the hearers-kind; normative imperative as above",
        embedded: true, unresolved: false,
        resolution: "coordinated imperative shares the generic audience", alternate: null,
      },
    ],
  },

  {
    specimen: "mark-16-6",
    path: "14-holy-texts/sblgnt-books/62-Mk.txt",
    gutenberg: false,
    windowStartText: "02:16:6 ",
    windowEndText: "ὅπου ἔθηκαν αὐτόν·",
    notes: "Mark 16:6, the empty tomb: NUL·Figure in Greek (οὐκ ἔστιν ὧδε — one identified figure's absence-here as the asserted act, A4 at figure grain) beside the raising (ἠγέρθη, INS·Figure). Μὴ ἐκθαμβεῖσθε and ἴδε are situational directives and fold per R11's assertion wall (disclosed); τὸν ἐσταυρωμένον is a participial epithet whose content is presupposed-referential, folded (R1).",
    revisions: [],
    rows: [
      {
        sentence: "ὁ δὲ λέγει αὐταῖς",
        subject: "ὁ δὲ", relation: "λέγει", object: "αὐταῖς",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "main",
        prop: "mark:angel-says", ground: "mark-16.6.1", role: "declared",
        because: "the say-act: speech emitted to the women — Relate·Existence at figure grain; the quoted content's assertions row below with embedded",
        embedded: false, unresolved: false,
        resolution: "'ὁ δὲ' → the young man in the white robe of verse 5", alternate: null,
      },
      {
        sentence: "Ἰησοῦν ζητεῖτε τὸν Ναζαρηνὸν τὸν ἐσταυρωμένον",
        subject: "αὐταῖς", relation: "ζητεῖτε", object: "Ἰησοῦν τὸν Ναζαρηνὸν τὸν ἐσταυρωμένον",
        polarity: "+", phasepost: { op: "EVA", grain: "Figure" }, clause: "complement",
        prop: "mark:you-seek-jesus", ground: "mark-16.6.2", role: "declared",
        because: "ζητεῖτε (you seek) — the sought one held as the aim of a search: Relate·Interpretation at figure grain, the directed-holding family; indicative description of the women's own act, quoted (embedded); the epithet 'τὸν ἐσταυρωμένον' is presupposed-referential and folds (R1)",
        embedded: true, unresolved: false,
        resolution: "the 2pl subject → the women addressed (αὐταῖς)",
        alternate: { op: "SIG", grain: "Figure", because: "seeking readable as reaching-toward, the A5 family" },
      },
      {
        sentence: "ἠγέρθη",
        subject: "Ἰησοῦν", relation: "ἠγέρθη", object: null,
        polarity: "+", phasepost: { op: "INS", grain: "Figure" }, clause: "complement",
        prop: "mark:he-was-raised", ground: "mark-16.6.3", role: "declared",
        because: "ἠγέρθη (was raised) — one identified figure brought up into standing being: Generate·Existence at figure grain; quoted (embedded)",
        embedded: true, unresolved: false,
        resolution: "the aorist passive's subject → Ἰησοῦν, the one just named",
        alternate: { op: "SIG", grain: "Figure", because: "readable as the rising motion itself, A5" },
      },
      {
        sentence: "οὐκ ἔστιν ὧδε",
        subject: "Ἰησοῦν", relation: "οὐκ ἔστιν", object: "ὧδε",
        polarity: "+", phasepost: { op: "NUL", grain: "Figure" }, clause: "complement",
        prop: "mark:not-here", ground: "mark-16.6.4", role: "declared",
        because: "οὐκ ἔστιν ὧδε (he is not here) — ONE identified figure's absence-at-this-place as the asserted act: A4's rule at FIGURE grain, polarity + (the absence IS the act); quoted (embedded)",
        embedded: true, unresolved: false,
        resolution: "the null subject → Ἰησοῦν",
        alternate: { op: "SIG", grain: "Figure", because: "the sibling construction: presence-here negated, polarity − — the same mirror the UDHR's negative existentials carry" },
      },
      {
        sentence: "ὅπου ἔθηκαν αὐτόν",
        subject: "the buriers", relation: "ἔθηκαν", object: "αὐτόν",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "restrictive-relative",
        prop: "mark:where-laid", ground: "mark-16.6.5", role: "declared",
        because: "ἔθηκαν (they laid) — placement of one figure at a spot: the A5 landing family, Relate·Existence at figure grain; the relative restricts ὁ τόπος (the ἴδε directive folds per R11)",
        embedded: true, unresolved: false,
        resolution: "the 3pl subject is the unnamed buriers; 'αὐτόν' → Ἰησοῦν", alternate: null,
      },
    ],
  },

  {
    specimen: "quran-2-37",
    path: "14-holy-texts/tanzil-quran/quran_quran-uthmani.txt",
    gutenberg: false,
    windowStartText: "فَتَلَقَّىٰٓ ءَادَمُ",
    windowEndText: "ٱلتَّوَّابُ ٱلرَّحِيمُ",
    notes: "Quran 2:37 (Uthmani text): the tawba — REC·Figure in Arabic (فَتَابَ عَلَيْهِ, He turned/relented toward him: one identified relational standing re-grounded), with the receiving of the words (EVA·Figure) and the rule-3 identificational epithet sentence (إِنَّهُۥ هُوَ ٱلتَّوَّابُ).",
    revisions: [],
    rows: [
      {
        sentence: "فَتَلَقَّىٰٓ ءَادَمُ مِن رَّبِّهِۦ كَلِمَٰتٍۢ",
        subject: "ءَادَمُ", relation: "فَتَلَقَّىٰٓ", object: "مِن رَّبِّهِۦ كَلِمَٰتٍۢ",
        polarity: "+", phasepost: { op: "EVA", grain: "Figure" }, clause: "main",
        prop: "quran:adam-received-words", ground: "quran-2.37.1", role: "declared",
        because: "تَلَقَّىٰ (received) — words taken into a holder's keeping: content held, Relate·Interpretation at figure grain (the keep-in-mind family's entry act)",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "CON", grain: "Figure", because: "receiving readable as the transfer-arrangement itself" },
      },
      {
        sentence: "فَتَابَ عَلَيْهِ",
        subject: "رَّبِّهِۦ", relation: "فَتَابَ", object: "عَلَيْهِ",
        polarity: "+", phasepost: { op: "REC", grain: "Figure" }, clause: "coordinate",
        prop: "quran:god-relented", ground: "quran-2.37.2", role: "declared",
        because: "تَابَ عَلَيْهِ — the tawba, the TURNING itself: one identified relational standing re-grounded (wrath conceded, mercy begun) — the re-zero on a single bond, Generate·Interpretation at figure grain",
        embedded: false, unresolved: false,
        resolution: "the verb's subject → رَبِّهِ (his Lord); 'عَلَيْهِ' → ءَادَمُ",
        alternate: { op: "EVA", grain: "Figure", because: "readable as mercy held toward him rather than the turning act" },
      },
      {
        sentence: "إِنَّهُۥ هُوَ ٱلتَّوَّابُ ٱلرَّحِيمُ",
        subject: "إِنَّهُۥ", relation: "هُوَ", object: "ٱلتَّوَّابُ ٱلرَّحِيمُ",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "main",
        prop: "quran:he-is-relenting", ground: "quran-2.37.3", role: "declared",
        because: "copula rule 3 — the pronoun copula هُوَ + definite unique epithets (THE Oft-Relenting, THE Merciful): the identificational shape, the Arabic هي precedent",
        embedded: false, unresolved: false,
        resolution: "'إِنَّهُ' → the Lord of the previous clause", alternate: null,
      },
    ],
  },

  {
    specimen: "quran-2-37-en",
    path: "14-holy-texts/tanzil-quran/quran_en_pickthall.txt",
    gutenberg: false,
    windowStartText: "Then Adam received from his Lord words",
    windowEndText: "the relenting, the Merciful.",
    notes: "Quran 2:37 in Pickthall's English — the same three propositions as the Arabic specimen, sharing its quran: prop keys: the cross-language join now spans a fourth document family. Pickthall's 'relented toward him' words the tawba exactly as the re-zero.",
    revisions: [],
    rows: [
      {
        sentence: "Then Adam received from his Lord words (of revelation)",
        subject: "Adam", relation: "received", object: "from his Lord words (of revelation)",
        polarity: "+", phasepost: { op: "EVA", grain: "Figure" }, clause: "main",
        prop: "quran:adam-received-words", ground: "quran-2.37.1", role: "declared",
        because: "the receiving of words into a holder's keeping — content held, Relate·Interpretation at figure grain, matching the Arabic row's تَلَقَّىٰ",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "CON", grain: "Figure", because: "receiving readable as the transfer-arrangement itself" },
      },
      {
        sentence: "and He relented toward him",
        subject: "his Lord", relation: "relented toward", object: "him",
        polarity: "+", phasepost: { op: "REC", grain: "Figure" }, clause: "coordinate",
        prop: "quran:god-relented", ground: "quran-2.37.2", role: "declared",
        because: "'relented toward him' — the standing re-grounded: wrath conceded, mercy begun, the re-zero on one bond — Generate·Interpretation at figure grain; Pickthall's verb choice renders the tawba as exactly this act",
        embedded: false, unresolved: false,
        resolution: "'He' → his Lord; 'him' → Adam",
        alternate: { op: "EVA", grain: "Figure", because: "readable as mercy held toward him" },
      },
      {
        sentence: "Lo! He is the relenting, the Merciful.",
        subject: "He", relation: "is", object: "the relenting, the Merciful",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "main",
        prop: "quran:he-is-relenting", ground: "quran-2.37.3", role: "declared",
        because: "copula rule 3 — definite unique epithets (THE relenting, THE Merciful): identificational",
        embedded: false, unresolved: false,
        resolution: "'He' → the Lord of the previous clause", alternate: null,
      },
    ],
  },

  {
    specimen: "lear-division",
    path: "01-literature-books/gutenberg/pg100_Complete_Works_of_Shakespeare.txt",
    gutenberg: true,
    windowStartText: "Meantime we shall express our darker purpose.",
    windowEndText: "Where nature doth with merit challenge.",
    notes: "King Lear 1.1, the abdication speech (pg100 — the corpus's folger-shakespeare/ directory is mislabeled throughout; see the suite header). SEG·Ground twice: the kingdom divided and the rule divested. Situational directives ('Give me the map there', 'Tell me, my daughters') and the interrogative ('Which of you shall we say doth love us most?') perform rather than assert and FOLD per R11's assertion wall — each disclosed here; the divest parenthetical and the two purpose clauses around them do assert and row.",
    revisions: [],
    rows: [
      {
        sentence: "Meantime we shall express our darker purpose.",
        subject: "we", relation: "shall express", object: "our darker purpose",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "main",
        prop: "lear:express-purpose", ground: "lear-1-1.1.1", role: "declared",
        because: "expressing MAKES the purpose present as a sign — Relate·Existence on one identified (as-yet-dark) purpose",
        embedded: false, unresolved: false,
        resolution: "royal 'we' → Lear, the speaker", alternate: null,
      },
      {
        sentence: "Know that we have divided\nIn three our kingdom:",
        subject: "we", relation: "have divided", object: "In three our kingdom",
        polarity: "+", phasepost: { op: "SEG", grain: "Ground" }, clause: "complement",
        prop: "lear:divided-kingdom", ground: "lear-1-1.1.2", role: "declared",
        because: "dividing the kingdom CUTS a whole standing territory-field into three — Differentiate·Structure at GROUND grain; 'Know that' is a presentative frame marking its complement as asserted (noted, A3's family)",
        embedded: false, unresolved: false,
        resolution: "royal 'we' → Lear", alternate: null,
      },
      {
        sentence: "’tis our fast intent\nTo shake all cares and business from our age",
        subject: "To shake all cares and business from our age", relation: "’tis", object: "our fast intent",
        polarity: "+", phasepost: { op: "DEF", grain: "Figure" }, clause: "main",
        prop: "lear:fast-intent", ground: "lear-1-1.1.3", role: "declared",
        because: "an intent held — forming/holding a resolution bounds a course of action, cutting off the others: the progress-determined family, Differentiate·Interpretation at figure grain; the shaking-content stays inside the intent (A1)",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "SIG", grain: "Figure", because: "copula rule 3's identificational reading of 'our fast intent'" },
      },
      {
        sentence: "Conferring them on younger strengths",
        subject: "we", relation: "Conferring", object: "them on younger strengths",
        polarity: "+", phasepost: { op: "CON", grain: "Figure" }, clause: "participial-adjunct",
        prop: "lear:conferring-cares", ground: "lear-1-1.1.3.1", role: "declared",
        because: "conferring BESTOWS the cares into new holders' keeping — a holding-arrangement made between relata: Relate·Structure at figure grain",
        embedded: false, unresolved: false,
        resolution: "the participle shares royal 'we'; 'them' → all cares and business",
        alternate: { op: "INS", grain: "Figure", because: "the transfer readable as bringing the new charge into being" },
      },
      {
        sentence: "while we\nUnburden’d crawl toward death.",
        subject: "we", relation: "crawl toward", object: "death",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "temporal-adjunct",
        prop: "lear:crawl-toward-death", ground: "lear-1-1.1.3.2", role: "declared",
        because: "translocation (A5): the motion lands on a target — figure grain; 'Unburden’d' is a participial property, folded (R1); a finite temporal clause that asserts, hence the new temporal-adjunct role rather than an A2 fold",
        embedded: false, unresolved: false,
        resolution: "royal 'we' → Lear", alternate: null,
      },
      {
        sentence: "We have this hour a constant will to publish\nOur daughters’ several dowers",
        subject: "We", relation: "have", object: "this hour a constant will to publish Our daughters’ several dowers",
        polarity: "+", phasepost: { op: "DEF", grain: "Figure" }, clause: "main",
        prop: "lear:constant-will", ground: "lear-1-1.1.4", role: "declared",
        because: "a will held — the resolve-holding family again (see lear:fast-intent); the publishing stays inside the will (A1); the vocatives ('Our son of Cornwall, And you…') are address, folded (A2)",
        embedded: false, unresolved: false,
        resolution: "royal 'We' → Lear", alternate: null,
      },
      {
        sentence: "that future strife\nMay be prevented now.",
        subject: "future strife", relation: "May be prevented", object: null,
        polarity: "+", phasepost: { op: "NUL", grain: "Figure" }, clause: "purpose-adjunct",
        prop: "lear:strife-prevented", ground: "lear-1-1.1.4.1", role: "declared",
        because: "preventing BRINGS AN ABSENCE ABOUT — the anticipated strife kept from ever being: A4's family (the absence as the act's product), one prospective conflict, figure grain; polarity + (the preventing is asserted, the strife is its content)",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "SEG", grain: "Figure", because: "prevention readable as cutting the path to the event" },
      },
      {
        sentence: "Long in our court have made their amorous sojourn",
        subject: "The princes, France and Burgundy", relation: "have made their amorous sojourn",
        object: "Long in our court",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "main",
        prop: "lear:princes-sojourn", ground: "lear-1-1.1.5", role: "declared",
        because: "'made their sojourn' — a light-verb dwelling: presence held at the court, the A5 landing family, figure grain; the appositive 'Great rivals in our youngest daughter’s love' is presupposed and folds (A2)",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "And here are to be answer’d.",
        subject: "The princes, France and Burgundy", relation: "are to be answer’d", object: null,
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "coordinate",
        prop: "lear:princes-answered", ground: "lear-1-1.1.6", role: "declared",
        because: "answering returns the awaited sign — Relate·Existence at figure grain; deontic 'are to' noted (A3)",
        embedded: false, unresolved: false,
        resolution: "coordinated predicate shares 'The princes, France and Burgundy'", alternate: null,
      },
      {
        sentence: "Since now we will divest us both of rule,\nInterest of territory, cares of state,—",
        subject: "we", relation: "will divest us both of",
        object: "rule, Interest of territory, cares of state",
        polarity: "+", phasepost: { op: "SEG", grain: "Ground" }, clause: "reason-adjunct",
        prop: "lear:divest-rule", ground: "lear-1-1.1.7", role: "declared",
        because: "divest (de-vestire, un-clothe) STRIPS AWAY what is worn — the whole sovereign ground (rule, territory, cares) severed from its holder: Differentiate·Structure at GROUND grain. A dash-set causal parenthetical that ASSERTS (since = because), so it rows with embedded (the es dotados precedent) though its matrix — 'Tell me, my daughters' + the love-question — is a folded directive and interrogative (R11's wall, disclosed)",
        embedded: true, unresolved: false,
        resolution: "royal 'we' → Lear (with the crown's two bodies — 'us both' — noted)",
        alternate: { op: "REC", grain: "Ground", because: "the abdication readable as the re-zero: the reign's ground conceded, an unburdened ground begun — the speech's own arc" },
      },
      {
        sentence: "That we our largest bounty may extend\nWhere nature doth with merit challenge.",
        subject: "we", relation: "may extend", object: "our largest bounty",
        polarity: "+", phasepost: { op: "CON", grain: "Figure" }, clause: "purpose-adjunct",
        prop: "lear:extend-bounty", ground: "lear-1-1.1.8", role: "declared",
        because: "extending bounty BESTOWS it where merit challenges — the conferring family (see lear:conferring-cares): Relate·Structure at figure grain; the free relative 'Where nature doth with merit challenge' is the criterion argument, folded (R1); modality noted (A3)",
        embedded: false, unresolved: false,
        resolution: "royal 'we' → Lear",
        alternate: { op: "INS", grain: "Figure", because: "the grant readable as brought forth" },
      },
    ],
  },

  {
    specimen: "lear-disclaim",
    path: "01-literature-books/gutenberg/pg100_Complete_Works_of_Shakespeare.txt",
    gutenberg: true,
    windowStartText: "Let it be so, thy truth then be thy dower:",
    windowEndText: "As thou my sometime daughter.",
    notes: "King Lear 1.1, the disclaiming of Cordelia: REC·Figure ('Here I disclaim all my paternal care' — a held bond formally recanted, the exact contrast faith-reaffirmed's because draws), with the oath's own cosmology (we exist and cease to be — SIG and NUL at pattern grain) asserted inside it.",
    revisions: [],
    rows: [
      {
        sentence: "Let it be so, thy truth then be thy dower:",
        subject: "thy truth", relation: "be", object: "thy dower",
        polarity: "+", phasepost: { op: "DEF", grain: "Figure" }, clause: "main",
        prop: "lear:truth-dower", ground: "lear-1-1.1.1", role: "declared",
        because: "a performative jussive assignment — her truth DECREED to be her (only) dowry: a bounded standing assigned to one person, the proclaims-as family, Differentiate·Interpretation at figure grain (a main-line jussive is the assertion itself, R11's deontic rule)",
        embedded: false, unresolved: false,
        resolution: "'thy' → Cordelia, the addressed daughter",
        alternate: { op: "SIG", grain: "Figure", because: "readable as the identificational copula alone" },
      },
      {
        sentence: "From whom we do exist",
        subject: "we", relation: "do exist", object: "From whom",
        polarity: "+", phasepost: { op: "SIG", grain: "Pattern" }, clause: "relative",
        prop: "lear:exist-from-orbs", ground: "lear-1-1.1.2.1", role: "declared",
        because: "existence held from the orbs' operation — presence as a lawlike condition of the kind (mortals): Relate·Existence at pattern grain; the oath-invocation PPs ('by the sacred radiance of the sun…') are the swearing-frame, folded (A2), but this relative asserts indicative cosmology and rows",
        embedded: false, unresolved: false,
        resolution: "'whom' → the orbs of the invocation; 'we' → mortals generally",
        alternate: { op: "INS", grain: "Pattern", because: "readable as derivation — being brought forth from them" },
      },
      {
        sentence: "and cease to be",
        subject: "we", relation: "cease to be", object: null,
        polarity: "+", phasepost: { op: "NUL", grain: "Pattern" }, clause: "relative",
        prop: "lear:cease-to-be", ground: "lear-1-1.1.2.2", role: "declared",
        because: "ceasing-to-be — the absence coming about as a law of the kind: A4's family at pattern grain, polarity + (the ceasing IS the act)",
        embedded: false, unresolved: false,
        resolution: "coordinated relative predicate shares 'we' → mortals generally", alternate: null,
      },
      {
        sentence: "Here I disclaim all my paternal care,\nPropinquity and property of blood,",
        subject: "I", relation: "disclaim", object: "all my paternal care, Propinquity and property of blood",
        polarity: "+", phasepost: { op: "REC", grain: "Figure" }, clause: "main",
        prop: "lear:disclaim-care", ground: "lear-1-1.1.2", role: "declared",
        because: "disclaiming formally RECANTS one's own established holding — the held bond with one person conceded, a prior ground given up: the re-zero on a single standing, Generate·Interpretation at figure grain. The exact contrast the UDHR's faith-reaffirmed row draws: reaffirmation concedes nothing, disclaiming concedes everything; 'Here' marks the performative",
        embedded: false, unresolved: false,
        resolution: "'I' → Lear; the care/propinquity/blood are his standing toward Cordelia",
        alternate: { op: "SEG", grain: "Figure", because: "readable as the tie severed rather than the standing recanted" },
      },
      {
        sentence: "And as a stranger to my heart and me\nHold thee from this for ever.",
        subject: "I", relation: "Hold thee from", object: "this for ever",
        polarity: "+", phasepost: { op: "CON", grain: "Figure" }, clause: "coordinate",
        prop: "lear:hold-from-heart", ground: "lear-1-1.1.3", role: "declared",
        because: "holding-from institutes a standing DISTANCE-arrangement — estrangement as a maintained relation: Relate·Structure at figure grain; 'as a stranger to my heart and me' is a manner adjunct (A2)",
        embedded: false, unresolved: false,
        resolution: "coordinated predicate shares 'I' → Lear; 'thee' → Cordelia",
        alternate: { op: "SEG", grain: "Figure", because: "readable as the severing itself" },
      },
      {
        sentence: "shall to my bosom\nBe as well neighbour’d, pitied, and reliev’d,\nAs thou my sometime daughter.",
        subject: "The barbarous Scythian", relation: "Be as well neighbour’d, pitied, and reliev’d",
        object: "As thou my sometime daughter",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "main",
        prop: "lear:scythian-as-daughter", ground: "lear-1-1.1.4", role: "declared",
        because: "copula + comparative standing: the cannibal's nearness to his bosom DECLARED equal to hers — a condition held, stated as comparison: Relate·Existence at figure grain; 'my sometime daughter' (former daughter) carries the disclaiming forward, noted",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "Or he that makes his generation messes\nTo gorge his appetite",
        subject: "he", relation: "makes", object: "his generation messes",
        polarity: "+", phasepost: { op: "INS", grain: "Pattern" }, clause: "restrictive-relative",
        prop: "lear:cannibal-makes-messes", ground: "lear-1-1.1.4.1", role: "declared",
        because: "makes-his-offspring-INTO-meals — the making-into causative, the same family as the UDHR's zh/sw enslavement verbs (使为 / asifanywe): Generate·Existence, pattern grain for the generic cannibal-kind; 'To gorge his appetite' is a purpose adjunct (A2)",
        embedded: false, unresolved: false,
        resolution: "generic 'he' — the kind the relative restricts", alternate: null,
      },
    ],
  },

  {
    specimen: "lear-france",
    path: "01-literature-books/gutenberg/pg100_Complete_Works_of_Shakespeare.txt",
    gutenberg: true,
    windowStartText: "Thou hast her, France: let her be thine; for we",
    windowEndText: "Without our grace, our love, our benison.",
    notes: "King Lear 1.1, the casting-off: NUL·Figure in English ('we Have no such daughter' — A4's negative possession of ONE identified person, the exact mirror of the UDHR's negative existentials) beside the grant and the forsworn seeing. 'Therefore be gone' is a situational directive and folds (R11, disclosed).",
    revisions: [],
    rows: [
      {
        sentence: "Thou hast her, France:",
        subject: "Thou", relation: "hast", object: "her",
        polarity: "+", phasepost: { op: "CON", grain: "Figure" }, clause: "main",
        prop: "lear:france-has-her", ground: "lear-1-1.1.1", role: "declared",
        because: "having-her — a holding between two identified persons: Relate·Structure at figure grain",
        embedded: false, unresolved: false,
        resolution: "'Thou' → France, the addressed king; 'her' → Cordelia", alternate: null,
      },
      {
        sentence: "let her be thine;",
        subject: "her", relation: "let her be", object: "thine",
        polarity: "+", phasepost: { op: "CON", grain: "Figure" }, clause: "coordinate",
        prop: "lear:let-her-be-thine", ground: "lear-1-1.1.2", role: "declared",
        because: "a performative GRANT — the holding assigned by jussive (a main-line jussive is the assertion, R11): the conferring family, Relate·Structure at figure grain",
        embedded: false, unresolved: false,
        resolution: "'her' → Cordelia; 'thine' → France's",
        alternate: { op: "INS", grain: "Figure", because: "the grant readable as brought into being" },
      },
      {
        sentence: "for we\nHave no such daughter,",
        subject: "we", relation: "Have no", object: "such daughter",
        polarity: "+", phasepost: { op: "NUL", grain: "Figure" }, clause: "reason-adjunct",
        prop: "lear:no-such-daughter", ground: "lear-1-1.1.2.1", role: "declared",
        because: "A4 at FIGURE grain: 'we have no such daughter' — the negative possession of ONE identified person, and the absence-to-him IS the asserted act (polarity +): the same construction family as the UDHR's فلن يكون هناك and Hakuna, landed on a figure instead of a kind — spoken over a daughter standing before him, which is what makes it an act and not a report",
        embedded: false, unresolved: false,
        resolution: "royal 'we' → Lear; 'such daughter' → Cordelia, disclaimed",
        alternate: { op: "CON", grain: "Figure", because: "the sibling construction: the kinship-holding negated, polarity − — mirror-disclosed both ways as the UDHR pattern requires" },
      },
      {
        sentence: "nor shall ever see\nThat face of hers again.",
        subject: "we", relation: "shall ever see", object: "That face of hers",
        polarity: "-", phasepost: { op: "EVA", grain: "Figure" }, clause: "coordinate",
        prop: "lear:never-see-face", ground: "lear-1-1.1.2.2", role: "declared",
        because: "seeing is content taken into a holder's view — the perception family (Relate·Interpretation, with gen:saw-light-good) at figure grain, negated ('nor…ever'): polarity − per R6",
        embedded: false, unresolved: false,
        resolution: "coordinated predicate shares royal 'we' → Lear; 'hers' → Cordelia",
        alternate: { op: "SIG", grain: "Figure", because: "seeing readable as presence-to-the-eye" },
      },
    ],
  },

  {
    specimen: "tempest-abjure",
    path: "01-literature-books/gutenberg/pg100_Complete_Works_of_Shakespeare.txt",
    gutenberg: true,
    windowStartText: "Ye elves of hills, brooks, standing lakes, and",
    windowEndText: "I’ll drown my book.",
    notes: "The Tempest 5.1, Prospero's abjuration (pg100 — the corpus's folger set holds no Tempest at all; see the suite header): REC·Ground ('this rough magic I here abjure' — a whole practice-field conceded), SEG·Figure ('I'll break my staff', 'rifted Jove's stout oak'), NUL·Figure ('I'll drown my book'), and the surveyed deeds that the abjuring closes. The vocative invocation's elves are addressed, not asserted (folded), but their relatives assert habitual acts and row; 'Weak masters though ye be' is a concessive parenthetical, folded (A2); '—which even now I do—' re-asserts the requiring it interrupts and is folded into that row's note.",
    revisions: [],
    rows: [
      {
        sentence: "Do chase the ebbing Neptune, and do fly him",
        subject: "ye that on the sands with printless foot", relation: "Do chase the ebbing Neptune, and do fly him",
        object: "When he comes back",
        polarity: "+", phasepost: { op: "SIG", grain: "Pattern" }, clause: "restrictive-relative",
        prop: "tempest:elves-chase-neptune", ground: "tempest-5-1.1.1", role: "declared",
        because: "chase-and-flee — habitual translocation of the elf-kind (A5, pattern grain), the paired verbs kept as one serial row (the Swahili precedent); 'When he comes back' is the temporal boundary of the fleeing, kept in the object slot",
        embedded: false, unresolved: false,
        resolution: "the relative restricts the invoked 'ye' — the shore-elves as a kind", alternate: null,
      },
      {
        sentence: "By moonshine do the green sour ringlets make,",
        subject: "you demi-puppets that", relation: "do the green sour ringlets make", object: null,
        polarity: "+", phasepost: { op: "INS", grain: "Pattern" }, clause: "restrictive-relative",
        prop: "tempest:puppets-make-ringlets", ground: "tempest-5-1.1.2", role: "declared",
        because: "making the fairy-rings — a habitual bringing-forth by the kind: Generate·Existence at pattern grain; 'By moonshine' is an adjunct (A2)",
        embedded: false, unresolved: false,
        resolution: "the relative restricts the invoked demi-puppets", alternate: null,
      },
      {
        sentence: "Whereof the ewe not bites;",
        subject: "the ewe", relation: "not bites", object: "Whereof",
        polarity: "-", phasepost: { op: "CON", grain: "Pattern" }, clause: "restrictive-relative",
        prop: "tempest:ewe-not-bites", ground: "tempest-5-1.1.2.1", role: "declared",
        because: "biting is consuming CONTACT with the rings — the ewe stands off from them: Relate·Structure at pattern grain (habitual), negated: polarity − per R6",
        embedded: false, unresolved: false,
        resolution: "'Whereof' → the green sour ringlets, the head the relative restricts",
        alternate: { op: "SIG", grain: "Pattern", because: "the abstention readable as a plain condition of the kind" },
      },
      {
        sentence: "Is to make midnight mushrooms,",
        subject: "you whose pastime", relation: "Is", object: "to make midnight mushrooms",
        polarity: "+", phasepost: { op: "SIG", grain: "Pattern" }, clause: "relative",
        prop: "tempest:pastime-mushrooms", ground: "tempest-5-1.1.3", role: "declared",
        because: "copula: the kind's pastime identified with the mushroom-making — a property of the kind (rule 3/4's shape), Relate·Existence at pattern grain; the making stays inside the identified pastime (A1)",
        embedded: false, unresolved: false, resolution: null, alternate: null,
      },
      {
        sentence: "that rejoice\nTo hear the solemn curfew;",
        subject: "you whose pastime", relation: "rejoice", object: "To hear the solemn curfew",
        polarity: "+", phasepost: { op: "EVA", grain: "Pattern" }, clause: "restrictive-relative",
        prop: "tempest:rejoice-curfew", ground: "tempest-5-1.1.3.1", role: "declared",
        because: "rejoicing — a delight held toward a content: Relate·Interpretation at pattern grain (habitual); the hearing stays inside the delighted-in content (A1)",
        embedded: false, unresolved: false,
        resolution: "coordinated relative shares the mushroom-makers", alternate: null,
      },
      {
        sentence: "I have bedimm’d\nThe noontide sun,",
        subject: "I", relation: "have bedimm’d", object: "The noontide sun",
        polarity: "+", phasepost: { op: "SEG", grain: "Figure" }, clause: "main",
        prop: "tempest:bedimmed-sun", ground: "tempest-5-1.1.4", role: "declared",
        because: "bedimming CUTS DOWN the sun's standing radiance — one identified figure's output diminished: Differentiate·Structure at figure grain; 'by whose aid' credits the invoked helpers (adjunct, A2), and 'Weak masters though ye be' is a concessive parenthetical, folded (A2)",
        embedded: false, unresolved: false,
        resolution: "'I' → Prospero, the speaker",
        alternate: { op: "DEF", grain: "Figure", because: "the dimming readable as marring the sun's manifest standing" },
      },
      {
        sentence: "call’d forth the mutinous winds,",
        subject: "I", relation: "call’d forth", object: "the mutinous winds",
        polarity: "+", phasepost: { op: "INS", grain: "Figure" }, clause: "coordinate",
        prop: "tempest:called-winds", ground: "tempest-5-1.1.5", role: "declared",
        because: "calling-FORTH summons into presence — the winds brought out into being-at-hand: Generate·Existence at figure grain",
        embedded: false, unresolved: false,
        resolution: "coordinated predicate shares 'I' → Prospero", alternate: null,
      },
      {
        sentence: "Set roaring war:",
        subject: "I", relation: "Set", object: "roaring war",
        polarity: "+", phasepost: { op: "INS", grain: "Figure" }, clause: "coordinate",
        prop: "tempest:set-war", ground: "tempest-5-1.1.6", role: "declared",
        because: "setting war roaring between sea and sky — the strife brought into being and set going: Generate·Existence at figure grain; '’twixt the green sea and the azur’d vault' is a locative adjunct (A2)",
        embedded: false, unresolved: false,
        resolution: "coordinated predicate shares 'I' → Prospero",
        alternate: { op: "CON", grain: "Figure", because: "readable as the two fields set against each other — an arrangement" },
      },
      {
        sentence: "Have I given fire, and rifted Jove’s stout oak",
        subject: "I", relation: "Have I given", object: "fire",
        polarity: "+", phasepost: { op: "CON", grain: "Figure" }, clause: "coordinate",
        prop: "tempest:gave-fire-thunder", ground: "tempest-5-1.1.7", role: "declared",
        because: "giving fire TO the thunder — bestowal into another's keeping: the conferring family, Relate·Structure at figure grain; 'to the dread rattling thunder' fronts the recipient",
        embedded: false, unresolved: false,
        resolution: "'I' → Prospero",
        alternate: { op: "INS", grain: "Figure", because: "the arming readable as brought forth" },
      },
      {
        sentence: "rifted Jove’s stout oak\nWith his own bolt;",
        subject: "I", relation: "rifted", object: "Jove’s stout oak With his own bolt",
        polarity: "+", phasepost: { op: "SEG", grain: "Figure" }, clause: "coordinate",
        prop: "tempest:rifted-oak", ground: "tempest-5-1.1.8", role: "declared",
        because: "rifting SPLITS one identified thing — Differentiate·Structure at figure grain, the cut itself",
        embedded: false, unresolved: false,
        resolution: "coordinated predicate shares 'I' → Prospero", alternate: null,
      },
      {
        sentence: "the strong-bas’d promontory\nHave I made shake,",
        subject: "I", relation: "Have I made shake", object: "the strong-bas’d promontory",
        polarity: "+", phasepost: { op: "INS", grain: "Figure" }, clause: "coordinate",
        prop: "tempest:shook-promontory", ground: "tempest-5-1.1.9", role: "declared",
        because: "made-shake — the shaking generated in one landform, the causative making-family: Generate·Existence at figure grain",
        embedded: false, unresolved: false,
        resolution: "'I' → Prospero", alternate: null,
      },
      {
        sentence: "and by the spurs pluck’d up\nThe pine and cedar:",
        subject: "I", relation: "pluck’d up", object: "The pine and cedar",
        polarity: "+", phasepost: { op: "SEG", grain: "Figure" }, clause: "coordinate",
        prop: "tempest:plucked-trees", ground: "tempest-5-1.1.10", role: "declared",
        because: "plucking UP-BY-THE-ROOTS severs the trees from their ground — Differentiate·Structure at figure grain; 'by the spurs' names the grip (adjunct, A2)",
        embedded: false, unresolved: false,
        resolution: "coordinated predicate shares 'I' → Prospero", alternate: null,
      },
      {
        sentence: "graves at my command\nHave wak’d their sleepers, op’d, and let ’em forth",
        subject: "graves", relation: "Have wak’d their sleepers, op’d, and let ’em forth", object: "By my so potent art",
        polarity: "+", phasepost: { op: "INS", grain: "Figure" }, clause: "main",
        prop: "tempest:graves-waked-sleepers", ground: "tempest-5-1.1.11", role: "declared",
        because: "the serial (waked, oped, let forth — one row, the Swahili precedent): the sleepers ROUSED AND BROUGHT FORTH into standing presence — Generate·Existence at figure grain, the raising family (ἠγέρθη's own); 'at my command' and 'By my so potent art' are agency adjuncts (A2)",
        embedded: false, unresolved: false, resolution: null,
        alternate: { op: "SEG", grain: "Figure", because: "the oping readable as the seal cut" },
      },
      {
        sentence: "But this rough magic\nI here abjure;",
        subject: "I", relation: "abjure", object: "this rough magic",
        polarity: "+", phasepost: { op: "REC", grain: "Ground" }, clause: "main",
        prop: "tempest:abjure-magic", ground: "tempest-5-1.1.12", role: "declared",
        because: "abjuring solemnly RENOUNCES a held practice — and what is conceded here is not one act but the WHOLE OPERATIVE FIELD the speech has just surveyed (sun dimmed, winds called, oaks rifted, graves oped, all 'by my so potent art'): the re-zero on the ground of his own agency, a practice-field given up and a new ground begun — Generate·Interpretation at GROUND grain; 'here' marks the performative",
        embedded: false, unresolved: false,
        resolution: "'I' → Prospero",
        alternate: { op: "REC", grain: "Figure", because: "the deictic reading: 'this rough magic' as one named art rather than the field of practice" },
      },
      {
        sentence: "when I have requir’d\nSome heavenly music,",
        subject: "I", relation: "have requir’d", object: "Some heavenly music",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "temporal-adjunct",
        prop: "tempest:required-music", ground: "tempest-5-1.1.13.1", role: "declared",
        because: "requiring PUTS FORTH a demand-sign for the music — Relate·Existence at figure grain; the parenthetical '—which even now I do,—' re-asserts this same requiring and is folded into this row (noted); 'To work mine end upon their senses' is a purpose adjunct (A1/A2) and 'that This airy charm is for' a micro-relative (R1)",
        embedded: false, unresolved: false,
        resolution: "'I' → Prospero", alternate: null,
      },
      {
        sentence: "I’ll break my staff,",
        subject: "I", relation: "’ll break", object: "my staff",
        polarity: "+", phasepost: { op: "SEG", grain: "Figure" }, clause: "main",
        prop: "tempest:break-staff", ground: "tempest-5-1.1.13", role: "declared",
        because: "breaking SEVERS one identified instrument — Differentiate·Structure at figure grain: the cut that enacts the abjuring",
        embedded: false, unresolved: false,
        resolution: "'I' → Prospero", alternate: null,
      },
      {
        sentence: "Bury it certain fathoms in the earth,",
        subject: "I", relation: "Bury", object: "it certain fathoms in the earth",
        polarity: "+", phasepost: { op: "SIG", grain: "Figure" }, clause: "coordinate",
        prop: "tempest:bury-staff", ground: "tempest-5-1.1.14", role: "declared",
        because: "burying PLACES the broken staff into the earth — the A5 landing family, Relate·Existence at figure grain",
        embedded: false, unresolved: false,
        resolution: "coordinated predicate shares 'I' → Prospero; 'it' → my staff", alternate: null,
      },
      {
        sentence: "I’ll drown my book.",
        subject: "I", relation: "’ll drown", object: "my book",
        polarity: "+", phasepost: { op: "NUL", grain: "Figure" }, clause: "coordinate",
        prop: "tempest:drown-book", ground: "tempest-5-1.1.15", role: "declared",
        because: "drowning the book ENDS it — one identified thing made absent from the world of use, deeper than ever plummet sounded: the absence brought about as the act's own product (A4's family) at figure grain; the comparative 'deeper than did ever plummet sound' is the manner of the disposal, folded (R1)",
        embedded: false, unresolved: false,
        resolution: "'I' → Prospero",
        alternate: { op: "SIG", grain: "Figure", because: "readable as the A5 placement — sunk to a place — rather than the ending" },
      },
    ],
  },

  {
   "specimen": "mark-15-38",
   "path": "14-holy-texts/sblgnt-books/62-Mk.txt",
   "gutenberg": false,
   "windowStartText": "02:15:38 ",
   "windowEndText": "ἕως κάτω.",
   "notes": "Mark 15:38, SBLGNT: the veil of the temple torn in two — SEG·Figure in Koine Greek (one identified hanging severed into parts), closing that cell's English-only frontier. The extent phrase (top to bottom) is the cut's manner, folded (A2). Field strings derived mechanically from the file's own bytes.",
   "revisions": [],
   "rows": [
    {
     "sentence": "τὸ καταπέτασμα τοῦ ναοῦ ἐσχίσθη εἰς δύο",
     "subject": "τὸ καταπέτασμα τοῦ ναοῦ",
     "relation": "ἐσχίσθη",
     "object": "εἰς δύο",
     "polarity": "+",
     "phasepost": {
      "op": "SEG",
      "grain": "Figure"
     },
     "clause": "main",
     "prop": "mark:veil-torn",
     "ground": "mark-15.38.1",
     "role": "declared",
     "because": "ἐσχίσθη (was torn/split) — ONE identified hanging SEVERED into parts (εἰς δύο): Differentiate·Structure at figure grain, the tempest break-staff cell in Greek; ἀπ' ἄνωθεν ἕως κάτω (top to bottom) is the cut's extent, folded (A2)",
     "embedded": false,
     "unresolved": false,
     "resolution": null,
     "alternate": null
    }
   ]
  },

  {
   "specimen": "gen-6",
   "path": "14-holy-texts/wlc-tanakh/Gen.txt",
   "gutenberg": false,
   "windowStartText": "Gen.6.5 ",
   "windowEndText": "כִּ֥י נִחַ֖מְתִּי כִּ֥י עֲשִׂיתִֽם",
   "notes": "Genesis 6:5-7, WLC: the repenting of the Maker — REC·Ground in Hebrew, twice (וַיִּנָּחֶם narrated, נִחַמְתִּי in the quoted first person), closing that cell's English-only frontier; with the seeing (EVA·Ground — the ambient wickedness perceived), the grieving (EVA·Figure), the say-act, the announced blotting-out (NUL·Pattern over the kind-range, quoted content rowed per the proclamation precedent), and the creation relative (INS·Figure). A1 holds throughout: what was SEEN (the wickedness great, every inclination only evil) and what was REGRETTED (the making) stay inside their attitude verbs' objects — the gen-1 saw-that-good precedent — so the window's own contents are the acts, not the content-clauses. Field strings derived mechanically from the file's bytes.",
   "revisions": [],
   "rows": [
    {
     "sentence": "וַיַּ֣רְא יְהוָ֔ה כִּ֥י רַבָּ֛ה רָעַ֥ת הָאָדָ֖ם בָּאָ֑רֶץ",
     "subject": "יְהוָ֔ה",
     "relation": "וַיַּ֣רְא",
     "object": "כִּ֥י רַבָּ֛ה רָעַ֥ת הָאָדָ֖ם בָּאָ֑רֶץ וְכָל יֵ֨צֶר֙ מַחְשְׁבֹ֣ת לִבּ֔וֹ רַ֥ק רַ֖ע כָּל הַיּֽוֹם",
     "polarity": "+",
     "phasepost": {
      "op": "EVA",
      "grain": "Ground"
     },
     "clause": "main",
     "prop": "gen:saw-wickedness-great",
     "ground": "gen-6.5.1",
     "role": "declared",
     "because": "וַיַּרְא (saw) — perception held over the AMBIENT moral condition of the earth (רבה בארץ... כל היום): Relate·Interpretation at GROUND grain; the perceived content (wickedness great; every inclination only evil continually) stays inside the object per A1, the gen-1 saw-that-good precedent",
     "embedded": false,
     "unresolved": false,
     "resolution": null,
     "alternate": {
      "op": "EVA",
      "grain": "Pattern",
      "because": "readable as taking in the RECURRENCE (every inclination, all the day) rather than the ambient state"
     }
    },
    {
     "sentence": "וַיִּנָּ֣חֶם יְהוָ֔ה כִּֽי עָשָׂ֥ה אֶת הָֽאָדָ֖ם בָּאָ֑רֶץ",
     "subject": "יְהוָ֔ה",
     "relation": "וַיִּנָּ֣חֶם",
     "object": "כִּֽי עָשָׂ֥ה אֶת הָֽאָדָ֖ם בָּאָ֑רֶץ",
     "polarity": "+",
     "phasepost": {
      "op": "REC",
      "grain": "Ground"
     },
     "clause": "main",
     "prop": "gen:god-repented-making",
     "ground": "gen-6.6.1",
     "role": "declared",
     "because": "וַיִּנָּחֶם (repented/relented) — the RE-ZERO itself at ground grain: the maker's whole interpretive stance toward the made world conceded and re-grounded (regret THAT he had made man in the earth): Generate·Interpretation at GROUND grain — the tempest-abjure cell in Hebrew; the making regretted stays inside the object per A1 (content of an attitude)",
     "embedded": false,
     "unresolved": false,
     "resolution": null,
     "alternate": {
      "op": "EVA",
      "grain": "Ground",
      "because": "readable as grief held over the whole rather than the stance re-grounded — the quran-2-37 tawba's own disclosed alternate, one grain up"
     }
    },
    {
     "sentence": "וַיִּתְעַצֵּ֖ב אֶל לִבּֽוֹ",
     "subject": "יְהוָ֔ה",
     "relation": "וַיִּתְעַצֵּ֖ב",
     "object": "אֶל לִבּֽוֹ",
     "polarity": "+",
     "phasepost": {
      "op": "EVA",
      "grain": "Figure"
     },
     "clause": "coordinate",
     "prop": "gen:grieved-to-heart",
     "ground": "gen-6.6.2",
     "role": "declared",
     "because": "וַיִּתְעַצֵּב (was grieved) — an affect held, borne inward to his own heart (אל לבו): Relate·Interpretation at figure grain",
     "embedded": false,
     "unresolved": false,
     "resolution": "the coordinated verb shares the matrix subject יְהוָה",
     "alternate": null
    },
    {
     "sentence": "וַיֹּ֣אמֶר יְהוָ֗ה",
     "subject": "יְהוָ֗ה",
     "relation": "וַיֹּ֣אמֶר",
     "object": "אֶמְחֶ֨ה אֶת הָאָדָ֤ם אֲשֶׁר בָּרָ֨אתִי֙ מֵעַל֙ פְּנֵ֣י הָֽאֲדָמָ֔ה מֵֽאָדָם֙ עַד בְּהֵמָ֔ה עַד רֶ֖מֶשׂ וְעַד ע֣וֹף הַשָּׁמָ֑יִם כִּ֥י נִחַ֖מְתִּי כִּ֥י עֲשִׂיתִֽם",
     "polarity": "+",
     "phasepost": {
      "op": "SIG",
      "grain": "Figure"
     },
     "clause": "main",
     "prop": "gen:god-said-blot",
     "ground": "gen-6.7.1",
     "role": "declared",
     "because": "the say-act (וַיֹּאמֶר): a sign emitted — Relate·Existence at figure grain, gen-1's own precedent; the quoted announcement's asserted clauses row below with embedded per the proclamation precedent",
     "embedded": false,
     "unresolved": false,
     "resolution": null,
     "alternate": null
    },
    {
     "sentence": "אֶמְחֶ֨ה אֶת הָאָדָ֤ם אֲשֶׁר בָּרָ֨אתִי֙ מֵעַל֙ פְּנֵ֣י הָֽאֲדָמָ֔ה",
     "subject": "יְהוָ֗ה",
     "relation": "אֶמְחֶ֨ה",
     "object": "אֶת הָאָדָ֤ם",
     "polarity": "+",
     "phasepost": {
      "op": "NUL",
      "grain": "Pattern"
     },
     "clause": "complement",
     "prop": "gen:blot-out-man",
     "ground": "gen-6.7.1.1",
     "role": "declared",
     "because": "אֶמְחֶה (I will blot out) — absence brought about as the act's own product (A4's family) over a KIND-RANGE (from man to beast to creeping thing to fowl — the range מֵאָדָם עַד... folded, disclosed; the locative מעל פני האדמה folded, A2): Differentiate·Existence at PATTERN grain; quoted announcement, rowed with embedded (the proclamation precedent; the volitive imperfect is the speaker's asserted course, the sw main-line-deontic ruling's family)",
     "embedded": true,
     "unresolved": false,
     "resolution": "the 1sg subject is the quoted speaker → יְהוָה",
     "alternate": {
      "op": "NUL",
      "grain": "Ground",
      "because": "readable as wiping the whole living surface of the ground rather than the kinds ranged over"
     }
    },
    {
     "sentence": "אֲשֶׁר בָּרָ֨אתִי֙",
     "subject": "יְהוָ֗ה",
     "relation": "בָּרָ֨אתִי֙",
     "object": "הָאָדָ֤ם",
     "polarity": "+",
     "phasepost": {
      "op": "INS",
      "grain": "Figure"
     },
     "clause": "restrictive-relative",
     "prop": "gen:whom-i-created",
     "ground": "gen-6.7.1.1.1",
     "role": "declared",
     "because": "בָּרָאתִי (I created) — the coming-into-being of the one now to be blotted: Generate·Existence at figure grain; an INDICATIVE restrictive relative rows (R8, the es que-será-completada precedent)",
     "embedded": true,
     "unresolved": false,
     "resolution": "the 1sg subject → יְהוָה (the speaker); the relative head אֲשֶׁר → הָאָדָם, carried as object",
     "alternate": null
    },
    {
     "sentence": "כִּ֥י נִחַ֖מְתִּי כִּ֥י עֲשִׂיתִֽם",
     "subject": "יְהוָ֗ה",
     "relation": "נִחַ֖מְתִּי",
     "object": "כִּ֥י עֲשִׂיתִֽם",
     "polarity": "+",
     "phasepost": {
      "op": "REC",
      "grain": "Ground"
     },
     "clause": "reason-adjunct",
     "prop": "gen:for-i-repent",
     "ground": "gen-6.7.1.2",
     "role": "declared",
     "because": "נִחַמְתִּי (I repent) — the same re-zero in the quoted FIRST person, the reason offered for the blotting: Generate·Interpretation at ground grain; the made-them content (כִּי עֲשִׂיתִם) stays inside the object per A1",
     "embedded": true,
     "unresolved": false,
     "resolution": "the 1sg subject → יְהוָה (the speaker)",
     "alternate": {
      "op": "EVA",
      "grain": "Ground",
      "because": "readable as grief held — the same disclosed mirror as the narrated וַיִּנָּחֶם"
     }
    }
   ]
  },

  {
   "specimen": "quran-54-1",
   "path": "14-holy-texts/tanzil-quran/quran_quran-uthmani.txt",
   "gutenberg": false,
   "windowStartText": "ٱقْتَرَبَتِ ٱلسَّاعَةُ",
   "windowEndText": "وَٱنشَقَّ ٱلْقَمَرُ",
   "notes": "Quran 54:1 (Uthmani): the moon split — SEG·Figure in Arabic (وَٱنشَقَّ, one identified body divided), the mark-15-38 ἐσχίσθη cell in a third language; with the Hour drawn near (SIG·Ground, the A5/ἤγγικεν family). Field strings derived mechanically from the file's bytes.",
   "revisions": [],
   "rows": [
    {
     "sentence": "ٱقْتَرَبَتِ ٱلسَّاعَةُ",
     "subject": "ٱلسَّاعَةُ",
     "relation": "ٱقْتَرَبَتِ",
     "object": null,
     "polarity": "+",
     "phasepost": {
      "op": "SIG",
      "grain": "Ground"
     },
     "clause": "main",
     "prop": "quran:hour-near",
     "ground": "quran-54.1.1",
     "role": "declared",
     "because": "ٱقْتَرَبَتِ (has drawn near) — translocation (A5) of a whole era-condition toward the present: Relate·Existence at GROUND grain, the mark-1-15 ἤγγικεν family",
     "embedded": false,
     "unresolved": false,
     "resolution": null,
     "alternate": null
    },
    {
     "sentence": "وَٱنشَقَّ ٱلْقَمَرُ",
     "subject": "ٱلْقَمَرُ",
     "relation": "وَٱنشَقَّ",
     "object": null,
     "polarity": "+",
     "phasepost": {
      "op": "SEG",
      "grain": "Figure"
     },
     "clause": "coordinate",
     "prop": "quran:moon-split",
     "ground": "quran-54.1.2",
     "role": "declared",
     "because": "ٱنشَقَّ (split apart, middle voice) — ONE identified body divided into parts: Differentiate·Structure at figure grain — the mark-15-38 ἐσχίσθη cell, one document over",
     "embedded": false,
     "unresolved": false,
     "resolution": null,
     "alternate": null
    }
   ]
  },

  {
   "specimen": "quran-5-3",
   "path": "14-holy-texts/tanzil-quran/quran_quran-uthmani.txt",
   "gutenberg": false,
   "windowStartText": "ٱلْيَوْمَ أَكْمَلْتُ",
   "windowEndText": "دِينًۭا ۚ",
   "notes": "Quran 5:3, the ikmāl sentence (mid-verse window — windowStartText scopes past the verse's earlier forbidden-foods and despairing-disbelievers material; R8's completeness is per window): the dīn perfected — SYN·Pattern in Arabic (a whole WAY brought to completed wholeness), closing that cell's English-only frontier; with the favor completed (SYN·Figure, the Πεπλήρωται family at figure scale) and Islam approved AS dīn (EVA·Pattern). The 1sg divine speaker is the sura's own voice, resolved on every row. Field strings derived mechanically from the file's bytes.",
   "revisions": [],
   "rows": [
    {
     "sentence": "ٱلْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ",
     "subject": "ٱللَّهُ",
     "relation": "أَكْمَلْتُ",
     "object": "دِينَكُمْ",
     "polarity": "+",
     "phasepost": {
      "op": "SYN",
      "grain": "Pattern"
     },
     "clause": "main",
     "prop": "quran:din-perfected",
     "ground": "quran-5.3.1",
     "role": "declared",
     "because": "أَكْمَلْتُ (I have perfected/completed) — a whole WAY brought to completed wholeness: Generate·Structure at PATTERN grain (the دِين is a paradigm binding a community, not one artifact — the kind-level whole); ٱلْيَوْمَ (this day) temporal, لَكُمْ recipient, both folded (A2)",
     "embedded": false,
     "unresolved": false,
     "resolution": "the 1sg subject is the sura's divine speaker → ٱللَّهُ",
     "alternate": {
      "op": "SYN",
      "grain": "Ground",
      "because": "readable as the whole field of the religion completed rather than the paradigm"
     }
    },
    {
     "sentence": "وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِى",
     "subject": "ٱللَّهُ",
     "relation": "وَأَتْمَمْتُ",
     "object": "نِعْمَتِى",
     "polarity": "+",
     "phasepost": {
      "op": "SYN",
      "grain": "Figure"
     },
     "clause": "coordinate",
     "prop": "quran:favor-completed",
     "ground": "quran-5.3.2",
     "role": "declared",
     "because": "أَتْمَمْتُ (I have brought to fullness) — ONE bestowal (نِعْمَتِى, My favor) completed: Generate·Structure at figure grain, the mark-1-15 Πεπλήρωται family at figure scale; عَلَيْكُمْ recipient folded (A2)",
     "embedded": false,
     "unresolved": false,
     "resolution": "the 1sg subject → ٱللَّهُ (the same speaker)",
     "alternate": null
    },
    {
     "sentence": "وَرَضِيتُ لَكُمُ ٱلْإِسْلَٰمَ دِينًۭا ۚ",
     "subject": "ٱللَّهُ",
     "relation": "وَرَضِيتُ",
     "object": "دِينًۭا ۚ",
     "polarity": "+",
     "phasepost": {
      "op": "EVA",
      "grain": "Pattern"
     },
     "clause": "coordinate",
     "prop": "quran:islam-approved-din",
     "ground": "quran-5.3.3",
     "role": "declared",
     "because": "رَضِيتُ (I have approved / am pleased with) — approval HELD toward Islam AS the way (دِينًا, the as-classification borne by the تمييز): Relate·Interpretation at PATTERN grain (approved as the kind-of-way for the community); لَكُمُ recipient folded (A2)",
     "embedded": false,
     "unresolved": false,
     "resolution": "the 1sg subject → ٱللَّهُ (the same speaker)",
     "alternate": {
      "op": "DEF",
      "grain": "Pattern",
      "because": "the as-assignment readable as bounding a standing (the proclaims-as family) rather than approval held"
     }
    }
   ]
  },

  {
   "specimen": "quran-2-255",
   "path": "14-holy-texts/tanzil-quran/quran_quran-uthmani.txt",
   "gutenberg": false,
   "windowStartText": "ٱللَّهُ لَآ إِلَٰهَ",
   "windowEndText": "وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
   "notes": "Quran 2:255, Ayat al-Kursi (Uthmani), R8-complete: the kursi encompassing the heavens and the earth — CON·Ground in Arabic (wasi'a: an arrangement held over the WHOLE field), closing that cell's English-only frontier; with the absolute negative existential (la of categorical negation + the illa restrictor, the ar-UDHR lan-yakuna-hunaka precedent), two rule-3 identificational epithet sentences, the two negated seizures (slumber, sleep — the shared verb gapped), the possession of all-in-heavens-and-earth (CON·Ground, the asserted-possession ruling), the knowing over the surrounding whole (EVA·Ground), the negated encompassing of His knowledge (CON·Pattern, the illa restrictor folded-disclosed with its indicative relative rowed), and the unwearied preserving. The rhetorical interrogative (man dha alladhi yashfa'u 'indahu illa bi-idhnihi — who intercedes save by His leave) asserts nothing and FOLDS per the suite's interrogative ruling, disclosed here. Recitation pause marks are the file's own bytes standing as separate tokens between clauses. Field strings derived mechanically from the file's bytes.",
   "revisions": [],
   "rows": [
    {
     "sentence": "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ",
     "subject": "إِلَٰهَ",
     "relation": "لَآ",
     "object": "إِلَّا هُوَ",
     "polarity": "+",
     "phasepost": {
      "op": "NUL",
      "grain": "Ground"
     },
     "clause": "main",
     "prop": "quran:no-god-but-he",
     "ground": "quran-2.255.1",
     "role": "declared",
     "because": "la of categorical negation (la an-nafiya lil-jins) — the ABSENCE of the kind deity-as-such across the whole field of being, asserted as the act itself (A4 at GROUND grain), with the one exception held out (illa huwa — the la...illa restrictor, the ar-UDHR negative-existential precedent); polarity + because the absence IS what is asserted",
     "embedded": false,
     "unresolved": false,
     "resolution": null,
     "alternate": {
      "op": "SIG",
      "grain": "Figure",
      "because": "readable as identification through the exception: none-but-He = He alone stands as God"
     }
    },
    {
     "sentence": "هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
     "subject": "ٱللَّهُ",
     "relation": "هُوَ",
     "object": "ٱلْحَىُّ ٱلْقَيُّومُ",
     "polarity": "+",
     "phasepost": {
      "op": "SIG",
      "grain": "Figure"
     },
     "clause": "main",
     "prop": "quran:living-sustainer",
     "ground": "quran-2.255.2",
     "role": "declared",
     "because": "copula rule 3 — the pronoun copula huwa + definite unique epithets (THE Living, THE Self-Subsisting): identificational, the quran-2-37 at-tawwab ar-rahim shape exactly",
     "embedded": false,
     "unresolved": false,
     "resolution": "the fasl pronoun (w4) resumes the topic (w0)",
     "alternate": null
    },
    {
     "sentence": "لَا تَأْخُذُهُۥ سِنَةٌۭ",
     "subject": "سِنَةٌۭ",
     "relation": "تَأْخُذُهُۥ",
     "object": null,
     "polarity": "-",
     "phasepost": {
      "op": "CON",
      "grain": "Figure"
     },
     "clause": "main",
     "prop": "quran:slumber-not-seize",
     "ground": "quran-2.255.3",
     "role": "declared",
     "because": "akhadha (seize/grip) — a hold arranged on one figure: Relate·Structure at figure grain, negated (R6: the la is polarity, never a different act)",
     "embedded": false,
     "unresolved": false,
     "resolution": "the object clitic -hu on the verb -> the One named at w0",
     "alternate": null
    },
    {
     "sentence": "وَلَا نَوْمٌۭ",
     "subject": "نَوْمٌۭ",
     "relation": "تَأْخُذُهُۥ",
     "object": null,
     "polarity": "-",
     "phasepost": {
      "op": "CON",
      "grain": "Figure"
     },
     "clause": "coordinate",
     "prop": "quran:sleep-not-seize",
     "ground": "quran-2.255.4",
     "role": "declared",
     "because": "the coordinated second negation (wa-la nawm) shares the gapped verb — the same seizure-hold denied of sleep: Relate·Structure at figure grain, negated",
     "embedded": false,
     "unresolved": false,
     "resolution": "the verb is gapped from the preceding clause (w9); its object clitic -> the One named at w0",
     "alternate": null
    },
    {
     "sentence": "لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ",
     "subject": "مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ",
     "relation": "لَّهُۥ",
     "object": null,
     "polarity": "+",
     "phasepost": {
      "op": "CON",
      "grain": "Ground"
     },
     "clause": "main",
     "prop": "quran:his-heavens-earth",
     "ground": "quran-2.255.5",
     "role": "declared",
     "because": "the possessive predicate lahu (to-Him-belongs) fronting a verbless nominal clause — ASSERTED possession is a CON row (the suite's possessive ruling; the gen-1 verbless-nominal precedent): Relate·Structure at GROUND grain, the possessed being the whole of what the heavens and the earth hold",
     "embedded": false,
     "unresolved": false,
     "resolution": "the possessive clitic -hu in the predicate (w14) -> the One named at w0",
     "alternate": null
    },
    {
     "sentence": "يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ",
     "subject": "ٱللَّهُ",
     "relation": "يَعْلَمُ",
     "object": "مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ",
     "polarity": "+",
     "phasepost": {
      "op": "EVA",
      "grain": "Ground"
     },
     "clause": "main",
     "prop": "quran:knows-before-behind",
     "ground": "quran-2.255.6",
     "role": "declared",
     "because": "ya'lamu (He knows) — knowledge held over the SURROUNDING WHOLE (what is between their hands and what is behind them — the ambient totality): Relate·Interpretation at GROUND grain",
     "embedded": false,
     "unresolved": false,
     "resolution": "the implicit 3ms subject -> the One named at w0; the -him of aydihim -> the creatures of the preceding discourse",
     "alternate": null
    },
    {
     "sentence": "وَلَا يُحِيطُونَ بِشَىْءٍۢ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ",
     "subject": "the creatures",
     "relation": "يُحِيطُونَ",
     "object": "بِشَىْءٍۢ مِّنْ عِلْمِهِۦٓ",
     "polarity": "-",
     "phasepost": {
      "op": "CON",
      "grain": "Pattern"
     },
     "clause": "main",
     "prop": "quran:encompass-not-knowledge",
     "ground": "quran-2.255.7",
     "role": "declared",
     "because": "ihata (encompass/surround) — an encirclement arranged: Relate·Structure, negated; PATTERN grain because the object is kind-quantified under negation (bi-shay'in min 'ilmihi, any-thing of His knowledge); the illa bi-ma sha'a restrictor is the la...illa family, folded-disclosed, its indicative relative rowed below",
     "embedded": false,
     "unresolved": false,
     "resolution": "the 3pl subject is the generic creatures of the preceding discourse (the mark-1-15 the-hearers shape)",
     "alternate": null
    },
    {
     "sentence": "بِمَا شَآءَ",
     "subject": "ٱللَّهُ",
     "relation": "شَآءَ",
     "object": null,
     "polarity": "+",
     "phasepost": {
      "op": "DEF",
      "grain": "Figure"
     },
     "clause": "restrictive-relative",
     "prop": "quran:what-he-willed",
     "ground": "quran-2.255.7.1",
     "role": "declared",
     "because": "sha'a (He willed) — the determining choice that BOUNDS which portion of His knowledge is granted: Differentiate·Interpretation at figure grain; an INDICATIVE relative inside the restrictor rows (R8, the es que-sera-completada precedent)",
     "embedded": false,
     "unresolved": false,
     "resolution": "the 3ms subject -> the One named at w0; the relative head ma (what He willed, the granted portion) is the gapped object",
     "alternate": {
      "op": "EVA",
      "grain": "Figure",
      "because": "willing readable as a preference held rather than a bound drawn"
     }
    },
    {
     "sentence": "وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ",
     "subject": "كُرْسِيُّهُ",
     "relation": "وَسِعَ",
     "object": "ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ",
     "polarity": "+",
     "phasepost": {
      "op": "CON",
      "grain": "Ground"
     },
     "clause": "main",
     "prop": "quran:kursi-encompasses",
     "ground": "quran-2.255.8",
     "role": "declared",
     "because": "wasi'a (encompasses/extends over) — an arrangement HELD OVER THE WHOLE FIELD: the kursi in relation to the heavens-and-the-earth totality (the gen-1 merism one document over): Relate·Structure at GROUND grain — the containment-of-the-ground cell, in Arabic",
     "embedded": false,
     "unresolved": false,
     "resolution": null,
     "alternate": {
      "op": "SIG",
      "grain": "Ground",
      "because": "readable as presence held over the field rather than the arrangement holding it"
     }
    },
    {
     "sentence": "وَلَا يَـُٔودُهُۥ حِفْظُهُمَا",
     "subject": "حِفْظُهُمَا",
     "relation": "يَـُٔودُهُۥ",
     "object": null,
     "polarity": "-",
     "phasepost": {
      "op": "EVA",
      "grain": "Figure"
     },
     "clause": "coordinate",
     "prop": "quran:preserving-not-weary",
     "ground": "quran-2.255.9",
     "role": "declared",
     "because": "ya'uduhu (weighs upon/wearies) — a felt burden held against its bearer: Relate·Interpretation at figure grain, negated (R6)",
     "embedded": false,
     "unresolved": false,
     "resolution": "hifzuhuma — the preserving of the two (the heavens and the earth, w48-49); the object clitic -hu -> the One named at w0",
     "alternate": {
      "op": "CON",
      "grain": "Figure",
      "because": "the burden readable as a structural load arranged rather than felt"
     }
    },
    {
     "sentence": "وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
     "subject": "وَهُوَ",
     "relation": "ٱلْعَلِىُّ ٱلْعَظِيمُ",
     "object": null,
     "polarity": "+",
     "phasepost": {
      "op": "SIG",
      "grain": "Figure"
     },
     "clause": "coordinate",
     "prop": "quran:most-high-tremendous",
     "ground": "quran-2.255.10",
     "role": "declared",
     "because": "a verbless nominal clause whose predicate is the definite unique epithets (THE Most High, THE Tremendous) — copula rule 3 identificational, the quran-2-37 shape; the relation slot holds the predicate nominal per the verbless-clause convention",
     "embedded": false,
     "unresolved": false,
     "resolution": "wa-huwa (w55) -> the One named at w0",
     "alternate": null
    }
   ]
  },
];
