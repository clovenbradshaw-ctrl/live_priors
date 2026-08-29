# DR4/DR5 measured across all 2,208 sources, not just 4 goldens

MINED-PATTERNS.md named this as the natural next experiment: every
committed sidecar was read with `phrasalPredicates`/`nounPhraseSubjects`
off, so the corpus could confirm the recall problem but not say whether
DR4/DR5 actually help at scale. `scripts/measure-dr45-at-scale.mjs` runs
the same 2,208 sources through the same reader with both on — `write:
false` throughout, nothing on disk touched, no re-sweep, no risk to the
committed corpus. 167.3s, 0 errors.

**The headline confirms the 4-golden result, and this time it isn't a
small-sample shrug: density 0.2191 → 0.2177 (-0.6%), 33,679 → 33,476
edges.** DR4/DR5 do not move recall at 45x the sample size either. But
unlike the 4-golden result, this run has enough data to say WHY — and the
answer is not "nothing happened."

## DR4 is structurally doing real, substantial work

Subject token-length histogram, old vs. new:

| tokens | old | new |
|---|---|---|
| 1 | 9,241 | 8,389 |
| 2 | 24,263 | 10,291 |
| 3 | — | 4,326 |
| 4-6 | — | 6,376 |
| 7-10 | — | 2,483 |
| 11+ | — | 1,442 |

The old histogram is capped at 2 by MATCHER's own construction — every
edge in the whole corpus, always. The new one has a real spread past 2,
all the way to 11+: **44.8% of all 33,307 sampled edges now carry a
subject longer than 2 tokens**, up from a structural zero. `expandSubjectNP`
is not a no-op at scale; it is doing exactly what it was built to do.

## The recall wash has a precise, register-level explanation

| register | docs | old density | new density | Δ |
|---|---|---|---|---|
| 01-literature-books | 45 | 0.183 | 0.201 | **+9.6%** |
| 05-academic-papers | 96 | 0.136 | 0.142 | +5.1% |
| 09-source-code | 38 | 0.125 | 0.135 | +8.4% |
| 14-holy-texts | 452 | 0.225 | 0.234 | +4.0% |
| 11-multi-language | 265 | 0.211 | 0.218 | +3.3% |
| 15-western-canon | 16 | 0.069 | 0.071 | +2.9% |
| **06-government-legal** | **1,221** | **0.225** | **0.217** | **-3.7%** |

Most registers improve modestly and consistently — DR4's real widening
recovers real edges in ordinary prose, matching the two genuine wins the
4-golden pass already found (a kept determiner, a recovered "book had
pictures" edge). **But `06-government-legal` is 1,221 of the corpus's
2,208 documents — 55% of everything read — and it is the one register
that got WORSE.** Document-weighted, one register's regression is large
enough to cancel every other register's gain. This is not a vague
"it's a wash" — it is one specific, large, identifiable regression
sitting on top of several smaller, real improvements. WHY government-legal
regresses specifically is not diagnosed in this pass — a real, scoped,
named next question, not guessed at here.

## The real, quantified cost: DR4 more than TRIPLES the newline-crossing rate

| structural signature | old | new | ratio |
|---|---|---|---|
| containsNewline | 1.56% | **5.01%** | **×3.22** |
| midWordGlue (wiki-glue) | 1.27% | 1.88% | ×1.48 |
| subjectStartsPronoun | 7.43% | 8.33% | ×1.12 |

This is the mechanism behind the wash, made concrete: a wider backward
walk has more opportunity to cross a hard-wrapped line break or a
wikilink-glue boundary than a 1-2 token capture ever did, simply by
covering more ground. MINED-PATTERNS.md already named `containsNewline`
as a sibling of DR10 (wiki-glue) rather than the same bug; this run shows
DR4 specifically amplifies that sibling defect by more than 3x. **The
newline-crossing fix (bounding `expandSubjectNP`'s walk at a hard line
break the way it already bounds at a comma/semicolon/colon) is now the
single highest-leverage next move** — it is the dominant, quantified side
effect standing between DR4's real structural benefit and a net corpus-
wide win, not a guess about what might help.

## What this changes about the standing recommendation

DR4-DR5-RESULTS.md (the 4-golden pass) said: "a wash in aggregate... not
the clean win either rule was built hoping for." This pass does not
overturn that — it explains it. DR4/DR5 are not neutral in the sense of
"doing nothing"; they trade a real, measured quality gain (wider, more
complete subjects, confirmed structurally) for a real, measured, and now
quantified cost (tripled newline-crossing) plus one specific large
register regression. Turning DR4/DR5 on as the corpus's own default
recipe is still not recommended without first: (1) bounding
`expandSubjectNP` at a hard-wrap line break, and (2) understanding why
government-legal — 55% of the whole corpus — regresses. Both are now
concrete, scoped, evidence-backed next steps rather than open questions.

## Files

`scripts/measure-dr45-at-scale.mjs` (already committed) +
`scripts/dr45-at-scale.json` (this run's own output, committed so the
numbers above reproduce from the repo alone). Nothing on disk was written
by the measurement itself — the 2,208 committed sidecars are untouched,
still the old-recipe baseline.
