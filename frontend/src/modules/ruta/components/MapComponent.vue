<template>
  <div class="p-4">
    <div class="text-xl font-bold mb-4 text-center">Mapa de Google</div>
    <div ref="mapRef" class="rounded-box shadow-lg w-[500px] h-[500px]"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MapManager from '@/modules/ruta/service/MapManager';

const mapRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  if (!mapRef.value) return;

  // Carga dinámica de la API
  if (!window.google?.maps) {
    await loadGoogleMapsScript(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  }

  const initialPosition = { lat: 40.7128, lng: -74.006 };
  new MapManager(mapRef.value, initialPosition);
});

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Error al cargar Google Maps'));
    document.head.appendChild(script);
  });
}
</script>
