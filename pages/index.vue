<script setup lang="ts">
useHead({
    title: '小学学堂'
})
const slides = [
    {label: '1', bgColor: 'cadetblue'},
    {label: '2', bgColor: 'cornflowerblue'},
    {label: '3', bgColor: 'blueviolet'},
    {label: '4', bgColor: 'brown'},
]


const {data, error} = await useFetch(() => '/api/home')

if (process.server && error.value) {
    showError('获取数据失败！')
}

// onBeforeMount(async () => {
//     const {data, error} = await useFetch('/api/home')
//     if (process.server && error.value) {
//         showError('获取数据失败！')
//     }
//     console.log(data)
// })

</script>

<template>
    <NCarousel show-arrow class="mb-6">
        <div v-for="item in slides"
             :key="item.label"
             class="text-white w-full h-[400px] rounded cursor-pointer text-center leading-[400px]
                    h-[400px] h-[150px] lg:h-[400px]"
             :style="{ backgroundColor: item.bgColor }">
            {{ item.label }}
        </div>
    </NCarousel>
    <ProdList title="最新课程" :list="data?.data.courses!"/>
    <ProdList title="最新专栏" :list="data?.data.columns!" type="column"/>
</template>

<style scoped>

</style>
