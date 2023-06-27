<script lang="ts" setup>
import type {IResult} from "~/types/IResult";
import {Column, Course} from "@prisma/client";

const route = useRoute();
const {type, id} = route.params;
const {data} = await useFetch<IResult>(`/api/${type}/${id}`);
console.log(`data`, data);
const item = computed(() => data.value?.data.item);
useHead({
    title: item.value?.title || '详情',
});
const tabs = ref([
    {
        label: '详情',
        value: 'detail',
    }
]);

const current = ref('detail');
if (type === 'course') {
    tabs.value.push({
        label: '目录',
        value: 'catalogue',
    });
}

const subscribe = async () => {
    const result = await Post<IResult>(`/api/order/createOrder`, {
        courseId: id,
    });
    if (result?.statusCode === 200) {
        console.log(`跳转到订单确认页`)
        console.log(`result`, result)
        navigateTo(`/order/confirm?id=${result.data.orderId}`)
    } else {
        message.error(result.data.statusMessage)
    }

}

</script>

<template>
    <section class="rounded bg-white flex p-5 my-2">
        <NImage :src="`/${data?.data.item.cover}`"
                object-fit="cover"
                class="rounded w-[380px] h-[210px] mr-5"
        />
        <div class="flex flex-1 flex-col py-2">
            <div class="flex flex-col items-start">
                <div class="flex items-center">
                    <span class="text-xl mr-2">{{ data?.data.item.title }}</span>
                </div>
                <p class="my-2 text-sm text-gray-400 ml-[0.01rem]">
                    {{ data?.data.item.desc }}
                </p>
                <div v-if="type==='course'">
                    <span class="text-green-600 font-bold">
                        🌱 {{ data?.data.item.price }}
                    </span>
                    <span class="text-gray-400 text-xs line-through ml-2">
                        {{ data?.data.item.old_price }}
                    </span>
                </div>
            </div>
            <div v-if="type==='course'" class="mt-auto">
                <NButton type="primary"
                         round
                         class="w-[200px]"
                         @click="subscribe">立即订阅
                </NButton>
            </div>
        </div>
    </section>


    <NGrid :x-gap="20" class="pt-2">
        <NGridItem :span="18">
            <section class="bg-white shadow-white mb-5 rounded">
                <Tabs
                        :data="tabs"
                        :state="current"
                        @change="current = $event"
                />
                <div
                        v-if="current === 'detail' && item"
                        class="pt-4 pb-10 px-10 content"
                        v-html="type === 'course' ? (item as Course).detail : (item as Column).content"
                />
                <Catalouge v-else-if="current === 'catalogue' && item"
                           :data="(item as any).Catalogue"/>
            </section>
        </NGridItem>
        <NGridItem :span="6">
            <section class="bg-white shadow rounded mb-5">
                <div class="p-3 border-b">
                    <h4>精品推荐</h4>
                </div>
                <div class="p-3">
                    <Prod v-for="prod in data?.data.list"
                          :key="prod.id"
                          :data="prod"></Prod>
                </div>
            </section>
        </NGridItem>
    </NGrid>

</template>

<style scoped>
.content img {
    max-width: 100% !important;
}
</style>
