import fs from 'fs';
import path from 'path';
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), 'content'); //作用是将多个路径拼接为一个路径

export default defineEventHandler(async (event) => {
    const fileNames = getRouterParam(event, 'id');
    //获取请求体参数
    // const body =await readBody(event);
    //获取查询参
    // const query = getQuery(event);
    //query.id
    //获取header
    // const header: any<string|undefined> = getHeader(event);
    // console.log(header)
    const fullPath = path.join(postsDirectory,`index${ fileNames + '.md'}`); //作用是将多个路径拼接为一个路径
    const fileContents = fs.readFileSync(fullPath, 'utf8'); //作用是读取文件内容
    const matterResult = matter(fileContents); //作用是将文件内容转换为对象
    const processedContent =await remark()
        .use(html)
        .processSync(matterResult.content)
    const contentHtml = processedContent.toString()
    return {
        id: matterResult.data.id,
        title: matterResult.data.title,
        content:contentHtml
    }
})
