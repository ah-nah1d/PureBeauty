from django.db import models


class Header(models.Model):
    title =models.TextField(null=True,blank=True,max_length=250)
    isActive=models.BooleanField(default=False)