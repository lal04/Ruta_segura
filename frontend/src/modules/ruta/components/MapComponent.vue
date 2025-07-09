<template>
  <div class="p-4">
    <div ref="mapRef" class="rounded-box shadow-lg w-full h-96"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MapManager from '@/modules/ruta/service/MapManager';

const emit = defineEmits<{
  (e: 'coordenadas', coords: { lat: number; lng: number }): void;
}>();

const mapRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  if (!mapRef.value) return;

  if (!window.google?.maps) {
    await loadGoogleMapsScript(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  }

  const initialPosition = { lat: -12.04318, lng: -77.02824 };

  new MapManager(mapRef.value, initialPosition, (coords) => {
    emit('coordenadas', coords);
  });
});

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById('f')) return resolve();

    const script = document.createElement('script');
    script.id = 'gmap-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Error al cargar Google Maps'));
    document.head.appendChild(script);
  });
}
</script>
