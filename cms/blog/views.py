from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import ArticleSerializer
from .models import Article
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
        article = get_object_or_404(Article, id=id)
        serializer = ArticleSerializer(article)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateArticleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            logger.warning(f"Error creating article: {serializer.errors}")
            return Response({'error': serializer.errors, 'message': 'Error creating new article.'}, status=status.HTTP_400_BAD_REQUEST)


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
                logger.warning(f"Error updating article: {serializer.errors}")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error updating article with ID {id}: {e}")
            return Response({"error": "Error updating article."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
