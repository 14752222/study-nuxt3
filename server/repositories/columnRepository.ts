import type { Column } from '@prisma/client'
import client from "~/server/database/client";

export async function getColumns() {
    const columns = await client.column.findMany({
        orderBy: {
            id: 'desc'
        },
        take: 4
    });
    return columns;
}

export async  function  getColumnList({page,size}:Page): Promise<{columns: Column[], total: number}> {
    console.log((page - 1) * size,`page:${page},size:${size}`)

    const columns = await client.column.findMany({
        orderBy: {
            id: 'desc'
        },
        take: size,
        //分页
        skip: (page - 1) * size,
    });
    const total = await client.column.count();

    return {
        columns,
        total
    };
}

export async function getColumnById(id:String | Number):Promise<Column | null> {
    const column = await client.column.findFirst({
        where: {
            id: Number(id)
        }
    });
    return column;
}
