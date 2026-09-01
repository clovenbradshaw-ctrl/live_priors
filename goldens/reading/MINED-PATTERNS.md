# Mining the corpus's own past readings for rules nobody hand-typed

DERIVED-RULES.md was worked backward from 4 hand-adjudicated specimens (49
rows, one reader). This asks the same question of the 2,208 sidecars the
full corpus sweep already produced and this repo already commits — no new
reading, no hand adjudication, no golden. `scripts/mine-extraction-
patterns.mjs` (re-runnable) walks every `.eot.json`, aggregates what the
pipeline actually admitted, and reports structural signatures across real
admitted edges. Every finding below has its own count and worked examples
pulled from real documents — the same standard DERIVED-RULES.md holds
itself to, at 45x the sample size.

**Standing, same as DERIVED-RULES.md's own header states of itself: these
are PROPOSALS, not policy.** Adopting any of them is its own pass with its
own validation.

## The headline number

**0.219 admitted edges per sentence, corpus-wide** — roughly one relation
for every 4.5 sentences. 388/2,208 documents (17.6%) have real content and
**zero** extracted edges. This is the same recall problem DERIVED-RULES.md
found on 4 specimens, now confirmed at the scale of the whole corpus
rather than argued from a sample that could have been unrepresentative.

**The admission gate is not where this is happening.** `admission.offered
=== admission.heard` on every sidecar sampled — the hyperlexicon's own
refusal mechanism (P57) essentially never fires in this corpus. The
33,000+ edge shortfall is upstream, at extraction and vocabulary
discovery, never reaching a point where anything could be turned away.
Worth knowing before spending effort on the admission layer: it isn't
broken, it just rarely gets the chance to do anything.

## Register density, at 2,208 documents instead of one changelog

| register | docs | density | content-no-edges |
|---|---|---|---|
| 10-audio-music | 13 | **0.004** | **92%** |
| 16-wordplay | 1 | 0.023 | 0% |
| 07-images-media | 2 | 0.030 | 50% |
| 15-western-canon | 16 | 0.069 | 0% |
| 09-source-code | 38 | 0.125 | 11% |
| 05-academic-papers | 96 | 0.135 | 28% |
| 01-literature-books | 45 | 0.183 | 2% |
| 11-multi-language | 265 | 0.211 | 10% |
| 06-government-legal | 1221 | 0.225 | — |
| 02-encyclopedic | 54 | **0.524** | — |

