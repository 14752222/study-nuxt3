<template>
  <div>
<!--    <NuxtWelcome />-->
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
//titleTemplate 设置标题模板
useHead({
    titleTemplate:(s)=> s ? `${s} -hello` : 'hello',
})
</script>
