from rest_framework import viewsets
from .models import PuntoSeguro
from .serializers import PuntoSeguroSerializer

class PuntoSeguroViewSet(viewsets.ModelViewSet):
    queryset=PuntoSeguro.objects.all()
    serializer_class=PuntoSeguroSerializer


