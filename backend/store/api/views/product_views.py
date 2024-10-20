from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger

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