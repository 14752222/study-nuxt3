// export const useLogin = () => useState('login', () => false)

export const useLogin =  defineStore('login', {
    state: () => ({
        isLogin: false,
    })
})

