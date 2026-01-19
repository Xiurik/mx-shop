/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { checkAuthAction, loginAction, registerAction } from '../actions';
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

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const loginResponse = await loginAction(email, password);
      return loadResponse(loginResponse);
    } catch (error) {
      logOut(error);
      return false;
    }
  };

  const logOut = (error?: any) => {
    console.log('error => ', error);
    authStatus.value = AuthStatus.NOT_AUTHENTICATED;
    user.value = null;
    token.value = '';
  };

  const registerUser = async (fullName: string, email: string, password: string): Promise<boolean> => {
    try {
      const registerResponse = await registerAction(fullName, email, password);
      return loadResponse(registerResponse);
    } catch (error) {
      logOut(error);
      return false;
    }
  };

  const checkAuth = async (): Promise<boolean> => {
    try {
      const checkAuthResponse = await checkAuthAction();
      return loadResponse(checkAuthResponse);
    } catch (error) {
      logOut(error);
      return false;
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const loadResponse = (response: ILoginResponse): boolean => {
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
    checkAuth,
    validateEmail,
  };
});
