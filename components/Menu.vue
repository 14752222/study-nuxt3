<script setup lang="ts">
defineProps({
    active: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <div    :class="{ 'menu-item-active': active }"
            class="transition-all duration-[0.2s] px-2 py-1 mx-1 rounded cursor-pointer hover:(bg-blue-50 text-blue-700) active:(!bg-blue-100)"
    >
        <slot/>
    </div>
</template>

<style scoped>
.menu-item-active {
    background-color: rgb(219, 254, 238);
    color: rgb(52, 157, 96);
}
</style>
