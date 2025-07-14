export default class MapManager {
  private map: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private directionsService: google.maps.DirectionsService;
  private directionsRenderer: google.maps.DirectionsRenderer;
  private onClickCallback?: (coords: { lat: number; lng: number }) => void;

  constructor(
    mapElement: HTMLElement,
    initialPosition: { lat: number; lng: number },
    onClickCallback?: (coords: { lat: number; lng: number }) => void,
  ) {
    this.onClickCallback = onClickCallback;

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
    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      const lat = event.latLng!.lat();
      const lng = event.latLng!.lng();
      this.addMarker(event.latLng!);

      if (this.onClickCallback) {
        this.onClickCallback({ lat, lng });
      }
    });
  }

  public addMarker(position: google.maps.LatLng | google.maps.LatLngLiteral, title?: string): void {
    const marker = new google.maps.Marker({
      position,
      map: this.map,
      title: title || 'Nuevo marcador',
    });

    this.markers.push(marker);
  }

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

  public clearMarkers(): void {
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
  }

  public panTo(position: google.maps.LatLngLiteral): void {
    this.map.panTo(position);
  }
}
