import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // await prisma.user.create({
    //     data: {
    //         name: 'Alice',
    //         email: '1364952827@qq.com',
    //         posts: {
    //             create: { title: 'Hello World' },
    //         }
    //     }
    // })

    await prisma.user.update({
        where: {
            email: '1364952827@qq.com'
        },
        data: {
            name: 'Bob'
        }
    })

    const allUsers = await prisma.user.findMany({
        // include 这个参数可以让我们在查询用户的同时，把用户的所有帖子也查询出来
        include: { posts: true },
    })
    console.log(allUsers)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })
