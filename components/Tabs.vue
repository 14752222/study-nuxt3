<script setup lang="ts">
interface ITab {
    label: string;
    value: string;
}

defineProps({
    data: {
        type: Array<ITab>,
        required: true,
    },
    state: {
        type: String,
        default: 'detail',
    },
})

const emit = defineEmits(['change'])

const handleChange = (value: string) => {
    emit('change', value)
}
</script>

<template>
    <div class="w-full flex overflow-x-auto bg-white rounded mb-4 border-b">
    <span v-for="item in data"
          class="py-3 px-4 text-gray-700 text-sm cursor-pointer flex-shrink-0 hover:text-green-600"
          :class="{'tab-item-active': state === item.value}"
          @click="handleChange(item.value)"
    >
      {{ item.label }}
    </span>
    </div>
</template>

<style scoped>
.tab-item-active {
    border-bottom: 2px solid rgb(3, 168, 9);
    @apply text-green-400 border-green-500;
}
</style>
