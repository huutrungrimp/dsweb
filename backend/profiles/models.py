from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):   
    description = models.TextField(null=True, blank=True)
    def __str__(self):
        return str(self.username)
