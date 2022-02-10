from django.urls import path
from . import views

app_name='posts'
urlpatterns = [
    path('<str:epi>/<str:date>/', views.epi_ON, name='epi_ontario'),
    path('confirm', views.world, name='confirm'),
    path('<str:username>/newPost', views.createPost, name='newPost'),
    path('', views.postList, name='allposts'),
    path('<int:id>', views.postDetail, name='postdetail'),    
    path('<int:id>/delete', views.deletePost, name='deletePost'), 
    path('<int:id>/update', views.updatePost, name='updatePost'), 
]