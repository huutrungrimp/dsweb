from django.shortcuts import render
from django.http.response import JsonResponse, HttpResponse
import pandas as pd
import json
from pathlib import Path
import os
import datetime
import pandas as pd
from urllib.error import HTTPError
import numpy


def getEpiPhu():
    ROOT_DIR = Path(__file__).parent.parent
    path = os.path.join(ROOT_DIR, "data", "epi_phu.csv") # path of the earlier servion of data
    epi_data = pd.read_csv(path) # read the data
    # epi_data= epi_data.fillna(0)
    epi_data.columns = [x.lower() for x in epi_data.columns.values]
    epi_data['file_date']=pd.to_datetime(epi_data['file_date']) # convert to datetime, so can sort by date
    epi_data = epi_data.sort_values(by="file_date", key=pd.to_datetime)
    lastDate = epi_data['file_date'].unique()[-1]
    lastDate = numpy.datetime_as_string(lastDate, unit='D')
    today = datetime.date.today().strftime("%Y-%m-%d")

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

        if lastDate < today:            
            epi_phu.to_csv(path) # save the current version of data and replace the earlier data to local drive for later use as the latter was not up-to-date.
            return epi_phu
        else:
            return epi_phu # use the current data

    except HTTPError as e:
        if e.code == 502 or 404: # 502 for bad gateway; 404 for not found
            return epi_phu # use the most updated version of data
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