from django.shortcuts import render
from django.http.response import JsonResponse, HttpResponse
import pandas as pd
import json
from pathlib import Path
import os
import datetime
import pandas as pd
from urllib.error import HTTPError
from .getData import getData, getDemographyData
import numpy


def epiData(requrest, figure):
    data = getData(figure)
    return JsonResponse(data, safe=False)




'''
def epiMap_ON(requrest):
    ROOT_DIR = Path(__file__).parent.parent
    path = os.path.join(ROOT_DIR, "data", "phu_geo.json")
    with open(path) as f:
        phu_geojson = json.load(f)
    return JsonResponse(phu_geojson, safe=False)


def epiGraph_ON(request):
    # epi_phu = getEpiPhu()
    epiON = pd.read_csv("https://data.ontario.ca/dataset/1115d5fe-dd84-4c69-b5ed-05bf0c0a0ff9/resource/d1bfe1ad-6575-4352-8302-09ca81f7ddfc/download/cases_by_status_and_phu.csv")
    epiON.columns = [x.lower() for x in epiON.columns.values]

    conf = pd.read_csv("https://data.ontario.ca/dataset/f4112442-bdc8-45d2-be3c-12efae72fb27/resource/455fd63b-603d-4608-8216-7d8647f43350/download/conposcovidloc.csv")
    conf=conf[['Case_Reported_Date','Reporting_PHU_ID']]
    conf['confirmed'] = 1
    conf = conf.groupby(['Case_Reported_Date', 'Reporting_PHU_ID']).count().reset_index()
    conf = conf.set_index('Case_Reported_Date')

    epi_phu = pd.merge(epiON, conf, how='left', left_on=['file_date', 'phu_num'], right_on=['Case_Reported_Date', 'Reporting_PHU_ID'])
    epi_phu = epi_phu.fillna(0).drop(columns=['Reporting_PHU_ID'])
    epi_phu = epi_phu.astype({'phu_num':'float64', 'active_cases':'float64', 'resolved_cases': 'float64', 'deaths':'float64', 'confirmed':'float64'})

    phu_graph = epi_phu.groupby(['file_date', 'phu_name']).sum()
    phu_graph = phu_graph.to_json(orient="table")
    phu_graph = json.loads(phu_graph)
    phu_graph = phu_graph['data']    
    
    return JsonResponse(phu_graph, safe=False)
'''


def epiDemography_ON(request):
    demographyData = getDemographyData()
    return JsonResponse(demographyData, safe=False)

