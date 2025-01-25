from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import check_password, make_password
from .models import User
from django.http import HttpRequest

def login_view(request):
    return HttpRequest("Login Endpoint")

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        if data['password'] != data['confirm_password']:
            return Response({'error': 'Passwords do not match'}, status=400)

        user = User(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password']),
        )
        user.save()
        return Response({'message': 'User registered successfully'}, status=201)

class LoginView(APIView):
    def post(self, request):
        data = request.data
        user = User.objects.filter(username=data['username']).first()

        if user is None:
            raise AuthenticationFailed('User not found')

        if not check_password(data['password'], user.password):
            raise AuthenticationFailed('Incorrect password')

        return Response({'message': 'Login successful'})
