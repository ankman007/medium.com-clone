from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include("account.urls")),
    path('blogs/user/', include("blog.urls")),
    path('api/', include("engagement.urls")),
]
