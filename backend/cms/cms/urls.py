from django.contrib import admin
from django.urls import path, include
from cms.views import ApiOverview
from .views import ApiOverview;
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', ApiOverview.as_view(), name='api-overview'),
    path('admin/', admin.site.urls),
    path('user/', include("account.urls")),
    path('articles/', include("blog.urls")),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
