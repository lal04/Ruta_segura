<template>
  <!-- top menu -->
  <TopMenu />
  <!-- sidebar -->

  <!-- main -->
  <main>
    <RouterView />
  </main>
  <!-- footer -->

  <BotonFooter />
</template>

<script setup lang="ts">
import BotonFooter from '@/modules/common/components/BotonFooter.vue';
import TopMenu from '@/modules/common/components/TopMenu.vue';
import { RouterView } from 'vue-router';
</script>
