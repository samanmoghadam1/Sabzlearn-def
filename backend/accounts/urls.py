from django.urls import path
from .views import RetriveUserAPIView

urlpatterns = [
    path('<int:pk>/', RetriveUserAPIView.as_view(), name='user-retrieve'),
]
