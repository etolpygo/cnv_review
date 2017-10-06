from __future__ import division, print_function

import csv
import json
import os

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


def cnr(request, SR, CGP):
        # TODO check if file exists, obvs
        path_to_file = 'test/go_run_data/' + SR + '/Data/Intensities/BaseCalls/Alignment/' + CGP + '.cnr'
        csv_rows = []

        with open(path_to_file, mode='r') as data_file: 
            reader = csv.DictReader(data_file, delimiter='\t')
            title = reader.fieldnames
            for row in reader:
                dct = {title[i]:row[title[i]] for i in range(len(title))}
                if (dct['chromosome'] == 'chr1'):
                    absoluteStart = dct['start']
                    absoluteEnd = dct['end']
                else:
                    absoluteStart, absoluteEnd = utilities.calculateAbsolute(dct['chromosome'], dct['start'], dct['end'])
                    
                dct.update({'absoluteStart': absoluteStart, 'absoluteEnd': absoluteEnd})
                csv_rows.extend([dct])
        return JsonResponse(csv_rows, safe=False)


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
            table["x_end"] = subcna.end
            table["probes"] = subcna.probes
        else:
            table["x_position"] = (subcna.start + subcna.end) / 2
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

    response_obj = {"chromosomes": chroms, # The original names
                    "starts": [],  # absolute x-axis position of chromosome start
                    "lengths": [], # each chromosome's length + 2x padding
                   }

    chrom_sizes = utilities.load_chromosome_sizes()
    pad = 0.003 * sum(chrom_sizes.values())
    x_offset = 0
    for chrom in chroms:
        response_obj["starts"].append(x_offset)
        adj_length = 2 * pad + chrom_sizes[chrom]
        response_obj["lengths"].append(adj_length)
        x_offset += adj_length

    return JsonResponse(response_obj, safe=False)

