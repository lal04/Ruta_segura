from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import PuntoSeguroViewSet, ZonaSeguraViewSet, IncidenteViewSet

router=DefaultRouter()
router.register(r'puntos', PuntoSeguroViewSet)
router.register(r'zonas', ZonaSeguraViewSet)
router.register(r'incidentes', IncidenteViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
]
