# nuxt获取数据api

#### useFetch

页面、组件或者插件中可以使用useFetch获取任意 URL 资源

#### useLazyFetch

该方法等效于useFetch设置了lazy选项为 true，不同之处在于它不会阻塞路由导航


#### useAsyncData

该方法和 useFetch 相比功能上是相同的，但是更底层，使用方法类似于 ahooks 库中的 useRequest，我们需要提供一个用于缓存去重的 key 和数据请求的处理函数。也就是说，useFetch 相当于：useAsyncData(key, () => $fetch(url))


#### useLazyAsyncData

该方法等效于useAsyncData，仅仅设置了lazy选项为true，也就是它不会阻塞路由导航









### nuxt3 $fetch和useFetch 区别

`$fetch` 是一个实例方法，可以直接在组件中使用，适用于服务器端和客户端的数据获取。
`useFetch` 是一个钩子函数，只在客户端执行，提供了更灵活的数据获取方式，并将数据绑定到组件的响应式数据上。







## 错误写法
```vue

<template>
    <div>
        <div v-for="post in postsData" :key="post.id">
        <h2>{{post.title}}</h2>
        <p>{{post.content}}</p>
        </div>
        <button @click="prev">上一页</button>
        <span>{{page}}</span>
        <button @click="next">下一页</button>
    </div>
</template>

<script setup lang="ts">
// 错误写法 
// const page = ref(1)
// const {data: postsData, refresh} = await useFetch(`/api/posts?page=${page.value}&size=2`)

const page = ref(1)
const {data: postsData, refresh} = await useFetch(()=>`/api/posts?page=${page.value}&size=2`)

function prev() {
    page.value--
    refresh()
}

function next() {
    page.value++
    refresh()
}



</script>
```
