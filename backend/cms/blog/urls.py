from django.urls import path
from .views import (
    ArticleListView,
    ArticleDetail,
    CreateArticleView,
    DeleteArticleView,
    UpdateArticleView,
    CreateTagView,
)

urlpatterns = [
    path('', ArticleListView.as_view(), name='article_list'),  
    path('create/', CreateArticleView.as_view(), name='create_article'),  
    path('tags/create/', CreateTagView.as_view(), name='create_tag'),
    path('<int:id>/', ArticleDetail.as_view(), name='article_detail'),  
    path('<int:id>/update/', UpdateArticleView.as_view(), name='update_article'), 
    path('<int:id>/delete/', DeleteArticleView.as_view(), name='delete_article'), 
]
