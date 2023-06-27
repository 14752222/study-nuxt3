import {updateOrder} from "~/server/repositories/orderRepository";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        console.log(`[INFO] body: ${JSON.stringify(body)}`)
        const data = await updateOrder(Number(body.id), {
            status: body.status,
        })
        return {
            statusCode: 200,
            data,
            statusMessage: '订单更新成功',
        }
    } catch (e) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: '服务器错误',
        }))
    }
})
