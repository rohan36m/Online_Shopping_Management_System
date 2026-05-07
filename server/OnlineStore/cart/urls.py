from django.urls import path
from . import views

urlpatterns = [
    path( 'cart/create/', views.CartCreateAPI.as_view(), name="cart-create"  ),
    path( 'cart/list/', views.CartListAPI.as_view(), name="cart-list"  ),

    path( 'cart/delete/<pk>/', views.CartDeleteAPI.as_view(), name="cart-delete"  ),
]


