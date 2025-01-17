from django.urls import path 

from . import views

urlpatterns = [
    # Courses 
    path('', views.ListCourseAPIView.as_view()),
    path('', views.CreateCourseAPIView.as_view()),
    path('<int:pk>/', views.RetriveCourseAPIVew.as_view(), name="course-retrive"),
    path('user/<int:pk>/', views.list_courses_by_teacher),
    path('search/<str:params>', views.search_courses),
    # Category
    path('category/', views.ListCategoryAPIView.as_view()),
    path('category/<int:pk>/', views.ListCourseByCategory), 
    # CourseHeadline
    path('course-headlines/<int:pk>/', views.list_headlines_by_courses), 

    # Lesson 
    # get a lesson by headline pk 
    path('lessons/<int:pk>', views.list_lessons_by_headlines), 
    path('lesson/<int:pk>/', views.RetrieveLessonAPIView.as_view()), 
]
