## Nuxt服务端路由开发

### 1.创建路由
```js
export default defineEventHandler((event) => {
    //获取路由参数
    // const fileNames = getRouterParam(event, 'id');
    //获取请求体参数
    // const body =await readBody(event);
    //获取查询参
    // const query = getQuery(event);
    //query.id
    //获取header
    // const header: any<string|undefined> = getHeader(event);
    // console.log(header)
    return {
        message: "Hello World",
    }
})

```
