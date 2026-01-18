import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  console.log('isAuthenticatedGuard Called');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return next({ name: 'login' });
  }

  console.log('User authenticated, proceeding to route');
  return next();
};

export default isAuthenticatedGuard;
