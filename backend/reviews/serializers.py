from rest_framework import serializers
from .models import Review, Reply


class ReplySerializer(serializers.ModelSerializer):
    user_data = serializers.SerializerMethodField(read_only=True)  
    def get_user_data(self, obj):
        return {
            'id': obj.user.pk,
            'name': obj.user.name,
            'email': obj.user.email,
            'role': obj.user.role
        }
    class Meta:
        model = Reply
        fields = ['id', 'user', 'comment', 'created_at', 'user_data']
        read_only_fields = ['id', 'created_at']


class ReviewSerializer(serializers.ModelSerializer):
    replies = ReplySerializer(many=True, read_only=True) 
    user_data = serializers.SerializerMethodField(read_only=True)  

    def get_user_data(self, obj):
        return {
            'id': obj.user.pk,
            'name': obj.user.name,
            'email': obj.user.email,
            'role': obj.user.role
        }

    class Meta:
        model = Review
        fields = ['id', 'user', 'user_data', 'comment', 'rate', 'created_at', 'replies']
        read_only_fields = ['id', 'created_at']
