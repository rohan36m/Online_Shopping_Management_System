from rest_framework import serializers
from .models import Order, OrderItem
from products.models import Product
from django.contrib.auth import get_user_model
User = get_user_model()

# order + orderitems

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
            model = OrderItem
            fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    buyer = serializers.SlugRelatedField( slug_field="username",
                                            read_only=True
                                    )
    order_items = OrderItemSerializer(read_only=True,many=True)
    class Meta:
        model = Order
        fields = ( 'id', 'buyer', 'address', 'status', 'created_at', 'order_items' )


