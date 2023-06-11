import fs from 'fs';
import path from 'path';
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), 'content'); //作用是将多个路径拼接为一个路径

export default defineEventHandler(async (event) => {

    try {
        const fileNames = getRouterParam(event, 'id');
        const fullPath = path.join(postsDirectory, `index${fileNames + '.md'}`); //作用是将多个路径拼接为一个路径
        fs.accessSync(fullPath)
        const fileContents = fs.readFileSync(fullPath, 'utf8'); //作用是读取文件内容
        const matterResult = matter(fileContents); //作用是将文件内容转换为对象
        const processedContent = await remark()
            .use(html)
            .processSync(matterResult.content)
        const contentHtml = processedContent.toString()
        return {
            id: matterResult.data.id,
            title: matterResult.data.title,
            content: contentHtml
        }
    } catch (e) {
        console.log(`e`,e)
        //方法1
        throw createError({
            statusCode: 404,
            statusMessage: '文章不存在',
        })

        //方法2
        // return  sendError(event,createError({
        //     statusCode: 404,
        //     statusMessage: 'Not Found',
        // }))
    }
})
