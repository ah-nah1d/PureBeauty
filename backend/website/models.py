from django.db import models


class Header(models.Model):
    title =models.TextField(null=True,blank=True,max_length=250)
    isActive=models.BooleanField(default=False)

    def __str__(self):
        return str(self.title)



class AboutUs(models.Model):
    title =models.TextField(null=True,blank=True,max_length=250)

    def __str__(self):
        return str(self.title)
    
class SocialMedia(models.Model):
    title =models.CharField(null=True,blank=True,max_length=250)
    icons = models.ImageField(null=True, blank=True, default='/placeholder.png')
    link =models.CharField(null=True,blank=True,max_length=250)
    isActive=models.BooleanField(default=False)
    def __str__(self):
        return str(self.title)

class Contact(models.Model):
    address =models.TextField(null=True,blank=True,max_length=250)
    phone = models.CharField(max_length=250, null=True, blank=True)
    email=models.EmailField( max_length=250)
    def __str__(self):
        return str(self.email)



