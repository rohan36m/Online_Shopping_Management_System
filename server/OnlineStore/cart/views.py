from rest_framework import generics
from .models import Cart
from .serializers import CartSerializer, CartProductsSerializer
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from .permissions import IsBuyer, IsMyCart


class CartCreateAPI(generics.CreateAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsBuyer]
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class CartListAPI(generics.ListAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsBuyer]
    serializer_class = CartProductsSerializer

    def get_queryset(self):
        return Cart.objects.filter( buyer = self.request.user )


class CartDeleteAPI(generics.DestroyAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsMyCart]
    queryset = Cart.objects.all()
    serializer_class = CartSerializer



