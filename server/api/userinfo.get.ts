// @ts-ignore
import jwt from "jsonwebtoken";
import {getUserByEmail} from "~/server/repositories/userRepository";
import {IUser} from "~/types/IUser";

interface IToken {
    fail: boolean;
    data: null | IUser;
    message: string;
}

export default defineEventHandler(async (event) => {
    try {
        const token = getCookie(event, 'token');
        if (!token) {
            return sendError(event, createError({
                statusCode: 401,
                message: '请先登录'
            }))
        }

        const {fail, data, message} = parseToken(token);
        if (fail) {
            return sendError(event, createError({
                statusCode: 401,
                message
            }))
        }
        const user = await getUserByEmail(data!.email);
        if (!user) {
            return sendError(event, createError({
                statusCode: 404,
                message: '用户不存在'
            }))
        }

        return {
            code: 200,
            data: user,
            message: '获取用户信息成功'
        }
    } catch (e) {
        return sendError(event, createError({
            statusMessage: '获取用户信息失败'
        }))
    }

});

//解析token
function parseToken(token: string): IToken {
    try {
        const info = jwt.verify<IUser>(token, process.env.JWT_SECRET);
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime > info.exp) {
            return {
                fail: true,
                data: null,
                message: '登录过期'
            };
        }
        return {
            fail: false,
            data: info,
            message: '登录成功'
        }
    } catch (e) {
        return {
            fail: true,
            data: null,
            message: 'token不合法!'
        }
    }

}
