from rest_framework import serializers
from .models import Cart
from products.models import Product
from django.contrib.auth import get_user_model
User = get_user_model()


class CartSerializer(serializers.ModelSerializer):
    buyer = serializers.SlugRelatedField( slug_field="username",
                                            default=serializers.CurrentUserDefault(),
                                            queryset = User.objects.all()
                                    )
    class Meta:
        model = Cart
        fields = "__all__"



# cart + product list
class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.SlugRelatedField(
                    slug_field="username",
                    read_only=True
                )
    class Meta:
        model = Product
        fields = "__all__"



class CartProductsSerializer(serializers.ModelSerializer):
    buyer = serializers.SlugRelatedField( slug_field="username",
                                            default=serializers.CurrentUserDefault(),
                                            queryset = User.objects.all()
                                    )
    product = ProductSerializer(read_only=True)
    class Meta:
        model = Cart
        fields = "__all__"


