from django.urls import path
from .views import (
    ArticleListView, ArticleDetail, CreateArticleView, DeleteArticleView, 
    UpdateArticleView, ToggleLikeView, AddCommentView, AddTagsToArticleView, 
    CreateTagView, GetPostsByUserView, GetPostsByTagView, UploadImageView
)

urlpatterns = [
    path('articles/', ArticleListView.as_view(), name='article-list'),
    path('articles/create/', CreateArticleView.as_view(), name='create-article'),
    path('articles/<int:id>/', ArticleDetail.as_view(), name='article-detail'),
    path('articles/<int:id>/update/', UpdateArticleView.as_view(), name='update-article'),
    path('articles/<int:id>/delete/', DeleteArticleView.as_view(), name='delete-article'),
    path('articles/<int:article_id>/like/', ToggleLikeView.as_view(), name='toggle-like'),
    path('articles/<int:article_id>/comment/', AddCommentView.as_view(), name='add-comment'),
    path('articles/<int:article_id>/tags/', AddTagsToArticleView.as_view(), name='add-tags-to-article'),
    path('tags/create/', CreateTagView.as_view(), name='create-tag'),
    path('articles/user/<str:username>/', GetPostsByUserView.as_view(), name='get-articles-by-user'),
    path('articles/tag/<str:tag_name>/', GetPostsByTagView.as_view(), name='get-articles-by-tag'),
    path('images/upload/', UploadImageView.as_view(), name='upload-image'),
]
