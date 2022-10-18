<template>
  <FormLabel :for="id" v-if="label" :class="invalid ? 'is-invalid' : ''">{{ label }}</FormLabel>
  <div class="rounded-lg" :class="{ 'mt-1': label }">
    <div class="relative">
      <slot></slot>

      <textarea
        ref="inputRef"
        v-bind="$attrs"
        :value="modelValue"
        :placeholder="placeholder"
        @input="updateValue"
        class="
          appearance-none
          block
          w-full
          px-6
          py-3
          rounded-xl
          tracking-wider
          text-black
          font-bold
          text-lg
          outline-none
          focus:outline-none
          placeholder-secondary-40 placeholder-opacity-75
          bg-white
          border-2
          dark:bg-white/5 dark:placeholder-white dark:placeholder-opacity-20 dark:text-white
        "
        :class="invalid ? 'border-red-600' : 'border-secondary-10 dark:border-white/5'"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, toRefs, useAttrs, useSlots } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  focus: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  invalid: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
})
const { label, placeholder, modelValue, focus } = toRefs(props)

const inputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits(['update:modelValue', 'input', 'change'])
const updateValue = (e: Event) => {
  let value: string | number = (e.target as HTMLSelectElement).value

  emit('update:modelValue', value);
  emit('input', value)
}

const attrs = useAttrs()
const id = computed(() => {
  return attrs.id ? (attrs.id as string) : ''
})

const nativeType = computed(() => {
  return (inputRef.value as HTMLInputElement).getAttribute('type')
})

onMounted(() => {
  if (focus.value) {
    (inputRef.value as HTMLInputElement).focus()
  }
})
</script>
