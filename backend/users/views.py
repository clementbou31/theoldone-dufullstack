from django.shortcuts import render
from rest_framework import status 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from .models import CustomUsers
from .serializers import UsersSerializers

@api_view(['POST'])
def register(request):
    """
    Endpoint to save new user
    Get : {"email": "...", "name":, "...", "password": "..."}
    """

    serializer = UsersSerializers(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "User successfully created",
            "user": serializer.data
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    """
    Endpoint for connection
    Get : {"email": "...", "password": "..."}
    """

    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user = CustomUsers.objects.get(email=email)

        if check_password(password, user.password):
            return Response({
                "message": "Succes handle connection",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name" : user.name
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "error": "Incorrect password"
            }, status=status.HTTP_401_UNAUTHORIZED)
    
    except CustomUsers.DoesNotExist:
        return Response({
            "error": "Users not find"
        }, status=status.HTTP_404_NOT_FOUND)
