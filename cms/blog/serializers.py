from rest_framework import serializers
from .models import Article, Comment, Like, Tag

class ArticleSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)  
    seo_slug = serializers.ReadOnlyField()  

    class Meta:
        model = Article
        fields = ['id', 'author', 'title', 'content', 'seo_description', 'created_at', 'updated_at', 'seo_slug', 'tags']
        read_only_fields = ['created_at', 'updated_at']

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  

    class Meta:
        model = Comment
        fields = ['id', 'user', 'comment_content', 'created_at', 'article']
        read_only_fields = ['created_at']

class LikeSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  

    class Meta:
        model = Like
        fields = ['id', 'user', 'article']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']
