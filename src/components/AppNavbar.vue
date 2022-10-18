<template>
    <div
      class="fixed sm:hidden flex bottom-0 w-screen left-0 z-50 bg-white/50 dark:bg-gray-900/50 backdrop-filter backdrop-blur-md border-t border-black/10 dark:border-white/10"
    >
      <router-link :to="{ name: 'Products' }" class="tab-link">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
        </div>
        <div>Products</div>
      </router-link>
      <router-link :to="{ name: 'Orders' }"  class="tab-link">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div>Orders</div>
      </router-link>
      <router-link :to="{ name: 'OrderDetails' }"  class="tab-link">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <div>Order Details</div>
      </router-link>
    </div>
    <nav class="hidden sm:block">
      <div class="flex justify-between">
        <div class="hidden sm:flex">
          <div class="mx-auto md:ml-6 md:flex md:items-center md:space-x-4">
            <router-link :to="{ name: 'Products' }" class="router-link">Products</router-link>
            <router-link :to="{ name: 'Orders' }"  class="router-link">Orders</router-link>
            <router-link :to="{ name: 'OrderDetails' }"  class="router-link">Order Details</router-link>
          </div>
        </div>
        <div class="flex items-center">
          <div class="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
            <button
              type="button"
              class="inline-flex items-center dark:text-white/80 w-10 h-10 relative rounded-full overflow-hidden"
              @click="AppStore.toggleDarkMode()"
            >
              <div
                class="absolute flex inset-0 w-full justify-center items-center transform transition-transform duration-300 text-yellow-500 dark:text-white/80"
                style="transform-origin: 50px 50px"
                :class="{ '-rotate-60': AppStore.darkMode }"
              >
                <SunIcon class="h-6 w-6" />
              </div>
              <div
                class="absolute flex inset-0 w-full justify-center items-center transform transition-transform duration-300"
                style="transform-origin: 50px 50px"
                :class="{ 'rotate-60': !AppStore.darkMode }"
              >
                <MoonIcon class="h-6 w-6" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </template>
  <script lang="ts" setup>
  import { useAppStore } from '../store/AppStore'
  
  const AppStore = useAppStore()

  </script>
  