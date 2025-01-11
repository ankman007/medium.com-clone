from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Blog, Comment, Like
from .serializers import CommentSerializer, LikeSerializer, BlogEngagementSerializer
from django.shortcuts import get_object_or_404

# Add a comment to a blog post
class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        blog = get_object_or_404(Blog, pk=self.request.data.get('blog'))
        serializer.save(author=self.request.user, blog=blog)

# Like a specific blog post
class LikePostView(generics.GenericAPIView):
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        blog = get_object_or_404(Blog, pk=self.kwargs['id'])
        if Like.objects.filter(blog=blog, user=request.user).exists():
            return Response({"message": "You have already liked this post."}, status=status.HTTP_400_BAD_REQUEST)

        Like.objects.create(blog=blog, user=request.user)
        return Response({"message": "Post liked successfully."}, status=status.HTTP_201_CREATED)

# Retrieve engagement metrics for a specific blog post
class BlogEngagementView(generics.RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogEngagementSerializer

    def get(self, request, *args, **kwargs):
        blog = get_object_or_404(Blog, pk=self.kwargs['id'])
        serializer = self.get_serializer(blog)
        return Response(serializer.data)
