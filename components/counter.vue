<script setup lang="ts">
import {Ref} from "vue";

const counter = useCounter() as Ref<number>;
const counterRef = ref(Math.round(Math.random()*100));
</script>

<template>
    <div class="p-4">
        <h1>Counter</h1>
        <p>The counter is {{ counter }}</p>
        <p>The counterRef is {{ counterRef }}</p>
        <p>
            <NButton @click="counter++;counterRef++">+</NButton>
            <NButton @click="counter--;counterRef--">-</NButton>
        </p>
    </div>
</template>

<style scoped>

</style>
