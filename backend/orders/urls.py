from django.urls import path 
from . import views

urlpatterns = [
    path('cart/list/', views.list_cart_item), 
    path('cart/create/', views.create_cart_item), 
]