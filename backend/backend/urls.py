from django.contrib import admin
from django.urls import path, include
from kitchen_keeper.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# import views from todo
from kitchen_keeper import views
# import routers from the REST framework
# it is necessary for routing
from rest_framework import routers

# # create a router object
# router = routers.DefaultRouter()
 
# # register the router
# router.register(r'tasks',views.KitchenKeeperView, 'task')
 
urlpatterns = [
    path('admin/', admin.site.urls),
 
    # add another path to the url patterns
    # when you visit the localhost:8000/api
    # you should be routed to the django Rest framework
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("kitchen_keeper.urls"))
]
