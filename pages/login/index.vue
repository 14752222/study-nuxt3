<style scoped>

</style>

<template>
    <div class="flex flex-col justify-center items-center">
        <div class="w-[200px] h-[200px] flex flex-col justify-center items-center">
            <p>用户登录</p>
            <NInput class="mt-5" v-model="username" placeholder="请输入用户名"></NInput>
            <NInput class="mt-5" v-model="password" placeholder="请输入密码"></NInput>
            <NButton class="mt-5" @click="login">登录</NButton>
        </div>
    </div>
</template>



<script setup lang="ts">

import {useLogin} from "~/store/login";

const username = ref('')
const password = ref('')

const store = useLogin()

const {isLogin} = storeToRefs(store)

const router = useRouter()
const route = useRoute()

const login = async () => {
    isLogin.value = true
    router.push(route.query.callback as string)
}

</script>
