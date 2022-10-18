<template>
  <component
    :is="tag"
    class="ui-button select-none inline-flex justify-center items-center font-bold transition-colors duration-150"
    style="touch-action: none"
    :class="htmlClass"
    :type="type"
    v-bind="$attrs"
  >
    <div class="flex items-center justify-center content">
      <slot />
    </div>
  </component>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const isTapped = ref(false)

const onTouchStart = () => {
  isTapped.value = true
}
const onTouchEnd = () => {
  isTapped.value = false
}

const props = defineProps({
  tag: {
    type: String,
    default: 'button'
  },
  type: {
    type: String,
    default: 'button'
  },
  theme: {
    type: String,
    default: 'primary'
  },
  inline: Boolean,
  size: {
    type: String,
    default: 'md'
  },
  loading: Boolean,
  disabled: Boolean,
  rounded: {}
})

const style = computed(() => {
  const shared = ['font-bold']

  shared.push(props.inline ? 'inline-flex' : 'flex w-full')

  if (props.rounded) {
    shared.push('rounded-full flex-shrink-0')

    switch (props.size) {
      case 'sm':
        shared.push('min-w-6 h-6 text-sm')
        break
      default:
        shared.push('min-w-10 h-10 text-lg')
        break
    }
  } else {
    shared.push('rounded-xl')

    switch (props.size) {
      case 'sm':
        shared.push('px-4 py-2 text-sm')
        break
      case 'xs':
        shared.push('px-2 py-1 text-xs')
        break
      default:
        shared.push('px-4 py-3 text-lg')
        break
    }
  }

  if (props.loading) {
    shared.push('is-loading')
  }

  if (props.disabled) {
    shared.push('pointer-events-none opacity-50 dark:opacity-50 cursor-not-allowed')
  }

  switch (props.theme) {
    case 'primary':
      shared.push('is-dark')
      return {
        all: [...shared, 'border-2 border-primary'],
        default: 'bg-primary text-black hover:bg-primary-alt',
        active: 'border-primary bg-primary-120 text-white/80'
      }
    case 'primary-outline':
      return {
        all: [...shared, 'border-2 border-primary'],
        default: 'bg-transparent text-primary',
        active: 'border-primary bg-primary text-white'
      }
    case 'primary-link':
      return {
        all: [...shared, 'border-2 border-transparent'],
        default: 'bg-transparent text-primary hover:text-white',
        active: 'text-primary/70'
      }
    case 'link':
      return {
        all: [...shared, 'border-2 border-transparent'],
        default: 'bg-transparent hover:text-gray-800 dark:text-white dark:hover:text-gray-100',
        active: 'text-primary/70'
      }
    case 'secondary':
      return {
        all: [...shared, 'border-2'],
        default: 'bg-gray-10 border-gray-10 text-black/80 dark:bg-gray/30 dark:text-white dark:border-white/10',
        active: 'bg-gray-5 text-black dark:bg-gray/50 dark:border-gray/30 dark:text-white'
      }
    case 'secondary-outline':
      return {
        all: [...shared, 'border-2 border-secondary'],
        default: 'bg-transparent text-black/80',
        active: 'border-gray bg-secondary text-white'
      }
    case 'light':
      return {
        all: [...shared, 'border-2'],
        default: 'bg-white text-black/80 dark:text-white dark:border-[#2E2E2E] dark:bg-[#2E2E2E]',
        active: 'border-gray bg-secondary text-white'
      }
    case 'light-outline':
      return {
        all: [...shared, 'border-2 border-gray-40'],
        default: 'bg-transparent text-black/80 dark:text-white',
        active: 'border-gray bg-secondary text-white'
      }
    case 'danger':
      return {
        all: [...shared, 'border-2'],
        default: 'text-white bg-red-500 text-white border-red dark:bg-red-600 dark:text-white dark:border-red-600',
        active: 'border-red bg-red text-white'
      }
    case 'danger-outline':
      return {
        all: [...shared, 'border-2 border-red'],
        default: 'bg-transparent text-red',
        active: 'border-red bg-red text-white'
      }
  }
})

const htmlClass = computed(() => {
  return isTapped.value ? [style.value?.all, style.value?.active] : [style.value?.all, style.value?.default]
})
</script>
<style lang="css" scoped>
.ui-button.is-loading {
  pointer-events: none;
}
.ui-button .content {
  opacity: 1;
  transition: opacity 0.25s ease-out;
}
.ui-button.is-loading .content {
  opacity: 0.15;
}

.ui-button.is-loading:after {
  animation: spinAround 0.75s infinite linear;
  border: 2px solid red;
  border-radius: 100%;
  border-right-color: transparent;
  border-top-color: transparent;
  content: '';
  display: inline-block;
  height: 1.25em;
  margin-left: 0.5rem;
  width: 1.25em;
  border-color: transparent transparent #321370 #321370 !important;
  position: absolute;
}

.ui-button.is-loading.is-dark:after {
  border-color: transparent transparent #000 #000 !important;
}

.ui-button.is-disabled {
  opacity: 0.8;
  pointer-events: none;
}

@keyframes spinAround {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
