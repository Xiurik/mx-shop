<template>
  <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="p-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-lg">
        <div class="flex items-start justify-between">
          <div class="flex flex-col space-y-2">
            <span class="text-gray-400">Total Revenue</span>
            <span class="text-lg font-semibold">$124,592.00</span>
          </div>
          <div class="p-2 bg-gray-200 rounded-md">
            <svg
              class="w-6 h-6 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="p-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-lg">
        <div class="flex items-start justify-between">
          <div class="flex flex-col space-y-2">
            <span class="text-gray-400">Total Customers</span>
            <span class="text-lg font-semibold">1,482</span>
          </div>
          <div class="p-2 bg-gray-200 rounded-md">
            <svg
              class="w-6 h-6 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="p-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-lg">
        <div class="flex items-start justify-between">
          <div class="flex flex-col space-y-2">
            <span class="text-gray-400">New Orders</span>
            <span class="text-lg font-semibold">452</span>
          </div>
          <div class="p-2 bg-gray-200 rounded-md">
            <svg
              class="w-6 h-6 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="p-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-lg">
        <div class="flex items-start justify-between">
          <div class="flex flex-col space-y-2">
            <span class="text-gray-400">Pending Issues</span>
            <span class="text-lg font-semibold">12</span>
          </div>
          <div class="p-2 bg-gray-200 rounded-md">
            <svg
              class="w-6 h-6 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 gap-6 mt-8 xl:grid-cols-2">
      <!-- Recent Sales Table -->
      <div class="overflow-hidden bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Recent Sales</h3>
          <p class="mt-1 text-sm text-gray-500">Sales tracking for the current year.</p>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Customer
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Date
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Amount
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="sale in sales" :key="sale.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img class="w-10 h-10 rounded-full" :src="sale.avatar" alt="" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ sale.name }}</div>
                      <div class="text-sm text-gray-500">{{ sale.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {{ sale.date }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {{ sale.amount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 text-xs font-semibold leading-5 rounded-full"
                    :class="getStatusClass(sale.status)"
                  >
                    {{ sale.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Country Sales Chart -->
      <div class="overflow-hidden bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Sales by Country</h3>
          <p class="mt-1 text-sm text-gray-500">Distribution of items sold worldwide.</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="country in countries" :key="country.name">
              <div class="flex items-center justify-between mb-1 text-sm">
                <span class="font-medium text-gray-700">{{ country.name }}</span>
                <span class="text-gray-500">{{ country.sales }} sales</span>
              </div>
              <div class="w-full h-4 overflow-hidden bg-gray-200 rounded-full">
                <div
                  class="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                  :style="{ width: `${country.percent}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Mock Data
const sales = [
  {
    id: 1,
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    date: 'Jan 14, 2024',
    amount: '$1,200.00',
    status: 'Completed',
  },
  {
    id: 2,
    name: 'Cody Fisher',
    email: 'cody.fisher@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    date: 'Jan 14, 2024',
    amount: '$850.00',
    status: 'Processing',
  },
  {
    id: 3,
    name: 'Esther Howard',
    email: 'esther.howard@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026703d',
    date: 'Jan 13, 2024',
    amount: '$3,400.00',
    status: 'Completed',
  },
  {
    id: 4,
    name: 'Jenny Wilson',
    email: 'jenny.wilson@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026702d',
    date: 'Jan 12, 2024',
    amount: '$540.00',
    status: 'Failed',
  },
  {
    id: 5,
    name: 'Kristin Watson',
    email: 'kristin.watson@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026701d',
    date: 'Jan 10, 2024',
    amount: '$2,100.00',
    status: 'Completed',
  },
];

const countries = [
  { name: 'United States', sales: 2400, percent: 80 },
  { name: 'Mexico', sales: 1200, percent: 40 },
  { name: 'Germany', sales: 900, percent: 30 },
  { name: 'Japan', sales: 600, percent: 20 },
  { name: 'France', sales: 450, percent: 15 },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'Failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
</script>

<style scoped></style>
