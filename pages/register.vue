<script setup lang="ts">
import type {FormInst, FormRules} from "naive-ui"
import {Post} from "~/composables/request";
import { useUser} from "~/store/login";

useHead({
    title: "注册"
})
definePageMeta({
    layout: 'blank',
})
const formRef = ref<FormInst>()
const store = useUser()
const { isLogin,userInfo } = storeToRefs(store)


const form = reactive({
    username: "",
    email: "",
    password: ""
})

const validateRules: FormRules = {
    name: [
        {required: true, message: '请输入账号', trigger: 'blur'},
        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
    ],
    email: [
        {required: true, message: '请输入邮箱', trigger: 'blur'},
        {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
    ]
}

const validate = async () => {
    try {
        const res = await formRef.value?.validate()
        return res ? true : false
    } catch (error) {
        console.log(`error`, error)
        return true
    }
}

const login = async () => {
    console.log(`form`, form)
    // console.log(form)
    const res = await validate()
    console.log(`res`, res)
    if (res) return
    const result = await Post("/api/register", form)
    if (result?.statusCode !== 200) {
        return
    }
    store.userInfo = result.data
    store.isLogin = true
    navigateTo("/")

    console.log(`result`, result)

}
</script>

<template>
    <h2>注册账号</h2>
    <NForm ref="formRef" class="w-[340px]" size="large">
        <NFormItem label="账号" labelWidth="80px" required>
            <NInput v-model:value="form.username" placeholder="请输入账号"/>
        </NFormItem>
        <NFormItem label="邮箱" labelWidth="80px" required>
            <NInput v-model:value="form.email" placeholder="请输入邮箱"/>
        </NFormItem>
        <NFormItem label="密码" labelWidth="80px" required>
            <NInput v-model:value="form.password" placeholder="请输入密码" type="password"/>
        </NFormItem>
        <NFormItem>
            <NButton type="primary" class="w-full" @click="login">注册</NButton>
        </NFormItem>
        <div class="flex justify-center items-center w-full text-xs mt-5 text-gray-600">
            注册即代表您同意
            <NuxtLink class="decoration-none text-green-500" to="/agreement?type=1">《用户协议》</NuxtLink>
            <NuxtLink class="decoration-none text-green-500" to="/agreement?type=1">《隐私政策》</NuxtLink>
        </div>
    </NForm>
</template>

<style scoped>

</style>
