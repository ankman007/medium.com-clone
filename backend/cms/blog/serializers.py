from rest_framework import serializers
from .models import Article, Comment, Like, Tag
from .models import Image

class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)
    author_id = serializers.CharField(source='author.id', read_only=True)
    author_email = serializers.EmailField(source='author.email', read_only=True)  # Assuming the User model has an email field
    seo_slug = serializers.ReadOnlyField()
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)
    like_count = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'author_name', 'author_id', 'author_email', 'title', 'content', 'seo_description', 'created_at', 'updated_at', 'seo_slug', 'tags', 'like_count']
        read_only_fields = ['created_at', 'updated_at']
        unique_together = ['author', 'seo_slug']

    def get_like_count(self, obj):
        return Like.objects.filter(article=obj).count()

class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    user_id = serializers.CharField(source='user.id', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    article_id = serializers.CharField(source='article.id', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user_name', 'user_id', 'user_email', 'comment_content', 'created_at', 'article_id']
        read_only_fields = ['created_at']


class LikeSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    article_title = serializers.CharField(source='article.title', read_only=True)
    like_count = serializers.SerializerMethodField()

    class Meta:
        model = Like
        fields = ['id', 'user_name', 'user_email', 'user_id', 'article_id', 'article_title', 'like_count']
    
    def get_like_count(self, obj):
        return Like.objects.filter(article=obj.article).count()


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag 
        fields = ['id', 'name']
        
class ImageSerializer(serializers.ModelSerializer):
    uploaded_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Image
        fields = ['id', 'image', 'uploaded_at', 'uploaded_by']
        read_only_fields = ['uploaded_at']