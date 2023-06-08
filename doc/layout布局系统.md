![img.png](img.png)

使用
![img_1.png](img_1.png)



### layout布局系统
```vue
<!-- 创建layouts文件夹 创建default.vue -->
<template>
    <div class="layout">
        <div class="layout-header">
            <slot name="header"></slot>
        </div>
        <div class="layout-content">
            <slot name="content"></slot>
        </div>
        <div class="layout-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<!-- 使用方法 在需要使用NuxtPage外面嵌套 -->
<template>
    <NuxtLayout>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>

```
