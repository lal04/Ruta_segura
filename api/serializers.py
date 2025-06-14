from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import PuntoSeguro, Incidente, ZonaSegura

class PuntoSeguroSerializer(GeoFeatureModelSerializer):
    class Meta:
        model=PuntoSeguro
        geo_field='ubicacion'
        fields=('id', 'nombre', 'descripcion', 'ubicacion')
        

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