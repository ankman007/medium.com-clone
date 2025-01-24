from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import ArticleSerializer, CommentSerializer, LikeSerializer, TagSerializer
from .models import Article, Comment, Like, Tag
from loguru import logger

class ApiOverview(APIView):
    def get(self, request):
        api_urls = {
            'API Overview': '/',
            'List Articles': '/articles/',
            'Create Article': '/articles/create/',
            'Article Details': '/articles/<int:id>/',
            'Update Article': '/articles/<int:id>/update/',
            'Delete Article': '/articles/<int:id>/delete/',
        }
        return Response(api_urls)

class ArticleListView(APIView):
    def get(self, request):
        try:
            articles = Article.objects.all()
            serializer = ArticleSerializer(articles, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error fetching article list: {e}")
            return Response({"error": "Error fetching article list"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ArticleDetail(APIView):
    def get(self, request, id):
        try:
            article = get_object_or_404(Article, id=id)
            serializer = ArticleSerializer(article)
            response_data = serializer.data
            
            response_data['likes_count'] = article.likes.count()
            response_data['comments_count'] = article.comments.count()  # Fixed wrong count logic
            
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error fetching article details for ID {id}: {e}")
            return Response({"error": "Error fetching article details"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateArticleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            serializer = ArticleSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                logger.warning(f"Validation error: {serializer.errors}")
                return Response({'error': serializer.errors, 'message': 'Error creating new article.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error creating article: {e}")
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteArticleView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id):
        try:
            article = get_object_or_404(Article, id=id)
            article.delete()
            return Response({"message": "Article deleted successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error deleting article with ID {id}: {e}")
            return Response({"error": "Error deleting article."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateArticleView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, id):
        try:
            article = get_object_or_404(Article, id=id)
            serializer = ArticleSerializer(instance=article, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                logger.warning(f"Validation error on update: {serializer.errors}")
                return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error updating article with ID {id}: {e}")
            return Response({"error": "Error updating article."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ToggleLikeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, article_id):
        try:
            user = request.user
            article = get_object_or_404(Article, id=article_id)
            like, created = Like.objects.get_or_create(user=user, article=article)
            
            if not created:
                like.delete()
                return Response({"message": "Like removed"}, status=status.HTTP_200_OK)
            
            return Response({"message": "Article liked"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error toggling like for article ID {article_id}: {e}")
            return Response({"error": "Error toggling like"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddCommentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, article_id):
        try:
            article = get_object_or_404(Article, id=article_id)
            comment_content = request.data.get('comment_content')
            
            if not comment_content:
                return Response({"error": "Comment content is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            comment = Comment.objects.create(user=request.user, article=article, comment_content=comment_content)
            serializer = CommentSerializer(comment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error adding comment to article ID {article_id}: {e}")
            return Response({"error": "Error adding comment"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddTagsToArticleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, article_id):
        try:
            article = get_object_or_404(Article, id=article_id)
            tags_data = request.data.get('tags')
            
            if not tags_data:
                return Response({"error": "Tags are required"}, status=status.HTTP_400_BAD_REQUEST)
            
            tags = []
            for tag_name in tags_data:
                tag, created = Tag.objects.get_or_create(name=tag_name)
                tags.append(tag)
            
            article.tags.set(tags)
            article.save()
            
            serializer = ArticleSerializer(article)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error adding tags to article ID {article_id}: {e}")
            return Response({"error": "Error adding tags"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
