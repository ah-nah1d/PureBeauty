from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from website.models import *

from .serializers import HeaderSerializer

@api_view(['GET'])
def getHeader(request):
    headers = Header.objects.all()
    serializer = HeaderSerializer(headers, many=True)
    return Response(serializer.data)