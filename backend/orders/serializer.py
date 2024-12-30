from rest_framework import serializers
from .models import CartItem
from courses.serializers import CourseSerializer


class CartItemSerializer(serializers.ModelSerializer):
    course_data = CourseSerializer(source='course')
    class Meta:
        model = CartItem
        fields = ['id', 'user', 'course', 'order', 'added_at', 'course_data']
        