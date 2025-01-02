from django.urls import path 
from . import views

app_name = "users"

urlpatterns = [
    path("", views.index, name="index"),
    path("add", views.add_fruits, name="add"),
    path("list", views.list, name="list"),   
]