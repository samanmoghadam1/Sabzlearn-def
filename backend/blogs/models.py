from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class BlogPost(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]

    title = models.CharField(max_length=42)
    content = models.TextField()
    image = models.ImageField(upload_to='blogs/pictures', null=True, blank=True)  
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogs')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft') 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title}'


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    blog = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    comment_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    is_approved = models.BooleanField(default=False)  # اضافه شدن فیلد تایید

    def __str__(self):
        return f'{self.user.email} commented on "{self.blog.title}"'
