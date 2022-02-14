from django.shortcuts import render
from django.http.response import JsonResponse, HttpResponse
import pandas as pd
import json
from pathlib import Path
import os
import datetime
import pandas as pd
from urllib.error import HTTPError
from datetime import timedelta

'''
def getEpiPhu():
    ROOT_DIR = Path(__file__).parent.parent
    path_epi_csv = os.path.join(ROOT_DIR, "data", "epi_phu.csv") # path of the earlier servion of data
    epi_data = pd.read_csv(path_epi_csv) # read the data
    epi_data.columns = [x.lower() for x in epi_data.columns.values]
    epi_data['file_date']=pd.to_datetime(epi_data['file_date']) # convert to datetime, so can sort by date
    epi_data = epi_data.sort_values(by="file_date", key=pd.to_datetime)

    lastDate = epi_data['file_date'].unique()[-1]
    lastDate = numpy.datetime_as_string(lastDate, unit='D')
    today = datetime.date.today().strftime("%Y-%m-%d")

    path_phu_ON = os.path.join(ROOT_DIR, "data", "phu_ON.json") # path of the earlier servion of data

    try:
        
        conf = pd.read_csv("https://data.ontario.ca/dataset/f4112442-bdc8-45d2-be3c-12efae72fb27/resource/455fd63b-603d-4608-8216-7d8647f43350/download/conposcovidloc.csv")
        conf=conf[['Case_Reported_Date','Reporting_PHU_ID']]
        conf['confirmed'] = 1
        conf = conf.groupby(['Case_Reported_Date', 'Reporting_PHU_ID']).count().reset_index()
        conf = conf.set_index('Case_Reported_Date')

        epiON = pd.read_csv("https://data.ontario.ca/dataset/1115d5fe-dd84-4c69-b5ed-05bf0c0a0ff9/resource/d1bfe1ad-6575-4352-8302-09ca81f7ddfc/download/cases_by_status_and_phu.csv")
        epiON.columns = [x.lower() for x in epiON.columns.values]
        epi_phu = pd.merge(epiON, conf, how='left', left_on=['file_date', 'phu_num'], right_on=['Case_Reported_Date', 'Reporting_PHU_ID'])
        epi_phu= epi_phu.fillna(0)

        path_geojson = os.path.join(ROOT_DIR, "data", "phu_geo.json")
        with open(path_geojson) as f:
            oldphu_geojson = json.load(f) 

        name_id = epiON[['phu_name', 'phu_num']].groupby('phu_name').mean().reset_index()

        if lastDate == today:  
            return oldphu_geojson
        elif lastDate < today:          
            epi_phu.to_csv(path_epi_csv) # save the current version of data and replace the earlier data to local drive for later use as the latter was not up-to-date.

            with open(path_phu_ON) as f:
                data = json.load(f)  
                
            phu_geo = [] # List of phu features
            epi_list = ['active_cases', 'deaths', 'resolved_cases', 'confirmed']
            for i in range(len(data["features"])):
                for j in range(len(name_id)):
                    prop = data["features"][i]["properties"] # The properties of phu i
                    if prop['PHU_ID'] == name_id['phu_num'][j]:
                        prop['phu_name'] = name_id.iloc[j]['phu_name']
                        prop['phu_num'] = name_id.iloc[j]['phu_num']
                        mydata = {}
                        for i in range(len(epi_list)):
                            myepi = epi_list[i]
                            phu_j = epi_phu[epi_phu["phu_num"]==name_id['phu_num'][j]][["file_date", myepi]].reset_index(drop='true')
                            pair = {}
                            for n in range(len(phu_j)):
                                pair.update({phu_j["file_date"][n]: phu_j[myepi][n]}) 
                            mydata.update({myepi:pair}) 
                        prop['epidata'] = mydata
                        phu_geo.append(data["features"][j])      
            aList = phu_geo
            jsonString = json.dumps(aList)
            jsonFile = open("phu_geo.json", "w")
            jsonFile.write(jsonString)
            jsonFile.close()    
            return phu_geo
        else:
            return phu_geo # use the current data

    except HTTPError as e:
        if e.code == 502 or 404: # 502 for bad gateway; 404 for not found
            return epi_phu # use the most updated version of data
        else:            
            return HttpResponse('Failure: ' + str(e.reason)) # show reason for failure


'''

ROOT_DIR = Path(__file__).parent.parent
path_saved_all_epi = os.path.join(ROOT_DIR, "data", "saved_all_epi.csv")
path_phu_geo = os.path.join(ROOT_DIR, "data", "phu_geo.json")
path_phu_Ontario = os.path.join(ROOT_DIR, "data", "phu_Ontario.json")


def getOldEpi(): # get old epi data file from data folder
    old_all_epi = pd.read_csv(path_saved_all_epi)
    old_all_epi = old_all_epi.drop(columns='Unnamed: 0')
    return old_all_epi


def getOldMapData():  # get old data file for map from data folder
    # old_map_data = pd.read_json(path_phu_geo)
    with open(path_phu_geo) as f:
        old_map_data = json.load(f)
    return old_map_data



