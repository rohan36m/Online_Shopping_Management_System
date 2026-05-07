from django.urls import path
from . import views

urlpatterns = [
    path( 'product/create/', views.ProductCreateAPI.as_view(), name="product-create"  ),
    path( 'product/list/', views.ProductListAPI.as_view(), name="product-list"  ),
    path( 'product/retrieve/<pk>/', views.ProductRetrieveAPI.as_view(), name="product-retrieve"  ),
]









