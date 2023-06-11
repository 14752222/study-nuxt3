<template>
    <h1 class="m-5">detail page</h1>
    <div class="p-5">
        <p v-if="error">{{ errorMsg }}</p>
        <p v-else-if="pending">loading...</p>
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
import {NuxtError} from "#app";

const route = useRoute()
const fethPost = async () =>  $fetch(`/api/detail/${route.params.id}`)

const {data: post, error, pending} = await useAsyncData(fethPost)

const errorMsg = computed(()=>(error.value as NuxtError))

let comment = useState("comments", () => "");



const store = useLogin()
const {isLogin} = storeToRefs(store)
const router = useRouter()
const addComment = async () => {
    if(isLogin.value){
        comment.value = ''
    }else {
        router.push(`/login?callback=/detail-${route.params.id}`)
    }
}


</script>
