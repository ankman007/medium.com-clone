from django.contrib import admin
from account.models import User
from blog.models import Article, Comment, Like, Tag, Image  
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserModelAdmin(BaseUserAdmin):
    list_display = ["id", "email", "tc", "name", "is_admin", "avatar"]
    list_filter = ["is_admin"]
    
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name", "tc"]}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]
    
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "name", "tc",  "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["email"]
    filter_horizontal = []

class ArticleModelAdmin(admin.ModelAdmin):
    list_display = ["id", "author", "title", "created_at", "updated_at", "thumbnail"]
    list_filter = ["created_at", "tags"]
    search_fields = ["title", "content"]
    prepopulated_fields = {"seo_slug": ("title",)}  

class CommentModelAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "article", "created_at"]
    list_filter = ["created_at", "article"]
    search_fields = ["comment_content"]

class LikeModelAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "article"]
    list_filter = ["article"]
    search_fields = ["user__email", "article__title"]

admin.site.register(User, UserModelAdmin)
admin.site.register(Article, ArticleModelAdmin)
admin.site.register(Comment, CommentModelAdmin)
admin.site.register(Like, LikeModelAdmin)
admin.site.register(Tag)  
admin.site.register(Image)  
