from rest_framework import serializers 
from .models import User, Skills


class SkillSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Skills 
        fields = ['id', 'name', 'created_at'] 


class UserSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True) 
    image_url = serializers.SerializerMethodField(read_only=True)
    # avatar_url = serializers.SerializerMethodField()

    class Meta: 
        model = User 
        fields = ['id', 'email', 'name', 'phone_number', 'role', 'image_url', 'skills']

    def get_image_url(self, obj):
        return obj.avatar.url if obj.avatar else None
    