from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone
from django.core.validators import MinLengthValidator, EmailValidator

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

class Recipe(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="recipes") # this is an id (int) ??
    tags = ArrayField(models.CharField(max_length=50))
    description = models.TextField()
    ingredients = ArrayField(models.CharField(max_length=50))
    instructions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    img = models.CharField(max_length=2000000, default="")

    def __str__(self):
        return self.title + "_" + self.author
    
class Setting(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField()
    gender = models.CharField(max_length=20)
    sex = models.CharField(max_length=20)
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, validators=[EmailValidator()])
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="settings")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class PostAndComment(models.Model):
    content = models.TextField()
    post_id = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comment")

    def __str__(self):
        return self.content