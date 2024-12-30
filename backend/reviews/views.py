from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from django.shortcuts import get_object_or_404

from courses.models import Course 
from .models import Review, Reply
from .serializers import ReviewSerializer
# Create your views here.


@api_view(['GET'])
def comment(request, pk):
    course = get_object_or_404(Course, pk=pk)
    reviews = course.reviews.select_related('user').prefetch_related('replies', 'replies__user')
    serializer = ReviewSerializer(reviews, many=True, context={'request': request})
    return Response(serializer.data)
