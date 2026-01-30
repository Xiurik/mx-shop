<template>
  <!-- #region Title -->
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">
      <small class="text-blue-500">{{ title || 'Nuevo Producto' }}</small>
    </h1>
    <hr class="my-4" />
  </div>
  <!-- #endregion -->

  <!-- #region Form Control -->
  <form v-if="!isLoading" @submit.prevent="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <div class="first-col">
      <!-- #region Title -->
      <div class="mb-4">
        <label for="title" class="form-label">Título</label>
        <CustomInput v-model="title" v-bind="titleAttrs" :error="errors.title" />
      </div>
      <!-- #endregion -->

      <!-- #region Slug -->
      <div class="mb-4">
        <label for="slug" class="form-label">Slug</label>
        <CustomInput v-model="slug" v-bind="slugAttrs" :error="errors.slug" />
      </div>
      <!-- #endregion -->

      <!-- #region Description -->
      <div class="mb-4">
        <label for="description" class="form-label">Descripción</label>
        <CustomTextArea v-model="description" v-bind="descriptionAttrs" :error="errors.description"></CustomTextArea>
      </div>
      <!-- #endregion -->

      <!-- #region Price and Stock -->
      <div class="flex flex-row gap-3">
        <div class="mb-4 w-1/2">
          <label for="price" class="form-label">Precio</label>
          <CustomInput v-model="price" v-bind="priceAttrs" :error="errors.price" :type="'number'" />
        </div>

        <div class="mb-4 w-1/2">
          <label for="stock" class="form-label">Inventario</label>
          <CustomInput v-model="stock" v-bind="stockAttrs" :error="errors.stock" :type="'number'" />
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Sizes -->
      <div class="mb-4">
        <label for="sizes" class="form-label">Tallas</label>
        <button
          v-for="size in allSizes"
          :key="size"
          type="button"
          @click="toggleSize(size)"
          class="bg-blue-100 p-2 rounded w-14 mr-2"
          :class="{ 'bg-blue-500 text-white': returnSizeIndex(size) !== -1 }"
        >
          {{ size }}
        </button>
      </div>
      <!-- #endregion -->
    </div>

    <!-- #region Image Data -->
    <div class="first-col">
      <!-- #region Images -->
      <label for="stock" class="form-label">Imágenes</label>
      <!-- Row with scrollable horizontal -->
      <div class="flex p-2 overflow-x-auto space-x-4 w-full h-[270px] bg-gray-200 rounded">
        <div v-for="image in images" :key="image.value" class="flex-shrink-0">
          <img :src="image.value" :alt="title" class="w-[240px] h-[240px]" />
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Upload Image Btn -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Subir imagen</label>
        <input
          multiple
          type="file"
          id="image"
          class="form-control file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700"
        />
      </div>
      <!-- #endregion -->

      <!-- #region Gender -->
      <div class="mb-4">
        <label for="stock" class="form-label">Género</label>
        <select :class="['form-control', { 'border-red-500': errors.gender }]" v-model="gender" v-bind="genderAttrs">
          <option value="">Seleccione</option>
          <option v-for="gender in allGenders" :key="gender" :value="gender">{{ gender }}</option>
        </select>
        <span class="text-red-500 text-xs" v-if="errors.gender">{{ errors.gender }}</span>
      </div>
      <!-- #endregion -->

      <!-- #region Save Button -->
      <div class="my-4 text-right">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Guardar</button>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </form>

  <div class="mt-4 grid grid-cols-1">
    <pre class="bg-blue-200 p-2 whitespace-pre-wrap">
      {{ JSON.stringify(values, null, 2) }}
    </pre>
  </div>
  <!-- #endregion -->
</template>

<script src="./ProductView.ts" lang="ts"></script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
