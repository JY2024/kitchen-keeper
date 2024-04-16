from django.contrib import admin
from .models import KitchenKeeper

# Register your models here.
class KitchenKeeperAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "completed")

admin.site.register(KitchenKeeper, KitchenKeeperAdmin)