from django.db import models
from products.models import Product
from django.contrib.auth import get_user_model
User = get_user_model()

class Cart(models.Model):
    buyer = models.ForeignKey(User,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)



