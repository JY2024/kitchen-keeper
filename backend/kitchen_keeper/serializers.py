# import serializers from the REST framework
from rest_framework import serializers
 
# import the todo data model
from .models import KitchenKeeper
 
# create a serializer class
class KitchenKeeperSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = KitchenKeeper
        fields = ('id', 'title','description','completed')