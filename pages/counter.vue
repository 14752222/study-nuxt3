<script setup lang="ts">
    // const counter = useState("counter", ()=>Math.round(Math.random()*100));
    // const counterRef = ref(Math.round(Math.random()*100));
</script>

<template>
    <div class="p-4">
<!--        <h1>Counter</h1>-->
<!--        <p>The counter is {{ counter }}</p>-->
<!--        <p>The counterRef is {{ counterRef }}</p>-->
<!--        <p>-->
<!--            <NButton @click="counter++">+</NButton>-->
<!--            <NButton @click="counter&#45;&#45;">-</NButton>-->
<!--        </p>-->
        <Counter></Counter>
        <Counter></Counter>
    </div>
</template>

<style scoped>

</style>
