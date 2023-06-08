#### tailwind 和 css 最好不要混用

#### tailwindcss使用

`yarn add -D @nuxtjs/tailwindcss`

然后在nuxt.config.js中配置

```js
  {
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    //如果有自定义的tailwindcss配置文件，可以在这里配置
    css: [
        '~/assets/css/tailwind.css'
    ],
}
```
