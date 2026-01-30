import { isAdminGuard } from '@/modules/auth/guards/is-admin.guard';
import isAuthenticatedGuard from '@/modules/auth/guards/is-auth.guard';
import type { RouteRecordRaw } from 'vue-router';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  redirect: { name: 'admin.dashboard' },
  component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
  children: [
    {
      path: '',
      name: 'admin.dashboard',
      component: () => import('@/modules/admin/views/DashboardView.vue'),
    },
    {
      path: 'products',
      name: 'admin.products',
      component: () => import('@/modules/admin/views/ProductsView.vue'),
    },
    {
      path: 'product/:prodId?',
      name: 'admin.product',
      props: true,
      component: () => import('@/modules/admin/views/ProductView.vue'),
    },
  ],
};
