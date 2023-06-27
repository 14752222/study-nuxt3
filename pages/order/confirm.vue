<script setup lang="ts">
import type {IResult} from "~/types/IResult";

const route = useRoute();
const id = route.query.id;
const {data} = await Get<IResult>(`/api/queryOrder/${id}`);
console.log(`data`, data);
const course = computed(() => data.course);

const confirmOrder = async () => {
    navigateTo(`/order/pay?id=${id}`)
}
</script>

<template>
    <NCard class="font-semibold mb-3 text-gray-500" size="medium">
        <h2>产品信息</h2>
        <div class="flex mb-5">
            <NImage :src="`/${course?.cover}`"
                    object-fit="cover"
                    class="rounded w-[380px] h-[210px] mr-5"/>

            <div class="flex flex-1 ml-4 flex-col">
                <h5 class="flex text-xl text-gray-600">
                    {{ course.title }}
                </h5>
                <p class="my-2 pr-5 text-sm word-spacing-4 leading-6 text-gray-400 ml-[0.rem]">
                    {{ course.desc }}
                </p>
            </div>

            <div class="flex items-center mr-5 mb-5">
                <span class="text-red-400 text-xl">请在30分钟内完成支付</span>
            </div>

            <div class="flex mb-5 items-center">
                总计：
                <span class="text-gray-600 font-bold pr-4 text-2xl">
                    🌱 {{ course.price }}
                </span>
                <NButton type="primary"
                         size="small"
                         @click="confirmOrder">确认订单
                </NButton>
            </div>
        </div>
    </NCard>
</template>

<style scoped>

</style>
