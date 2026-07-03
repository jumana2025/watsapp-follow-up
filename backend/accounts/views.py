from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer

class LoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self,request):
        serializer=LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username=serializer.validated_data['username']
        password=serializer.validated_data['password']
        user=authenticate(username=username,password=password)
        if not user:
            return Response(
                {'error':"Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        refresh=RefreshToken.for_user(user)
        return Response({
            "message": "Login Successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username
                   
                                 })

