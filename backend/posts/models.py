from django.db import models
from profiles.models import User


class Post(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True)
    dated_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title