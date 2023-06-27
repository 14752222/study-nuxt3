import {getTokenInfo} from "~/server/database/service/auth";
import {OrderStatus, Order} from "@prisma/client";
import {createOrder} from "~/server/repositories/orderRepository";
import {isNuxtError} from "nuxt/app";

export default defineEventHandler(async (event) => {
    try {

        const {courseId} = await readBody(event)
        const Token = getTokenInfo(event)
        if (isNuxtError(Token)) {
            return sendError(event, Token)
        }
        const order = {
            courseId: Number(courseId),
            userId: Token.id,
            createdAt: new Date(),
            status: OrderStatus.WAIT_CONFIRM
        } as Order

        const data = await createOrder(order)
        return {
            statusCode: 200,
            data: {orderId: data.id},
            statusMessage: '订单创建成功',
        }
    } catch (e) {
        console.log(`[ERROR] ${e}`)
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: '服务器错误'
        }))
    }
})
