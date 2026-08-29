# `11-multi-language/gutenberg-non-en/` — every file checked disagrees with its own path

Found while building a "useful sample across languages" for `digested/`
(see `README.md` in this directory): the first source picked from this
directory, `de/pg67098_Die_Verwandlung__Kafka_.txt`, was read by
`eot-digest.mjs::declaredIdentity` — which reads a Project Gutenberg
file's own `Title:`/`Author:` header rather than trusting a filename — and
it reported `Winnie-the-Pooh, A. A. Milne`. That is not a reading error.
The file's own bytes open:

```
The Project Gutenberg eBook of Winnie-the-Pooh, by A. A. Milne
...
Title: Winnie-the-Pooh
Author: A. A. Milne
```

Rather than swap that one file out and move on, every other file in this
directory was checked the same way — its own declared header where one
exists, otherwise its opening text read by eye. **All 20 of 20 files
checked disagree with what their own path claims.** This is not a
sampling artifact; it is the complete population of this subdirectory as
it exists in this checkout.

## The evidence, file by file

| path (what it claims) | what the bytes actually are |
|---|---|
| `de/pg2148_Die_Leiden_des_jungen_Werther__Goethe_.txt` (Goethe, *Werther*, German) | Edgar Allan Poe, *The Works of Edgar Allan Poe, Volume II* (English) |
| `de/pg42671_Also_sprach_Zarathustra__Nietzsche_.txt` (Nietzsche, *Zarathustra*, German) | Jane Austen, *Pride and Prejudice* (English) — confirmed past an early red herring (the file's own transcriber note references "42671-h.htm", matching its claimed Gutenberg id; the book text itself is unambiguously *Pride and Prejudice*) |
| `de/pg67098_Die_Verwandlung__Kafka_.txt` (Kafka, *Die Verwandlung*, German) | A. A. Milne, *Winnie-the-Pooh* (English) — own declared `Title:`/`Author:` header |
| `en/pg160_Crime_and_Punishment__Dostoyevsky_.txt` (Dostoyevsky, *Crime and Punishment*) | Kate Chopin, *The Awakening and Selected Short Stories* |
| `en/pg2500_The_Brothers_Karamazov.txt` (Dostoyevsky, *The Brothers Karamazov*) | Hermann Hesse, *Siddhartha* |
| `en/pg2542_War_and_Peace.txt` (Tolstoy, *War and Peace*) | Henrik Ibsen, *A Doll's House* |
| `es/pg14200_La_Divina_Comedia__Dante_.txt` (Dante, *La Divina Comedia*, Spanish) | Émile Zola, *Abbé Mouret's Transgression* (English translation) |
| `es/pg74987_La_Metamorfosis__Kafka_.txt` (Kafka, *La Metamorfosis*, Spanish) | An illustrated adventure book opening "WAIKNA" — not Kafka, not evidently Spanish |
| `fi/pg49010_Runeberg_runoelmat__Finnish_.txt` (Runeberg's poems, Finnish) | *Æsop's Fables: A Version for Young...* (English) |
| `fi/pg76749_Sota_satulavy___Finnish_.txt` (a Finnish war novel) | A Haldeman-Julius "Pocket Series" pamphlet on evolution (English) |
| `fr/pg15807_Nana.txt` (Zola, *Nana*, French) | Henry White Warren, *Among the Forces* (English religious/philosophical work) |
| `fr/pg17489_Madame_Bovary.txt` (Flaubert, *Madame Bovary*, French) | Victor Hugo, *Les Misérables, Tome I — Fantine* (French — right language, wrong book and author) |
| `fr/pg42108_Le_Comte_de_Monte_Cristo.txt` (Dumas, *Le Comte de Monte Cristo*, French) | An English guide to beggars'/cadgers' street-cant and signs ("A CADGER'S MAP OF A BEGGING DISTRICT") |
| `fr/pg7700_De_la_d_mocratie_en_Am_rique__Tocqueville_.txt` (Tocqueville, *Democracy in America*, French) | *Lysistrata*, "Translated from the Greek of..." (English) |
| `it/pg174_Il_ritratto_di_Dorian_Gray.txt` (Wilde, *Dorian Gray*, Italian) | Oscar Wilde, *The Picture of Dorian Gray* — right book, but in **English**, not Italian |
| `it/pg32773_Il_Principe__Machiavelli_.txt` (Machiavelli, *Il Principe*, Italian) | J. Ewing Ritchie, an English work (author of *Night Side of London*) |
| `la/pg5200_Metamorphoses__Ovid__Latin_.txt` (Ovid, *Metamorphoses*, Latin) | Franz Kafka, *The Metamorphosis* — opens "One morning, when Gregor Samsa woke..." — in **English**, not Latin, and not Ovid |
| `la/pg8800_De_Rerum_Natura__Lucretius_.txt` (Lucretius, *De Rerum Natura*, Latin) | Dante Alighieri, *The Divine Comedy*, Cary's English verse translation — in **English**, not Latin, and not Lucretius |
| `nl/pg1232_Othello__Dutch_.txt` (Shakespeare, *Othello*, Dutch) | Niccolò Machiavelli, *The Prince*, tr. W. K. Marriott — in **English**, not Dutch |
| `sv/pg43668_F_ders_brott__Swedish_.txt` (a Swedish novel) | A textual-apparatus/errata list ("l. 677 inscription... l. 1634 _An._") reading like Shakespeare editorial notes — English |

## What this is not

This is not a claim about *why* — no fetch script in this repo was read to
diagnose the cause, and none is guessed at here. It could be a stale or
wrong Gutenberg-id-to-title mapping, a download step that silently
substituted content, or something else. Diagnosing and fixing
`scripts/fetch-gutenberg-non-en.mjs` (if that is the responsible script)
is real, separate work and is not attempted in this pass.

## What this means for the digest in this directory

`README.md`'s own sample deliberately does **not** draw its "across
languages" text from this directory — every text source in the sample
comes from `wikipedia-lang/`, individually verified by direct inspection
to actually be in the language its path claims, before being selected.
One specimen from `gutenberg-non-en` (`de/pg67098`) is kept anyway,
labeled honestly as what it actually is, specifically because it
demonstrates `declaredIdentity` catching this exact class of problem —
reading a file's own declared header rather than trusting the path it
arrived at — which is the reason that organ exists at all (the-fold's own
CLAUDE.md: built after a live incident where a model "named the wrong book
and author for Pierre Bezukhov" because nothing had told it what book a
source actually was).

## A narrower recommendation, not acted on here

Whoever next touches this directory should decide, deliberately, whether
to: re-fetch it against verified Gutenberg ids; rename every file to what
it actually contains (losing the multi-language claim these particular 20
files were meant to carry); or remove it. All three are real options and
none is chosen here — this file's job is to make the choice informed, not
to make it.
