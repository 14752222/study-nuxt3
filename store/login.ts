import type {User} from "@prisma/client";

export const useUser = defineStore('userInfo', {
    state: () => {
        return {

            userInfo: {},
            isLogin: false,
        }
    },


})
