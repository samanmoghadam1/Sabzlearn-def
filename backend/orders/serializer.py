from rest_framework import serializers
from .models import CartItem, Payment, PurchasedCourses
from courses.serializers import CourseSerializer

class CartItemSerializer(serializers.ModelSerializer):
    course_data = CourseSerializer(source='course')
    class Meta:
        model = CartItem
        fields = ['id', 'user', 'course', 'order', 'added_at', 'course_data']
        

class PaymentSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Payment 
        fields = ['id', 'user', 'order', 'price', 'payment_date', 'is_successful']


class PurchasedCoursesSerializer(serializers.ModelSerializer):
    courses = serializers.SerializerMethodField() 

    def get_courses(self, obj): 
        return {
            'id': obj.course.id, 
            'name': obj.course.name, 
            'teacher': {
                'name': obj.course.teacher.name, 
                'id': obj.course.teacher.id, 
            }, 
            'image': obj.course.image.url if obj.course.image else None, 
            'point': obj.course.point
        }
    class Meta:
        model = PurchasedCourses
        fields = ['id', 'course', 'added_at', 'courses']