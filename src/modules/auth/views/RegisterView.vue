<template>
  <h1 class="text-2xl font-semibold mb-4">Register</h1>
  <form @submit.prevent="onRegister">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Name</label>
      <input
        v-model="registerForm.name"
        type="text"
        id="name"
        name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
        ref="nameInputRef"
      />
    </div>
    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input
        v-model="registerForm.email"
        type="text"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
        ref="emailInputRef"
      />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Password</label>
      <input
        v-model="registerForm.password"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
        ref="passwordInputRef"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="confirm-password" class="block text-gray-600">Confirm Password</label>
      <input
        v-model="registerForm.confirmPassword"
        type="password"
        id="confirm-password"
        name="confirm-password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Login Button -->
    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
      Create Account
    </button>
  </form>

  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Already have an account?</RouterLink>
  </div>
  <!-- bottom div to return home -->
  <div class="mt-6 text-center">
    <RouterLink :to="{ name: 'home' }" class="text-blue-500 hover:underline">Return Home</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/auth.store';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const nameInputRef = ref<HTMLInputElement | null>(null);
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const onRegister = async () => {
  // validate name
  if (registerForm.name.trim() === '') {
    toast.error('Please enter a name.');
    nameInputRef.value?.focus();
    return;
  }

  // validate password and match
  if (!validatePassword(registerForm.password, registerForm.confirmPassword)) {
    passwordInputRef.value?.focus();
    return;
  }

  // validate email format
  if (!authStore.validateEmail(registerForm.email)) {
    toast.error('Please enter a valid email address.');
    emailInputRef.value?.focus();
    return;
  }

  // Registration logic to be implemented
  const success = await authStore.registerUser(registerForm.name, registerForm.email, registerForm.password);
  if (success) {
    router.push({ name: 'home' });
    toast.success(`Welcome ${authStore.userName}!`);
  } else {
    toast.error('Registration failed. Please try again.');
  }
};

const validatePassword = (password: string, confirmPassword: string): boolean => {
  if (password !== confirmPassword) {
    toast.error('Passwords do not match.');
    return false;
  }
  if (password.length < 6 || password.length > 50) {
    toast.error('Password must be between 6 and 50 characters long.');
    return false;
  }
  const passwordRegex = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  if (!passwordRegex.test(password)) {
    toast.error('The password must have a Uppercase, lowercase letter and a number');
    return false;
  }
  return true;
};
</script>
