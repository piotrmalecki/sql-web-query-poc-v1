<template>
    <div class="grid grid-cols-12 md:gap-4">
    <div class="col-span-12 md:col-span-6 mt-2">
        <div >
        <div class="flex-1 mb-4 md:mb-2">
            <FormInput
            v-model="sqlquery"
            placeholder="SELECT from [Table] WHERE [Col] = 'x'"
            class="uppercase h-max"
            id="sqlquery"
            ></FormInput>
        </div>
        <div>
            <UIButton class="px-10" @click="mockQueryResult()" 
            >Submit</UIButton
            >
        </div>
        </div>
    </div>
    <div class="col-span-12 md:col-span-6 mt-2">
        <ul class="bg-gray-200/50 dark:text-white dark:bg-white/10 text-lg rounded-2xl p-1 ">
            <li v-for="query in predefinedQueries" :key="query" @click="sqlquery = query" class="p-2 cursor-pointer hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-800/80 dark:text-white">{{query}}</li>
        </ul>
    </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, PropType } from 'vue';

const props = defineProps({
    predefinedQueries: {
        type: Array as PropType<string[]>,
        default: []
    }
})

const sqlquery = ref('')

const emit = defineEmits(['mockQueryResult'])

const mockQueryResult = () => {
    emit('mockQueryResult', true)
}

defineExpose({ mockQueryResult })
</script>