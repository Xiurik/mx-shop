import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  // Get the auth store
  const authStore = useAuthStore();

  // Check if user is authenticated
  await authStore.checkAuth();

  // If user is not authenticated, redirect to login
  if (!authStore.isAuthenticated) {
    next({ name: 'login' });
    return;
  }

  // If user is authenticated, allow access to the route
  next();
};

export default isAuthenticatedGuard;
