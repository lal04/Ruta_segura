from rest_framework import viewsets
from .models import PuntoSeguro, Incidente, ZonaSegura
from .serializers import PuntoSeguroSerializer, IncidenteSerilizer, ZonaSeguraSerializer

class PuntoSeguroViewSet(viewsets.ModelViewSet):
    queryset=PuntoSeguro.objects.all()
    serializer_class=PuntoSeguroSerializer
    
class IncidenteViewSet(viewsets.ModelViewSet):
    queryset=Incidente.objects.all()
    serializer_class=IncidenteSerilizer
    
class ZonaSeguraViewSet(viewsets.ModelViewSet):
    queryset=ZonaSegura.objects.all()
    serializer_class=ZonaSeguraSerializer
    


