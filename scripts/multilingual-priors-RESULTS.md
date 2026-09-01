# "As many languages as possible" — where the wall actually is

*Answers "yeah let's use verbnet, why not? I thought we were. what about
unimorph? can we do this for as many languages as possible?" (user,
2026-09-01). Re-runnable: `node scripts/build-pos-prior-multi.mjs`.
Companion to `scripts/eot-sidecar2-RESULTS.md`'s same-day VerbNet-wiring
section.*

## The answer, before the evidence

**No — and the reason is structural, not a coverage gap that more data
would close.**

The act-typing tier this pass just wired rests on **ActPrior@1, built
from VerbNet**. VerbNet is English-only *by construction*: Levin classes
are a theory of English verb alternations, not a universal inventory
anyone has ported. There is no Spanish VerbNet, no Arabic VerbNet. So
the capability that answers "what act does this verb perform" **cannot
be extended to another language by adding data** — it would need a
different theory of that language's verbs, built from scratch.

What *can* extend is the layer underneath it: POS priors, which elect
which token of a relation is the content head. That is genuinely
language-neutral, and it now covers Arabic, Spanish, and Chinese. But a
head-election layer **classifies nothing on its own** — it feeds a
ladder (the frame table, the copula rules) that is itself English-
specific, hand-adjudicated from English UDHR phrasing.

So, precisely:

| layer | English | ar / es / zh | sw |
|---|---|---|---|
| act typing (VerbNet) | **wired, measured** | impossible without a new per-language resource | impossible |
| lemma bridge (UniMorph) | **wired** | serves nothing without the above (see below) | no matching-register data |
| head election (POS prior) | wired | **built this pass** | no data upstream |
| construction ladder (frame table, copula rules) | hand-built | not attempted — needs a new frame table per language | not attempted |

## Why no morphology prior ships, for any language

A morphology prior does exactly one job here: bridge an inflected
surface form to a lemma so **ActPrior can be looked up** (this is what
made `known` → `know` → EVA work in the English tier). With no
non-English ActPrior, a non-English morphology prior is a bridge to a
destination that does not exist.

