from django.urls import path
from . import views

urlpatterns = [
    path( 'signup/', views.SignupAPI.as_view(), name="signup"  ),
    path( 'login/', views.LoginAPI.as_view(), name="login"  ),
    path( 'logout/', views.LogoutAPI.as_view(), name="logout"  ),
    path( 'user/info/', views.UserInfoAPI.as_view(), name="user-info"  ),
    path( 'ping/', views.Ping.as_view(), name="ping"  ),
]









