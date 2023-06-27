import {getColumnById, getColumnList} from "~/server/repositories/columnRepository";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id
    if (!id) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: '参数错误'
        }))
    }

    try {
        const column = await getColumnById(id)
        if (!column) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: '栏目不存在'
            }))
        }
        const result = await getColumnList({page: 1, size: 2})

        return {
            statusCode: 200,
            data: {
                item: column,
                list: result.columns,
            },
            statusMessage: '成功'
        }

    } catch (e) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: '服务器错误'
        }))
    }

})
