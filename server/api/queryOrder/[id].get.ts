import {getOrderById} from "~/server/repositories/orderRepository";
export default defineEventHandler(async (event) => {
    const id = event.context.params?.id ? parseInt(event.context.params?.id as string) : undefined
    if (!id) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: '参数错误'
        }))
    }
    try {
        const order = await getOrderById(id)
        if (!order) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: '订单不存在'
            }))
        }
        return {
            statusCode: 200,
            data: order,
            statusMessage: '成功'
        }

    } catch (e) {
        console.log(`[ERROR] ${e}`)

        return sendError(event, createError({
            statusCode: 500,
            message: '服务器错误'
        }))
    }
})
