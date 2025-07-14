from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import PuntoSeguro, Incidente, ZonaSegura
from rest_framework import serializers
from django.contrib.gis.geos import Point

class PuntoSeguroSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuntoSeguro
        fields = '__all__'
        

class IncidenteSerilizer(serializers.ModelSerializer):
    class Meta:
        model=Incidente
        fields = '__all__'
        
class ZonaSeguraSerializer(serializers.ModelSerializer):
    class Meta:
        model=ZonaSegura
        fields = '__all__'