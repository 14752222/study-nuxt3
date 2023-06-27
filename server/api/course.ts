import {getCourseList} from "~/server/repositories/courseRepository";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const page = parseInt(query.page as string) || 1;
        const size = parseInt(query.size as string) || 8;
        const res = await getCourseList({
            page,
            size
        })
        return {
            code: 200,
            data: {
                list: res.courses,
                total: res.total
            },
            message: '获取成功'
        }
    } catch (e) {
        return sendError(event,createError({
            statusCode: 500,
            statusMessage: '获取失败',
        }))
    }
})
