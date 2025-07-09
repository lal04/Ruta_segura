from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import PuntoSeguro, Incidente, ZonaSegura
from rest_framework import serializers
from django.contrib.gis.geos import Point

class PuntoSeguroSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuntoSeguro
        fields = '__all__'

    def validate_ubicacion(self, value):
        # Esperamos un diccionario tipo GeoJSON:
        # { "type": "Point", "coordinates": [lng, lat] }
        try:
            coords = value.get("coordinates")
            if not coords or len(coords) != 2:
                raise serializers.ValidationError("Coordenadas inválidas.")
            lng, lat = coords
            return Point(lng, lat)  # ⚠️ Siempre lng, lat (orden correcto para GeoDjango)
        except Exception as e:
            raise serializers.ValidationError(f"Ubicación inválida: {str(e)}")
        

class IncidenteSerilizer(GeoFeatureModelSerializer):
    class Meta:
        model=Incidente
        geo_field='ubicacion'
        fields=('id', 'tipo', 'fecha', 'descripcion')
        
class ZonaSeguraSerializer(GeoFeatureModelSerializer):
    class Meta:
        model=ZonaSegura
        geo_field='area'
        fields=('id','nombre',)