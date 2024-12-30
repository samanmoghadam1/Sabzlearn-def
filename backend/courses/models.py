from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from moviepy.editor import VideoFileClip


import os 


User = get_user_model()

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=42) 
    description = models.TextField()

    def __str__(self):
        return self.name


class Course(models.Model): 
    name = models.CharField(max_length=42) 
    description = models.TextField() 
    price = models.DecimalField(max_digits=10, decimal_places=2)  
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')  
    free = models.BooleanField(default=False) 
    number_of_sessions = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True) 
    discount = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(0), MaxValueValidator(100)]) 
    image = models.ImageField(upload_to='upload/thumbnail/courses/') 
    point = models.IntegerField(default=1)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='courses')

    def __str__(self):
        return self.name


    
class CourseHeadline(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='headlines')
    title = models.CharField(max_length=24) 

    def __str__(self):
        return f'{self.course.name}: {self.title}'


class Lesson(models.Model):
    course_headline = models.ForeignKey(CourseHeadline, on_delete=models.CASCADE, related_name='lessons')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')  
    title = models.CharField(max_length=42)
    video = models.FileField(upload_to='upload/video/courses/')
    description = models.TextField(blank=True, null=True)
    related = models.FileField(upload_to='upload/related/courses', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    @property
    def video_duration(self):
        if self.video and os.path.exists(self.video.path):
            clip = VideoFileClip(self.video.path)
            duration = round(clip.duration)
            clip.close()
            return duration
        return None
    
    @property
    def formatted_duration(self):
        if self.video_duration:
            return {
                'minutes': self.video_duration // 60,
                'seconds': self.video_duration % 60,
            }
        return {'minutes': 0, 'seconds': 0}
    