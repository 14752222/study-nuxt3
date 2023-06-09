<template>
    <h1 class="m-5">detail page</h1>
    <!--<div>{{$route.params.id}}</div>-->
    <div class="m-5">{{ title }}</div>
    <div class="m-5" v-html="content"></div>

    <div class="p-5">
         <p v-if="error">{{ error }}</p>
            <p v-if="pending">loading...</p>
            <p v-else>{{ post.title }}</p>
         <div v-html="post.content"></div>

    </div>
</template>
<script setup lang="ts">
const route = useRoute()
console.log(route.params.id)
const {title, content} = await $fetch(`/api/detail/${route.params.id}`)
const fethPost = async () => {
    const {title, content} = await $fetch(`/api/detail/${route.params.id}`)
    console.log(title, content)
    return {title, content}
}
const {data: post, error, pending} = await useAsyncData(fethPost)

// useAsyncData 和 useFetch 的区别
// useAsyncData 会在页面切换时重新获取数据
// useFetch 函数不会阻塞导航

// useAsyncData 和 useLazyData 的区别
// useAsyncData 会在页面切换时重新获取数据
// use




</script>
