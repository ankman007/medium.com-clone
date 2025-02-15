from django.urls import path
from .views import (
    ArticleListView, ArticleDetail, CreateArticleView, DeleteArticleView, 
    UpdateArticleView, ToggleLikeView, AddCommentView, AddTagsToArticleView, 
    CreateTagView, GetPostsByUserView, GetPostsByTagView, UploadImageView, TagsListView
)

urlpatterns = [
    path('', ArticleListView.as_view(), name='article-list'),
    path('tags/', TagsListView.as_view(), name='tag-list'),
    path('create/', CreateArticleView.as_view(), name='create-article'),
    path('<str:seo_slug>/', ArticleDetail.as_view(), name='article-detail'),
    path('<int:id>/update/', UpdateArticleView.as_view(), name='update-article'),
    path('<int:id>/delete/', DeleteArticleView.as_view(), name='delete-article'),
    path('<int:article_id>/like/', ToggleLikeView.as_view(), name='toggle-like'),
    path('<int:article_id>/comment/', AddCommentView.as_view(), name='add-comment'),
    path('<int:article_id>/tags/', AddTagsToArticleView.as_view(), name='add-tags-to-article'),
    path('tags/create/', CreateTagView.as_view(), name='create-tag'),
    path('user/<int:id>/', GetPostsByUserView.as_view(), name='get-articles-by-user'),
    path('tag/<int:id>/', GetPostsByTagView.as_view(), name='get-articles-by-tag'),
    path('images/upload/', UploadImageView.as_view(), name='upload-image'),
]
