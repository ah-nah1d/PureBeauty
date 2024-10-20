from django.urls import path
from .views import * 

urlpatterns = [
    path('headers/', getHeader, name='header-list-create'),
]
