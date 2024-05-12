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
    
class FoodItem(models.Model):
    name = models.CharField(max_length=100)
    group = models.CharField(max_length=20)
    exp_date = models.TextField()
    quantity = models.FloatField()
    unsplash_url = models.CharField(max_length=200)
    desc = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="food_items")