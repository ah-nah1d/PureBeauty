from datetime import datetime
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from store.models import Product, Order, OrderItem, ShippingAddress
from store.api.serializers.order_serializer import *

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
        for i in orderItems:
            try:
                product = Product.objects.get(id=i['product'])
            except Product.DoesNotExist:
                return Response({'detail': 'Product not found'}, status=status.HTTP_400_BAD_REQUEST)

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url
            )
            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    
    user=request.user
    try:
        order=Order.objects.get(id=pk)
        if user.is_staff or order.user == user:
            serializer=OrderSerializer(order,many=False)
            print(order)
            return Response(serializer.data)
        
        else :
            Response({'detail':'Not authorised to view this order'},status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order does not exist'},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user=request.user
    orders=user.order_set.all()
    serializer =OrderSerializer(orders,many=True)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders=Order.objects.all()
    serializer =OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):
    order=Order.objects.get(id=pk)
    order.isPaid=True
    order.paidAt=datetime.now()
    order.save()
    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request,pk):
    order=Order.objects.get(id=pk)
    order.isDelivered=True
    order.deliveredAt=datetime.now()
    order.save()
    return Response('Order was delivered')