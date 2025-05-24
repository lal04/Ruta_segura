from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import PuntoSeguro

class PuntoSeguroSerializer(GeoFeatureModelSerializer):
    class Meta:
        model=PuntoSeguro
        geo_field='ubicacion'
        fields=('id', 'nombre', 'descripcion', 'ubicacion')