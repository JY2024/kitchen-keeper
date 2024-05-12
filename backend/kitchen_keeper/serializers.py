# import serializers from the REST framework
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note
 
# import the todo data model
from .models import KitchenKeeper

# import the FoodItem model
from .models import FoodItem

# create a serializer class
class KitchenKeeperSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = KitchenKeeper
        fields = ('id', 'title','description','completed')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ["id", "name", "group", "exp_date", "quantity", "unsplash_url", "desc", "author"]
        extra_kwargs = {"author": {"read_only": True}}