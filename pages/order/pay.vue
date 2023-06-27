<script setup lang="ts">
import type {Course} from "@prisma/client";
import type {IResult} from "~/types/IResult";

const route = useRoute();
const { id }  = route.query;
const {data} = await Get<IResult>(`/api/queryOrder/${id}`)
const course = computed<Course | undefined>(() => data?.course);
if (process.client) {
    setTimeout(async () => {
        const data = await Post<IResult>(`/api/order/updateOrder`, {
            id: id,
            status: "COMPLETED"
        })
        if (data.statusCode === 200) {
            navigateTo(`/course/detail/${course.value?.id}`)
        }
    }, 5000)
}

const isTimeOut = ref(false)

</script>

<template>
    <div class="flex justify-center">
        <NCard class="w-[450px] mb-10 text-center">
            <h1 class="text-3xl mb-2 text-center">
                确认支付
            </h1>

            <p class="flex text-gray-500 justify-center">
                <div class="flex" v-if="!isTimeOut">
                    距离过期还有：
                    <Counter class="text-red-500"
                             :expires="30"
                             @end="isTimeOut=true"/>
                </div>
                <div v-else>
                    订单已过期
                </div>
            </p>

            <section class="flex justify-center items-center mt-0 mb-3">
                总额：
                <span class="text-green-600 font-bold text-2xl">
              🌱 {{ course?.price }}
            </span>
            </section>

            <img src="/qrcode.jpg" alt="">

            <div class="flex justify-center items-center py-4 text-green-500">
                <div class="ml-3 text-gray-500 text-sm">
                    <p>请用防狼枪扫射二维码</p>
                </div>
            </div>
        </NCard>
    </div>
</template>

<style scoped>

</style>
