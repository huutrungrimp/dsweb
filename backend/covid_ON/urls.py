from django.urls import path
from . import views


APP_NAME='covid_ON'

urlpatterns = [
    # path('graphs', views.epiGraph_ON, name='epiGraph_ontario'),
    path('demography', views.epiDemography_ON, name='epidemography_ON'),
    path('<str:figure>', views.epiData, name='epiMap_ontario'),
]
