<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

    <main class="drawer-content flex flex-col items-center justify-center h-screen">
      <!--contenido de la pagina-->

      <slot></slot>
    </main>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import ButtonMenu from '@/modules/common/components/ButtonMenu.vue';
</script>
