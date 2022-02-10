from django.urls import path
from . import views


APP_NAME='covid_ON'

urlpatterns = [
    path('graphs/<str:epi>', views.epiGraph_ON, name='epiGraph_ontario'),
    path('demography', views.epiDemography_ON, name='epidemography_ON'),
    path('maps/<str:epi>', views.epiMap_ON, name='epiMap_ontario'),
]
