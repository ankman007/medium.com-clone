from django.contrib import admin
from django.urls import path, include
from cms.views import ApiOverview
from .views import ApiOverview;

urlpatterns = [
    path('', ApiOverview.as_view(), name='api-overview'),
    path('admin/', admin.site.urls),
    path('api/user/', include("account.urls")),
    path('articles/', include("blog.urls")),
]
