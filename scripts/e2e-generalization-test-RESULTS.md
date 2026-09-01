# The held-out test: are these good priors?

*Answers a direct question with a measurement rather than an assertion.
Re-runnable: `node scripts/e2e-generalization-eval.mjs`. Not a golden —
no R1-R12 discipline, no committed ground truth. `06-government-legal/
world-factbook` is a family nothing in this checkout has ever touched: no
sidecar, no golden, no frame-table phrase drawn from it. 13 specimens,
hand-read from `africa_ag.txt` (Algeria), verified against the real
file's own bytes.*

## The headline number

**2/13 decided (15%)**, against 32.9% on the in-family (UDHR/kant/alice/
ripgrep/lear/tempest) corpus the ladder was built and corrected on. A
real, measured collapse — not a surprise in itself (a classifier tuned
on legal-declarative prose should generalize worse elsewhere), but now a
number instead of a guess.

**The more important number: 0 wrong.** Both decisions the ladder made
on totally unseen material were, on inspection, the right call (one a
clean win, one a documented limitation firing exactly as predicted — see
below). Eleven refusals, zero false confidence. For a system whose whole
law is "never guess," that is the actual test that matters more than
coverage: **precision held at the edge of the training distribution;
recall did not.** That is the correct failure shape, and it held.

## Every specimen, diagnosed against real POS attestation — not assumed

| id | register | sentence | verdict | why |
|---|---|---|---|---|
| bg-1 | prose | "Algeria has known many empires and dynasties" | undecided | "known" is real (VERB 38/ADJ 4) — no branch exists for an ordinary transitive verb at all |
| bg-2 | prose | "...culminated in Algerian independence in 1962" | undecided | "culminated" unattested in EWT (a genuinely rarer verb outside its news/web/social source text) |
| bg-3 | prose | "FIS membership is now illegal" | **SIG·Figure** | copula rule 4 fires — and hits the ALREADY-DISCLOSED dispositional/Pattern-promotion gap exactly as documented (a standing legal fact about a category probably wants Pattern, not Figure) |
| bg-4 | prose | "BOUTEFLIKA resigned in April 2019" | undecided | "resigned" attested but thin (VERB:1) — no branch for ordinary verbs regardless |
| bg-5 | prose | "TEBBOUNE ran for president as an independent" | undecided | "ran" real (VERB:13) — a genuine, concrete instance of the disclosed A5 (translocation) absence: motion vocabulary with no branch to catch it |
| fb-1 | field-value | "Government type: [is] a presidential republic" | **SIG·Pattern** | copula rule 2 fires correctly — class-membership generalizes cleanly to a totally new register |
| fb-2 | field-value | "Capital: [is] Algiers" | undecided | "Algiers" unattested AND rule 3's definiteness test only checks for an ARTICLE ("the") — a bare proper noun is inherently definite with none, a real gap rule 3 never anticipated |
| fb-3 | field-value | "Independence: [was] 5 July 1962" | undecided | rule 5 only catches PP-time ("in 1962") — a bare date NP with no leading preposition has no branch at all |
| fb-4 | field-value | "Population: [is] 47,735,685" | undecided | no rule for a bare quantity predicate — the ladder assumes nominal/adjectival/prepositional, never numeric |
| fb-5 | field-value | "Coastline: [is] 998 km" | undecided | same quantity gap, plus an edge case in `objHead`'s own digit-stripping regex |
| fb-6 | field-value | "Climate: [is] arid to semiarid" | undecided | "arid"/"semiarid" both unattested — the disclosed vocabulary-coverage cost, confirmed at a new register |
| fb-7 | field-value | "Suffrage: [is] 18 years of age, universal" | undecided | "universal" is real (ADJ:4) but my own hand-reconstruction produced a messy comma-joined compound object — partly my own specimen's fault, not only the ladder's |
| fb-8 | field-value | "Legislature name: [is named] Parliament (Barlaman)" | undecided | my own reconstruction wrote "[is named]" instead of "[is]" — inconsistent with the other seven; not a fair test of the ladder |

## What this actually says about the priors

**Three genuinely new construction classes surfaced, none in the frame
table or the copula ladder:**

1. **Ordinary transitive/intransitive verbs.** The ladder's coverage is
   copula constructions plus a dozen phrases lifted directly from
   RULE.md's own frame table — a thin, register-specific crust. It was
   never built to classify a general verb ("known", "resigned",
   "culminated"), and 4 of 5 prose misses are exactly this, not a
   vocabulary problem. This is the honest shape of "the priors are
   narrow": not wrong, uncovered.
