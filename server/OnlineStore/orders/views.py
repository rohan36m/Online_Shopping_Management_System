from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from .permissions import IsBuyer
from .models import Order, OrderItem
from cart.models import Cart
from .serializers import OrderSerializer


class OrderCreateAPI(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsBuyer]
    def post(self,request):

        # creating an Order
        orderObj = Order.objects.create( buyer = request.user, address= request.data.get('address') )
        print( 'orderObj--->', orderObj )

        # cart
        cartObjs = Cart.objects.filter( buyer = request.user )
        print( 'cartObjs --->', cartObjs )

        for cartObj in cartObjs:
            OrderItem.objects.create(   order=orderObj, 
                                        product=cartObj.product,
                                        price=cartObj.product.price,
                                        product_name=cartObj.product.product_name,
                                        quantity=cartObj.quantity,
                                    )

        return Response(data="created..!",status=status.HTTP_201_CREATED)


class OrderListAPI(generics.ListAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsBuyer]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter( buyer = self.request.user )










