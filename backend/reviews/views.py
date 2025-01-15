from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404

from courses.models import Course 
from .models import Review, Reply
from .serializers import ReviewSerializer, ReplySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
# Create your views here.


@api_view(['GET'])
def comment(request, pk):
    course = get_object_or_404(Course, pk=pk)
    reviews = course.reviews.select_related('user').prefetch_related('replies', 'replies__user')
    serializer = ReviewSerializer(reviews, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request, pk): 
    course = get_object_or_404(Course, pk=pk) 
    user = request.user 
    text = request.data.get('comment')
    print(text)

    if not text:
        return Response({'error': 'Comment text is required.'}, status=status.HTTP_400_BAD_REQUEST)

    existing_review = Review.objects.filter(user=user, course=course).first()
    if existing_review:
        return Response(
            {"detail": "شما قبلاً برای این دوره نظر داده‌اید."},
            status=status.HTTP_400_BAD_REQUEST
        )

    review = Review.objects.create(
        user=user, 
        course=course, 
        comment=text, 
        rate=2, 
    )
    serializer = ReviewSerializer(review, context={'request': request}) 

    return Response(serializer.data, status=status.HTTP_201_CREATED) 
 

@api_view(['POST']) 
@permission_classes([IsAuthenticated]) 
def create_reply(request, pk): 
    user = request.user 
    comment = get_object_or_404(Review, pk=pk)

    text = request.data.get('text') 
    if not text: 
        return Response({'error': 'Text field is required.'}, status=status.HTTP_400_BAD_REQUEST)

    reply = Reply.objects.create(
        user=user, 
        review=comment, 
        comment=text
    ) 

    serializer = ReplySerializer(reply, context={'request': request}) 

    return Response(serializer.data, status=status.HTTP_201_CREATED)

