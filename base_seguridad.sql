
-- Activar extensión PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tabla de incidentes
CREATE TABLE incidentes (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    fecha TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    latitud DECIMAL(10, 6) NOT NULL,
    longitud DECIMAL(10, 6) NOT NULL,
    descripcion TEXT,
    ubicacion GEOGRAPHY(Point, 4326)
);

-- Tabla de zonas de seguridad
CREATE TABLE zonas_seguridad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    area GEOGRAPHY(Polygon, 4326),
    descripcion TEXT
);

-- Tabla de puntos de interés de seguridad
CREATE TABLE puntos_interes_seguridad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    ubicacion GEOGRAPHY(Point, 4326) NOT NULL
);

-- Inserciones para puntos_interes_seguridad
INSERT INTO puntos_interes_seguridad (nombre, tipo, descripcion, ubicacion) VALUES
('Comisaría Central', 'Comisaría', 'Comisaría principal del distrito', ST_GeogFromText('SRID=4326;POINT(-77.042793 -12.046374)')),
('Puesto de Auxilio Rápido', 'Puesto de auxilio', 'Ubicación estratégica para respuesta rápida', ST_GeogFromText('SRID=4326;POINT(-77.030000 -12.050000)')),
('Cámara de Seguridad N°5', 'Cámara', 'Monitoreo 24/7 de la intersección principal', ST_GeogFromText('SRID=4326;POINT(-77.035000 -12.047000)'));

-- Inserciones para zonas_seguridad
INSERT INTO zonas_seguridad (nombre, area, descripcion) VALUES
('Zona Patrullada A', ST_GeogFromText('SRID=4326;POLYGON((-77.045 -12.045, -77.045 -12.040, -77.040 -12.040, -77.040 -12.045, -77.045 -12.045))'), 'Área con patrullaje frecuente'),
('Zona Escolar Segura', ST_GeogFromText('SRID=4326;POLYGON((-77.050 -12.048, -77.050 -12.043, -77.045 -12.043, -77.045 -12.048, -77.050 -12.048))'), 'Zona escolar con vigilancia');

-- Inserciones para incidentes
INSERT INTO incidentes (tipo, fecha, latitud, longitud, descripcion, ubicacion) VALUES
('Robo', '2025-05-23 14:30:00', -12.046374, -77.042793, 'Asalto a mano armada en la calle principal', ST_GeogFromText('SRID=4326;POINT(-77.042793 -12.046374)')),
('Accidente de tránsito', '2025-05-23 08:15:00', -12.050000, -77.030000, 'Colisión entre motocicleta y auto', ST_GeogFromText('SRID=4326;POINT(-77.030000 -12.050000)')),
('Violencia familiar', '2025-05-22 19:00:00', -12.047000, -77.035000, 'Denuncia de violencia en domicilio', ST_GeogFromText('SRID=4326;POINT(-77.035000 -12.047000)'));
