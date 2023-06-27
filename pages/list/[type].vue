<script setup lang="ts">
import {IPage} from "~/types/IResult";

const route = useRoute()
const {type} = route.params as { type: string }
const title = computed(() => {
    switch (type) {
        case 'course':
            return '课程'
        case 'column':
            return '专栏'
        default:
            return '其他'
    }
})

const url = type === 'course' ? '/api/course' : '/api/column'
const page = ref(1)
const size = ref(2)

const {data,error,pending} = await useFetch<IPage>(() => `${url}?page=${page.value}&size=${size.value}`, {
    watch: [page]
})

if (process.server && error.value) {
    showError('获取数据失败！')
}

const onPageChange = (num: number) => {
    page.value = num
}
</script>

<template>
  <Loading :pending="pending">
      <template #loading>
          <LoadingCourseSkeleton/>
      </template>
      <template #default>
          <div>
              <NBreadcrumb class="mb-5">
                  <NBreadcrumbItem>
                      <NLink to="/">首页</NLink>
                  </NBreadcrumbItem>
                  <NBreadcrumbItem>
                      {{ title }}
                  </NBreadcrumbItem>
              </NBreadcrumb>
              <NGrid :x-gap="20" :cols="4">
                  <NGi v-for="item in data?.data.list" :key="item.id">
                      <Prod :data="item" :type="type"></Prod>
                  </NGi>
              </NGrid>
              <div class="flex justify-center items-center mt-5 mb-10">
                  <NPagination size="large" :item-count="data?.data.total"
                               :page="page"
                               :page-size="size"
                               @update:page="onPageChange"/>
              </div>
          </div>
      </template>
  </Loading>
</template>

<style scoped>

</style>
