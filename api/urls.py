from django.conf.urls import url, include
from api import views
from rest_framework.routers import DefaultRouter

app_name = 'api'

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'api', views.CaseViewSet)

urlpatterns = [
    url(r'^cnx/(?P<SR>SR-[0-9]+)/(?P<CGP>CGP-[0-9]+)/(?P<cnx>cn[rs])$', views.load_cnx_coords, name='cnx'),
    url(r'^chromosome_lengths$', views.chromosome_lengths, name='chromosome_lengths')
]

urlpatterns += router.urls

