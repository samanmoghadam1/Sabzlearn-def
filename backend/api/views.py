from accounts.models import User
from rest_framework.views import Response, APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from django.contrib.auth import authenticate
from rest_framework import status
from datetime import datetime, timedelta

# اصلاح به این صورت
expires = datetime.utcnow() + timedelta(days=1)


@api_view(['POST'])
@permission_classes([AllowAny])
def create_user(request): 
    email = request.data.get('email')
    password = request.data.get('password')
    phone_number = request.data.get('phone_number')
    role = request.data.get('role')
    name = request.data.get('name') 

    if not all([email, password, phone_number, role, name]):
        return Response({"error": "All fields are required"}, status=400)

    try:
        User.objects.create_user(
            email=email, 
            password=password, 
            phone_number=phone_number, 
            role=role, 
            name=name,
        )
        return Response({'detail': 'User created successfully'}, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    if request.user.is_authenticated:
        user = request.user 
        return Response({
            'id': user.id, 
            'name': user.name, 
            'email': user.email,
            'phone_number': user.phone_number,
            'role': user.role,
            'avatar': user.avatar.url
        })
    return Response({"error": "User is not authenticated"}, status=401)


# class LoginView(APIView): 
#     permission_classes = []
#     def post(self, request):
#         email = request.data.get('email') 
#         password = request.data.get('password') 

#         user = authenticate(request, email=email, password=password)

#         if user is not None: 
#             refresh = RefreshToken.for_user(user) 
#             response = Response({'message': "Login successful"}) 
#             accessToken = response.set_cookie(
#                 key='accessToken',
#                 value=str(refresh.access_token),
#                 httponly=True,
#             )
#             refreshToken = response.set_cookie(
#                 key='refreshToken', 
#                 value=str(refresh), 
#                 httponly=True, 
#             )
#             return response
#         return Response({'detail': "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)



from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView

class LoginView(APIView):
    permission_classes = []

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            response = Response({
                'message': "Login successful",
                'accessToken': access_token,
                'refreshToken': refresh_token
            })
            response.set_cookie(
                key='refreshToken', 
                value=refresh_token, 
                httponly=True, 
                secure=False, 
                samesite='None', 
                max_age= 60*60*24
            )
            response.set_cookie(
                key='accessToken', 
                value=access_token, 
                httponly=True, 
                secure=False, 
                samesite='None', 
                max_age= 60*60*24
            )
            return response 
        
        return Response({'detail': "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class RefreshTokenView(TokenRefreshView): 
    permission_classes = []
    def post(self, request, *args, **kwargs): 
        refresh_token = request.COOKIES.get('refreshToken')
        if not refresh_token: 
            return Response({'detail': "Refresh Token missing in cookies"}, status=status.HTTP_400_BAD_REQUEST)
        
        request.data['refresh'] = refresh_token
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200: 
            response.set_cookie(
                key='accessToken', 
                value=response.data['access'],
                httponly=True,
            )
        return response 
