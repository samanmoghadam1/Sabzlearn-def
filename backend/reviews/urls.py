from django.urls import path

from .views import comment
urlpatterns = [
    path('<int:pk>', comment),
]