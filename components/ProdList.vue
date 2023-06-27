<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    list: {
        type: Array<any>,
        required: true
    },
    type: {
        type: String,
        default: 'course'
    }
})

</script>

<template>
    <div class="flex mb-3">
        <span>{{ title }}</span>
        <NButton quaternary class="ml-auto">查看更多</NButton>
    </div>
    <NGrid x-gap="12" responsive="screen" cols="m:4 1" class="mb-6">
        <NGi v-for="item in list" :key="item.id">
            <Prod :data="item"  :type="type"/>
        </NGi>
    </NGrid>
</template>

<style scoped>

</style>
