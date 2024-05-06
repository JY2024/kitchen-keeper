from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("settings/", views.SettingCreate.as_view(), name="setting-create"),
    path("settings/delete/<int:pk>/", views.SettingDelete.as_view(), name="delete-setting"),
]