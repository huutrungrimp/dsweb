from django.shortcuts import render
from django.http.response import JsonResponse, HttpResponse
import pandas as pd
import json
from pathlib import Path
import os
import datetime
import pandas as pd
from urllib.error import HTTPError
from .getData import getEpiPhu, getDemographyData
import numpy

def epiMap_ON(requrest, epi):
    epi_phu = getEpiPhu()
    epi_phu.columns = [x.lower() for x in epi_phu.columns.values]
    name_id = epi_phu[['phu_name', 'phu_num']].groupby('phu_name').mean().reset_index()

    ROOT_DIR = Path(__file__).parent.parent
    path = os.path.join(ROOT_DIR, "data", "phu_ON.json")
    with open(path) as f:
        data = json.load(f)

    phu_geojson = [] # List of phu features
    for i in range(len(data["features"])):
        for j in range(len(name_id)):
            prop = data["features"][i]["properties"] # The properties of phu i
            if prop['PHU_ID'] == name_id['phu_num'][j]:
                prop['phu_name'] = name_id.iloc[j]['phu_name']
                prop['phu_num'] = name_id.iloc[j]['phu_num']
                phu_j = epi_phu[epi_phu["phu_num"]==name_id['phu_num'][j]][["file_date", epi]].reset_index(drop='true')
                pair = [{phu_j["file_date"][n]:int(phu_j[epi][n])} for n in range(len(phu_j))]
                pair = [{phu_j["file_date"][n]:int(phu_j[epi][n])} for n in range(len(phu_j))]
                prop = data["features"][i]["properties"]
                for m in range(len(pair)):
                    prop.update(pair[m])
                data["features"][i].update(prop)
                phu_geojson.append(data["features"][i])
    return JsonResponse(phu_geojson, safe=False)


def epiGraph_ON(request, epi):
    epi_phu = getEpiPhu()
    # epi_phu['file_date']=numpy.datetime_as_string(epi_phu['file_date'], unit='D') # convert file_date back to string
    active = epi_phu[['file_date', epi]].groupby(['file_date']).sum()
    active_json = active.to_json(orient="table")
    ontario = json.loads(active_json)
    phu_graph = {'Ontario':ontario['data']}
    epi_phu.columns = [x.lower() for x in epi_phu.columns.values]
    phu_id = epi_phu["phu_num"].unique()
    for i in range(len(phu_id)): 
        phu = epi_phu[epi_phu['phu_num']==phu_id[i]]
        phu = phu[['file_date', epi]].reset_index(drop='true')
        result = phu.to_json(orient="records")
        parsed = json.loads(result)
        phu_graph.update({epi_phu['phu_name'].unique()[i]: parsed})
    return JsonResponse(phu_graph, safe=False)


def epiDemography_ON(request):
    demographyData = getDemographyData()
    return JsonResponse(demographyData, safe=False)

