<script setup lang="ts">
const props = defineProps({
    pending: {
        type: Boolean,
        default: false
    }
})

const loading = ref(false)

watchEffect(() => {
    if (props.pending && !loading.value) {
        loading.value = true
    } else {
        setTimeout(() => {
            loading.value = false
        }, 500)
    }

})
</script>

<template>
    <div>
        <template v-if="loading">
            <slot name="loading">
                <NCard v-for="item in 4" :key="item" class="mb-5">
                    <NSkeleton text style="width: 30%"/>
                    <NSkeleton text :repeat="2"/>
                    <NSkeleton text style="width: 45%"/>
                    <NSkeleton text style="width: 60%"/>
                </NCard>
            </slot>
        </template>
        <template v-else>
            <slot/>
        </template>
    </div>
</template>

<style scoped>

</style>
