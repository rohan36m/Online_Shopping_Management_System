from rest_framework import generics, views, status
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login, logout, get_user_model
User = get_user_model()
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.middleware import csrf


class SignupAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LoginAPI(views.APIView):
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username,password=password)
        if user:
            login(request,user)
            response = Response(data={'detail':'logged in..!'}, status=status.HTTP_200_OK )
            response["X-CSRFToken"] = csrf.get_token(request)
            return response
        return Response(data={'error': 'something went wrong..!'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPI(views.APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        logout(request)
        return Response(data={'detail':'logged out..!'}, status=status.HTTP_200_OK )


class UserInfoAPI(views.APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        serializer = UserSerializer(request.user)
        response = Response(data=serializer.data, status=status.HTTP_200_OK )
        response["X-CSRFToken"] = csrf.get_token(request)
        return response


class Ping(views.APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        return Response(data={'msg':'pong'}, status=status.HTTP_200_OK )









