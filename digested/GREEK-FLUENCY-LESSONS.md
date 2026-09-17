# GREEK-FLUENCY-LESSONS — every lesson tagged to its provenance

**Dated:** 2026-09-17
**Giver:** eoreader7 `native/eval/lavar/` (the Wilson swarm + eot-jsonl reader) and the one-master case-prior builder (`native/scripts/build-latin-case-prior.mjs`)
**Data:** UD_Ancient_Greek-PROIEL (Koine, train 15,016 sentences) and UD_Ancient_Greek-Perseus (Classical Attic/Ionic, train 11,476 sentences), fetched 2026-09-17
**Related law:** S40 (positional reader breaks on case-marked languages), S90 (the two-end gate), P56 (settled means refusable), LP7/LP19 (ground and shape), identity-is-the-fold (identity by consequence)

Each lesson below carries its own provenance: what was measured, on what, by what, at what confidence. A lesson without its source is a rumor; these are measurements.

---

## 1. The swarm was deaf for a wiring reason, not a material reason

**Lesson:** The Wilson swarm refused every variant for its entire recorded history (416 births, 0 kept) because the elenchus gate fed the **correction delta** (f2−f1 from the reread, routinely negative) into `bornAcceptance`, whose contract says *improvement over the best*. A candidate that beat the best by +0.013 (noun-phrase-subjects 0.574 vs earned-only 0.561, Alice ch1) was refused because its reread delta was −0.365.
**Provenance:** measured on `wilson.mjs` genealogy (`results/swarm-genealogy.jsonl`, 416 births / 207 fates: 128 retried, 79 refused, 0 kept) against the elenchus-bar contract (`elenchus-bar.mjs` bornAcceptance doc). Fixed 2026-09-16: gate admits on improvement-over-champion (`swarm-gate.mjs`).
**Confidence:** high — the refusal and the fix are both directly observed in the genealogy.

## 2. The positional reader breaks on case-marked free-order Greek (S40, confirmed)

**Lesson:** The positional subject-verb-object pattern cannot read a pro-drop, free-word-order language. On Epictetus' *Enchiridion* (Koine, ~100 CE), the S90 gate ("needs a subject group AND an object group") refused 254 of 259 sentences.
**Provenance:** measured on `epictetus-enchiridion.txt` ch1 (61,814 bytes) through `eot-jsonl.mjs --lang=grc`; 259 sentences, 5 propositions, 254 absences at reason `gate_refused_no_two_ends` before the seam.
**Confidence:** high — the gate's own reason string is on the ledger.

## 3. The earned vocabulary needs the prior as sole authority on Greek

**Lesson:** On free-order Greek the positional slot-measure earns whatever sits in the verb slot — measured: it earned "καὶ" (and), "τὸ" (the), even the file's English front-matter keys ("source", "license") as verbs. The widening ADDS prior-confirmed verbs but never removes an un-confirmed earning. For Greek the received POS prior must confirm the earned vocabulary; an un-confirmed proposal is refused.
**Provenance:** measured on `results/epictetus-*.prior.json` (18 "earned verbs", 5 of them non-verbs); gate = `confirmGreekVerbs` in `greek.mjs` gated to GREEK.
**Confidence:** high — the bad vocabulary is on disk.

## 4. Greek accents move between cases — stems must strip diacritics

**Lesson:** The accent is mobile across a Greek paradigm (θά-να-τος nom → θα-νά-του gen). Raw longest-common-prefix stem matching sees the shifted accent as a different word; ending lookups on accented finals fail ("τόν" → "όν" ≠ "ον"). Stem matching and ending keys must run on the NFD-diacritic-stripped skeleton.
**Provenance:** measured by character codes on `θάνατος`/`θανάτου` (3b8,3ac,3bd,3b1,3c4,3bf,3c2 vs 3b8,3b1,3bd,3ac,3c4,3bf,3c5 — accent at position 2 vs 4); fixed in `greek.mjs strip()` and the builder; Latin byte-identical (ASCII no-op).
**Confidence:** high — the byte difference is deterministic.

## 5. The Greek ending carries the FULL verbal paradigm — a native speaker reads it from the verb itself

**Lesson:** The finite verb's ending settles person, number, voice, mood AND tense — not just person. Measured decisive shares (top reading ≥0.7 at volume ≥15) per 3-char ending on PROIEL's 23,405 finite verbs: **Person|Number 215/220, Voice 213/220, Mood 206/220, Tense 193/220**. The reader now settles all four (`paradigmOf`), each mapped to its cube cell, glossed in any language with declared terms.
**Provenance:** measured on `grc_proiel-ud-train.conllu` (fetched 2026-09-17), tallied by the one-master builder → `case-marking-grc.json` (`verbVoiceByEnding`, `verbMoodByEnding`, `verbTenseByEnding`).
**Confidence:** high — decisive-share counts are in the prior's ranked tables.

## 6. NOT ALL GREEK IS MADE EQUAL — the period is part of the prior's provenance

