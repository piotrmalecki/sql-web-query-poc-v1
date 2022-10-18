<template>
  <div>
    <div class="p-2 rounded-lg bg-red-500 dark:bg-red-600/50 shadow-lg sm:p-3">
      <div class="flex items-center justify-between flex-wrap">
        <div class="w-0 flex-1 flex items-center">
          <span class="flex p-2 rounded-lg bg-red-600 dark:bg-red-800">
            <!-- Heroicon name: outline/speakerphone -->
            <svg
              class="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <p class="ml-3 font-medium text-white">
            <span class="font-bold" style="overflow-wrap: anywhere;">
              <slot> Unable to read from remote server. Please try again later.</slot>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
