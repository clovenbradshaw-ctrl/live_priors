# DR4 (whole-NP subjects) and DR5 (phrasal predicates), built and measured

Built in `eoreader7/native/adapters/text/relations.js` (opt-in, backward
compatible — every existing caller byte-identical), wired into
`loadOrgans()`'s `makeRelationReader` call (also opt-in, also default-off
so the 2,208-source corpus sweep is untouched), and measured honestly
against the same 4 hand-perfected goldens DERIVED-RULES.md worked backward
from. Two real bugs were found by RUNNING this against real prose — not
assumed, not reasoned about in the abstract — and both are fixed and
pinned as regressions before this result is reported.

## What shipped

- **DR5 (phrasal predicates).** `discoverRelationVocab`/`extractRelations`
  gained `phrasalPredicates`, `auxiliaryVerbs`. Off by default. On, a
  bounded (0-4 hop) run of auxiliary/negation words between a subject and
  the recognised verb is captured as part of the predicate ("have
  pledged", "does not measure") instead of the auxiliary alone stranding
  the real verb inside the object capture.
- **DR4 (whole-NP subjects).** `expandSubjectNP` (new, exported) walks a
  raw 1-2 token subject anchor backward to its true NP boundary — a
  determiner (include, stop; continue past a following "of" for a
  genitive/PP chain — "the peoples OF THE United Nations"), an NP
  coordinator (include, continue, refusing a dangling one), never crossing
  clause-internal punctuation, admitting a bare-plural subject at its
  widest span when no determiner exists at all. `extractRelations` gained
  `nounPhraseSubjects`, off by default.
- **Received closed classes**, `priors.js`: `POSSESSIVE_DETERMINERS`,
  `NP_COORDINATORS`, `AUXILIARY_VERBS` — each with a giver (`lang/en`).
- **Wiring.** the-fold's `hypergraph.js::makeRelationReader` gained the
  same two booleans, threaded into its primary edge-extraction pass and
  its order-arm null test (not into `read(answer)`'s own checking-tier
  calls — disclosed scope boundary, named in the module's own header,
  since widening only the material side risks a subject-shape mismatch
  against an answer's own claim and was not attempted this pass).
  live_priors' `loadOrgans({phrasalPredicates, nounPhraseSubjects})` passes
  both through, defaulting false — the corpus sweep (`eot-digest.mjs`'s own
  `main`) omits them, `diff-golden.mjs` opts in explicitly.

## Two real bugs, found live, fixed before this pass' result was trusted

**Bug 1 — DR4 could walk straight across a verb boundary.**
`expandSubjectNP`'s backward walk had no notion that an auxiliary verb can
never sit inside a subject NP. Against the UDHR's own preamble ("the
peoples of the United Nations **have** in the Charter reaffirmed their
faith…" — a fronted adverbial between the auxiliary and its main verb),
the base MATCHER's own bare anchor lands on "the Charter" (nowhere near
the true subject, a pre-existing limitation independent of DR4), and
widening blindly from there walked the ENTIRE preceding clause — "have",
"in", "Nations", "United", "of", "peoples", "the" — as if they were all
ordinary NP-internal words, fabricating `"the peoples of the United
Nations have in the Charter"` as a single subject. **Fixed**: the walk now
refuses outright (returns `null`, keeping the original narrow anchor) the
moment it crosses an auxiliary verb before ever finding a determiner or
`leftBound` — a wrong wider subject is worse than a coarse one, the same
standing rule this file's own span-pairing logic already states
elsewhere. Pinned: `expandSubjectNP directly: refuses to widen across an
auxiliary verb...` and its end-to-end sibling.

**Bug 2 — DR5's aux-skip could drop a bare copula from the vocabulary
entirely.** An auxiliary/modal word ("was", "is", "had", "have"…) is only
a true auxiliary when a real content verb follows it ("was reading"); it
is frequently the clause's OWN main verb instead — a bare copula ("There
**was** nothing so very remarkable in that") or a possessive ("the book
**had** pictures"). The identical ambiguity `phasepost.js`'s own header
already names for have/has/had ("an auxiliary only when a verb follows").
The first cut of `tallyAfter` unconditionally skipped every aux
occurrence looking for something past it, with no fallback — so on real
prose (Alice's Adventures in Wonderland) it silently dropped "was" from
the vocabulary on every sentence where nothing verb-like followed,
losing real edges the pre-DR5 pipeline correctly found (measured: Alice's
pipeline-edge count collapsed 4→1 the first time this was run for real).
**Fixed**: the aux word is now tallied as an ADDITIONAL candidate (never
instead of continuing to look past it) — both readings get independent
evidence, and MATCHER's own greedy `AUX_GROUP_RE` still prefers the
longer aux+verb combination whenever a real vocab verb genuinely follows,
so this does not reopen the swallow bug DR5 was built to close. Pinned:
`DR5 on: a bare copula... is still nominated as a candidate` +
`extractRelations, handed a vocabulary where the aux IS the only real
verb, extracts the bare copula correctly`.

Both bugs are only reachable with `posPrior` absent or under-informed —
in the real pipeline (`loadOrgans`, POSPrior@1 loaded) the vocabulary
gate (`grammarMinShare`, P41) independently filters most of the noise
either fix's own permissiveness could otherwise admit (e.g. "in" or
"nothing" nominated as spurious candidates); disclosed rather than
assumed, both fixes were re-verified against the REAL pipeline (with
posPrior wired), not just the isolated unit tests.

## The measurement, honestly

Aggregate, DR4/DR5 OFF (the pre-existing baseline) vs. ON (both fixes in
place), across all four goldens (kant, alice, udhr, ripgrep):

| | OFF | ON |
|---|---|---|
| matched | 15 | 15 |
| missed | 34 | 34 |
| pipeline edges (kant/alice/udhr/ripgrep) | 4/4/5/4 | 4/4/5/4 |
| wrong-relation | 8 | 9 |
| garbled-subject | 9 | 9 |
| garbled-object | 2 | 3 |
| unresolved-pronoun | 1 | 0 |

**The aggregate is a wash on this small, 4-specimen set — not a
regression, and not the clean win DR4/DR5 were built hoping for.**
Diffing the actual content (not just counts) shows real movement in both
directions:

- **Genuine wins.** Kant: `the Copernican Revolution...` now correctly
  keeps its determiner (DR4). Alice: `the book —had→ pictures or
  conversations in it` moved from **MISSED** to **matched** — a real edge
  DR5's copula fix recovered. `unresolved-pronoun` disappeared entirely
  (1→0).
- **A reassignment, not a real loss.** `nothing so very remarkable —was→
  in that` moved from matched to MISSED — but the underlying pipeline
  edge that used to (weakly) match it is still present; the greedy
  best-match assignment in `diff-golden.mjs` picked a different golden
  row for it once the surrounding vocabulary shifted. Not a capability
  lost, a scoring artifact of a small golden set and a greedy matcher.
- **Two small, real, disclosed costs.** `wrong-relation` and
  `garbled-object` each rose by one — DR4/DR5 widen what gets captured,
  and a wider capture occasionally captures the wrong thing too. Neither
  fabricates a false claim (this tier still emits nothing without a
  literal match); both are visible, typed gaps in `diff-golden.mjs`'s own
  output, not silent failures.

**What this measurement does and does not license.** It licenses shipping
DR4/DR5 as tested, opt-in, and turned ON for `diff-golden.mjs`'s own
measurement purpose (this driver exists exactly to keep re-measuring
against the hand-rolled goldens as the pipeline changes). It does NOT
license flipping them on for the corpus-wide sweep — `eot-digest.mjs`'s
own `main()` still omits both, so all 2,208 already-digested sidecars are
untouched, and a real decision to re-sweep the whole corpus under DR4/DR5
is separate, larger, unstarted work: this 4-specimen set is far too small
to certify a corpus-wide default, and the honest aggregate result above
(a wash, not a win) is itself the reason not to rush that decision.

## Suites

eoreader7 native: 341/341 (320 pre-existing + 21 new: 17 from the
original DR4/DR5 pass, 4 from this pass' own two bug fixes), confirmed
via `git stash` (true baseline, untracked test file moved aside during
the comparison) to be zero regressions. the-fold: 1485/1433/47,
byte-identical to its own `git stash` baseline — hypergraph.js's own
suite and the full repo suite both unaffected (the change is additive and
organ-injected; nothing in the-fold calls relations.js directly).
