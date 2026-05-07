from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLES = { 'seller': 'seller', 'buyer': 'buyer' }
    role = models.CharField(max_length=255, choices=ROLES, default='buyer'  )





