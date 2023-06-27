// @ts-ignore
import bcrypt from 'bcryptjs';
// @ts-ignore
import jwt from 'jsonwebtoken';
import type {User} from '@prisma/client';
import {createUser, getUserByEmail} from "~/server/repositories/userRepository";

export default defineEventHandler(async (event) => {
    try {
        const data = await readBody<User>(event);
        const {username, email, password} = data;
        if (!username || !email || !password) {
            return sendError(event, createError({
                statusCode: 400,
                statusMessage: '请填写完整信息'
            }))
        }
        const user = await getUserByEmail(email);

        if (user) {
            return sendError(event, createError({
                statusCode: 400,
                statusMessage: '该邮箱已被注册'
            }))
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const result = await createUser({
            username,
            email,
            password: hash
        });

        const secret = process.env.JWT_SECRET;
        console.log(`secret`,secret)
        if (!secret) {
            return sendError(event, createError('Internal Server Error'))
        }

        const token = jwt.sign({
            data: {...result}
        }, secret, {expiresIn: '7d'})

        setCookie(event, 'token', token, {
            maxAge: 60 * 60 * 24 * 7,
        })

        return {
            statusCode: 200,
            data: hidePassword(result),
            statusMessage: '注册成功',
        }


    } catch (e) {
        console.log(e)
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        }))
    }
})


function hidePassword(user: User) {
    const {password, ...rest} = user;
    return rest;
}
