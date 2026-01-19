<template>
  <div class="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-red-500 to-red-900">
    <h1 class="mb-4 text-6xl font-bold text-black drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">Hello Admin</h1>
    <RouterLink
      :to="{ name: 'home' }"
      class="rounded-lg border border-white px-6 py-2 text-white transition-all hover:bg-white hover:text-red-700"
    >
      Return Home
    </RouterLink>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
