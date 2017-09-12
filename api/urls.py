from django.conf.urls import url, include
from api import views
from rest_framework.routers import DefaultRouter

app_name = 'api'

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'api', views.CaseViewSet)
urlpatterns = router.urls