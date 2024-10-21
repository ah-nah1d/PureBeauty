from django.urls import path
from .views import * 

urlpatterns = [
    path('headers/', getHeader, name='header-list'),
    path('about/', getAboutUs, name='about-list'),
    path('social/', getSocialMedia, name='social-list'),
    path('contact/', getContact, name='contact-list'),
]
