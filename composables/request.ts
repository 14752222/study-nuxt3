import {merge} from "lodash-es";
import {RouteLocationNormalized, Router} from "vue-router";
type FetchType = typeof $fetch
type ReqType = Parameters<FetchType>[0]
type FetchOptions = Parameters<FetchType>[1]


interface RequestConfig {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    url: ReqType
    body?: any
    options: FetchOptions
}



export function Request<T = unknown>(req: RequestConfig) {
    const router = useRouter()
    const route = useRoute()

    const token = useCookie("token")
    const {method, url, body, options} = req
    const defaultOptions: FetchOptions = {
        method,
        headers: {
            token: token.value,
        } as any,
        body,

        onRequestError(): Promise<void> | void {
            message.error("请求失败")
        },

        onResponseError({response}): Promise<void> | void {
            onResponseErrorHandel(response,router,route)
        }

    } as FetchOptions

    return $fetch<T>(url, merge(defaultOptions, options))
    // return useFetch(url, merge(defaultOptions, options))
}

function onResponseErrorHandel(response: any,router:Router,route:RouteLocationNormalized) {
    const {status} = response
    // switch (response.status) {
    //     case 400:
    //         message.error('参数错误')
    //         break
    //     case 401:
    //         message.error('没有访问权限')
    //         router.push(`/login?callback=${route.path}`)
    //         break
    //     case 403:
    //         message.error('服务器拒绝访问')
    //         break
    //     case 404:
    //         message.error('请求地址错误')
    //         break
    //     case 500:
    //         message.error('服务器故障')
    //         break
    //     default:
    //         message.error('网络连接故障')
    //         break
    // }
    if (status === 400) {
        message.error('参数错误')
    }

    if (status === 401) {
        router.push(`/login?callback=${route.path}`)
    }

    if (status === 403) {
        message.error('服务器拒绝访问')
    }

    if (status === 404) {
        message.error('请求地址错误')
    }

    if (status === 500) {
        message.error('服务器故障')
    }

    if (status === 502) {
        message.error('服务器故障')
    }
}


export function Post<T = unknown >(requset:ReqType,body:any,options:FetchOptions={}) {
    return Request<T>({
        method: "POST",
        url: requset,
        body,
        options
    })
}

export function Get<T = unknown >(requset:ReqType,options?:FetchOptions) {
    return Request<T>({
        method: "GET",
        url: requset,
        body: null,
        options
    })
}

//ts Get<T = unknown > () {}
// "<T = unknown >" 是什么意思
// 1. T 是一个泛型
// 2. = unknown 是一个默认值
// 3. <T = unknown > 是一个泛型参数
