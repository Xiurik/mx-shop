import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { loginAction } from '../actions/login.action';
import { registerAction } from '../actions/register.action';
import { AuthStatus, type ILoginResponse, type User } from '../interfaces';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatus.CHECKING);
  const user = ref<User | null>(null);
  const token = ref(useLocalStorage('authToken', ''));

  const isChecking = computed(() => {
    return authStatus.value === AuthStatus.CHECKING;
  });

  const isAuthenticated = computed(() => {
    return authStatus.value === AuthStatus.AUTHENTICATED;
  });

  const userName = computed(() => {
    return user.value?.fullName || '';
  });

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);
      return logRegResponse(loginResponse);
    } catch (error) {
      console.log('error => ', error);
      logOut();
      return false;
    }
  };

  const logOut = () => {
    authStatus.value = AuthStatus.NOT_AUTHENTICATED;
    user.value = null;
    token.value = '';
  };

  const registerUser = async (fullName: string, email: string, password: string) => {
    try {
      const registerResponse = await registerAction(fullName, email, password);
      return logRegResponse(registerResponse);
    } catch (error) {
      console.log('error => ', error);
      logOut();
      return false;
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const logRegResponse = (response: ILoginResponse): boolean => {
    if (!response.ok) {
      logOut();
      return false;
    } else {
      user.value = response.user!;
      token.value = response.token!;
      authStatus.value = AuthStatus.AUTHENTICATED;
      return true;
    }
  };

  return {
    authStatus,
    user,
    token,

    // getters
    isChecking,
    isAuthenticated,
    userName,

    // actions
    login,
    logOut,
    registerUser,
    validateEmail,
  };
});