def createMapData():  # used to create map data file to save into datafile if the old map data is out-of-date.
    old_epi_data = getOldEpi()
    epi_list = ['active_cases', 'deaths', 'resolved_cases', 'confirmed']
    name_id = old_epi_data[['phu_name', 'phu_num']].groupby('phu_name').mean().reset_index()
    
    with open(path_phu_Ontario) as f:
        data = json.load(f)  

    for i in range(len(data["features"])):
        for j in range(len(name_id)):
            prop = data["features"][i]["properties"] # The properties of phu i
            if prop['PHU_ID'] == name_id['phu_num'][j]:           
                prop['phu_name'] = name_id.iloc[j]['phu_name']
                mydata = {}
                for i in range(len(epi_list)):
                    myepi = epi_list[i]
                    phu_j = old_epi_data[old_epi_data["phu_num"]==name_id['phu_num'][j]][["file_date", myepi]].reset_index(drop='true')     
                    pair = {}
                    for n in range(len(phu_j)):
                        pair.update({phu_j["file_date"][n]: phu_j[myepi][n]})    
                    mydata.update({myepi:pair}) 
                    prop['epidata'] = mydata
             
    aList = data['features'][i]
    jsonString = json.dumps(aList)
    jsonFile = open("phu_geo.json", "w")
    jsonFile.write(jsonString)
    jsonFile.close()

    return None


def getGraphData(): # used to get epi json data from data folder to create graphs
    old_epi_data = getOldEpi()    
    old_epi_data = old_epi_data[old_epi_data['phu_name'] != str(0)]
    
    on_graph = old_epi_data.groupby(['file_date']).sum().reset_index()
    on_graph = on_graph.to_json(orient="table")
    on_graph = json.loads(on_graph)
    on_graph = on_graph['data'] 
       
    phu_names = old_epi_data['phu_name'].unique()
    graphON = {'Ontario': on_graph}
    for j in range(len(phu_names)):
        phu_j = old_epi_data[old_epi_data['phu_name'] == phu_names[j]].reset_index().drop(columns=['index', 'phu_name', 'phu_num'])
        phu_j = phu_j.to_json(orient="table")
        phu_j = json.loads(phu_j)
        phu_j = phu_j['data']   
        graphON.update({phu_names[j]: phu_j})
    return graphON


def createNewEpi(): # used to create epi data file ("saved_all_epi.csv") that is saved into datafile if the old map data is out-of-date.
    epiON = pd.read_csv("https://data.ontario.ca/dataset/1115d5fe-dd84-4c69-b5ed-05bf0c0a0ff9/resource/d1bfe1ad-6575-4352-8302-09ca81f7ddfc/download/cases_by_status_and_phu.csv")
    epiON.columns = [x.lower() for x in epiON.columns.values]    
    
    conf = pd.read_csv("https://data.ontario.ca/dataset/f4112442-bdc8-45d2-be3c-12efae72fb27/resource/455fd63b-603d-4608-8216-7d8647f43350/download/conposcovidloc.csv")
    conf=conf[['Case_Reported_Date','Reporting_PHU_ID']]
    conf['confirmed'] = 1
    conf = conf.groupby(['Case_Reported_Date', 'Reporting_PHU_ID']).count().reset_index()
    conf = conf.set_index('Case_Reported_Date')
    
    new_epi = pd.merge(epiON, conf, how='left', left_on=['file_date', 'phu_num'], right_on=['Case_Reported_Date', 'Reporting_PHU_ID'])    
    new_epi = new_epi.fillna(0).drop(columns=['Reporting_PHU_ID'])
    new_epi = new_epi.astype({'phu_num':'float64', 'active_cases':'float64', 'resolved_cases': 'float64', 'deaths':'float64', 'confirmed':'float64'})
    new_epi.to_csv(path_saved_all_epi)

    return None


def getData(figure): # used to get json data
    old_epi_data = getOldEpi()
    lastdate = old_epi_data['file_date'].unique()[-1]
    today = datetime.date.today().strftime("%Y-%m-%d")
    yesterday = (datetime.datetime.now() - timedelta(1)).strftime('%Y-%m-%d')
    try:
        # pd.read_csv("https://data.ontario.ca/dataset/1115d5fe-dd84-4c69-b5ed-05bf0c0a0ff9/resource/d1bfe1ad-6575-4352-8302-09ca81f7ddfc/download/cases_by_status_and_phu.csv")
        # pd.read_csv("https://data.ontario.ca/dataset/f4112442-bdc8-45d2-be3c-12efae72fb27/resource/455fd63b-603d-4608-8216-7d8647f43350/download/conposcovidloc.csv")
        
        if lastdate == today or lastdate >= yesterday:
            if figure == 'graphs':
                return getGraphData()
            elif figure == 'maps':
                return getOldMapData()
            else:
                return 'None'
        else: 
            return createNewEpi()
    except HTTPError as e:
        if e.code == 502 or 404: # 502 for bad gateway; 404 for not found
            return 'null' # use the most updated version of data
        else:            
            return HttpResponse('Failure: ' + str(e.reason)) # show reason for failure


def getDemographyData():
    conf_phu = pd.read_csv("https://data.ontario.ca/dataset/f4112442-bdc8-45d2-be3c-12efae72fb27/resource/455fd63b-603d-4608-8216-7d8647f43350/download/conposcovidloc.csv")
    conf_phu = conf_phu[['Row_ID', 'Case_Reported_Date', 'Age_Group', 'Client_Gender', 'Outcome1', 'Reporting_PHU_ID']]
    conf_phu['count']=1

    age = conf_phu[['Case_Reported_Date', 'Age_Group']]
    age=conf_phu.groupby(['Case_Reported_Date', 'Age_Group']).count().reset_index()
    age=age.pivot(index='Case_Reported_Date', columns='Age_Group', values='count')
    result = age.to_json(orient="table")
    parsed = json.loads(result)
    age_json = parsed['data']
    age_json

    gender = conf_phu[['Case_Reported_Date', 'Client_Gender', 'count']]
    gender=gender.groupby(['Case_Reported_Date', 'Client_Gender']).count().reset_index()
    result = gender.to_json(orient="records")
    parsed = json.loads(result)
    gender_json = parsed
    gender_json

    demography = {
        'age': age_json,
        'gender':gender_json
    }

    return demography