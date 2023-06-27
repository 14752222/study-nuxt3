<script setup lang="ts">
import type {IResult} from "~/types/IResult";
import {useUser} from "~/store/login";
import type { FormInst } from 'naive-ui'
const store = useUser()
const {userInfo} = storeToRefs(store)
const formRef = ref<FormInst>()

const form = reactive({
    avatar: '',
    nickname: '',
    sex: '',
})

const sexCheckConfig = [
    {label: '男', value: '男'},
    {label: '女', value: '女'},
    {label: '保密', value: '保密'},
]

watchEffect(() => {
    console.log(userInfo.value)
    if (userInfo.value) {
        form.avatar = userInfo.avatar
        form.nickname = userInfo.nickname || '未知'
        form.sex = userInfo.sex || '保密'

        console.log(form)
    }
})


const loading = ref(false)

const onSubmit = async () => {
    if (form.nickname == '未知') {
        form.nickname = ''
    }

    const data = await Post<IResult>('/api/userinfo', form)
    if (data.statusCode === 200) {
        message.success('修改成功')
        store.userInfo = data.data
    }
}
</script>

<template>
    <div class="p-5">
        <NForm ref="formRef" :model="form" label-width="80px" label-placement="left">
            <NFormItem label="昵称" path="nickname">
                <NInput placeholder="请输入用户昵称" v-model:value="form.nickname"/>
            </NFormItem>
            <NFormItem label="性别" path="sex">
                <NRadioGroup v-model:value="form.sex" name="sex">
                    <NSpace>
                        <NRadio v-for="item in sexCheckConfig"
                                :key="item.value"
                                :value="item.value">
                            {{ item.label }}
                        </NRadio>
                    </NSpace>
                </NRadioGroup>
            </NFormItem>

            <NFormItem>
                <NButton type="primary" @click="onSubmit" :loading="loading">
                    提交
                </NButton>
            </NFormItem>
        </NForm>
    </div>
</template>

<style scoped>

</style>
