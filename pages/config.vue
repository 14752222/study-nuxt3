<script setup lang="ts">
const appConfig = useAppConfig()

</script>

<template>
    <div :class="{ dark: appConfig.theme.dark }">
        <p
                class="bg-blue-300 dark:bg-slate-600 dark:text-slate-200"
                @click="appConfig.title = 'hello'"
        >
            appConfig: {{ appConfig.title }}
        </p>

        <label>
            dark mode:
            <NSwitch id="toggle" v-model:value="appConfig.theme.dark" />
        </label>
    </div>
</template>

<style scoped>

</style>
