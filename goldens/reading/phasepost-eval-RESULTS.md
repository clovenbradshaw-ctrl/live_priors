# The phasepost overlay, scored against the 49 golden phaseposts

DR1 built and validated (2026-08-29). The mapping was declared from
VerbNet's own class semantics BEFORE this scoring ran (the-fold
`eval/build-act-prior.mjs`'s ACT table, every row carrying its because);
nothing in it was tuned against these goldens. Two module fixes were made
after the first run — both from principle, both pinned as tests, both
shown below rather than folded silently into a single "final" number.

## What was built

- **`ActPrior@1`** (the-fold `eval/fixtures/act-prior-en.json`): VerbNet 3
  (NLTK data mirror, 325 Levin-numbered classes, 6,759 member entries) →
  4,569 verb forms, each mapped to one of the NINE ACTS via the declared
  class→act table — 3,697 unanimous, 872 contested (kept as candidate
  sets, POSPrior@1's own never-collapse discipline). Disclosed inside the
  fixture itself: grain deliberately absent (occurrence-level by RULE.md's
  own framing); REC has no clean VerbNet family (a real absence, named);
  three low-confidence family readings flagged (eat/consume as NUL-alt-CON,
  generic change-of-state as SYN-alt-REC).
- **`phasepost.js`** (the-fold): the overlay — mechanical tier (A4
  existential→NUL; the full copula rule read from the predicate's shape),
  lexical tier (ActPrior@1, widened through the REAL UniMorph lemmatizer
  organ hypergraph.js already injects), occurrence-level `grainOf`.
  16 conformance tests against the real engine cube, real fixture, real
  lemmatizer — no stubs. An overlay, never a gate: refuses nothing,
  candidate sets stay candidate sets (P56).

## The score

| measure | first run | after two principled fixes |
|---|---|---|
| op, exact (asserted verdicts) | 18/22 (82%) | 18/22 (82%) |
| op, golden ∈ candidate set (contested) | 16/20 (80%) | 18/21 (86%) |
| typed gaps (never guessed) | 7/49 | 6/49 |
| grain (all grained rows) | 32/42 (76%) | 32/43 (74%) |
| copula tier alone | 6/6 | 6/6 |
| mechanical tier alone | 1/1 | 1/1 |

The two fixes, and why they are principle rather than golden-tuning:
**have/has/had standing alone is the possession MAIN verb** (an auxiliary
only when a verb follows — a fact of English's closed-class grammar, and
"the book had no pictures" was landing a gap on it); and **the
morphological re- rule** the fixture's own header had promised and the
module had not implemented (RULE.md's own REC examples — recanted,
reinterpreted, revised — wear the prefix; REC joins as a DISCLOSED
candidate where the un-prefixed remainder is attested, never an override,
because only the occurrence can tell re-doing from re-grounding).

## The 13 remaining misses, decomposed — every one a named cause

**Received-prior data gaps (5):** "born" ×3 — the vendored UniMorph
irregular table has no born→bear entry, so three INS rows (including the
UDHR's flagship "All human beings are born free") land typed gaps;
"ran" ×2 — UniMorph maps ran→"rin" (a dialectal lemma), not ran→run.
Both are facts about the received prior, not the mapping — the fix is
upstream (a corrected/extended MorphologyPrior build), not a hand rule
here.

**Structural limit (1):** "was just in time to see" — a catenative
construction whose act-bearing head is the final infinitive; `headVerb`'s
first-non-auxiliary rule picks "in". Disclosed; a real fix needs the
DR5 phrasal-predicate work, not a smarter token skip.

**VerbNet-vs-golden reading divergences (7):** centered→focus-87.1 (SIG)
vs golden CON·Ground; motivated→compel-59.1 (DEF) vs golden EVA·Ground
(the golden's own alt was CON — three defensible readings of one word);
argues→social-interaction classes (CON/SIG) vs golden DEF;
drew(a parallel)→five-way contested without CON — the light-verb
construction "draw a parallel" is not draw's own class; determined→
contested EVA/SIG vs golden DEF; pledged→begin-55.1 (INS — VerbNet's own
aspectual membership, a data oddity) vs golden CON; act(towards)→act-114
(SIG) vs golden CON·Pattern. Each is VerbNet's real class structure
meeting a defensible different judgment — the kind of divergence a second
adjudicator pass and a FrameNet-backed second giver would arbitrate, not
a bug to patch.

## What the numbers honestly say

- **The mechanical + copula tiers are the reliable core**: 7/7 on their
  rows, exactly as DERIVED-RULES.md predicted (~31% of assignments
  decidable without any lexicon — those tiers should be trusted first).
- **The lexicon asserts correctly when unanimous** (8/10 lexical), and
  its contested sets contain the right answer 86% of the time — a caller
  that treats contested as "narrow by context" rather than "unknown"
  keeps most of the signal.
- **Grain is the weak half (74%)**, as disclosed at build time: the
  three-way mechanical rule (universal subject → Pattern, locative/absent
  object → Ground, else Figure) misses Ground readings whose groundness
  lives in the SUBJECT ("Kant's philosophy…" rows) and Pattern readings
  carried by habitual aspect. A real grain rule needs the DR4 whole-NP
  work (the subject's own shape) — the same lever, again.
- **Nothing was guessed**: every non-answer is a typed gap or a candidate
  set. 49/49 rows got either an honest verdict, an honest set, or an
  honest refusal.

## What this unlocks, and what it does not

An edge carrying `{op, grain}` (or a candidate set) is now producible for
real material — requirement 1 of the reasoning contract. The legality
machinery (reaction substrate, checkCubeProgression, grain-crossing
licences) can now be fed — but nothing is wired into the live pipeline by
this pass, deliberately: the overlay's own numbers above say which tiers
deserve trust first, and adopting it into the corpus recipe is its own
decision with its own validation (LP6's fresh-sweep discipline would
apply).

## The felt-sense experiment — company-similarity tried on the gaps, honestly negative at this scale

The direction, received directly the moment the gap numbers landed:
*"things like 'born' is a gap, but i bet we can infer what type of
transformation it is by the shape and its similarity to other things — we
need to build towards a true felt sense of meaning."*

Search-first found the organ already built for the similarity half:
`roles.js::resolveSpanRole` (eoreader6.1) — role as a caller-declared
label, resolved by the same one-hop activation recall pronoun binding
already trusts. The nine acts were declared as the roles; every
unanimously-attested verb in the material stood as evidence; the gap verb
("born", "ran") was the unknown. Run at both the golden-window scale and
the full 8000-char excerpt scale, at `host/corpus.js`'s own declared
operating point (`felt-sense-experiment.mjs`, re-runnable):

**bound 3 / hits 0 / wrong 3 / refused 9.** Every binding that fired
bound the gap to the act DOMINATING ITS SENTENCE'S TOPIC (Alice's "ran"
→ NUL amid the "nothing so very remarkable" paragraph; Kant's "born" →
SYN amid the works-and-influence company) — which is exactly the failure
eoreader6.1's own CLAUDE.md already recorded for this mechanism at
sentence frames, confirmed here on a third independent question:
**one-hop company-similarity measures TOPIC, not ACT.** A verb's
neighbours say what the sentence is about; they do not say what kind of
transformation its verb performs.

**The hypothesis is refined, not refuted.** The intuition named two
carriers — similarity AND shape — and the experiment discriminates
between them: bag-of-company similarity is the wrong carrier for
act-hood; SHAPE is the promising one, in both its senses. (1)
**Morphological shape**: "born" is an irregular participle (torn/worn/
sworn/borne's own pattern); the vendored MorphologyPrior's missing
born→bear entry is the actual defect, and even fixed, "bear" is
contested (EVA/INS/CON) — candidate-level recovery, honestly. (2)
**Frame shape**: which argument structures the verb takes — VerbNet's
own organizing principle, meaning ActPrior@1's giver already encodes
frame→class; a gap verb's OBSERVED frame ("was born in PLACE" — passive,
locative adjunct, patient subject) matched against the frames of attested
acts is the real "felt sense of the transformation," and it is unbuilt:
a frame-similarity tier is real, scoped, next work — not another
company statistic, which this experiment just measured to carry the
wrong signal.
