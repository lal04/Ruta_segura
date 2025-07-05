from django.contrib.gis.db import models

class PuntoSeguro(models.Model):
    nombre=models.CharField(max_length=100)
    descripcion=models.TextField(blank=True)
    ubicacion=models.PointField()
    
    def __str__(self):
        return self.nombre
    
class Incidente(models.Model):
    tipo=models.CharField(max_length=50)
    fecha=models.DateField()
    descripcion=models.TextField()
    ubicacion=models.PointField(srid=4326)
    def __str__(self):
        return self.tipo
    
class ZonaSegura(models.Model):
    nombre=models.CharField(max_length=100)
    area=models.PointField(srid=4326)

