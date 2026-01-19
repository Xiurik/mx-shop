import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  // Get the auth store
  const authStore = useAuthStore();

  // Check if user is authenticated
  await authStore.checkAuth();

  // If user is authenticated, redirect to home
  if (authStore.isAuthenticated) {
    next({ name: 'home' });
    return;
  }

  // If user is not authenticated, allow access to the route
  next();
};

export default isNotAuthenticatedGuard;
