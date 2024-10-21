from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from website.models import *

from .serializers import *

@api_view(['GET'])
def getHeader(request):
    headers = Header.objects.filter(isActive=True)
    serializer = HeaderSerializer(headers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getAboutUs(request):
    aboutUs = AboutUs.objects.all()
    serializer = AboutUsSerializer(aboutUs,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getSocialMedia(request):
    socialMedia = SocialMedia.objects.filter(isActive=True)
    serializer = SocialMediaSerializer(socialMedia,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getContact(request):
    contact = Contact.objects.all()
    serializer = ContactSerializer(contact,many=True)
    return Response(serializer.data)