import {useAuth} from "~/store/login";

export default defineNuxtRouteMiddleware((to ,from)=>{
    console.log('to',to)
    console.log('from',from)
    const useLogin = useAuth()
    const {token, isLogin, userInfo} = useLogin
    if (to.path === '/login') return

    if (token === null || isLogin === false || userInfo === null) {
        console.log(`token: ${token}, isLogin: ${isLogin}, userInfo: ${userInfo}`)
        console.log( navigateTo ('/login') )
    }
})
