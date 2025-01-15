from django.urls import path

from .views import comment, create_comment, create_reply
urlpatterns = [
    path('<int:pk>/', comment),
    path('create/<int:pk>/', create_comment), 
    path('reply/create/<int:pk>/', create_reply)
]