from __future__ import division, print_function

import json

from api.models import Case
from api.serializers import CaseSerializer
from rest_framework import viewsets
from django.http import JsonResponse

import cnvlib
import numpy as np
from skgenome import tabio

from . import utilities




class CaseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions for Case objects.
    """
    queryset = Case.objects.all()
    serializer_class = CaseSerializer


def load_cnx_coords(request, SR, CGP):
    """Load CNVkit bin data (.cnr) for a given sequencing run and sample ID.

    Reformat it in terms of plotting coordinates and labeling.
    """
    # Hard-coded for testing
    fname = 'test/go_run_data/' + SR + '/Data/Intensities/BaseCalls/Alignment/' + CGP + '.cnr'
    is_segment = fname.endswith(".cns")

    chrom_sizes = utilities.load_chromosome_sizes()
    # TODO - tune for aesthetics
    pad = 0.003 * sum(chrom_sizes.values())

    cnarr = cnvlib.read(fname)
    x_offset = 0
    response_obj = []
    for chrom, subcna in cnarr.by_chromosome():
        table = subcna.data.loc[:, ("chromosome", "log2", "weight", "gene")]
        if is_segment:
            table["x_position"] = subcna.start
            table["chrom_x_position"] = subcna.start
            table["x_end"] = subcna.end
            table["chrom_x_end"] = subcna.end
            table["probes"] = subcna.probes
        else:
            table["x_position"] = (subcna.start + subcna.end) / 2
            table["chrom_x_position"] = (subcna.start + subcna.end) / 2
        # Adjust bin x-axis positions for the chromosome's absolute x-position
        x_offset += pad
        table["x_position"] += x_offset
        if is_segment:
            table["x_end"] += x_offset
        x_offset += pad + chrom_sizes[chrom]
        # Transpose so JSON representation is row-wise
        response_obj.extend((dict(row._asdict())
                             for row in table.itertuples(index=False)))
    return JsonResponse(response_obj, safe=False)


def chromosome_lengths(request):
    chroms = ["chr1", "chr2", "chr3", "chr4", "chr5", "chr6", "chr7", "chr8",
              "chr9", "chr10", "chr11", "chr12", "chr13", "chr14", "chr15",
              "chr16", "chr17", "chr18", "chr20", "chr19", "chr22", "chr21",
              "chrX", "chrY"]

    response_obj = {
        # Canonical chromosome names, in preferred order
        "chromosomes": chroms,
        # Absolute x-axis position of chromosome boundary line and x-axis ticks
        "padded_starts": [],
        # Each chromosome's length + 2x padding, for other display calculations
        "padded_lengths": [],
        # unpadded, normal lengths
        "lengths": [],
    }

    chrom_sizes = utilities.load_chromosome_sizes()
    pad = 0.003 * sum(chrom_sizes.values())
    x_offset = -pad
    for chrom in chroms:
        response_obj["padded_starts"].append(x_offset + pad)
        adj_length = 2 * pad + chrom_sizes[chrom]
        response_obj["padded_lengths"].append(adj_length)
        response_obj["lengths"].append(chrom_sizes[chrom])
        x_offset += adj_length

    return JsonResponse(response_obj, safe=False)

