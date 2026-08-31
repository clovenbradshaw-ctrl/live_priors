#!/usr/bin/env python3
"""centroid-check.py — a second opinion on the hand-adjudicated phaseposts,
from an instrument that is not the adjudicator.

Scores every UDHR golden tuple against the 27-cell archetype centroids from
eo-lexical-analysis-2.0 (vendored: external/archetypes-27-*.json, source
repo commit 4d3c815439282fe5d2e613df7cfb9961610cc253; multilingual embedder
paraphrase-multilingual-MiniLM-L12-v2, 384-d). Reports every row whose
hand-assigned cell is NOT in the centroid's top-3.

WHAT A DISAGREEMENT MEANS — and does not mean. The centroids' own holdout
eval is top-1 40%, top-3 65% against a 3.7% chance floor: a weak, real
classifier, built from machine-consensus labels the source repo itself
flags as possibly lexical. So a disagreement here convicts nobody. It
marks where to LOOK hardest, with the cell's exemplar contrast set open —
the adjudicator stays accountable for every row (ROSETTA-GOALS Goal 1's
standard), and this file's output is a reading aid, never an oracle.

Vocabulary bridge: the source repo's operator names differ in the
Interpretation domain — ALT there is DEF here, SUP there is EVA here.
Terrain names map grains: Void/Field/Atmosphere=Ground,
Entity/Link/Lens=Figure, Kind/Network/Paradigm=Pattern.

What is embedded: the row's own subject + relation + object, joined —
the closest reconstruction of the proposition as a natural clause, which
is what the archetype exemplars were. Heading rows (no subject/object)
embed the heading token; expect noise there and read it as such.
"""
import json, glob, re, sys

from sentence_transformers import SentenceTransformer
import numpy as np

CENTROID_FILE = glob.glob("external/archetypes-27-*.json")[0]
OP_BRIDGE = {"ALT": "DEF", "SUP": "EVA"}
GRAIN_BY_TERRAIN = {
    "Void": "Ground", "Field": "Ground", "Atmosphere": "Ground",
    "Entity": "Figure", "Link": "Figure", "Lens": "Figure",
    "Kind": "Pattern", "Network": "Pattern", "Paradigm": "Pattern",
}
CELL_RE = re.compile(r"^([A-Z]+)\((\w+), (\w+)\)$")


def our_cell(name):
    m = CELL_RE.match(name)
    op, _stance, terrain = m.group(1), m.group(2), m.group(3)
    return f"{OP_BRIDGE.get(op, op)}·{GRAIN_BY_TERRAIN[terrain]}"


def main():
    data = json.load(open(CENTROID_FILE))
    names, vecs = [], []
    for cell, vec in data["centroids"].items():
        names.append(our_cell(cell))
        vecs.append(vec)
    C = np.array(vecs, dtype=np.float32)
    C /= np.linalg.norm(C, axis=1, keepdims=True)

    rows = []
    for f in sorted(glob.glob("udhr*.tuples.jsonl")):
        for line in open(f, encoding="utf-8"):
            if line.strip():
                rows.append(json.loads(line))

    model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
    texts = [
        " ".join(x for x in (r["subject"], r["relation"], r["object"]) if x)
        for r in rows
    ]
    E = model.encode(texts, normalize_embeddings=True)

    sims = E @ C.T
    agree1 = agree3 = 0
    disagreements = []
    for r, s in zip(rows, sims):
        mine = f"{r['op']}·{r['grain']}"
        order = np.argsort(-s)
        top = [names[i] for i in order[:3]]
        if mine == top[0]:
            agree1 += 1
        if mine in top:
            agree3 += 1
        else:
            disagreements.append((r, top, float(s[order[0]])))

    n = len(rows)
    print(f"rows: {n}   hand-cell in centroid top-1: {agree1} ({agree1/n:.0%})   top-3: {agree3} ({agree3/n:.0%})")
    print(f"(centroids' own holdout ceiling: top-1 40%, top-3 65%; chance 3.7%)\n")
    print("rows to re-inspect (hand cell not in centroid top-3):")
    for r, top, _ in disagreements:
        print(f"  {r['lang']:>3} {r['prop'][5:] if r['prop'] else '?':<30} {r['clause'][:12]:<13} mine={r['op']}·{r['grain'][0]:<2} centroid top-3: {', '.join(top)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