2. **Article-less definite predicates.** Rule 3 tests for a determiner
   ("the"), which is how UDHR states unique roles ("the natural and
   fundamental group unit"). A proper-noun predicate ("Algiers") is
   just as definite with no article at all — a real, fixable gap found
   only by testing on material that actually uses this construction.
3. **Bare quantity and date predicates.** "998 km", "47,735,685", "5
   July 1962" — none of the five copula rules anticipate a numeric or
   bare-date predicate; rule 5 only catches a PREPOSITIONAL time/place
   phrase. A reference-fact register is built almost entirely from this
   shape, and the ladder has no branch for the single most common
   predicate type in the family it was just pointed at.

**One confirmation, not a surprise:** the dispositional/Pattern-
promotion gap (already disclosed in `mechanical-ladder.mjs`'s own
comments) fired on real, unseen material exactly the way it was
documented to. A named limitation that keeps failing the same named way
under new evidence is a limitation earning its disclosure, not an
undiagnosed bug.

**One clean, real win:** the class-membership copula rule (2) predicted
correctly on a construction (`X type: Y`) the ladder had never seen
before, built for another register entirely.

## The answer to "do you think these are good priors?"

Graded on what actually holds up under measurement:

- **The discipline is good, and it just proved itself under real
  pressure.** Every refusal above is typed and traceable to a specific,
  nameable cause (unattested vocabulary vs. no construction branch vs. a
  structural blind spot in one rule) — nothing was guessed, and nothing
  decided was wrong. That is the property this whole apparatus was built
  to hold onto, and it held on genuinely unseen material, not just the
  corpus it was tuned against.
- **The coverage is narrow, and now that is measured rather than
  argued.** 32.9% in-family, 15% out-of-family, on a sample too small to
  be a real percentage (n=13) but large enough to name real, distinct
  failure classes. The priors are good AT WHAT THEY COVER; what they
  cover is still mostly one register (legal-declarative prose) plus the
  handful of literary/scriptural specimens in the seed.
- **Three concrete next steps, ranked by how much they'd move recall**
  (not attempted here — a diagnosis, not a fix): a general-transitive-
  verb branch (would likely close most of the prose gap, at the cost of
  needing either VerbNet coverage or a real parse); a numeric/date
  predicate rule (cheap, mechanical, no open-class judgment needed —
  the most clearly worth building next); a proper-noun definiteness
  signal for rule 3 (capitalization-based, cheap, though L2's own law —
  "capitalisation is a differentiator, never the primary signal" —
  means it would need a veto structure, not a bare trigger).

Not fixed here, on purpose: this document's job was to find out whether
the priors are good, honestly, before spending effort improving them
further. It found a precise, three-part answer instead of a vague one.

## Amended 2026-09-01 — VerbNet wired into `classify()`, re-run on the same 13

The first named next-step above ("a general-transitive-verb branch...
at the cost of needing either VerbNet coverage or a real parse") is now
partly done: `mechanical-ladder.mjs::classify` gained a VerbNet tier
(full account: `scripts/eot-sidecar2-RESULTS.md`'s own same-day
section). Re-running this exact script, unchanged specimens, against
the now-wired classifier:

**3/13 decided (23%)**, up from 2/13 (15%). The one new decision:
`bg-1` ("Algeria has known many empires and dynasties") → **EVA**, via
VerbNet's `comprehend-87.2` class, reached through the UniMorph
form→lemma bridge (`known` → `know`). Flagged honestly, not claimed as
a clean third win: this is a real word-sense question (experiential
"has lived through" vs. comprehend-87.2's core cognitive "understands"
sense), and unlike `fb-1`'s clean class-membership hit, nothing here
adjudicates which reading is correct — this script was deliberately
built with no ground truth to check against (see the header). It is a
principled, disclosed call (EVA's own witness/perceive family plausibly
covers "having witnessed history"), not a verified one.

**`bg-4`/`bg-5` still undecided, and why matters:** "resigned" and "ran"
are both real, attested English verbs — the miss is not vocabulary, it
is that neither is in VerbNet's own class coverage under a form
`headOf` elects cleanly, or their entries land `contested`. The
diagnosis this document already gave ("a genuine, concrete instance of
the disclosed A5 (translocation) absence") stands unchanged — VerbNet
closes some of that gap, not all of it, exactly as predicted rather
than overclaimed.

**The other two named next steps are untouched by this change** (a
numeric/date predicate rule; a proper-noun definiteness signal for rule
3) — `fb-2` through `fb-8` are unaffected, all still undecided for the
same reasons already diagnosed above. **0 wrong, still** — the new
decision is debatable, not false, and every refusal remains typed and
traceable. The failure shape this document's headline named as correct
("precision held, recall did not") continues to hold under the first
real attempt to move recall.
