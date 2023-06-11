// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // plugins: undefined,
    devtools: {enabled: true},
    // builder:'webpack', 需要安装安装@nuxt/webpack-builder
    // nitro: {},
    // postcss: {},
    // vite: {},
    // webpack: {},
    // runtimeConfig: {
    //   apiSecret:'secret'
    // },
    //自动导入
    // imports: {
    //     dirs: []
    // }
    modules: [
        "@nuxtjs/tailwindcss",
        '@huntersofbook/naive-ui-nuxt',
        ["@pinia/nuxt", {
            autoImports: [
                'defineStore',
                'storeToRefs',
            ],
        }],
    ],
    //网站页头配置
    app: {
        head: {
            charset: 'utf-8',
            link: [],
            meta: [
                {name: 'description', content: 'Hunters of Book'},
                {name: 'charset', content: 'utf-8'},
            ],
            script: [],
            style: [],
            title: 'Hunters of Book',
            viewport: 'width=device-width, initial-scale=1',
        }
    }
})
