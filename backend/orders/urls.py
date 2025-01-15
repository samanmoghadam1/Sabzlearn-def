from django.urls import path 
from . import views

urlpatterns = [
    path('cart/list/', views.list_cart_item), 
    path('cart/create/', views.create_cart_item), 
    path('cart/delete/<int:pk>/', views.delete_cart_item), 
    path('purchased_courses/list/', views.list_purchased_courses), 
    path('add/payemnts/', views.create_payment), 
]
