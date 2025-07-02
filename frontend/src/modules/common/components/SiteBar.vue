<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <!-- alineado del contenido en los dos ejes -->
    <!-- <main class="drawer-content flex flex-col items-center justify-center h-screen"> -->

    <!-- alineacion solo en el eje horizantal -->
    <main class="drawer-content flex p-4 justify-center">
      <!--contenido de la pagina-->

      <slot></slot>
    </main>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <!-- Sidebar content here -->
        <li>
          <RouterLink to="/">Inicio</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'formulario' }">Formulario</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
