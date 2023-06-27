import {getCourses} from "~/server/repositories/courseRepository";
import {getColumns} from "~/server/repositories/columnRepository";

export default defineEventHandler(async (event) => {
    const columns = await getColumns()
    const courses = await getCourses()

    return {
       code: 200,
        data: {
            columns,
            courses,
        },
        message: '获取成功',
    }
})
