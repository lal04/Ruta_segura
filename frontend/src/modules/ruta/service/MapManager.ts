export default class MapManager {
  private map: google.maps.Map;
  private markers: google.maps.marker.AdvancedMarkerElement[] = [];
  private directionsService: google.maps.DirectionsService;
  private directionsRenderer: google.maps.DirectionsRenderer;

  constructor(mapElement: HTMLElement, initialPosition: { lat: number; lng: number }) {
    // Inicializar el mapa
    this.map = new google.maps.Map(mapElement, {
      center: initialPosition,
      zoom: 12,
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Agregar marcador al hacer click
    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      this.addMarker(event.latLng!);
      console.log('Coordenadas:', event.latLng!.lat(), event.latLng!.lng());

      // Guardar en localStorage (ejemplo)
      localStorage.setItem(
        'lastPosition',
        JSON.stringify({
          lat: event.latLng!.lat(),
          lng: event.latLng!.lng(),
        }),
      );
    });
  }

  // Agregar marcador
  public addMarker(position: google.maps.LatLng | google.maps.LatLngLiteral, title?: string): void {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position,
      map: this.map,
      title: title || 'Nuevo marcador',
    });

    this.markers.push(marker);
  }

  // Trazar ruta entre dos puntos
  public async drawRoute(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral,
  ): Promise<void> {
    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    try {
      const response = await this.directionsService.route(request);
      this.directionsRenderer.setDirections(response);
    } catch (error) {
      console.error('Error al trazar la ruta:', error);
    }
  }

  // Dibujar círculo alrededor de un punto
  public drawCircle(center: google.maps.LatLngLiteral, radius: number): google.maps.Circle {
    return new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      center,
      radius,
    });
  }

  // Limpiar marcadores
  public clearMarkers(): void {
    this.markers.forEach((marker) => (marker.map = null));
    this.markers = [];
  }

  // Centrar el mapa en una posición
  public panTo(position: google.maps.LatLngLiteral): void {
    this.map.panTo(position);
  }
}
