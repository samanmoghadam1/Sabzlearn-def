from django.urls import path
from .views import RetriveUserAPIView, UpdateUserView, update_user_password

urlpatterns = [
    path('<int:pk>/', RetriveUserAPIView.as_view(), name='user-retrieve'),
    path('update/', UpdateUserView), 
    path('update-password/', update_user_password)
]


# {
# "old_password": "ksdfjskd", 
# "new_password": "sdaskdj"
# }