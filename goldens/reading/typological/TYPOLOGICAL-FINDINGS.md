# The typological golden — three languages chosen to disagree

User direction, verbatim: *"handroll a golden of 3 vastly different languages
of the UNDHR, as semantically different as possible. don't make English one
of them,"* then, mid-build: *"handroll it so it is one proposition per line."*

This is a companion to `udhr.golden.json` and the other three specimens in
this directory, under the SAME `EOReadingGolden@1` schema and the same
`RULE.md` phasepost algebra — no second format invented for it. What is
different: the other four specimens are excerpts of real corpus files,
hand-adjudicated against bytes already on disk (`build-goldens.mjs`); these
three are composed directly for this golden (`handrolled: true`, declared on
every row's file) and self-verified against bytes this same pass wrote.

## Why these three languages

The goal was typological distance, not just three different scripts.
Chosen, and why each earns its place against the other two:

- **Arabic (ar)** — Afro-Asiatic/Semitic, root-and-pattern nonconcatenative
  morphology, VSO-capable, an Abjad script, and — the structurally load-
  bearing property for this golden — **no verb "to have" and no present-
  tense copula**: possession is a bare preposition ("li-", to/for) plus a
  noun, and "X is Y" is usually two nouns juxtaposed with nothing between
  them.
- **Mandarin Chinese (zh)** — Sino-Tibetan, fully isolating (zero
  inflection anywhere: no tense, no number, no agreement), SVO-ish but
  topic-comment, a logographic script, and grammatical relations carried
  almost entirely by word order and function words rather than morphology.
- **Swahili (sw)** — Niger-Congo/Bantu, agglutinative, a noun-class system
  driving verb agreement (subject, tense, and voice all fused into one verb
  as prefixes/infixes — "wamezaliwa" is subject-prefix + perfect-marker +
  passive-root in one word), SVO, Latin script, and — unlike the other
  two — a genuine invariable copula particle ("ni") and a genuine
  negative-existential construction ("Hakuna", "there is not").

Three unrelated families, three morphological types (nonconcatenative,
isolating, agglutinative), three ways of expressing possession (a bare
preposition, a bare verb, an inflected verb), two zero-copula languages and
one overt-copula language, one negative-existential construction the other
two lack entirely. That spread is what "as semantically different as
possible" earns structurally, not just three unrelated vocabularies.

## "One proposition per line" as construction, not just shape

Six short single-clause declaratives per language, loosely drawn from UDHR
Articles 1, 3, 4, 15, and 18 — simplified to one clause each rather than
quoted from the dense original (real UDHR Article 1 alone packs two
coordinated propositions — "born free" AND "equal in dignity" — into one
sentence; `udhr.golden.json`'s own row 10 reads both under one phasepost for
exactly that reason). Splitting them into separate lines here is deliberate:
it is what makes each row's span its own whole source line, with no
paragraph-widening or sentence-boundary logic needed at all — the atomic
case this repo's `scripts/eot-digest.mjs::propositionLedger` (added the same
day, one entry per sentence or a typed gap) wants to diff against once its
own coordinate-space bug is fixed. Not yet run against it — this golden is
the hand-adjudicated standard, built and self-verified independently of any
pipeline run, exactly as `RULE.md`'s own header insists a golden must be.

## Four findings, kept as measured rather than smoothed into agreement

**"Born free" converges identically across all three languages, and matches
the existing English golden.** Row 1 in Arabic, Mandarin, and Swahili all
land `INS·Pattern` — birth read as a law over the whole kind — the identical
classification `udhr.golden.json` row 10 already gives the same proposition
in English. Four independent languages, one phasepost, for one act.

