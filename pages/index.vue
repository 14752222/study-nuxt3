<template>
    <h1>index page</h1>
    <p>{{ message }}</p>
    <p v-if="error">{{ error }}</p>
    <p v-if="pending">loading...</p>
    <p v-else>{{ msg.message }}</p>
    <br>
    <br>
    <br>
    <!--    <ul class="flex items-center flex-col gap-2 py4">-->
    <!--        <li v-for="post in posts" :key="post.id">-->
    <!--            <NuxtLink :to="`/detail-${post.id}`">-->
    <!--                {{ post.title }}-->
    <!--            </NuxtLink>-->

    <!--        </li>-->
    <!--    </ul>-->

    <br>
    <br>
    <br>

    <ol>
        <li v-for="post in postsData" :key="post.id">
            <NuxtLink :to="`/detail-${post.id}`">
                {{ post.title }}
            </NuxtLink>
        </li>
    </ol>
    <div>
        <NButton @click="prevPage">prev</NButton>
        <span>{{ page }}</span>
        <NButton @click="nextPage">next</NButton>
    </div>
    <NButton>test</NButton>
    <nuxt-link to="/detail-1">detail 1</nuxt-link>
</template>
<script setup lang="ts">
useHead({
    title: 'index page',
    meta: [
        {
            name: 'description',
            content: 'index page description'
        }
    ]
})


const {message} = await $fetch('/api')
// const posts = await $fetch('/api/posts')
// const {message: msg} = await $fetch('/api/test')
const {data: msg, error, pending} = await useFetch('/api/test')
const page = ref(1)
// 错误写法 const {data: postsData, refresh} = await useFetch(`/api/posts?page=${page.value}&size=2`)
const {data: postsData, refresh} = await useFetch(()=>`/api/posts?page=${page.value}&size=2`)

function nextPage() {
    page.value++
    refresh()
}

function prevPage() {
    page.value--
    refresh()
}
</script>

<style scoped>
a {
    color: cornflowerblue;
}
</style>
