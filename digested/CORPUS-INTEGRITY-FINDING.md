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

## Addendum (2026-09-09) — a THIRD corrupted directory, found independently, same defect

A separate session (eoreader7's LaVar reading agent, `native/READING-SPEC.md`
S102/S103) checked `01-literature-books/gutenberg/`'s own language-tagged
files before reading one, before this document was found via
`search_session_transcripts`, and hit the identical defect in a directory
this document does not cover:

| path (what it claims) | what the bytes actually are |
|---|---|
| `pg10671_The_Iliad__Greek_.txt` (Homer, Greek) | Erasmus Darwin, *The Botanic Garden. Part II* (English) |
| `pg17270_The_Aeneid__Latin_.txt` (Virgil, Latin) | Anonymous, *The Interlude of Wealth and Health* (English) |
| `pg2636_Faust__German_.txt` (Goethe, German) | Rafael Sabatini, *The Historical Nights' Entertainment* (English) |
| `pg5196_Don_Quixote__Spanish_.txt` (Cervantes, Spanish) | An unrelated "Romance of Santa Catalina" (English) |
| `pg135_Les_Mis_rables__French_.txt` (Hugo, French) | not independently re-verified this pass; its own header plausibly names Isabel Hapgood, a real historical Hugo translator — worth checking directly before trusting it, not assumed correct on that basis alone |

