// @ts-ignore
import bcrypt from 'bcryptjs'
// @ts-ignore
import jwt from 'jsonwebtoken'
import type {User} from '@prisma/client'
import {getUserByEmail, getUserByUsername} from "~/server/repositories/userRepository";
import {hidePassword} from "~/utils/utils";


export default defineEventHandler(async (e) => {
    const {email, username, password} = await readBody<User>(e);
    if (!password || !username) {
        return sendError(e, createError({
            statusCode: 400,
            statusMessage: '请填写完整信息',
        }))
    }
    try {
        // const userByEmail = await getUserByEmail(email);
        const userByUsername = await getUserByUsername(username);
        if (!userByUsername) {
            return sendError(e, createError({
                message: 'User not found',
                statusCode: 404
            }));
        }
        const user = userByUsername;
        const result = await bcrypt.compare(password, user!.password);
        if (!result) {
            return sendError(e, createError({
                message: '密码错误',
                statusCode: 401
            }))
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return sendError(e, createError({
                message: 'Internal Server Error',
                statusCode: 500
            }))
        }
        const token = jwt.sign({...userByUsername}, secret, { expiresIn: '24h' });

        setCookie(e, 'token', token, {
            maxAge: 60 * 60 * 24 * 7,
        })

        return {
            code: 200,
            data: hidePassword(user),
            message: '登录成功'
        };
    } catch (err) {
        return sendError(e, createError({
            statusMessage: 'Something went wrong',
            statusCode: 500
        }))
    }

})





