from rest_framework import generics

from .models import User, Skills
from .serializer import UserSerializer
# Create your views here.


class RetriveUserAPIView(generics.RetrieveAPIView): 
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'
