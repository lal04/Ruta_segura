import { createRouter, createWebHistory } from 'vue-router';
import RutaLayout from '@/modules/ruta/layouts/RutaLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RutaLayout,
      children: [
        {
          path: '',
          component: () => import('@/modules/ruta/views/HomeView.vue'),
        },
      ],
    },
  ],
});

export default router;
