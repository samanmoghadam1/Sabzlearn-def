from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class Ticket(models.Model):
    STATUS_CHOICES = (
        (1, 'باز'),
        (2, 'در حال بررسی'),
        (3, 'بسته'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tickets')
    concept = models.CharField(max_length=42)  
    status = models.IntegerField(choices=STATUS_CHOICES, default=1)  
    description = models.TextField(blank=True, null=True)  
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return f"Ticket {self.id} ({self.get_status_display()}) by {self.user.email}"


class Message(models.Model):
    SENDER_CHOICES = (
        (1, "کاربر"),
        (2, 'پشتیبان')
    )
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='messages')
    sender = models.IntegerField(choices=SENDER_CHOICES, default=1) 
    message_text = models.TextField(max_length=500)
    file = models.FileField(upload_to='support/files/', null=True, blank=True)  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message by {self.get_sender_display()} in Ticket {self.ticket.id}"

    def short_message(self):
        return f"{self.message_text[:50]}..." if len(self.message_text) > 50 else self.message_text
