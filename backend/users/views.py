from django.shortcuts import render
from rest_framework import status 
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from .models import CustomUsers, Post
from .serializers import UsersSerializers, PostSerializer

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

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """
    Endpoint for connection
    Get : {"email": "...", "password": "..."}
    """

    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user = CustomUsers.objects.get(email=email)

        if user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Succes handle connection",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
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
    
@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def me(request):
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    try:
        decoded = AccessToken(token)
        user = CustomUsers.objects.get(id=decoded['user_id'])
        return Response({
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.name
            }
        })
    except Exception as e:
        return Response({'error': 'Token invalide'}, status=401)



@api_view(["GET", "POST"])
@permission_classes([AllowAny]) 
def posts(request):
    if request.method == "GET":
        qs = Post.objects.select_related("author").all()
        return Response(PostSerializer(qs, many=True).data)

    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if not token:
        return Response({"error": "Missing token"}, status=401)

    try:
        decoded = AccessToken(token)
        user = CustomUsers.objects.get(id=decoded["user_id"])
    except Exception:
        return Response({"error": "Invalid token"}, status=401)

    serializer = PostSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    post = Post.objects.create(
        author=user,
        text=serializer.validated_data.get("text", ""),
        image_url=serializer.validated_data.get("image_url", ""),
    )

    return Response(PostSerializer(post).data, status=201)