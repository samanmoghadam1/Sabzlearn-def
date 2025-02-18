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
        return Response({"error": "آیدی دوره بایدی است"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        course = Course.objects.get(id=course_id)  
    except Course.DoesNotExist:
        return Response({"error": "دوره پیدا نشد"}, status=status.HTTP_404_NOT_FOUND)

    order, created = Order.objects.get_or_create(
        user=user,
    )
    purchased_course =  user.purchased_courses.all()
    purchased_course_with_course_model = [] 
    
    for p in purchased_course: 
        purchased_course_with_course_model.append(p.course)

    if CartItem.objects.filter(order=order, course=course).exists():
        return Response({"error": "این دوره در سبد خرید شما موجود است"}, status=status.HTTP_409_CONFLICT)

    if course in purchased_course_with_course_model: 
        return Response({"error": "شما این دوره رو قبلا خریداری کردید"}, status=status.HTTP_400_BAD_REQUEST)
    
    
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
        return Response({'message': 'داده با موفقیت پاک شد'})
    except :
        return Response({'error': "داده با موفقیت پاک نشد"}, status=status.HTTP_400_BAD_REQUEST) 
    
    


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
    user = request.user 
    order_id = int(request.data.get('order'))
    price = float(request.data.get('price'))
    is_successful = bool(request.data.get('is_successful'))

    order = Order.objects.filter(id=order_id).first() 
    
    if user and order and is_successful: 
        if price or price == 0: 
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
    
    return Response({'error': "خطای ارسال نشدن کامل داده ها به سرور"}, status=status.HTTP_400_BAD_REQUEST)




# {
# "course_id" : 3
# }