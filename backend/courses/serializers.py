from rest_framework import serializers
from .models import Course, Category, CourseHeadline, Lesson

class CourseSerializer(serializers.ModelSerializer):
    highlight = serializers.HyperlinkedIdentityField(view_name='course-retrive')
    user_data = serializers.SerializerMethodField(read_only=True) 
    category_data = serializers.SerializerMethodField(read_only=True) 


    def get_user_data(self, obj):
        return {
            'id': obj.teacher.pk, 
            'name': obj.teacher.name, 
            'email': obj.teacher.email,
            'image': obj.teacher.avatar.url if obj.teacher.avatar else None , 
        }
    
    def get_category_data(self, obj):
        return {
            'id': obj.category.pk,
            'name': obj.category.name,
            'description': obj.category.description
        }


    class Meta:
        model = Course

        read_only_fields = ('teacher', 'number_of_sessions', 'free', 'session_number')
        exclude = ('teacher', 'category')

        


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class HeadLineSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = CourseHeadline 
        fields = '__all__'


class LessonsSerializer(serializers.ModelSerializer):
    duration = serializers.ReadOnlyField(source='formatted_duration')
    course_data = serializers.SerializerMethodField(read_only=True) 

    def get_course_data(self, obj): 
        return { 
            'title': obj.course.name
        }

    class Meta: 
        model = Lesson
        fields = '__all__'


