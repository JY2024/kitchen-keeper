from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("comments/", views.CommentListCreate.as_view(), name="comment-list"),
    path("comments/delete/<int:pk>/", views.CommentDelete.as_view(), name="delete-comment"),
    # recipes
    path('recipes/', views.RecipeCreate.as_view(), name='recipe-list'),
    path('recipes/delete/<int:pk>/', views.RecipeDelete.as_view(), name='delete-recipe'),
]