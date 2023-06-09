import fs from 'fs';
import path from 'path';
import matter from "gray-matter";

interface Post {
    id: string;
    title: string;
    date: Date;
}

const postsDirectory = path.join(process.cwd(), 'content'); //作用是将多个路径拼接为一个路径

export default defineEventHandler((event) => {
    const query = getQuery(event);
    const page = Number(query.page) || 1;
    const size = Number(query.size) || 2;


    const fileNames = fs.readdirSync(postsDirectory); //作用是读取文件夹下的所有文件名
    const posts = fileNames.map((fileName: any) => {
        //文件名
        const fullPath = path.join(postsDirectory, fileName); //作用是将多个路径拼接为一个路径
        const fileContents = fs.readFileSync(fullPath, 'utf8'); //作用是读取文件内容
        const matterResult = matter(fileContents); //作用是将文件内容转换为对象
        const fileInfo = fs.statSync(fullPath); //作用是返回一个对象，该对象包含了文件的信息。
        return {
            id: matterResult.data.id,
            title: matterResult.data.title,
            date: fileInfo.ctime,
        };
    })

    const start = (page - 1) * size;
    const end = page * size;

    return posts
        .sort((a:Post, b:Post) => a.id > b.id ? 1 : -1)
        .slice(start, end);
})
