from accounts.models import User
from rest_framework.views import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated


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
        })
    return Response({"error": "User is not authenticated"}, status=401)
