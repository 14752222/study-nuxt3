import type { Course } from '@prisma/client'
import prisma from '~/server/database/client'

export async function getCourses() {
    const courses = await prisma.course.findMany({
        orderBy: {
            id: 'desc'
        },
        take: 4
    });
    return courses;
}

export async  function  getCourseList({page,size}:Page): Promise<{courses: Course[], total: number}> {
    const courses = await prisma.course.findMany({
        orderBy: {
            id: 'desc'
        },
        skip: (page - 1) * size,
        take: size
    });
    const total = await prisma.course.count();

    return {
        courses,
        total
    };
}

export async function getCourseById(id:String | Number):Promise<Course | null> {
    const course = await prisma.course.findFirst({
        where: {
            id: Number(id)
        },
        include: {Catalogue: true}
    });
    return course;
}
