import {isNuxtError} from "nuxt/app";
import {updateUser} from "~/server/repositories/userRepository";
import {getTokenInfo} from "~/server/database/service/auth";

export default defineEventHandler(async (event) => {
    const token = getTokenInfo(event)
    if (isNuxtError(token)) {
        return sendError(event, createError({
            statusCode: 401,
            message: '未登录'
        }))
    }
    try {
        const body = await readBody(event)

        if(!body || body.username || body.password) {
           let message = '参数错误'
              if(!body.username) {
                  message = '用户名不能修改'
              }

              if(!body.password) {
                  message = '请前往修改密码'
              }

            return sendError(event, createError({
                statusCode: 400,
                statusMessage: message
            }))
        }

        const user = await updateUser(token.id, body)

        return {
            statusCode: 200,
            data: user,
            statusMessage: '成功'
        }

    }catch (e) {
        return sendError(event, createError({
            statusCode: 500,
            message: '服务器错误'
        }))
    }
})
