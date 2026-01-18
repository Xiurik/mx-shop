import type { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  redirect: { name: 'login' },
  component: () => import('../layouts/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
  ],
};
