from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Post
from profiles.models import User
from .serializers import PostSerializer
from rest_framework import status
from django.http.response import JsonResponse, HttpResponse
import pandas as pd
import json
from pathlib import Path
import os
import datetime

def epi_ON(request, epi, date):

    conf_phu = pd.read_csv("https://data.ontario.ca/dataset/1115d5fe-dd84-4c69-b5ed-05bf0c0a0ff9/resource/d1bfe1ad-6575-4352-8302-09ca81f7ddfc/download/cases_by_status_and_phu.csv")
    conf_phu.columns = [x.lower() for x in conf_phu.columns.values]
    phu_id = conf_phu["phu_num"].unique()
    mydata = conf_phu.loc[conf_phu["file_date"]==date][["phu_name", "phu_num", epi]]

    ROOT_DIR = Path(__file__).parent.parent
    path = os.path.join(ROOT_DIR, "data", "phu_ON.json")
    with open(path) as f:
        data = json.load(f)
    
    a = []
    for i in range(len(data["features"])):
        for j in range(len(phu_id)):
            if data["features"][i]["properties"]["PHU_ID"]==phu_id[j]:                
                for ac in mydata[epi]: 
                    data["features"][i]["properties"][epi]=int(mydata[epi][j])
                    data['features'][i].update(data['features'][i]['properties'])                    
                a.append(data['features'][i])

    return JsonResponse(a, safe=False)


def world(request):
    conf = pd.read_csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv")
    countries = conf['Country/Region'].values
    ROOT_DIR = Path(__file__).parent.parent

    countries = conf['Country/Region'].values
    dates = conf.drop(columns=['Province/State', 'Country/Region', 'Lat', 'Long']).columns.values
    path = os.path.join(ROOT_DIR, "data", "countries.geojson")
    with open(path) as f:
        data = json.load(f)

    a = []
    for i in range(len(data["features"])):
        for j in range(len(countries)):
            if data["features"][i]["properties"]["ADMIN"]==countries[j]:
                for date in dates:               
                    d = datetime.datetime.strptime(date,'%m/%d/%y').strftime('%Y-%m-%d') 
                    data["features"][i]["properties"][d]=int(conf[date].values[j])
                    data['features'][i].update(data['features'][i]['properties'])                    
                a.append(data['features'][i])

    return JsonResponse(a, safe=False)



@api_view(['PUT'])
def updatePost(request, id):
    try:
        post = Post.objects.get(id=id)        
        
    except Post.DoesNotExist:
        return Response({"error": "The post is not found"}, status=404)

    if request.method == "GET":
        serializer = PostSerializer(post, many=False)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': 'You do not have permision.'})


@api_view(['DELETE'])
def deletePost(request, id):
    post = Post.objects.get(id=id)
    post.delete()

    return Response({'message': 'Post was deleted'})


@api_view(['GET'])
def postDetail(request, id):
    post = Post.objects.get(id=id)
    serializers = PostSerializer(post, many=False)

    return Response(serializers.data)


@api_view(['GET'])
def postList(request):
    posts = Post.objects.all()
    serializers = PostSerializer(posts, many=True)

    return Response(serializers.data)


@api_view(['POST'])
def createPost(request, username):
    if request.method != "POST":
        return Response({"error": "POST request required."})

    user = User.objects.get(username=username)
    title = request.data["title"]
    content = request.data['content']

    post = Post.objects.create(
        username = user,
        title = title,
        content = content,
    )

    return Response(PostSerializer(post).data)


