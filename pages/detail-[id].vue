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

    <!-- 评论区 -->
    <div class="w-[400px]">
        <NInput v-model:value="comment" type="textarea" placeholder="请输入评论内容"></NInput>
        <NButton class="mt-5" @click="addComment">添加评论</NButton>
    </div>

</template>
<script setup lang="ts">
import {useLogin} from "~/store/login";

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

let comment = useState("comments", () => "");
const store = useLogin()
const {isLogin} = storeToRefs(store)
console.log(` isLogin`,isLogin)
const router = useRouter()
const addComment = async () => {
    if(isLogin.value){
        console.log(comment.value)
        comment.value = ''
    }else {
        router.push(`/login?callback=/detail-${route.params.id}`)
    }
}


</script>
