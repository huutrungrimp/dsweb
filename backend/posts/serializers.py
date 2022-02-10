from profiles.serializers import UserSerializer
from .models import Post
from rest_framework import serializers, fields

class PostSerializer(serializers.ModelSerializer):
    username = UserSerializer(read_only=True)
    dated_on = fields.DateTimeField()
    class Meta:
        model = Post
        fields = ['id', 'username', 'title', 'content', 'dated_on']

