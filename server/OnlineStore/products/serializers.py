from rest_framework import serializers
from .models import Product
from django.contrib.auth import get_user_model
User = get_user_model()


class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.SlugRelatedField(
                    slug_field="username",
                    default=serializers.CurrentUserDefault(),
                    queryset=User.objects.all()
                )
    class Meta:
        model = Product
        fields = "__all__"










