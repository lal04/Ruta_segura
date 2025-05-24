from django.contrib.gis.db import models

class PuntoSeguro(models.Model):
    nombre=models.CharField(max_length=100)
    descripcion=models.TextField(blank=True)
    ubicacion=models.PointField()
    
    def __str__(self):
        return self.nombre
