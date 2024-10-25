from django.contrib.auth.models import User
from django.db import models
from django.utils.text import slugify
import uuid


class Category(models.Model):
    name = models.CharField(max_length=250, null=True, blank=True)
    banner = models.ImageField(null=True, blank=True, default='/placeholder.png')
    is_featured = models.BooleanField(default=False) 

    def __str__(self):
        return self.name

class FeaturedHome(models.Model):
    discountImage = models.ImageField(null=True, blank=True, default='/placeholder.png')
    discountName = models.CharField(max_length=250, null=True, blank=True)
    discountAmmount = models.PositiveIntegerField(null=True, blank=True)
    
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) 
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=250, null=True, blank=True)
    slug = models.SlugField(unique=True,blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    brand = models.CharField(max_length=250, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    isFeatured = models.BooleanField(default=False)
    onSale = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        unique_slug = f"{slugify(self.name)}-{uuid.uuid4()}"
        self.slug = unique_slug
        super().save(*args, **kwargs)


    def __str__(self):
        return self.name

    
class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    paymentMethod = models.CharField(max_length=250,null=True,blank=True)
    shippingPrice = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    totalPrice = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt =  models.DateTimeField(auto_now_add=False,null=True,blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) :
        return str(self.createdAt)
    
    


class OrderItem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True) 
    order = models.ForeignKey(Order,on_delete=models.SET_NULL,null=True) 
    name = models.CharField(max_length=250,null=True,blank=True)
    qty = models.IntegerField(null=True,blank=True,default=0)
    price =  models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    image = models.CharField(max_length=250,null=True,blank=True)
    def __str__(self):
        return str(self.name)



class ShippingAddress(models.Model):
    order = models.OneToOneField(Order,on_delete=models.PROTECT,null=True) 
    address = models.CharField(max_length=250,null=True,blank=True)
    city = models.CharField(max_length=250,null=True,blank=True)
    country = models.CharField(max_length=250,null=True,blank=True)
    postalCode = models.CharField(max_length=250,null=True,blank=True)

    def __str__(self):
        return str(self.address)


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True) 
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) 
    name = models.CharField(max_length=250, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)
