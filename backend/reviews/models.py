from django.db import models
from django.contrib.auth import get_user_model
from courses.models import Course
from django.core.validators import MaxLengthValidator

User = get_user_model()


class Review(models.Model):
    RATING_CHOICES = [
        (1, 'خیلی بد'),
        (2, 'بد'),
        (3, 'متوسط'),
        (4, 'خوب'),
        (5, 'خیلی خوب'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='reviews')
    comment = models.TextField(validators=[MaxLengthValidator(500)])
    rate = models.PositiveSmallIntegerField(choices=RATING_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')

    def __str__(self):
        return f'Review by {self.user.email} for {self.course.name} - Rating: {self.rate}'


class Reply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='replies')
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='replies')
    comment = models.TextField(validators=[MaxLengthValidator(500)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Reply by {self.user.email} on review by {self.review.user.email}'
