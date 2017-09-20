from django.conf.urls import url, include
from api import views
from rest_framework.routers import DefaultRouter

app_name = 'api'

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'api', views.CaseViewSet)

urlpatterns = [
    url(r'^cnr/(?P<SR>SR-[0-9]+)/(?P<CGP>CGP-[0-9]+)/$', views.cnr, name='cnr')
]

urlpatterns += router.urls

