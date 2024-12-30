from rest_framework.permissions import BasePermission 


class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 2
    

class CheckTeacher(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user 
    
