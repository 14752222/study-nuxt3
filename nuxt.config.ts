// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        "@huntersofbook/naive-ui-nuxt",
        "@unocss/nuxt",
        [
            "@pinia/nuxt",
            {
                autoImports: [
                    // 自动引入 `defineStore(), storeToRefs()`
                    "defineStore",
                    "storeToRefs"
                ],
            },
        ]
    ],
    unocss: {
        uno: true, // enabled `@unocss/preset-uno`
        icons: true, // enabled `@unocss/preset-icons`
        attributify: true, // enabled `@unocss/preset-attributify`,
        // core options
        shortcuts: [],
        rules: [],
        safelist: [],
    },
})
