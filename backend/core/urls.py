from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="PureBeauty API",
        default_version="v1",
        description="Comprehensive API documentation for the PureBeauty project",
        contact=openapi.Contact(email="syed.ah.nahid@gmail.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/users/', include('store.api.urls.user_urls')),
    path('api/products/', include('store.api.urls.product_urls')),
    path('api/orders/', include('store.api.urls.order_urls')),
    path('api/website/', include('website.api.urls')),
    
    path('docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
