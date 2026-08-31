# The Rosetta stone — what this development is for

*Written before the work, so the goals are a standard the work is held to and
not a description of what it turned out to produce — RULE.md's own discipline,
reused one level up.*

## The one-paragraph statement

The UDHR exists in 500+ official translations of the same propositions. If a
phasepost is a property of the ACT a proposition performs, and not of the
language it is performed in, then reading the UDHR by hand in a few languages
should let us read it in languages nobody here is fluent in — by alignment,
not by translation. That is the Rosetta stone. It is worth building only if
the phasepost really is language-invariant, which is an empirical claim this
project has not yet tested and currently cannot, for the reason in Goal 6.

## The falsification condition, stated first

**If equivalent propositions do not receive equal phaseposts under
INDEPENDENT adjudication across languages, the Rosetta stone fails** — the
phasepost would then be an artifact of the reader, not a property of the act,
and no amount of alignment would transfer it. Everything below is arranged so
that this can actually be found out rather than assumed. A cross-language
agreement number produced by one reader who adjudicated all the languages
while looking at the others measures that reader's consistency and nothing
else.

---

## Goal 1 — correct what exists before building on it

The five UDHR readings currently carry known defects, found by hand-inspection
on 2026-08-31. A Rosetta stone built on mistyped rows teaches the mistypes.

- **`CON·Pattern` is a 36-row bucket** — a third of all 107 rows in one cell.
  Inspection shows it collapses at least five distinct things: possession of a
  faculty (*endowed with reason*), reciprocal conduct (*act towards one
  another*), holding a freedom (*shall enjoy*), protective coverage (*protected
  by the rule of law*), compulsion (*not to be compelled*), and — the largest
  and most suspect group, ~11 rows — **effort toward bringing something about**
  (*strive to promote respect*, *secure recognition*, *努力实现*, *aseguren*).
  That last group looks like Generate, not Relate: promoting respect generates
  respect. They were typed CON because the `because` reasoned from the DEONTIC
  FRAMING ("prescribed standing conduct") rather than from the verb's own act —
  which inverts A3, the rule that modality never moves the phasepost.
- **Six `because` fields justify an assignment using the engine's DERIVED
  stance name** ("the engine's stance name for CON·Figure is Binding"). Stance
  is computed FROM operator × grain, so it can never be evidence for choosing
  the operator. That is circular and must be struck from every row that uses it.
- **`REC` now has zero primaries across all eight goldens.** The only RECs that
  existed were the *reaffirmed* rows, and the 2026-08-31 pass re-typed them
  EVA. Either REC is genuinely rare in declaratory, narrative and changelog
  prose (plausible — it is the re-zero, and none of these texts recant), or
  that correction over-applied. Open, and to be settled against a specimen that
  actually reframes something, not by argument.

**Standard:** every row adjudicated on its own verb, in its own language, with
a `because` that reasons from mode → domain → grain and never from a derived
face. A cell holding a third of the corpus is a bucket until proven otherwise.

## Goal 2 — the alignment key, without which there is no Rosetta stone

Rows are currently addressed `specimen` + `n`. That is per-language and
positional, and the positions diverge (19 / 21 / 22 / 22 / 23). Five separate
readings of one document are not a parallel corpus until something says which
row in each is the same claim.

**Build:** a language-independent proposition identity carried on every row, so
all N languages' rows for one claim join. Superposition is a join, and a join
needs a key.

Consequences that fall out of having one, none available today:
- cross-language phasepost agreement becomes measurable per proposition
- a language's MISSING propositions become visible (Arabic has no *friendly
  relations* clause; English folds *dignity and rights are equal* into another
  predicate — both currently invisible except in prose notes)
- a new language's reading can be scored against the collective one

## Goal 3 — structure, as something the encoding actually holds

A heading is not a proposition and currently produces nothing. But "Preamble"
and "Article 1" condition how everything beneath them is read, and the
encoding is silent about it. Two distinct mechanisms, both missing:

