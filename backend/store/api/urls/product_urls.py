from django.urls import path
from store.api.views import product_views as views


urlpatterns = [
    path('',views.getProducts,name='products'),
    path('categories/', views.getCategories, name='categories'),

]
