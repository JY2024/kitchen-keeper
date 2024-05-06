from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class KitchenKeeper(models.Model):
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)

    # string representation of the class
    def __str__(self):
        return self.title 
    
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
    
class Setting(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField()
    gender = models.CharField(max_length=100)
    sex = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="settings")

    def __str__(self):
        return self.name
