<script setup lang="ts">
import {useUser} from "~/store/login";
import {logout} from "~/composables/auth";

const router = useRoute()
const store = useUser()
const {userInfo, isLogin} = storeToRefs(store)

const options = [
    {
        label: '用户中心',
        key: 'center',
    },
    {
        label: '退出',
        key: 'logout',
    }
]
const menuItems = ref([
    {
        name: '首页',
        path: '/'
    },
    {
        name: '专栏',
        path: '/list/column'
    },
    {
        name: '课程',
        path: '/list/course'
    },
    {
        name: '关于',
        path: '/about'
    }
])
const handlerSelect = (key: string) => {
    if (key === 'logout') {
        dialog.warning({
            content: '确定退出登录吗？',
            positiveText: '退出',
            negativeText: '取消',
            onPositiveClick: () => logout(),
        })
    }

    if (key === 'center') {
        navigateTo('/userCenter')
    }
}

</script>

<template>
    <div class="bg-white fixed top-0 left-0 right-0 shadow-sm z-1000">
        <div class="container m-auto flex items-center h-[60px] lg:px-4 px-2 box-border">
            <NButton text strong class="text-xl" @click="() => navigateTo('/')">
                小小学堂
            </NButton>

            <div class="flex-1 flex items-center px-4">
                <Menu :active="router.path === item.path"
                      v-for="item in menuItems"
                      :key="item.path"
                      @click="() => navigateTo(item.path)">
                    {{ item.name }}
                </Menu>
            </div>

            <NuxtLink v-if="!isLogin" class="mr-4" to="/login">
                <NButton secondary strong>登录</NButton>
            </NuxtLink>

            <NDropdown v-else
                       :options="options"
                       @select="handlerSelect"
            >
                <NAvatar round
                         size="small"
                         :src="userInfo?.avatar!== null ? userInfo.avatar : '/avatar.png'"/>

            </NDropdown>
        </div>
    </div>
</template>

<style scoped>

</style>
