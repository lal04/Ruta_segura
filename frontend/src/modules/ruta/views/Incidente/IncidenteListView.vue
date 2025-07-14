<template>
  <div class="overflow-x-auto text-lg">
    <h2 class="block w-full text-center text-lg font-bold mb-4">Incidentes</h2>
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Fecha</th>
          <th>Descripción</th>
          <th>Coordenadas</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="5" v-if="error" class="text-red-500 mb-4">{{ error }}</td>
        </tr>

        <tr v-for="incidente in incidentes" :key="incidente.id">
          <td>{{ incidente.tipo }}</td>
          <td>{{ incidente.fecha }}</td>
          <td>{{ incidente.descripcion }}</td>
          <td>
            <span v-if="parseWKT(incidente.ubicacion)">
              {{ parseWKT(incidente.ubicacion)?.lat }},
              {{ parseWKT(incidente.ubicacion)?.lng }}
            </span>
          </td>
          <td>
            <button class="btn btn-outline btn-info mr-4 sm:mb-2 w-24">Detalle</button>
            <button @click="eliminarIncidente(incidente.id)" class="btn btn-outline btn-error w-24">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
      <!-- foot -->
    </table>
    <RouterLink :to="{ name: 'formincidente' }" class="fixed bottom-12 right-12 z-50">
      <ButtonAdd />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import ButtonAdd from '@/modules/common/components/ButtonAdd.vue';
import parseWKT from '@/modules/common/util/utilidades';
import axios from 'axios';
import { ref, onMounted } from 'vue';

interface Incidente {
  id: number;
  tipo: string;
  fecha: string; // o Date si haces parsing
  descripcion: string;
  ubicacion: string;
}

const incidentes = ref<Incidente[]>([]);

const error = ref('');

//Eliminar punto

const eliminarIncidente = async (id: number) => {
  const confirmar = confirm('¿Estás seguro de que deseas eliminar este incidente?');
  if (!confirmar) return;

  try {
    await axios.delete(`http://localhost:8000/api/incidentes/${id}/`);
    incidentes.value = incidentes.value.filter((i) => i.id !== id);
  } catch (err) {
    console.error('Error al eliminar incidente:', err);
    error.value = 'No se pudo eliminar el incidente.';
  }
};

const obtenerIncidentes = async () => {
  const res = await axios.get('http://localhost:8000/api/incidentes');
  incidentes.value = res.data;
};

onMounted(async () => {
  try {
    obtenerIncidentes();
  } catch (err: any) {
    console.error('Error al obtener incidentes:', err);
    error.value = 'No se pudieron cargar los incidentes.';
  }
});
</script>
