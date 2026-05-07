from rest_framework.permissions import BasePermission

class IsBuyer(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user.role == "buyer"
        return False


class IsMyWishlist(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            return ( request.user.role == "buyer" and obj.buyer == request.user )
        return False






