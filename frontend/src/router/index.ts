import { createRouter, createWebHistory } from 'vue-router';
import RutaLayout from '@/modules/ruta/layouts/RutaLayout.vue';
import HomeView from '@/modules/ruta/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RutaLayout,
      children: [
        {
          path: '/',
          component: HomeView,
        },
        {
          path: '/puntos',
          name: 'puntos',
          component: () => import('@/modules/ruta/views/puntoSeguro/PuntosListView.vue'),
        },
        {
          path: '/formpuntos',
          name: 'formpuntos',
          component: () => import('@/modules/ruta/views/puntoSeguro/PuntosFormView.vue'),
        },
        {
          path: '/incidentes',
          name: 'incidentes',
          component: () => import('@/modules/ruta/views/Incidente/IncidenteListView.vue'),
        },
        {
          path: '/formincidente',
          name: 'formincidente',
          component: () => import('@/modules/ruta/views/Incidente/IncidenteFormView.vue'),
        },
        {
          path: '/zona',
          name: 'zona',
          component: () => import('@/modules/ruta/views/ZonaSegura/ZonaListView.vue'),
        },
        {
          path: '/formzona',
          name: 'formzona',
          component: () => import('@/modules/ruta/views/ZonaSegura/ZonaFormView.vue'),
        },
      ],
    },
  ],
});

export default router;
