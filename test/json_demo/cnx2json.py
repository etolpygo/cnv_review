#!/usr/bin/env python
"""Convert .cnr, .cns, or .vcf files to JSON.


In each case, writes a JSON object of the form::

    {"x_position": [ints], "y_value": [floats], "weight": [floats]}

Format-specific values:

    .cnr:
        - x_position is the midpoint of 'start' and 'end' fields
        - y_value is the 'log2' field
    .cns:
        - x_position is 'start'
        - Additional field x_end is 'end'
        - Additional field 'probes'
    .vcf:
        - x_position is the VCF 'POS' field
        - y_value is the tumor sample's variant allele frequency
        - Does not have field 'weight'

"""
from __future__ import division, print_function

import argparse
import json
import sys

import cnvlib
from skgenome import tabio


def cnx_to_json(fname, chromosome, is_segment):
    cnarr = tabio.read(fname, "tab").filter(chromosome=chromosome)
    #  cnarr = cnvlib.read(fname).filter(chromosome=chromosome)
    print("Read", len(cnarr), "rows from", fname)
    obj = {"y_value": cnarr["log2"].tolist(),
           "weight": cnarr["weight"].tolist(),
           "gene": cnarr["gene"].tolist()}

    if is_segment:
        obj["x_position"] = cnarr.start.tolist()
        obj["x_end"] = cnarr.end.tolist()
        obj["probes"] = cnarr["probes"].tolist()
    else:
        obj["x_position"] = ((cnarr.start + cnarr.end) // 2).tolist()

    return obj


def vcf_to_json(fname, chromosome):
    varr = tabio.read(fname, "vcf").filter(chromosome=chromosome)
    print("Read", len(varr), "rows from", fname)
    obj = {"x_position": varr.start.tolist(),
           "y_value": varr["alt_freq"].tolist()}
    # weight? anything else?
    return obj


if __name__ == "__main__":
    AP = argparse.ArgumentParser(description=__doc__)
    AP.add_argument("filenames", nargs="+",
                    help="CNVkit or VCF files.")
    AP.add_argument("-c", "--chromosome", default="chr19",
                    help="""Chromosome to select from each file.
                    [Default: %(default)s""")
    AP.add_argument("--suffix", default=".json",
                    help="""Suffix to add to output filenames.
                    [Default: %(default)s""")
    args = AP.parse_args()

    for fname in args.filenames:
        if fname.endswith((".cnr", ".cns")):
            obj = cnx_to_json(fname, args.chromosome, fname[-1] == "s")
        elif fname.endswith((".vcf", ".vcf.gz")):
            obj = vcf_to_json(fname, args.chromosome)
        elif fname.endswith(".json"):
            # Probably a simple globbing mistake
            continue
        else:
            raise RuntimeError("Unsupported extension: " + fname)

        out_fname = "{}.{}{}".format(fname, args.chromosome, args.suffix)
        with open(out_fname, "w") as outf:
            json.dump(obj, outf)
        print("Wrote", out_fname, file=sys.stderr)

