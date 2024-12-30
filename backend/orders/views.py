from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CartItem, Order, Course
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializer import CartItemSerializer

User = get_user_model()

@api_view(['POST'])
def create_cart_item(request): 
    user = request.user  
    course_id = request.data.get('course_id')

    if not course_id:
        return Response({"error": "Course ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        course = Course.objects.get(id=course_id)  
    except Course.DoesNotExist:
        return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

    order, created = Order.objects.get_or_create(
        user=user, 
        is_paid=False,
    )

    if CartItem.objects.filter(order=order, course=course).exists():
        return Response({"error": "Course already exists in the cart"})

    cart_item = CartItem.objects.create(
        user=user,
        course=course,
        order=order
    )

    serializer = CartItemSerializer(cart_item)

    return Response(serializer.data, status=status.HTTP_201_CREATED)



@permission_classes([IsAuthenticated])
@api_view(['GET'])
def list_cart_item(request):
    user = request.user
    cart_items = user.cart_items.all()  

    serializer = CartItemSerializer(cart_items, many=True, context={'request': request})

    return Response(serializer.data)
