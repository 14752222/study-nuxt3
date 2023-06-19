export const useAuth = defineStore('login',{
    state: () => ({
        token: null,
        isLogin: false,
        userInfo: null
    })
})

interface LoginParams {
    token: string | null
    isLogin: boolean
    userInfo: userInfo | null
}

interface userInfo {
    name: string
    age: number
}
