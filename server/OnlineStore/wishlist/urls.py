from django.urls import path
from . import views

urlpatterns = [
    path( 'wishlist/create/', views.WishlistCreateAPI.as_view(), name="wishlist-create"  ),
    path( 'wishlist/list/', views.WishlistListAPI.as_view(), name="wishlist-list"  ),

    path( 'wishlist/delete/<pk>/', views.WishlistDeleteAPI.as_view(), name="wishlist-delete" ),
]









