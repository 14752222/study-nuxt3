// @ts-ignore
import jwt from 'jsonwebtoken';
import {H3Event} from "h3";

export const getTokenInfo = (e:H3Event) => {
    let tokenInfo = null;
    const tokenSecret = process.env.JWT_SECRET;
    const token = getCookie(e, 'token')
    if (!token) {
        return createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        })
    }

    try {
        tokenInfo = jwt.verify(token, tokenSecret);
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime > tokenInfo.exp) {
            return createError({
                statusCode: 401,
                statusMessage: 'token expired',
            })
        }
        return tokenInfo;
    } catch (e) {
        return createError({
            statusCode: 401,
            statusMessage: 'token invalid',
        })
    }

}
