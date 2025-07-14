<template>
  <div class="overflow-x-auto text-lg">
    <h2 class="block w-full text-center text-lg font-bold mb-4">Puntos Seguros</h2>
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Coordenadas</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
        </tr>
        <!-- row 1 -->
        <tr v-for="punto in puntos" :key="punto.id">
          <td>{{ punto.nombre }}</td>
          <td>{{ punto.descripcion }}</td>
          <td>
            <span v-if="parseWKT(punto.ubicacion)">
              {{ parseWKT(punto.ubicacion)?.lat }}, {{ parseWKT(punto.ubicacion)?.lng }}
            </span>
          </td>
          <td>
            <button class="btn btn-outline btn-info mr-4 sm:mb-2 w-24">Detalle</button>
            <button @click="eliminarPunto(punto.id)" class="btn btn-outline btn-error w-24">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
      <!-- foot -->
    </table>
    <RouterLink :to="{ name: 'formpuntos' }" class="fixed bottom-12 right-12 z-50">
      <ButtonAdd />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import ButtonAdd from '@/modules/common/components/ButtonAdd.vue';
import parseWKT from '@/modules/common/util/utilidades';
import axios from 'axios';
import { ref, onMounted } from 'vue';

interface PuntoSeguro {
  id: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
}

const puntos = ref<PuntoSeguro[]>([]);
const error = ref('');

//Eliminar punto

const eliminarPunto = async (id: number) => {
  const confirmar = confirm('¿Estás seguro de que deseas eliminar este punto?');
  if (!confirmar) return;

  try {
    await axios.delete(`http://localhost:8000/api/puntos/${id}/`);
    //lo quitamos de la lista reactiva
    puntos.value = puntos.value.filter((p) => p.id !== id);
  } catch (err) {
    console.error('Error al eliminar:', err);
    error.value = 'No se pudo eliminar el punto.';
  }
};

const ObtenerPuntos = async () => {
  const res = await axios.get('http://localhost:8000/api/puntos/');
  puntos.value = res.data;
};

onMounted(async () => {
  try {
    ObtenerPuntos();
  } catch (err: any) {
    console.error('Error al obtener puntos:', err);
    error.value = 'No se pudieron cargar los puntos.';
  }
});
</script>
