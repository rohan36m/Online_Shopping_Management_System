from rest_framework.permissions import BasePermission

class IsBuyer(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user.role == "buyer"
        return False

