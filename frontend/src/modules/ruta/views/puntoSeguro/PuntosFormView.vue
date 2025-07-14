<template>
  <section class="p-4 max-w-md w-full mx-auto">
    <div
      class="w-auto backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white"
    >
      <h2 class="text-2xl font-bold pb-5">Agregar Punto Seguro</h2>
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
        <div class="flex justify-between items-center gap-4 mt-6">
          <RouterLink class="btn btn-outline ml-5" :to="{ name: 'puntos' }"> Cancelar </RouterLink>

          <button type="submit" class="btn btn-outline btn-accent mr-5">Guardar</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MapComponent from '@/modules/ruta/components/MapComponent.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

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
    ubicacion: `POINT(${ubicacion.value.lng} ${ubicacion.value.lat})`,
  };

  // console.log('Datos a enviar:', payload);

  try {
    await axios.post('http://localhost:8000/api/puntos/', payload);

    router.push('/puntos/');
    // Opcional: limpiar formulario o mostrar éxito
  } catch (err: any) {
    console.error('Error al enviar:', err);
    error.value = err.response?.data?.detail || 'Ocurrió un error al enviar los datos.';
  }
}
</script>
