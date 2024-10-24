
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import update_session_auth_hash



from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

from store.api.serializers.user_serializer import *

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs) :
        data =super().validate(attrs)
        serializer =UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k]=v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data=request.data
    try:
        user =User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password = make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except :
        message ={'detail':'user with this email already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user =request.user
    serializer =UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user =request.user
    serializer =UserSerializerWithToken(user,many=False)
    data=request.data 
    print (data)
    if data['name']!='':
        user.first_name=data['name']
    if data['oldPassword']!='':
        if not user.check_password(data['oldPassword']):
            return Response({'detail': 'Old password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
    if data['password'] != '':
        user.password=make_password(data['password'])
    
    user.save()

    update_session_auth_hash(request, user) 
    
    return Response(serializer.data)