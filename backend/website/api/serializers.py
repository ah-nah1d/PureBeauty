from rest_framework import serializers
from website.models import *

class HeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Header
        fields = ['id', 'title', 'isActive'] 
