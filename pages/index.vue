<template>
    <h1>index page</h1>
    <p>{{ message }}</p>
    <p>{{ msg }}</p>
    <ul class="flex items-center flex-col gap-2 py4">
        <li v-for="post in posts" :key="post.id">
            <NuxtLink :to="`/detail-${post.id}`">
                {{ post.title }}
            </NuxtLink>

        </li>
    </ul>
    <NButton>test</NButton>
    <nuxt-link to="/detail-1">detail 1</nuxt-link>
</template>
<script setup lang="ts">
const {message} = await $fetch('/api')
const {message: msg} = await $fetch('/api/test')
const posts = await $fetch('/api/posts')
</script>

<style scoped>
a {
    color: cornflowerblue;
}
</style>
