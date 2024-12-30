from rest_framework import generics, permissions
from rest_framework.decorators import api_view 
from rest_framework.response import Response 
from django.shortcuts import get_object_or_404

from .models import Course, Category, CourseHeadline, Lesson
from .serializers import CourseSerializer, CategorySerializer, HeadLineSerializer, LessonsSerializer
from .permissions import IsTeacher, CheckTeacher
from accounts.models import User

# Create your views here.

class ListCourseAPIView(generics.ListAPIView): 
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CreateCourseAPIView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsTeacher]

    def perform_create(self, serializer):
        instance = serializer.save(teacher=self.request.user, number_of_sessions=0)
        instance.free = instance.price == 0
        instance.save()
        

class RetriveCourseAPIVew(generics.RetrieveAPIView):
    queryset = Course.objects.all() 
    serializer_class = CourseSerializer  
    lookup_field = 'pk'


class UpdateCourseAPIView(generics.UpdateAPIView):
    queryset = Course.objects.all() 
    serializer_class = CourseSerializer  
    lookup_field = 'pk'
    permission_classes = [IsTeacher, CheckTeacher]




class ListCategoryAPIView(generics.ListAPIView):
    queryset = Category.objects.all() 
    serializer_class = CategorySerializer  


@api_view(['GET'])
def ListCourseByCategory(request, pk):
    category = get_object_or_404(Category, pk=pk)
    
    courses = category.courses.all()
    
    serializer = CourseSerializer(courses, many=True, context={'request': request})
    
    return Response({'detail': serializer.data})


@api_view(['GET'])
def list_headlines_by_courses(request, pk):
    course = get_object_or_404(Course, pk=pk) 

    head_lines = course.headlines.all()

    serializer = HeadLineSerializer(head_lines, many=True, context={'request': request})

    return Response({'detail': serializer.data})


@api_view(['GET'])
def list_lessons_by_headlines(request, pk):
    head_line = get_object_or_404(CourseHeadline, pk=pk)

    lessons = head_line.lessons.all() 

    serializer = LessonsSerializer(lessons, many=True, context={'request': request})

    return Response(serializer.data)


@api_view(['GET'])
def list_courses_by_teacher(request, pk): 
    user = get_object_or_404(User, pk=pk) 

    courses = user.courses.all() 

    serializer = CourseSerializer(courses, many=True, context={'request': request}) 

    return Response(serializer.data) 


# lesson 

class RetrieveLessonAPIView(generics.RetrieveAPIView): 
    queryset = Lesson.objects.all() 
    lookup_field = "pk"
    serializer_class = LessonsSerializer

