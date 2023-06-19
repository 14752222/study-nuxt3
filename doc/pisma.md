Prisma 使用方法

###  安装
```shell
yarn add prisma -D
yarn add @prisma/client

```

### 初始化
```shell
npx prisma migrate dev --name init --schema server/database/schema.prisma 
```
npx: 用于执行node_modules/.bin下的命令
prisma: prisma命令
migrate: 迁移命令
dev: 开发环境
--name: 迁移名称
--schema: 数据库模型文件




再server/database/schema.prisma中添加
```prisma

datasource db {
 //选择postgresql
  provider = "postgresql"
  // 数据库连接地址  env("DATABASE_URL") 为环境变量
  url      = env("DATABASE_URL")
}

generator client {
  //选择js客户端
  provider = "prisma-client-js"
}

// 定义数据表
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  published Boolean  @default(false)
  title     String
  content   String?
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}
```


### 使用方法
```shell
```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  
  //创建用户
await prisma.user.create({
        data: {
            name: 'Alice',
            email: '1364952827@qq.com',
            posts: {
                create: { title: 'Hello World' },
            }
        }
});

await prisma.user.update({
        where: { 
          email: '1364952827@qq.com'
        },
        data: { 
          name: 'Bob'
        }
})

  
  //查询所有用户
  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  })
  console.dir(allUsers, { depth: null })
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    throw e
  })
   
  



```
