<template>
  <section class="p-4 max-w-md w-full mx-auto">
    <div
      class="w-auto backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white"
    >
      <h2 class="text-2xl font-bold pb-5">Agregar punto seguro</h2>
      <form @submit.prevent="submitForm">
        <!-- NOMBRE -->
        <div class="mb-4">
          <label for="nombre" class="block mb-2 text-sm font-medium">Nombre</label>
          <input
            type="text"
            id="nombre"
            v-model="nombre"
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="Nombre del punto"
            required
          />
        </div>

        <!-- DESCRIPCIÓN -->
        <div class="mb-4">
          <label for="descripcion" class="block mb-2 text-sm font-medium">Descripción</label>
          <textarea
            id="descripcion"
            v-model="descripcion"
            rows="3"
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="Descripción del lugar..."
          ></textarea>
        </div>

        <!-- MAPA -->
        <div class="mb-4">
          <div class="text-xl font-bold mb-4 text-center">Selecciona la ubicación en el mapa</div>
          <MapComponent @coordenadas="setUbicacion" />
        </div>

        <!-- MENSAJE DE ERROR -->
        <div v-if="error" class="text-red-500 pb-5">{{ error }}</div>

        <!-- BOTÓN -->
        <div class="flex items-center justify-between mb-4">
          <button
            type="submit"
            class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
          >
            Guardar punto
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MapComponent from '../components/MapComponent.vue';

const nombre = ref('');
const descripcion = ref('');
const ubicacion = ref<{ lat: number; lng: number } | null>(null);
const error = ref('');

// Recibe lat/lng del componente de mapa
function setUbicacion(coords: { lat: number; lng: number }) {
  ubicacion.value = coords;
}

async function submitForm() {
  if (!ubicacion.value) {
    error.value = 'Debes seleccionar una ubicación en el mapa.';
    return;
  }

  error.value = '';

  const payload = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    ubicacion: {
      type: 'Point',
      coordinates: [ubicacion.value.lng, ubicacion.value.lat], // GeoJSON usa lng, lat
    },
  };

  console.log('Datos a enviar:', payload);

  // Aquí puedes hacer el POST real:
  // await fetch('/api/puntos', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload)
  // })
}
</script>
