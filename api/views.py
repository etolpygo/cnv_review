from api.models import Case
from api.serializers import CaseSerializer
from rest_framework import viewsets
from django.http import JsonResponse
import csv
import json
from . import utilities

class CaseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
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

