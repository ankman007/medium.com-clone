from django.urls import path
from .views import CommentCreateView, LikePostView, BlogEngagementView

urlpatterns = [
    path('comments/', CommentCreateView.as_view(), name='comment-create'),
    path('posts/<int:id>/like/', LikePostView.as_view(), name='post-like'),
    path('posts/<int:id>/engagement/', BlogEngagementView.as_view(), name='post-engagement'),
]
