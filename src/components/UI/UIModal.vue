<template>
  <div class="fixed z-100 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="opened">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-70 transition-opacity" aria-hidden="true" @click="close()"></div>
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-75"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-75"
      >
        <div
          v-if="visible"
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6"
          :class="modalSize"
        >
        <teleport to="body">
          <div class="hidden sm:block fixed top-4 right-4 pt-4 pr-2 z-100" v-if="!hideClose">
            <button @click="close" type="button" class="inline-flex items-center rounded-full bg-black/50 p-1 text-white font-bold text-base">
              <!-- Heroicon name: outline/x -->
              <svg
                class="h-10 w-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          </teleport>
          <div>
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  size: String,
  hideClose: Boolean
})

const modalSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'sm:max-w-sm sm:w-full'
    default:
      return 'sm:max-w-lg sm:w-full'
  }
})

const visible = ref(false)
const opened = ref(false)

const open = () => {
  opened.value = true
  setTimeout(() => {
    visible.value = true
  }, 50)
}

const close = () => {
  visible.value = false
  emit('closed')

  setTimeout(() => {
    opened.value = false
  }, 300)
}

const emit = defineEmits(['closed'])

defineExpose({ open, close, opened, visible })
</script>
