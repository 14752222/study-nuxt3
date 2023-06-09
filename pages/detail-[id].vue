<template>
    <h1>detail page</h1>
    <!--<div>{{$route.params.id}}</div>-->
    <div>{{ title }}</div>
    <div>{{ concat }}</div>
</template>
<script setup lang="ts">
const route = useRoute()
console.log(route.params.id)
const {title, concat} = await $fetch(`/api/detail/${route.params.id}`)
</script>
