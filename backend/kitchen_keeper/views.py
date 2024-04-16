from django.shortcuts import render
# import view sets from the REST framework
from rest_framework import viewsets
 
# import the KitchenKeeprSerializer from the serializer file
from .serializers import KitchenKeeperSerializer
 
# import the KichenKeeper model from the models file
from .models import KitchenKeeper

# Create your views here.
 
# create a class for the KitchenKeeper model viewsets
class KitchenKeeperView(viewsets.ModelViewSet):
 
    # create a serializer class and 
    # assign it to the KitchenKeeperSerializer class
    serializer_class = KitchenKeeperSerializer
 
    # define a variable and populate it 
    # with the KitchenKeeper list objects
    queryset = KitchenKeeper.objects.all()