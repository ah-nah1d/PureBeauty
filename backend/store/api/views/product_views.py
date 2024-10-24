
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from store.api.serializers.product_serializer import *
from store.models import Product, Category
from rest_framework import status



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

@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(id=pk)
    serializer =ProductSerializer(product,many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,pk):
    user =request.user
    product =Product.objects.get(id=pk)
    data =request.data

    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content ={'detail':'Product already reviewed'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)
    elif data['rating'] == 0:
        content ={'detail':'Please select a rating'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)
    else:
        review=Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )
        reviews=product.review_set.all()
        product.numReviews =len(reviews)

        total =0 
        for i in reviews :
            total+= i.rating

        product.rating=total/len(reviews)
        product.save()

        return Response({'Review Added'})