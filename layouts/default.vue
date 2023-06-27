<template>
    <div class="lg:min-w-[1024px] bg-gray-100 flex flex-col min-h-screen">
        <BaseHeader/>
        <div class="container m-auto mt-20">
            <slot/>
        </div>
        <BaseFooter/>
    </div>
</template>

<script lang="ts" setup>
import {useUser} from "~/store/login";

onMounted(async ()=>{
    const store = useUser()
    const {userInfo, isLogin} = storeToRefs(store)
    const result =await Get('/api/userinfo')
    if (result.code === 200) {
        userInfo.value = result.data
        isLogin.value = true
    }
})

</script>

