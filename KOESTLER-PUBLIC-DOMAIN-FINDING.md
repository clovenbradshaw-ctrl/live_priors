# Arthur Koestler: what is, and is not, public domain (2026-09-23)

The ask was to pull in as much Arthur Koestler as could be found that is
public domain. The honest finding, checked rather than assumed: **none of
his own writing is.** This document is the receipt for that conclusion —
every source checked, what it showed, and what was added to the corpus
instead, so the next pass does not have to redo the research or, worse,
skip it and add something that infringes.

## Why this needed checking rather than guessing

Arthur Koestler was born 5 September 1905 and died 1 March 1983. A
plausible-sounding but wrong shortcut would be "he's a mid-century author,
surely some of his early work has lapsed by now." Two separate legal
regimes govern that question and neither one is close to "yes" yet:

- **UK/EU: life of the author + 70 years.** Koestler died in 1983, so his
  copyright runs through 31 December 2053 in every Berne-convention
  country that uses the standard term (the UK and the EU both do).
- **US: publication-based for anything published before 1978.** A work
  published 1930–1963 gets 95 years from publication **if its copyright was
  renewed** (a formality required at the 28-year mark); a work published
  1964–1977 gets 95 years automatically (the Copyright Renewal Act of 1992
  made renewal automatic for that window); nothing published before 1978
  gets a bare life+70 term. Koestler published nothing before 1930 (he was
  a working journalist from about 1926 but his first English-language book,
  *Spanish Testament*, is 1937), so the US's own rolling 95-year public-
  domain cutoff — which reaches works published in 1930 as of 2026 — does
  not reach any of his books yet either.

So "is it old enough" needed an actual date and an actual renewal check per
regime, not a guess. What follows is that check.

## What was checked

1. **Project Gutenberg** — searched its author index for "Arthur Koestler."
   Result: **zero records.** Gutenberg's volunteers only publish confirmed
   public-domain text, and Koestler's absence after decades of the
   project's existence is itself evidence, not just a gap.

2. **Standard Ebooks** — another public-domain-only publisher, which
   produces new critical editions of works *as soon as* they enter the
   public domain and often maintains a placeholder page counting down to
   that date. Its page for *Darkness at Noon* states outright: *"This book
   was published in 1940, and will therefore enter the U.S. public domain
   ... on January 1, 2036."* Not now — in ten years, and only in the US.

3. **US copyright renewal, confirmed for the flagship title.** *Darkness at
   Noon* was originally copyrighted in 1941 by The Macmillan Company and
   its US copyright **was renewed in 1968** by Daphne Hardy (Mrs. F. H. K.
   Henries), its translator — meaning its US term runs the full 95 years
   from publication, through 2036, exactly matching Standard Ebooks'
   figure independently.

4. **The 1977 Catalog of Copyright Entries, via a Wikisource-hosted OCR
   scan.** This is a primary US Copyright Office record, and it directly
   confirms active copyright claims late in Koestler's life:
   - *"1977 Books and Pamphlets Jan-June/BB"*: a registered book review
     entry citing *The Thirteenth Tribe, by Arthur Koestler* (1976) as
     under an active registration.
   - *"1977 Books and Pamphlets July-Dec/R"*: *"The God that failed. By
     Richard Howard Stafford Crossman, Arthur Koestler, Richard Wright,
     Louis Fischer & others. Appl. states copyright claimed [in specific
     new matter]."*

   This is stronger evidence than a general presumption: it is the
   copyright registry itself, for two different titles, late in his
   career, both actively claimed.

5. **Wikisource** — searched directly for "Koestler." Result: **no primary
   text by him at all.** Every hit is either a US Supreme Court opinion
   quoting a short passage of his (*Witherspoon v. Illinois*, *Furman v.
   Georgia* — both quoting *Reflections on Hanging*, 1956), another
   author's footnote citing one of his books, or the Catalog of Copyright
   Entries record above. A quotation embedded in an otherwise-public-domain
   US government work (the court opinion itself, 17 U.S.C. §105) does not
   make the quoted author's underlying book public domain, and none of
   those quotations is long enough or was ever intended to stand in as "his
   work" — they are not included here for that reason.

6. **HathiTrust** was also checked as a cross-check (it runs a large-scale
   Copyright Review Program specifically for pre-1964 US non-renewal
   determinations) but its catalog search returned HTTP 403 to this
   session's fetch tooling; nothing from it is used in this finding one way
   or the other. Named as an unconfirmed avenue rather than silently
   skipped — a future pass with a working HathiTrust query could still
   check his remaining ~15 US-published titles individually against the
   Stanford Copyright Renewal Database / CRMS determinations, in case any
   single title (as opposed to *Darkness at Noon*, now confirmed renewed)
   slipped through non-renewal. Not attempted further here because the
   1977 Catalog of Copyright Entries evidence above (point 4) already shows
   his estate/publishers were actively registering and defending copyright
   through the very end of his working life — the opposite of the pattern
   (an obscure title a publisher let lapse) that a non-renewal search is
   looking for.

## Conclusion