1. **The ground-opening act itself.** Naming and cutting a region of a
   document are acts, and they are Ground-grain ones. The UDHR reading has
   **zero Ground rows** — though `kant`/`alice`/`ripgrep` between them already
   occupy six of the nine Ground cells, so this is a gap in what was encoded,
   not a limit of the algebra.
2. **Scope carried on every proposition** — which ground was open when this
   was read. This is the "keeps activation going" property: the ground persists
   across the rows beneath it, and a row that does not name its ground cannot
   be re-read in context later.

**And one the current encoding loses entirely:** every *Whereas* clause is a
PREMISE offered in support of the operative *Proclaims*. The document's own
argument structure — seven premises, one conclusion — is nowhere in the data.
A reader given these 107 rows cannot tell a premise from a conclusion.

## Goal 4 — examples of all 27 phaseposts

**STATUS 2026-08-31 (second pass): the whole-document extension ran — all 30
articles, all five languages, 651 UDHR rows. Measured from the built tuples:
UDHR primary 15/27, +alternates 18/27; all eight goldens primary 23/27,
+alternates 26/27. Absent as primary: `NUL·Figure`, `SEG·Ground`,
`REC·Ground`, `REC·Figure`; absent even as alternate: `NUL·Figure` alone.
The prediction below held precisely: Article 2 delivered SEG·Pattern,
Articles 4/29 DEF·Pattern, Article 30 DEF·Ground (and, through the ar/sw
negative existentials, NUL·Ground) — and REC·Pattern arrived unpredicted via
the limitation-purpose and promote-frames. What remains is what the document
cannot supply: the recanting specimen (REC·Ground/REC·Figure), an asserted
document-cut (SEG·Ground — alternate-only on every heading), and a single
thing's absence (NUL·Figure). The paragraphs below are the pre-extension
prediction, kept per R12's append-only discipline.**

**STATUS 2026-08-31 (third pass): 27/27.** The gap suite
(hand-gap-suite.mjs — Genesis in Hebrew, Mark in Koine Greek, Quran 2:37
in Arabic and English, King Lear and The Tempest windows from pg100)
closed every remaining cell: all 27 phaseposts now carry a primary
attestation across 767 rows in seven languages (en ar es zh sw he grc);
22/27 are attested in two or more languages. The recanting specimen the
paragraph below predicted would be needed turned out to already live in
the corpus three times over: Prospero's abjuration (REC·Ground), Lear's
disclaiming and the tawba of Quran 2:37 (REC·Figure, in three
languages), and Genesis's blessing of the seventh day (REC·Figure by the
same cell-arithmetic as promote-respect). The omnilingual frontier is
now the five cells attested in English alone — SEG·Figure, CON·Ground,
EVA·Ground, SYN·Pattern, REC·Ground — and Goal 6's blind adjudication,
which now has a 767-row, 27-cell, 7-language target.

Measured across all eight goldens: **19 of 27 occupied.** UDHR alone reaches 9;
the three non-UDHR specimens supply ten more.

**Absent everywhere (8):** `DEF·Ground`, `DEF·Pattern`, `NUL·Figure`,
`REC·Figure`, `REC·Ground`, `REC·Pattern`, `SEG·Ground`, `SEG·Pattern`.

The cheapest route to most of them is **extending the UDHR window past
Article 1 rather than adding new documents**, because the parallel corpus is
what makes this a Rosetta stone and every new article is parallel in 500+
languages for free:
- Article 2's non-discrimination list is a kind being bounded and a class being
  excluded — candidate `DEF·Pattern`, `SEG·Pattern`
- Article 29's limitation clause and Article 30's "nothing in this Declaration
  may be interpreted as…" bound a whole interpretive field — candidate
  `DEF·Ground`
- `NUL·Figure` wants a single thing ceasing; the UDHR may not supply it

**`REC` is the row the UDHR will almost certainly never fill** — a founding
document does not recant. It needs a specimen that genuinely reframes: a
retraction, an amendment, a conversion, a superseded standard. That is a
deliberate corpus choice, not something to wait for.

