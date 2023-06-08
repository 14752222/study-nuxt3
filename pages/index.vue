<template>
    <h1>index page</h1>
    <p>{{ message }}</p>
    <p>{{ msg }}</p>

    <NButton>test</NButton>
    <nuxt-link to="/detail-1">detail 1</nuxt-link>
</template>
<script setup lang="ts">
const {message} = await $fetch('/api')
const {message:msg} = await $fetch('/api/test')
</script>
