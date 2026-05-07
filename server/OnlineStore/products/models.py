from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Product(models.Model):
    seller = models.ForeignKey(User,on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255)
    product_details = models.TextField()
    price = models.DecimalField(max_digits=7, decimal_places=2)
    image = models.ImageField(upload_to="product_images/")
    stock = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)










