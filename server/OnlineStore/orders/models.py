from django.db import models
from products.models import Product
from django.contrib.auth import get_user_model
User = get_user_model()


class Order(models.Model):
    STATUSES = { 'pending': 'pending', 'delivered': 'delivered', 'cancelled': 'cancelled' }
    buyer = models.ForeignKey(User,on_delete=models.CASCADE)
    address = models.TextField(null=True,blank=True)
    status = models.CharField(max_length=255, default="pending", choices=STATUSES  )
    created_at = models.DateTimeField(auto_now_add=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE,related_name="order_items")
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    product_name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)