This was found the expensive way, and it is worth recording. A Spanish
morphology prior WAS built from real, verified `unimorph/spa` data —
873,811 forms, 1,196,224 rows, cross-checked against real UDHR
inflections (`derechos`→`derecho`; `fueron`→`{ser, ir}`, ambiguity
correctly preserved). It measured **24.5MB compact — roughly 34x the
largest artifact otherwise committed in this repo**. Two things then
became clear at once: it matched no consumer, and it matched no
established design either (eoreader7's `morphology-eng.json` stores only
the **irregular tail** — 5,531 kept of 224,550 raw pairs, 216,011
dropped as rule-recoverable, "regular inflections are recovered by
stemsOf at read time" per its own provenance). It was deleted rather
than committed. **The tell was the documentation**: when the disclosure
explaining why an artifact does not match its own design runs longer
than the artifact's justification, the artifact is the thing to cut.

Recorded so a future pass does not rebuild it as busywork: re-add a
non-English morphology prior **only alongside a real consumer**, and if
so, in the irregular-tail shape — which additionally needs a per-language
regular-inflection rule that does not exist in this checkout for ANY
language (the script that built the English one is not in either repo;
its provenance points at a different session's now-gone scratchpad).
Pinned as a test.

## What was verified, live, per resource

`api.github.com` is scoped to four unrelated repos in this session and
returns *"GitHub access to this repository is not enabled"* for anything
else — **not a real 404**, and no signal about whether a repo exists.
All verification below is direct `raw.githubusercontent.com` fetch (the
same channel `build-pos-prior.mjs` already used) plus the orgs' own
public search pages where a repo name had to be found rather than
guessed.

**Universal Dependencies — 3 of 4 real:**

| lang | repo | splits | result |
|---|---|---|---|
| Arabic (arb) | `UD_Arabic-PADT` | 200/200/200 | **built** — 24,904 forms |
| Spanish (spa) | `UD_Spanish-AnCora` | 200/200/200 | **built** — 38,718 forms |
| Chinese | `UD_Chinese-GSD` | 200/200/200 | **rejected — wrong script** |
| Chinese (cmn_hans) | `UD_Chinese-GSDSimp` | 200/200/200 | **built** — 20,147 forms |
| Swahili (swh) | `UD_Swahili-OPUSGV` | no `.conllu` anywhere | **gap** |

*The Chinese script catch.* `UD_Chinese-GSD` answers 200 on every file —
by "does it exist" alone it was the obvious pick. Reading the actual
bytes first found **Traditional** characters (`看似簡單`, `決擇`) while
this project's own golden is `udhr-cmn_hans` — **Simplified**. That prior
would have silently matched almost nothing, with no error anywhere to
catch it. `UD_Chinese-GSDSimp` is UD's own Simplified conversion.

*The Swahili gap.* `UD_Swahili-UCB` was a guess and does not exist —
refused rather than retried under variant spellings. The org's own search
found the real entry, `UD_Swahili-OPUSGV`; its root listing and its
`/tree/master` listing agree independently: `CONTRIBUTING.md`,
`LICENSE.txt`, `README.md`, **no data file**, despite its README claiming
`"Data available since: UD v2.8"`. An upstream defect, typed into the
manifest, never a placeholder file.

**UniMorph — investigated, nothing shipped** (per the section above; the
findings stand on their own as a map of what exists):

| lang | found | register match? |
|---|---|---|
| Spanish | `unimorph/spa` — real | yes |
| Arabic | `arb` 404; `arz` (Egyptian), `afb` (Gulf) real | **no** — UDHR is Modern Standard |
| Chinese | none, under any code; org search "chinese" → zero | — (principled: little inflection to tabulate) |
| Swahili | `swa`/`swh` 404; `swc` (Congo Swahili) real | **no** — UDHR is standard Kiswahili |

Arabic and Swahili are the interesting refusals: a real, live resource
exists in each case, for the wrong register. Substituting Egyptian
Arabic's paradigms for Modern Standard, or Congo Swahili's for standard
Kiswahili, fails **silently** rather than loudly — refused on the same
grounds this project refuses a dialect-blind name match elsewhere.

## A real bug, caught before it shipped

Every prior-build script accumulates counts via `forms[form] ??= {}`.
`"constructor"` is a genuine attested word in both UD_Spanish-AnCora and
UniMorph's Spanish table — and against a plain `{}` that key resolves
through `Object.prototype` to the `Object` function instead of creating a
fresh accumulator. The stricter `.add()` path threw; **the POS-prior
path would NOT have thrown** — it would have silently assigned onto the
global `Object` and lost that word's counts. Checked both ways: English
EWT has no colliding token (so the already-committed `pos-prior-en.json`
was never corrupted — reconfirmed byte-identical after the fix), while
`pos-prior-es.json` was genuinely one distinct form short (38,717 vs. the
correct 38,718) before the catch. Fixed with `Object.create(null)`
everywhere the pattern appears, including preventively in the
pre-existing English script. Pinned as a regression test.

## Files

`scripts/build-pos-prior-multi.mjs` → `derived-priors/pos-priors/
pos-prior-{ar,es,zh}.json` + `MULTILINGUAL-MANIFEST.json` (built list and
typed gap list, machine-checkable). `scripts/multilingual-priors.test.mjs`
(5 cases). `scripts/build-pos-prior.mjs` gained the same
`Object.create(null)` fix, output reconfirmed unchanged.

## What this does not claim

The three new POS priors have **no consumer today** — `headOf` is called
only from the English ladder. They are checkpoints, the same standing
`pos-prior-en.json` held before this session wired it in, and they are
committed because they are small, in-norm, verified, and the honest
substrate for any future non-English work. Calling them "three more
languages supported" would be false: **capability extended to one
language (English, via VerbNet); substrate extended to three; the wall
named precisely.**