**Lesson:** Ancient Greek spans ~1,500 years of change; Koine (Epictetus, NT) and Classical Attic (Plato, Aristotle, tragedy) are different projections of the same cube. Built a Classical prior from UD_Ancient_Greek-Perseus and measured where the two periods disagree on the SAME ending's top person: **7 endings differ** — e.g. `-θην` reads Koine **1|Sing** (1.00) but Classical **3|Dual** (0.79); `-τον` reads Koine **3|Plur** (0.80) but Classical **2|Dual** (0.44); `-ιεν` Koine **3|Plur** (0.86) vs Classical **3|Sing** (0.53). The prior must be chosen per period; the cube cells are the same, the endings are not.
**Provenance:** measured by intersecting the verb-ending tables of `case-marking-grc.json` (PROIEL/Koine) and `case-marking-grc-classical.json` (Perseus/Classical), both built by the same one-master builder from the two treebanks fetched 2026-09-17.
**Confidence:** high — both priors are on disk with their givers; the 7 disagreements are computed from their ranked tables.

## 7. The article is a case probe, never a being

**Lesson:** In Greek, the definite article (ὁ/τοῦ/τῷ/τόν) is the case probe where English uses capital letters. The clause reader's nominal set must exclude DET — an article is a determiner, not a being, and including it pollutes both case-marked roles and referent discovery.
**Provenance:** design decision enforced in `greek.mjs` (`CLAUSE_NOMINAL` excludes DET); the article-as-case-probe thesis is measured by the beings tier (`greekBeings`: 17 beings from article-cased stems on the Enchiridion).
**Confidence:** high — the beings tier's output is on the ledger.

## 8. Bare nominals are case-marked phrases too

**Lesson:** Greek predicate nominatives are often bare (no article) — "ὁ θάνατος ἐστίν φόβος" has no article on φόβος. The case-marked clause reader must collect bare case-marked nominals on their own ending, or the copula-complement shape is invisible. Effect: case-marked clauses 17 → 105 on the Enchiridion.
**Provenance:** measured on the Enchiridion ledger before/after the bare-nominal collection (17 → 105 case-marked propositions); the copula thesis shape is the Enchiridion's opening claim.
**Confidence:** high — before/after counts on the same material.

## 9. The Greek article is a determiner, not an unbound pronoun

**Lesson:** The void alarm fires on a third-person pronoun the reading cannot bind. The grc pronoun set included the article forms (ὁ/ἡ/οἱ/τά…); measured on the Enchiridion they flagged 168/259 sentences as voids — the determiner flood drowning the signal. The void scan uses the true pronoun set (αὐτός family); voidRate 0.65 → 0.16.
**Provenance:** measured on the Enchiridion ledger before/after (`VOID_PRONOUNS` in eot-jsonl, gated to GREEK).
**Confidence:** high — before/after counts on the same material.

## 10. ASCII `\b` is dead on non-Latin — a measurement bug, not a text property

**Lesson:** reading-shape's referent purity used the ASCII word boundary `\b`, which treats Greek letters as non-word characters — so referentPurity was silently **0 for all non-Latin material**. Unicode lookarounds `(?<![\p{L}\p{N}])` fix it; English is byte-identical.
**Provenance:** measured on the Enchiridion (purity 0 with 17 real beings on the ledger); fixed in `reading-shape.mjs`.
**Confidence:** high — the regex's behavior on Greek is deterministic.

## 11. The cube IS the universal grammar; a language is a projection

**Lesson:** The cube's 27 cells generate the grammatical category space — Case/Person/Number/Mood/Voice/Tense/Aspect map to cells (`CELL_OF_GRAMMAR` in `kernel/cube.js`). A language's morphology prior is the cube worn by its surfaces: `-εις → 2|Sing → SIG·Figure (the addressee)`, `-μαι → 1|Sing → SIG·Ground (the speaker as unstated ground)`, `-ος → Nom → SEG·Figure`. The gloss is a projection, renderable in any language with declared terms (eng/ell/fra/spa).
**Provenance:** declared theory, 2026-09-17, this session's analysis; the projections are measured in the two Greek priors (their ranked cells come from `grammarCell`).
**Confidence:** the map is declared and revisable; the projections are measured.

## 12. A native reader reaches a native plateau — the swarm's variance is the residual

**Lesson:** The full Greek reader (beings + persons + case-marked clauses + paradigm) lifted the Enchiridion's swarm shape from 0.584 to **0.984**; the seed's full reader tops the landscape, so the swarm keeps nothing new — the plateau is the fluency, not a failure. Variant pressure returns on harder material.
**Provenance:** measured on the Enchiridion swarm run 2026-09-17 (`results/swarm-genealogy.jsonl`, best earned-only 0.984).
**Confidence:** high — the run's own terrain-champion line.

## 13. Corroboration, hardening, and the wire — the swarm's social lessons

**Lesson:** A breakthrough is a nominee at one site; a THING hardens only on ≥2 independent materials (a rerun is the same witness re-testifying); the self-name is the KIND of difference made (echo is witness history, not identity); the same variant winning text AND vision is ONE thing, hardened across modalities; the wire carries the same operators.
**Provenance:** `swarm-things.mjs`, `swarm-priors.mjs`, `swarm-matrix.mjs` + their tests (swarm-things.test.mjs, swarm-priors.test.mjs, swarm-matrix.test.mjs), all 2026-09-16/17.
**Confidence:** high — each rule is a test.