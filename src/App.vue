<template>
  <FullScreenLoader v-if="authStore.authStatus === AuthStatus.CHECKING" />
  <RouterView v-else />
  <VueQueryDevtools />
</template>

<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useRoute, useRouter } from 'vue-router';
import { AuthStatus } from './modules/auth/interfaces';
import { useAuthStore } from './modules/auth/stores/auth.store';
import FullScreenLoader from './modules/common/components/FullScreenLoader.vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.CHECKING) {
      authStore.checkAuth();
      return;
    }

    if (state.authStatus === AuthStatus.NOT_AUTHENTICATED) {
      router.replace({ name: 'login' });
      return;
    }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.AUTHENTICATED) {
      router.replace({ name: 'home' });
      return;
    }
  },
  { immediate: true },
);
</script>
