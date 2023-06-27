import {isNuxtError} from 'nuxt/app'
// @ts-ignore
import bcrypt from 'bcryptjs'
import {getUserByUsername, updateUser} from '../repositories/userRepository'
import {getTokenInfo} from '../database/service/auth'

export default defineEventHandler(async (event) => {
    const token = getTokenInfo(event)
    if (!token) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: '未登录'
        }))
    }
    try {
        const body = await readBody(event)
        if (!body || !body.oldPwd || !body.newPwd) {
            return sendError(event, createError({
                statusCode: 400,
                statusMessage: '参数错误'
            }))
        }

        const valid = await bcrypt.compare(body.oldPwd, token.password)

        if (!valid) {
            return sendError(event, createError({
                statusCode: 403,
                statusMessage: '密码错误'
            }))
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(body.newPwd, salt)
        await updateUser(token.id, {
            password: hash
        })
        return {
            statusCode: 200,
            data: true,
            statusMessage: '密码修改成功'
        }
    } catch (e) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: '服务器错误'
        }))
    }
})
