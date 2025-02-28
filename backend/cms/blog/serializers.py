from rest_framework import serializers
from .models import Article, Comment, Like, Tag
from .models import Image
class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)
    author_id = serializers.CharField(source='author.id', read_only=True)
    author_email = serializers.EmailField(source='author.email', read_only=True)
    author_avatar = serializers.SerializerMethodField()

    seo_slug = serializers.ReadOnlyField()
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)
    like_count = serializers.SerializerMethodField()
    thumbnail = serializers.ImageField(required=False)

    class Meta:
        model = Article
        fields = [
            'id', 'author_name', 'author_id', 'author_email', 'title', 'content',
            'seo_description', 'created_at', 'updated_at', 'seo_slug', 'tags',
            'like_count', 'thumbnail', 'author_avatar'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_like_count(self, obj):
        return Like.objects.filter(article=obj).count()

    def get_thumbnail(self, obj):
        if obj.thumbnail:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.thumbnail.url)
            return obj.thumbnail.url  
        return None  

    def get_author_avatar(self, obj):
        if obj.author and obj.author.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.author.avatar.url)
            return obj.author.avatar.url  
        return None

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        thumbnail = validated_data.pop('thumbnail', None)
        
        article = Article.objects.create(**validated_data)

        if thumbnail:
            article.thumbnail = thumbnail
            article.save()

        article.tags.set(tags_data)
        
        return article

class CommentSerializer(serializers.ModelSerializer):
    article_id = serializers.CharField(source='article.id', read_only=True)
    user_name = serializers.CharField(source='user.name', read_only=True)
    user_id = serializers.CharField(source='user.id', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_avatar = serializers.ImageField(source='user.avatar', read_only=True)

    def get_user_avatar(self, obj):
        if obj.user and obj.user.avatar:
            request = self.context.get('request')  # This should work, but make sure it's being passed
            if request:
                return request.build_absolute_uri(obj.user.avatar.url)
            return obj.user.avatar.url
        return None
    class Meta:
        model = Comment
        fields = ['id', 'user_name', 'user_id', 'user_email', 'comment_content', 'created_at', 'article_id', 'user_avatar']
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
