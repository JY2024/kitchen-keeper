from django.db import models
from django.contrib.auth.models import User
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
    
class Setting(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('non_binary', 'Non-Binary'),
        ('transgender_male', 'Transgender Male'),
        ('transgender_female', 'Transgender Female'),
        ('other', 'Other'),
    ]
    SEX_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('intersex', 'Intersex'),
        ('non_binary', 'Non-Binary'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    bio = models.TextField()
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES)
    sex = models.CharField(max_length=20, choices=SEX_CHOICES)
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, validators=[EmailValidator()])
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="settings")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
