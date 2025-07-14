<template>
  <div class="overflow-x-auto text-lg">
    <h2 class="block w-full text-center text-lg font-bold mb-4">Zonas Seguras</h2>

    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Coordenadas</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td colspan="3" v-if="error" class="text-red-500 mb-4">{{ error }}</td>
        </tr>

        <tr v-for="zona in zonas" :key="zona.id">
          <td>{{ zona.nombre }}</td>
          <td>
            <span v-if="parseWKT(zona.area)">
              {{ parseWKT(zona.area)?.lat }}, {{ parseWKT(zona.area)?.lng }}
            </span>
          </td>
          <td>
            <button class="btn btn-outline btn-info mr-4 sm:mb-2 w-24">Detalle</button>
            <button @click="eliminarZona(zona.id)" class="btn btn-outline btn-error w-24">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <RouterLink :to="{ name: 'formzona' }" class="fixed bottom-12 right-12 z-50">
      <ButtonAdd />
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import ButtonAdd from '@/modules/common/components/ButtonAdd.vue';
import parseWKT from '@/modules/common/util/utilidades';
import axios from 'axios';
import { ref, onMounted } from 'vue';

interface ZonaSegura {
  id: number;
  nombre: string;
  area: string; // WKT string
}

const zonas = ref<ZonaSegura[]>([]);
const error = ref('');

const eliminarZona = async (id: number) => {
  const confirmar = confirm('¿Estás seguro de que deseas eliminar esta zona segura?');
  if (!confirmar) return;

  try {
    await axios.delete(`http://localhost:8000/api/zonas/${id}/`);
    zonas.value = zonas.value.filter((z) => z.id !== id);
  } catch (err) {
    console.error('Error al eliminar:', err);
    error.value = 'No se pudo eliminar la zona.';
  }
};

const obtenerZonas = async () => {
  const res = await axios.get('http://localhost:8000/api/zonas/');
  zonas.value = res.data;
};

onMounted(async () => {
  try {
    await obtenerZonas();
  } catch (err: any) {
    console.error('Error al obtener zonas:', err);
    error.value = 'No se pudieron cargar las zonas.';
  }
});
</script>
