from api.models import Case
from api.serializers import CaseSerializer
from rest_framework import viewsets


class CaseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Case.objects.all()
    serializer_class = CaseSerializer