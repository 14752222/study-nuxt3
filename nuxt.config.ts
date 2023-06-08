// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'assets/css/main.css',
        'assets/css/global.scss'
    ],
    devtools: {enabled: true},
    //追加scss变量 vite
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "~/assets/css/_variables.scss";`
                }
            }
        }
    },
    modules: [
        '@nuxtjs/tailwindcss',
    ]


})