A cell is "covered" only when it has a worked example with a `because` that
survives the Goal 1 standard — not when something has merely been filed there.

## Goal 5 — what the stone is actually FOR: bootstrapping into unread languages

**STATUS 2026-08-31 (fourth pass): the stone exists as working artifacts.**
`derived-priors/reading-priors/reading-priors-v1.json` (ReadingPriors@1 —
a CHECKPOINT of the live goldens, LP7's second amendment, regenerated
never edited) carries the full per-language surface→phasepost evidence
this goal names: 477 act-expectation keys witnessed `specimen@ground`,
and the rosetta matrix — 107 props × 5 languages with full rows, 23
construction-splits and 21 per-language absences precomputed. Five
EOTReading@2 sidecars sit beside the UDHR sources, each carrying its
reading's typed hypergraph deltas (surprise per LP7's first amendment);
five more editions (fra/rus/jpn/007/hin) carry ring-1 STRUCTURAL
readings — `derived: true`, zero propositions, prop expectations as
typed `no_lexicon` gaps. THE FIREWALL HOLDS BY CONSTRUCTION: derived
readings are typed derived on the sidecar itself, act-expectation checks
exclude self-witnessed evidence, and every cross-language figure carries
Goal 6's one-reader caveat verbatim on the artifact. Full numbers:
`scripts/eot-sidecar2-RESULTS.md`. Goal 6 (blind adjudication) remains
the open gate between this construction and any claim that alignment
works.

From aligned readings, derive per-language **surface → phasepost** evidence:
that `have pledged` / `تعهدت` / `se han comprometido` / `誓愿` / `zimeahidi`
all realise the same act gives a seed act-lexicon in five languages obtained
without a native speaker. Reading new text in language L then means matching
surfaces against that lexicon, inheriting the phasepost, and flagging what does
not match as genuinely unread rather than silently guessed.

**The firewall this requires, stated now because it is the thing most likely to
be violated later:** a reading DERIVED by alignment is not evidence that
alignment works. If a Swahili row's phasepost is inherited from English rather
than read from Swahili, its agreement with English is guaranteed and measures
nothing. Derived readings must be typed as derived, must never be counted as
independent convergence, and must never be promoted to adjudicated without a
reader who actually read the language.

## Goal 6 — validation that is not self-confirmation

The current five readings were all adjudicated by one reader with the other
languages in view. Their agreement is therefore uninformative about Goal 0's
falsification condition.

**Build:** independent adjudication — different readers (or context-isolated
sessions), one language each, blind to the others' assignments, working only
from RULE.md and their own source text. Then measure agreement per aligned
proposition. `goldens/agency-civic`'s own analysis discipline applies: report
a kappa, refuse to report below a declared floor, and label an LLM panel as a
proxy rather than a human ceiling.

Only that number answers "do equivalent propositions get equal phaseposts?"
Everything before it is construction, not evidence.

---

## Non-goals

- **Not** tuning the mechanical extractor to score better against these
  goldens. That is calibration on the fixture, which both sibling repos already
  forbid. The goldens are the target; the extractor moves toward them for
  independent reasons or not at all.
- **Not** normalising away real cross-language differences. Arabic's copula
  where English has a declaring verb is the goldens being correct; a Rosetta
  stone that erases it is measuring the reader, not the text.
- **Not** machine-generating readings and calling them hand-rolled. The whole
  value of a golden is that a reader is accountable for every row.

## Order of work

1. Goal 1 — re-adjudicate the 107 rows one at a time, striking the bucket and
   the circular justifications. Nothing else is worth building until this holds.
2. Goal 2 — the alignment key, retrofitted to the corrected rows.
3. Goal 3 — structure and premise-role, which also opens the Ground row.
4. Goal 4 — extend the window through the articles that plausibly fill the
   missing cells; add a REC specimen deliberately.
5. Goal 6 — independent adjudication, once there is something stable to
   adjudicate against.
6. Goal 5 — the lexicon, last, because it is the only step whose output is
   worthless if any earlier one is wrong.
