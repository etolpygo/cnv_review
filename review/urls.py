from django.conf.urls import url, include
from review import views

app_name = 'review'
urlpatterns = [
    url(r'^$', views.index, name='index'),
]