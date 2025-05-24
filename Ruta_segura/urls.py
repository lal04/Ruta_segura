from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import PuntoSeguroViewSet

router=DefaultRouter()
router.register(r'puntos', PuntoSeguroViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
]
