from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CartItem, Order, Course, Payment, PurchasedCourses
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializer import CartItemSerializer, PaymentSerializer, PurchasedCoursesSerializer
from rest_framework import generics


User = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 

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
    )
    purchased_course =  user.purchased_courses.all()

    if CartItem.objects.filter(order=order, course=course).exists():
        return Response({"error": "Course already exists in the cart"}, status=status.HTTP_409_CONFLICT)

    if course in purchased_course: 
        return Response({"error": "Course already exists in the purchased course"})

    cart_item = CartItem.objects.create(
        user=user,
        course=course,
        order=order
    )

    serializer = CartItemSerializer(cart_item, context={'request': request})

    return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(['DELETE']) 
@permission_classes([IsAuthenticated] )
def delete_cart_item(request, pk):
    try :
        pk = int(pk)
        user = request.user 
        order = Order.objects.filter(user=user).first() 
        cart_item = order.cart_items.filter(course_id=pk)
        cart_item.delete() 
        return Response({'message': 'success'})
    except :
        return Response({'error': "cant delete"}, status=status.HTTP_400_BAD_REQUEST) 
    
    


class DeleteCartItem(generics.DestroyAPIView): 
    queryset = CartItem.objects.all()
    lookup_field = 'pk' 
    serializer_class = CartItemSerializer 
    permission_classes = [IsAuthenticated]
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_cart_item(request):
    user = request.user
    cart_items = user.cart_items.all()  

    serializer = CartItemSerializer(cart_items, many=True, context={'request': request})

    return Response(serializer.data)



@permission_classes([IsAuthenticated]) 
@api_view(['GET']) 
def list_purchased_courses(request): 
    user = request.user 
    courses = user.purchased_courses.all()
    serializer = PurchasedCoursesSerializer(courses, many=True, context={'request': request}) 

    return Response(serializer.data)  


@permission_classes([IsAuthenticated])
@api_view(['post'])
def create_payment(request): 
    # 'id', 'user', 'order', 'price', 'payment_date', 'is_successful'
    user = request.user 
    order_id = int(request.data.get('order'))
    price = float(request.data.get('price'))
    is_successful = bool(request.data.get('is_successful'))

    order = Order.objects.filter(id=order_id).first() 
    # if user is not order.user: 
    #     return Response({'error': "somtings wrong (authentication wrong)"})
    
    

    if user and order and price  and is_successful: 
        payment = Payment.objects.create(
            user=user, 
            order=order, 
            price=price, 
            is_successful = is_successful
        ) 
        serializer = PaymentSerializer(payment)
        order.is_paid = True 
        order.status= 'paid'

        for cart_item in order.cart_items.all(): 
            #user course added_at
            PurchasedCourses.objects.create(user=request.user, course=cart_item.course)
            cart_item.delete() 

        order.save() 
        return Response(serializer.data) 
    
    return Response({'error': "somtings wrong (field required)"})




# {
# "course_id" : 3
# }