from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Notification(models.Model):
    TYPE_CHOICES = [
        ('info', 'Information'),
        ('warning', 'Warning'),
        ('success', 'Success'),
        ('error', 'Error'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_title = models.CharField(max_length=42)
    notification_text = models.TextField()
    notification_type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='info')  # نوع نوتیفیکیشن
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.email}: {self.notification_title}"

    def mark_as_read(self):
        self.read = True
        self.save()

    def mark_as_unread(self):
        self.read = False
        self.save()
