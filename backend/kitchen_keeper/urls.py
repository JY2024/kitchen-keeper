from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("comments/", views.CommentListCreate.as_view(), name="comment-list"),
    path("comments/delete/<int:pk>/", views.CommentDelete.as_view(), name="delete-comment"),
    path('recipes/', views.RecipeCreate.as_view(), name='recipe-list'),
    path('recipes/delete/<int:pk>/', views.RecipeDelete.as_view(), name='delete-recipe'),
    path("settings/", views.SettingCreate.as_view(), name="setting-create"),
    path("settings/username/", views.SettingGet.as_view(), name="setting-create"),    
    path("settings/delete/<int:pk>/", views.SettingDelete.as_view(), name="delete-setting"),
]