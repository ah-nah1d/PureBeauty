
from rest_framework.decorators import api_view
from rest_framework.response import Response

from store.api.serializers.product_serializer import *
from store.models import Product, Category


@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response({'categories': serializer.data})

@api_view(['GET'])
def getProducts(request):
    query=request.query_params.get('keyword')
    
    if query ==None:
        query=''
    products=Product.objects.filter(name__icontains=query)


    serializer =ProductSerializer(products,many=True)
    return Response({'products':serializer.data})

@api_view(['GET'])
def getFeaturedItems(request):
    featured_homes = FeaturedHome.objects.all()
    featured_categories = Category.objects.filter(is_featured=True)
    featured_homes_data = FeaturedHomeSerializer(featured_homes, many=True).data
    featured_categories_data = CategorySerializer(featured_categories, many=True).data
    response_data = {
        'featured_homes': featured_homes_data,
        'featured_categories': featured_categories_data,
    }

    return Response({'featuredItem': response_data})
