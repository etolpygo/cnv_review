from api.models import Case
from api.serializers import CaseSerializer
from rest_framework import viewsets
from django.http import JsonResponse
import csv
import json
import os
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
                if -4 <= float(dct['log2']) <= 4:
                    if (dct['chromosome'] == 'chr1'):
                        absoluteStart = dct['start']
                        absoluteEnd = dct['end']
                    else:
                        absoluteStart, absoluteEnd = utilities.calculateAbsolute(dct['chromosome'], dct['start'], dct['end'])
                    
                    dct.update({'absoluteStart': absoluteStart, 'absoluteEnd': absoluteEnd})
                    csv_rows.extend([dct])

        data = json.dumps(csv_rows)
        return JsonResponse(csv_rows, safe=False)


def chromosome_lengths(request):
    lengths_ref = os.path.dirname(os.path.abspath(__file__)) + '/static/hg19.chrom.sizes.txt'
    lengths = {}
    ends_absolute = {}

    with open(lengths_ref, mode='r') as data_file: 
        reader = csv.reader(data_file, delimiter='\t')
        for row in reader:
            title = utilities.format_chromosome(row[0])
            lengths[title] = int(row[1])
            ends_absolute[row[0]] = { 'end': int(row[1]) }

    counter = 0
    for key in sorted(lengths.keys()):
        wanted_lengths = {k: v for k, v in lengths.items() if k < key}
        add_length = sum(wanted_lengths.values())
        unkey = utilities.unformat_chromosome(key)
        ends_absolute[unkey]['absolute_end'] = add_length + ends_absolute[unkey]['end']
        ends_absolute[unkey]['order'] = counter
        counter = counter + 1

    chromosomes = tuple(sorted(ends_absolute, key=lambda x: (ends_absolute[x]['order'])))
    ends = [ends_absolute[key]['absolute_end'] for key in ends_absolute.keys()]
    ends.insert(0, 0)
    starts = tuple(sorted(ends)[:-1])

    obj = {'chromosomes': chromosomes, 'starts': starts}
    return JsonResponse(obj, safe=False)

