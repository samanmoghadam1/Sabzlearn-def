from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from django.contrib.auth.hashers import check_password
from rest_framework import status

from .models import User, Skills
from .serializer import UserSerializer
# Create your views here.


class RetriveUserAPIView(generics.RetrieveAPIView): 
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'


@api_view(['put']) 
@permission_classes([permissions.IsAuthenticated]) 
def UpdateUserView(request): 
    #  email, password, phone_number, role, name=None 
    user = request.user
    data = request.data
    
    user.email = data['email']
    user.phone_number = data['phone_number'] 
    user.name = data['name'] 
    if not data.get('avatar') or data.get('avatar') == "":
        pass 
    else: 
        user.avatar = data['avatar'] 
    user.save()

    
    return Response(
        {'user': {'name':user.name, 
                  'email': user.email, 
                  'phone_number': user.phone_number, 
                  'avatar': user.avatar.url
                  }
         }) 
    

@api_view(['put']) 
@permission_classes([permissions.IsAuthenticated]) 
def update_user_password(request): 
    user = request.user 
    data = request.data  
    old_password = data.get('old_password')
    new_password = data.get('new_password') 
    
    if not old_password or not new_password: 
        return Response({'error': "داده‌ها ناقص هستند"}, status=status.HTTP_400_BAD_REQUEST) 
    
    if not check_password(old_password, user.password): 
         return Response({'error': "رمز عبور قدیمی مطابقت ندارد"}, status=status.HTTP_400_BAD_REQUEST)
    
    user.set_password(new_password) 
    user.save()        
        
    return Response({'success': "رمز عبور با موفقیت به‌روز شد"}, status=status.HTTP_200_OK)