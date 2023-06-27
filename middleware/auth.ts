export default defineNuxtRouteMiddleware((to,from)=>{
    const token = useCookie('token')
    const route = useRoute()
    if(!token.value) {
        if(process.client) {
            message.error("请登录后再操作")
        }
        return navigateTo('/login?callback='+route.fullPath)
    }
})
