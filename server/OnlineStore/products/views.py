from rest_framework import generics
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import ProductSerializer
from .models import Product
from .permissions import IsSeller

class ProductCreateAPI(generics.CreateAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsSeller]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductListAPI(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductRetrieveAPI(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

