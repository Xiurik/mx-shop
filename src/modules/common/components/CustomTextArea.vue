<template>
  <div>
    <textarea
      class="shadow h-32 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="['form-control', { 'border-red-500': error }]"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value ?? '')"
      @blur="$emit('blur')"
    ></textarea>
    <span class="text-red-500 text-xs" v-if="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  error?: string;
}

defineProps<Props>();
defineEmits(['update:modelValue', 'blur']);
</script>

<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
