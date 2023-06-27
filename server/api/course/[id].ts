import {getCourseById, getCourseList, getCourses} from "~/server/repositories/courseRepository";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id
    if (!id) {
        return sendError(event, createError({
            statusCode: 400,
            message: '参数错误'
        }))
    }
    try {
        const course = await getCourseById(id)

        if (!course) {
            return sendError(event, createError({
                statusCode: 404,
                message: '课程不存在'
            }))
        }
        const result = await getCourseList({page: 1, size: 4})

        return {
            statusCode: 200,
            data: {
                item: course,
                list: result.courses,
            },
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
