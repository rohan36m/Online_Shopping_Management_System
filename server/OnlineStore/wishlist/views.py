from rest_framework import generics
from .serializers import WishlistSerializer, WishlistProductsSerializer
from .models import Wishlist
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from .permissions import IsBuyer, IsMyWishlist


class WishlistCreateAPI(generics.CreateAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsBuyer]
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer


class WishlistListAPI(generics.ListAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsBuyer]
    serializer_class = WishlistProductsSerializer

    def get_queryset(self):
        return Wishlist.objects.filter( buyer = self.request.user )


class WishlistDeleteAPI(generics.DestroyAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsMyWishlist]
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer




