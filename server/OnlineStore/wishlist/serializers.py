from rest_framework import serializers
from .models import Wishlist
from products.models import Product
from django.contrib.auth import get_user_model
User = get_user_model()


class WishlistSerializer(serializers.ModelSerializer):
    buyer = serializers.SlugRelatedField(
        slug_field = "username",
        default = serializers.CurrentUserDefault(),
        queryset = User.objects.all()
    )
    class Meta:
        model = Wishlist
        fields = "__all__"


# wishlist + product list
class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.SlugRelatedField(
                    slug_field="username",
                    read_only=True
                )
    class Meta:
        model = Product
        fields = "__all__"

class WishlistProductsSerializer(serializers.ModelSerializer):
    buyer = serializers.SlugRelatedField(
        slug_field = "username",
        read_only=True
    )
    product = ProductSerializer(read_only=True)
    class Meta:
        model = Wishlist
        fields = "__all__"


