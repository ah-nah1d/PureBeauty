from django.contrib import admin
from .models import *

@admin.register(Header)
class HeaderAdmin(admin.ModelAdmin):
    list_display=('title','isActive')