**"Has the right to X" converges identically across three grammatically
unrelated possession constructions.** Rows 3, 5, 6 in all three languages
land `CON·Pattern`, via: Arabic's bare dative preposition ("li-", no verb
at all), Mandarin's bare possessive verb ("有"), and Swahili's inflected
possessive verb ("ana", subject-prefix + tense-infix fused onto the root).
This is the strongest evidence in the whole golden that the phasepost is
reading the ACT and not the surface grammar — `RULE.md`'s own stated "two
walls" — since three structurally unrelated ways of saying "have" all
resolve to the same act.

**"No one shall be held in slavery" genuinely diverges, and the divergence
is the finding, not a defect.** Row 4 is the one proposition expressed
through three different NEGATION STRATEGIES: Arabic negates an impersonal
permission-verb over a nominalized "enslavement" (→ `SIG·Figure`, polarity
−); Mandarin negates a passive verb with the victim as surface subject (→
`CON·Figure`, polarity −); Swahili uses a genuine negative-existential
quantifier construction ("Hakuna", "there is not") that `RULE.md`'s own A4
amendment already names explicitly (→ `NUL·Pattern`, polarity **+** — the
absence itself IS the act, never a negated presence). Same underlying
proposition, three typologically different ways to grammaticalize
negation, three different primary phaseposts under RULE.md's own stated
rules. Disclosed as an open question for RULE.md, not resolved here: is a
NUL-vs-negated-SIG/CON split a genuine semantic difference this scale
should carry, or an artifact of which language happened to state the
negation?

**"Equal in dignity" hits the same undecided rule in all three languages
independently.** Row 2 is a bare copula-plus-property-adjective sentence
predicated of a universally-quantified subject ("all people"/"everyone").
`RULE.md`'s copula rule 4 gives property adjectives `SIG·Figure` by
default and promotes to `SIG·Pattern` only for "a dispositional/habitual
property" — it names iterative ASPECT as the trigger, never quantifier
SCOPE over the subject. Row 1's own `INS·Pattern` implicitly assumes a
universal subject licenses the same promotion; row 2 is the plain test of
that assumption on a sentence with no aspectual verb to hide behind, and
the rule's text does not settle it. All three languages carry the
identical primary/alternate split rather than three independent guesses at
one answer.

## Self-verification (P5.2)

`build-typological-golden.mjs` computes every span as a real UTF-8 BYTE
offset (`Buffer.byteLength`, not a JS string index — Arabic and Chinese
characters are multi-byte in UTF-8, so a char-index span would silently
misalign) and re-slices the raw file at that exact offset, decodes it, and
asserts BYTE-FOR-BYTE equality with the row's own declared line before
writing anything. 18/18 rows across all three files verified clean on the
first run; the script fails loudly and writes nothing for a specimen with
any row that does not verify.

## Disclosed limits

**Not native-speaker certified.** Composed from the authoring session's own
linguistic knowledge, not fetched from OHCHR or any authoritative
translation, and not independently reviewed by a speaker of any of the
three languages — `handrolledNote` says this on every golden file itself,
not only here. The STRUCTURAL ground truth (what proposition each line
asserts, and its phasepost) carries the same "ground truth by construction"
standing this project's other synthetic goldens already use
(`asserted-eval.mjs`'s synthetic suite, `hl-acquire.test.mjs`'s invented
chronicle) — authored with known intent, not received from an authority —
but a genuine grammaticality error in any one line would not be caught by
this pass's own self-verification, which only checks byte addressing, not
correctness of the Arabic/Mandarin/Swahili itself.

**Not yet diffed against the live pipeline.** This golden is the standard,
built independently — `diff-golden.mjs` has not been pointed at any of the
three new specimens, and none of the three languages has vocabulary/grammar
priors wired into `live_priors`' `loadOrgans` (`LANG_ALIAS` currently covers
only `en`/`ru`/`fi`) — so a real pipeline run would almost certainly extract
nothing for `ar`/`zh` today and something English-shaped and wrong for `zh`
if run under the `en` fallback. That gap is real, disclosed, and unclosed by
this pass — building this golden does not imply the pipeline can read it
yet.
