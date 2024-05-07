from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, PostSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from.models import Note, Post, Comment
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

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
# class PostListCreate(generics.ListCreateAPIView):
#     serializer_class = PostSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Post.objects
    
#     def perform_create(self, serializer):
#         if serializer.is_valid():
#             serializer.save(author=self.request.user)
#         else:
#             print(serializer.errors)

# class PostDelete(generics.DestroyAPIView):
#     serializer_class = PostSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Post.objects.filter(author=user)
    
class CommentListCreate(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # p_id = self.request.post_id
        p_id = "1"
        return Comment.objects.filter(post_id=p_id)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class CommentDelete(generics.DestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Comment.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]