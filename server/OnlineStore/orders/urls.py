from django.urls import path
from . import views

urlpatterns = [
    path( 'order/create/', views.OrderCreateAPI.as_view(), name="order-create"  ),
    path( 'order/list/', views.OrderListAPI.as_view(), name="order-list"  ),
]