Not re-diagnosed here either, for the same reason this document already
gives (no fetch script was read to find a cause). The pattern across three
directories now (this one, `11-multi-language/gutenberg-non-en/`, and
`01-literature-books/gutenberg/`'s language-tagged subset) makes a
systemic cause — not three unrelated accidents — the way to bet, though
still not confirmed. That reading's own "5 more languages" work used
`11-multi-language/wikipedia-lang/` instead, per this document's own
recommendation above, and found it real and usable as claimed.

## Addendum (2026-09-09) — the corruption is not confined to the language-tagged subset; a fuller population check of `01-literature-books/gutenberg/`

User direction: *"read some more books and judge the quality of the EOT files."* Before picking one, every one of the 26 `.txt` files in this directory was checked against its own filename's claim — the same discipline this document's own top section already insists on ("every file checked disagrees with its own path" is a population claim, not a sample, and a population claim about a SUBSET of a directory says nothing about the rest of it). Method: a `Title:`/`Author:` header where the file still carries Project Gutenberg's own metadata block (most do not — the block has been stripped from all but one file checked), otherwise 2–3 highly distinctive proper nouns or phrases unique to the claimed work, grepped against the whole file.

**Confirmed correctly labeled** (real, distinctive content found, or a proper `Title:`/`Author:` header): `pg345_Dracula.txt` (only file with an intact PG header: `Title: Dracula` / `Author: Bram Stoker`), `pg11_Alice_s_Adventures_in_Wonderland.txt` and `pg11-alice-ch1.txt` and `pg174_The_Picture_of_Dorian_Gray.txt` and `pg98_A_Tale_of_Two_Cities.txt` (already read successfully in this same reading agent's own prior sessions — S101/S102/S104-multi-book work), `pg100_Complete_Works_of_Shakespeare.txt` (478 hits for Hamlet/Shakespeare/Midsummer), `pg12_Through_the_Looking_Glass.txt` (62 hits, Tweedledum/Jabberwocky), `pg1342_Pride_and_Prejudice.txt` (351 hits, Elizabeth Bennet/Mr. Darcy/Longbourn), `pg135_Les_Mis_rables__French_.txt` (2468 hits, Jean Valjean/Cosette/Javert — resolving this document's own earlier "worth checking, not assumed correct" flag: it is correct), `pg55201_The_Republic_by_Plato.txt` (546 hits, Socrates/Glaucon/Thrasymachus), `pg59129_Leviathan_by_Hobbes.txt` (23 hits, Leviathan/commonwealth/state of nature), `pg2701_Moby_Dick.txt` (701 hits, Ishmael/Ahab/Pequod), `pg84_Frankenstein.txt` (77 hits, Victor Frankenstein/Walton/creature — its own front matter, four numbered Letters before "CHAPTER I", is genuine Frankenstein epistolary structure, not corruption), `aesop-11339_The-Fox-and-the-Grapes.txt` (short fable, title self-declares and content matches).

**Newly confirmed mislabeled** (beyond the four this document's first addendum already found in this same directory):

| path (what it claims) | what the bytes actually are |
|---|---|
| `pg1661_The_Adventures_of_Tom_Sawyer.txt` (Twain) | Arthur Conan Doyle, *The Adventures of Sherlock Holmes* (own title page: "The Adventures of Sherlock Holmes / by Arthur Conan Doyle") |
| `pg768_The_Adventures_of_Sherlock_Holmes.txt` (Conan Doyle) | Emily Brontë, *Wuthering Heights* (own title page) |
| `pg62168_The_Origin_of_Species_by_Darwin.txt` (Darwin) | An unidentified science-fiction pulp story (opens mid-scene: "MacCauley," "the Palladian," "asterite" — zero hits for natural selection/origin of species/Darwin) |
| `pg5827_Meditations_by_Marcus_Aurelius.txt` (Marcus Aurelius) | Bertrand Russell, *The Problems of Philosophy* (1912) — its own preface names G. E. Moore, J. M. Keynes, and Gilbert Murray, and opens "CHAPTER I. APPEARANCE AND REALITY" |
| `pg2397_Leaves_of_Grass_by_Whitman.txt` (Whitman) | Helen Keller, *The Story of My Life* — dedicated "To Alexander Graham Bell," names Anne Mansfield Sullivan as teacher |
| `pg13453_The_Divine_Comedy_by_Dante.txt` (Dante) | A 1908 novel illustrated by W. Hatherell, credited to "Mrs. Humphry Ward" (only 1 combined hit across Dante/Beatrice/Inferno/Virgil) |
| `pg8394_Beyond_Good_and_Evil_by_Nietzsche.txt` (Nietzsche) | Arthur Conan Doyle, *The Doings of Raffles Haw* (own title page; zero hits for Nietzsche/Zarathustra/"will to power") |
| `pg32063_On_the_Electrodynamics_of_Moving_Bodies__Einstein_.txt` (Einstein) | Not Einstein's 1905 paper — zero hits anywhere in the file for "electrodynamics," "Lorentz," or "relativity"; actual identity not pursued further once this was confirmed, since the negative result alone is what matters for "do not read this file as Einstein" |
| `pg17270_The_Aeneid__Latin_.txt` (Virgil) | Confirmed wrong independently of this document's first addendum's own finding for the same path (there recorded as *The Interlude of Wealth and Health*) — zero hits for Aeneas/Troiae/Anchises either way; the file's own transcriber's note additionally describes "early English text... printed in a black-letter font," which is on its face incompatible with a Latin classical epic |

Combined with the four this document's first addendum already found in this directory (Iliad→Botanic Garden, Aeneid→see above, Faust→Sabatini, Don Quixote→Santa Catalina romance), **12 of the 26 files checked in `01-literature-books/gutenberg/` are now confirmed mislabeled — not a minority edge case, but close to half the directory.** The corruption pattern first named in this document ("this is the complete population... as it exists in this checkout") extends further than either addendum alone showed: it is not confined to files whose name declares a non-English original, and it is not confined to the language-tagged subset. A file's plain English title with no language annotation (`pg1661_The_Adventures_of_Tom_Sawyer.txt`, `pg8394_..._by_Nietzsche.txt`, `pg5827_Meditations_by_Marcus_Aurelius.txt`) is no more trustworthy on its face than one that claims a translation.

**What this means going forward, stated plainly so a future reading does not have to re-derive it:** before invoking `eot-jsonl.mjs` (or any reader) on ANY file in `01-literature-books/gutenberg/` not already in the confirmed-good list above, check it the same cheap way — a `Title:`/`Author:` grep, then 2–3 distinctive proper nouns from the claimed work — before trusting the filename. This is a two-grep, few-second check against a directory that has now shown roughly 1-in-2 odds of being wrong.
