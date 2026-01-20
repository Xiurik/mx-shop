<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl font-bold">Products</h1>
    <!-- #region Products Table -->
    <div class="md:px-2 py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-10 text-left py-3 px-4 uppercase font-semibold text-sm">Image</th>
              <th class="flex-1 text-left py-3 px-4 uppercase font-semibold text-sm">Title</th>
              <th class="w-28 text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
              <th class="w-52 text-left py-3 px-4 uppercase font-semibold text-sm">Sizes</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              v-for="(product, index) in products"
              :key="product.id"
              class="hover:bg-gray-300"
              :class="{ 'bg-gray-200': index % 2 === 0 }"
            >
              <td class="text-left py-3 px-4">
                <img :src="product.images[0]" alt="product.name" class="w-10 h-10" />
              </td>
              <td class="font-bold text-left py-3 px-4 hover:cursor-pointer hover:text-blue-500 hover:underline">
                <RouterLink :to="{ name: 'admin.product', params: { id: product.id } }">{{ product.title }}</RouterLink>
              </td>
              <td class="text-left py-3 px-4">
                <span class="text-green-700 font-bold bg-green-200 rounded-full px-2 py-1">
                  $ {{ product.price }}.00
                </span>
              </td>
              <td class="text-left py-3 px-4 text-blue-700 font-bold">{{ product.sizes.join(', ') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Pagination -->
    <ButtonPagination :page="page" :has-more-data="!!products && products.length < 10" />
    <!-- #endregion -->
  </div>
</template>

<script setup lang="ts">
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { usePagination } from '@/modules/common/composables/usePagination';
import { getProductsAction } from '@/modules/products/actions';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watchEffect } from 'vue';

const { page } = usePagination();
const queryClient = useQueryClient();

const { data: products = [] } = useQuery({
  // { page: page }: We are using the page variable as part of the query key to refetch when it changes
  queryKey: ['products', { page: page }],
  queryFn: () => getProductsAction(page.value),
});

watchEffect(() => {
  // Prefetch next page when current page changes
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsAction(page.value + 1),
  });
});
</script>
