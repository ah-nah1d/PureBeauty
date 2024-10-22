from rest_framework import serializers
from store.models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class FeaturedHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturedHome
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model =Product
        fields ='__all__'

    def get_reviews(self,obj):
        reviews=obj.review_set.all()
        serializer =ReviewSerializer(reviews,many=True)

        return serializer.data

class ReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model =Review
        fields ='__all__'