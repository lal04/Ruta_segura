<template>
  <header class="bg-base-300 w-full p-3">
    <div class="flex items-center">
      <!-- Botón de menú (siempre a la izquierda) -->
      <ButtonMenu class="mr-4" />

      <!-- Contenido centrado en el espacio restante -->
      <div class="flex-1 flex items-center justify-center">
        <RouteIcon class="w-10" />
        <span class="font-bold text-3xl ml-3">Ruta Segura</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import RouteIcon from '../icons/RouteIcon.vue';
import ButtonMenu from './ButtonMenu.vue';
</script>