DR8 (register priors) was built from ripgrep's changelog alone. At scale
it both confirms and sharpens: **06-government-legal (1,221 docs, the
corpus's largest register) reads FINE** (0.225, near corpus average) — so
"legal/imperative register" was never the real hazard; it was specifically
the terse, bulleted, line-initial-verb shape of a software changelog,
which `09-source-code` (0.125) partially but not fully reproduces.

**Two new register classes DR8 never named, both worse than the changelog
case it was built from:**
- **Audio/image catalogs (10-audio-music, 07-images-media) are nearly
  illegible to prose SVO extraction** (density 0.004–0.030, up to 92%
  zero-edge). This is very likely not a register-prior fix (a smarter
  verb veto) but a routing question — this material is TABULAR/metadata-
  shaped, and this repo already has a real tabular-reading organ
  (`the-fold`'s `measure.js::sniffContainer`/`delimitedTable`) that a
  catalog-shaped source should be routed to instead of prose SVO
  extraction. Unattempted here — a routing decision, not a parameter.
- **Western canon / verse-and-dialogue material (0.069)** — Shakespeare's
  own Folger texts, speaker-name-headed dialogue in blank verse. A
  genuinely different sentence shape from either prose or a changelog;
  no rule proposed here, named as a real, distinct register worth its
  own investigation.

## Structural signatures across 33,504 sampled admitted edges

**`midWordGlue` — 426 edges (1.27%), and it generalizes DR10 exactly.**
Every real hit (after excluding a genuine false-positive class this
mining pass found and fixed — surnames with a legitimate internal capital,
McDonald/MacCauley/O'Brien-shaped) is a wikilink-glue artifact: display
text concatenated with its link target, no separator — `"Classical
AthensAthens"`, `"Alexander the GreatAlexander"`, `"TheravadaTheravāda"`.
100% clustered in `02-encyclopedic/wikipedia`. This is the same defect
CLAUDE.md's own P38 section already named for `extractSurfaces` (a pipe-
glued search-result title) and a comma-glue bug before that — the same
class recurring a third time, in a different extraction path, at real
scale. A real fix belongs in whatever strips wikilinks before extraction,
not in relations.js.

**`containsNewline` — 522 edges (1.56%)**, a sibling of DR10 rather than
the same bug: a sentence-final word bleeding across a hard-wrapped line
break into the NEXT sentence's subject capture (`"career\nFlorence —was→
free..."`). Concentrated in Gutenberg-sourced literature.

**`subjectStartsPronoun` — 2,490 edges (7.43%)**, real and substantial
confirmation of DR7 (pronoun/topic resolution) at scale — nearly 1 in 13
of every admitted edge in the corpus has a pronoun or demonstrative
subject that survived all the way to admission. Some are genuinely hard
(`"It —was→ to Julius II that Machiavelli was sent"`, a cleft
construction); most are the plain unresolved-antecedent case DR7 already
named.

**`verbNonVerbShaped` — 0%** across all 33,504 edges. A genuine positive
finding, not just a negative one: the POS vocabulary gate (P41, wired into
every one of these sidecars' own recipe) is holding — none of a
function-word-shaped verb list slipped through at this scale. Whatever
else is wrong with extraction, the vocabulary gate that was built and
validated earlier this project is doing its job.

**Subject token-length histogram: `{"1": 9241, "2": 24263}` — only 1 and
2 ever appear.** This is not a new finding — it is confirmation that
**every one of these 2,208 sidecars was read with DR4 (whole-NP subjects)
turned off**, exactly as `eot-digest.mjs`'s own `main()` is designed to do
(opt-in, default false, so the committed corpus stays untouched). It means
this corpus cannot yet answer the one question most worth asking next:
does DR4/DR5 actually help at a sample size 45x larger than the 4 goldens
that measured it as a wash? That is a concrete, cheap, well-motivated next
experiment — re-sweep with `phrasalPredicates`/`nounPhraseSubjects` on and
diff the same density/signature metrics against this baseline — not
attempted in this pass.

## What this pass deliberately did not do

Fix anything. Re-sweep the corpus under DR4/DR5 to test it at scale. Build
a catalog-routing decision for audio/image material. Investigate verse/
dialogue registers. Wire any of this into a persisted, injectable prior —
see the companion note on structural memory below for why that is a
separate decision, not a natural continuation of a mining script.

## On "holding past readings in mind" as structure, not just surprisal

The existing memory mechanisms (`aperture.js`/`reflex.js`, P45's
`retrieval.js`/`consequence.js`) hold conversational turns in mind by
SURPRISAL — need-odds, novelty, what's worth re-surfacing. What this
mining pass demonstrates is a different kind of memory: not "was this
turn surprising" but "what does this REGISTER structurally look like,
learned from every past reading of it." The register-density table above
is exactly that — a fact about `10-audio-music` as a KIND, measured from
13 real readings, that a 14th reading in the same register should be able
to draw on without re-discovering it from scratch.

**That is a real, different thing from this mining script, and building it
is its own pass.** Concretely, it would mean: persisting the register-level
statistics above as a giver-named prior (`derived-priors/register-
structure/`, matching the `act-priors/`/`fold-reading-priors/` convention
already established), keyed by corpus directory; and — the harder, real
design question — deciding whether a NEW reading should ever consult it
before or during extraction (which would make the prior load-bearing,
crossing from "diagnostic" to "part of the pipeline," the same weight
this project already treats every other injected organ with) versus only
after, as a disclosure. Not decided here.

## Files

`scripts/mine-extraction-patterns.mjs` (new, re-runnable, reads only) +
`scripts/mined-patterns.json` (its own output, committed so the numbers
above are reproducible from the repo alone, matching P19/P27's posture
for eval drivers).
