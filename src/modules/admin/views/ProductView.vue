<template>
  <!-- #region Title -->
  <div v-if="product" class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">
      <small class="text-blue-500">{{ product?.title }}</small>
    </h1>
    <hr class="my-4" />
  </div>
  <!-- #endregion -->

  <!-- #region Form Control -->
  <form v-if="product" @submit.prevent="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <div class="first-col">
      <!-- #region Title -->
      <div class="mb-4">
        <label for="title" class="form-label">Título</label>
        <input type="text" id="title" class="form-control" v-model="product.title" />
      </div>
      <!-- #endregion -->

      <!-- #region Slug -->
      <div class="mb-4">
        <label for="slug" class="form-label">Slug</label>
        <input type="text" id="slug" class="form-control" v-model="product.slug" />
      </div>
      <!-- #endregion -->

      <!-- #region Description -->
      <div class="mb-4">
        <label for="description" class="form-label">Descripción</label>
        <textarea
          id="description"
          class="shadow h-32 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="product.description"
        ></textarea>
      </div>
      <!-- #endregion -->

      <!-- #region Price and Stock -->
      <div class="flex flex-row gap-3">
        <div class="mb-4">
          <label for="price" class="form-label">Precio</label>
          <input type="number" id="price" class="form-control" v-model="product.price" />
        </div>

        <div class="mb-4">
          <label for="stock" class="form-label">Inventario</label>
          <input type="number" id="stock" class="form-control" v-model="product.stock" />
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
          class="bg-blue-100 p-2 rounded w-14 mr-2"
          :class="{ 'bg-blue-500 text-white': product.sizes.includes(size) }"
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
        <div v-for="image in product.images" :key="image" class="flex-shrink-0">
          <img :src="image" alt="imagen" class="w-[240px] h-[240px]" />
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Upload Image Btn -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Subir imagen</label>
        <input multiple type="file" id="image" class="form-control" />
      </div>
      <!-- #endregion -->

      <!-- #region Gender -->
      <div class="mb-4">
        <label for="stock" class="form-label">Género</label>
        <select class="form-control" v-model="product.gender">
          <option value="">Seleccione</option>
          <option v-for="gender in allGenders" :key="gender" :value="gender">{{ gender }}</option>
        </select>
      </div>
      <!-- #endregion -->

      <!-- #region Save Button -->
      <div class="my-4 text-right">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Guardar
        </button>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </form>
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
