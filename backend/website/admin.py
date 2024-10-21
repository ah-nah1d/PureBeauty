from django.contrib import admin
from .models import *

@admin.register(Header)
class HeaderAdmin(admin.ModelAdmin):
    list_display=('title','isActive')

@admin.register(AboutUs)
class AboutUsAdmin(admin.ModelAdmin):
    list_display=('title',)

@admin.register(SocialMedia)
class SocialMediaAdmin(admin.ModelAdmin):
    list_display=('title','icons','isActive','link')

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display=('address','phone','email')