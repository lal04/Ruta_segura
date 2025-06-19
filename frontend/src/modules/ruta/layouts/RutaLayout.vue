<template>
  <!-- top menu -->
  <header>
    <TopMenu />
  </header>
  <!-- sidebar -->

  <SiteBar>
    <RouterView />
  </SiteBar>

  <!-- main -->
  <!-- footer -->

  <BotonFooter />
</template>

<script setup lang="ts">
import BotonFooter from '@/modules/common/components/BotonFooter.vue';
import SiteBar from '@/modules/common/components/SiteBar.vue';
import TopMenu from '@/modules/common/components/TopMenu.vue';
import { RouterView } from 'vue-router';
</script>