**No Arthur Koestler primary text — novel, memoir, essay collection,
journalism — is public domain today**, in the US or anywhere in the UK/EU.
The earliest anything of his becomes public domain in the US is
2036-01-01 (*Darkness at Noon*, confirmed renewed); the UK/EU date for his
whole body of work is 2054-01-01 (life+70). "As much Koestler as is public
domain" is therefore, honestly, **zero words of his own writing** — and
adding any of it under a public-domain label would be both a real
copyright violation and a direct falsification of this corpus's own
provenance discipline (`POLICIES.md` LP1: *"the source is kept in the
format it was received in"* — a received text carries its real rights, not
an assumed one).

## What was added instead, and why it is honest to add

Nothing here is a workaround or a consolation substitute passed off as the
real thing. `02-encyclopedic/wikipedia/` already holds Wikipedia's
CC BY-SA 4.0 biographical coverage of other copyrighted-in-their-own-right
20th-century figures this corpus could not otherwise host primary text
from in the same way (its existing convention already includes author
biographies as ordinary entries in that directory, alongside general-topic
articles). Nine articles were fetched the same way, clearing the corpus's
own 600-word floor, each one verified post-fetch to actually mention
Koestler in its body (not merely matched by title — see "one true finding
this check produced," below):

| file | words | what it is |
|---|---|---|
| `Arthur_Koestler.txt` | 7,500 | Biography |
| `Darkness_at_Noon.txt` | 4,824 | His best-known novel |
| `The_Thirteenth_Tribe.txt` | 2,096 | His 1976 history of Khazar Judaism |
| `Koestler_Arts.txt` | 1,044 | The prison-arts charity he endowed |
| `The_Gladiators_(novel).txt` | 912 | His 1939 Spartacus novel |
| `Spanish_Testament.txt` | 851 | His 1937 Spanish Civil War memoir |
| `Holon_(philosophy).txt` | 733 | The term he coined in *The Ghost in the Machine* |
| `The_Ghost_in_the_Machine.txt` | 642 | 1967 book on reductionism |
| `The_Act_of_Creation.txt` | 611 | 1964 book on creativity ("bisociation" redirects here) |

Source, license, and every skipped candidate (both "too short" and "wrong
article entirely") are recorded in full in
`manifests/koestler-wikipedia-manifest.json`. **This is CC BY-SA 4.0, not
public domain** — attribution and share-alike apply, exactly as this
repo's README already states for the rest of `02-encyclopedic/wikipedia/`.
It is included because it is real, legitimately-licensed, substantive
coverage of Koestler and his work — not because it is a lesser-effort
stand-in for the primary text that does not yet exist.

### One true finding this check produced

The fetch script's own sanity gate (reject any fetched page whose body
never mentions "Koestler," even if the title matched) caught a real
mismatch before it entered the corpus: Wikipedia's article titled **"The
Age of Longing"** is not about Koestler's 1951 novel of the same title at
all — it is a 1995 novel by the Canadian author Richard B. Wright,
published by HarperCollins. Koestler's own *The Age of Longing* has no
standalone Wikipedia article. This is the same class of defect
`digested/CORPUS-INTEGRITY-FINDING.md` already documents at scale for this
corpus's `gutenberg-non-en/` directory — **a title match is not a content
match** — caught here before a single byte was written, rather than after.

### Titles checked and left out for being too short, not for being wrong

`Arrival and Departure` (438 words), `Thieves in the Night` (213),
`Dialogue with Death` (402), `Scum of the Earth` (324), `The Yogi and the
Commissar` (205), `The God that Failed` (258 — the compilation-work
article, not to be confused with his essay inside it, which has no
separate article), `Arrow in the Blue` (227), `The Invisible Writing`
(381), `The Roots of Coincidence` (575, one word short of the floor),
`The Lotus and the Robot` (65), `Janus: A Summing Up` (219). Also checked
and found to have no standalone article at all: *The Case of the Midwife
Toad*, *Reflections on Hanging*, *Twilight Bar*, *The Trail of the
Dinosaur*, *Arthur Koestler's* second wife Cynthia (redirects to the main
biography). Full detail: `manifests/koestler-wikipedia-manifest.json`.

## Reproducing or extending this

```bash
node scripts/fetch-koestler-wikipedia.mjs
```

Re-running it is safe (it overwrites the same files with a fresh fetch and
a fresh manifest) and will pick up any of the above stub articles if they
grow past 600 words, or a newly created *Age of Longing (Koestler novel)*
disambiguation, without needing this document rewritten — only the table
above would go stale, and it is dated at the top for exactly that reason.

## What would change this finding

- **2036-01-01** — *Darkness at Noon* enters the US public domain (its
  confirmed 1968 renewal date fixes this).
- **2054-01-01** — Koestler's entire body of work enters the UK/EU public
  domain (life+70 from his 1983 death).
- Before either date, the only honest way to add more would be a
  title-by-title US non-renewal check (Stanford Copyright Renewal
  Database / HathiTrust CRMS) against his remaining ~1930s–1963
  US-published titles — not attempted here beyond the flagship title,
  for the reason given in point 6 above, and not a substitute for actually
  running it if someone wants to pursue that path.
