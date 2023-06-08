<template>
<div>
    <nav class="font-18">导航栏</nav>
    <slot></slot>
    <!-- 访问public 下面的文件   -->
    <img src="/th.jpg">
    <!-- 访问assets 下面的文件 -->
    <img src="~/assets/th.jpg">
</div>
</template>

<style lang="scss" scoped>
    nav {
      color: $globalColor;
    }
</style>

