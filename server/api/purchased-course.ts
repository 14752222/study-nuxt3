import {isNuxtError} from "nuxt/app";
import {getCoursesByUser} from "~/server/repositories/orderRepository";
import {getTokenInfo} from "~/server/database/service/auth";

export default defineEventHandler(async (event) => {
    try {
        const token = getTokenInfo(event)
        if (isNuxtError(token)) {
            return sendError(event, createError({
                statusCode: 401,
                message: '未登录'
            }))
        }
        const courses = await getCoursesByUser(token.userId)
        return {
            statusCode: 200,
            data: courses,
            statusMessage: '成功'
        }
    } catch (e) {
        return sendError(event, createError({
            statusCode: 500,
            message: '服务器错误'
        }))
    }
})
