from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Lesson

@receiver([post_save, post_delete], sender=Lesson)
def update_session_number(sender, instance, **kwargs):
    course = instance.course
    course.number_of_sessions = course.lessons.count()
    course.save()
