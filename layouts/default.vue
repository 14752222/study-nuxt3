<template>
    <div>
        <BaseHeader/>

        <Navbar>
            <nav class="w-[50px] border-[1px] ">导航栏</nav>
        </Navbar>
        <slot></slot>
        <BaseFooter/>
        <BaseFooterButton/>

    </div>
</template>
<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
</script>

<style></style>
