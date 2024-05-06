# import serializers from the REST framework
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Setting
 
# import the todo data model
from .models import KitchenKeeper

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

class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = ["id", "name", "bio", "gender", "sex", "username", "email", "author"]
        extra_kwargs = {"author": {"read_only": True}}