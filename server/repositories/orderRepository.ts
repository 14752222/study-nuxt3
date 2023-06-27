import type {Order} from '@prisma/client';

import prisma from '../database/client';

export const createOrder = async (order: Order) => {
    const data = await prisma.order.create({
        data: order
    })
    return data
}

export const getOrderById = async (id: number) => {
    const sqlMap = {
        where: {
            id
        },
        //include 用于关联查询
        include: {
            course: {
                select: {
                    title: true,
                    cover: true,
                    price: true,
                    desc: true,
                    id: true,
                }
            }
        }
    }
    const data = await prisma.order.findUnique(sqlMap)
    return data
}

export const updateOrder = async (id: number, order: Partial<Order>) => {
    const data = await prisma.order.update({
        where: {
            id
        },
        data: order
    })
    return data
}

export const getCoursesByUser = async (userId: number) => {
    const sqlMap = {
        where: {
            userId
        },
        include: {
            course: {
                select: {
                    title: true,
                    cover: true,
                    id: true,
                }
            }
        }
    }
    const data = await prisma.order.findMany(sqlMap)
    const courses = data.map(item => item.course)
    const uniqueCourses = courses
        .filter((course, index,arr) => {
            return arr.findIndex(item => item.id === course.id) === index
        })
    return uniqueCourses
}
