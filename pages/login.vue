<script setup lang="ts">
import type {FormInst, FormRules} from "naive-ui";
import {Get,Post} from "~/composables/request";
import {messages} from "async-validator/dist-types/messages";
import {message} from "~/composables/descrete";
import {useUser} from "~/store/login";

useHead({
    title: "登录"
})

definePageMeta({
    layout: 'blank',
})

const formRef = ref<FormInst>()

const form = ref({
    username: 'test',
    password: '123456'
})

const rules: FormRules = {
    username: [
        {required: true, message: '请输入账号', trigger: 'blur'},
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
    ]
}


const store = useUser()
const router = useRouter()
const login = async () => {
    console.log(formRef)
    const valid = await formRef.value?.validate()
    console.log(valid)
    if (valid) {
        return
    }

    const res = await Post('api/login', form.value)
    if (res.code === 200) {
        message.success('登录成功')
        store.userInfo = res.data
        store.isLogin = true
        await router.push('/')
    } else {
        message.error(res.msg)
    }

}

</script>

<template>
    <h2 class="flex justify-between">
        <span>登录</span>
        <span class="text-sm text-gray-400">没有账号？
            <NuxtLink to="/register">注册</NuxtLink>
        </span>
    </h2>

    <NAlert title="演示账号和密码为：test" type="info" class="mb-6"/>


    <NForm ref="formRef" class="w-[340px]" size="large">
        <NFormItem label="账号" labelWidth="80px" required>
            <NInput v-model:value="form.username" placeholder="请输入账号"/>
        </NFormItem>
        <NFormItem label="密码" labelWidth="80px" required>
            <NInput v-model:value="form.password" placeholder="请输入密码" type="password"/>
        </NFormItem>
        <NFormItem>
            <NButton type="primary" class="w-full" @click="login">登录</NButton>
        </NFormItem>
    </NForm>

</template>

<style scoped>

</style>
