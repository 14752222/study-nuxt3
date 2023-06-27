import type {User} from '@prisma/client';
import client from "~/server/database/client";
import type {IUser} from "~/types/IUser";

export async function getUserByEmail(email: string): Promise<User | null> {
     const user = await client.user.findUnique({
          where: {
                email
          }
     });
     return user;
}

export async function createUser(data: IUser): Promise<User> {
    const user = await client.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: data.password
        }
    });
    return user;
}

export async function getUserByUsername(username: string): Promise<User | null> {
   try {

    const user = await client.user.findUnique({
        where: {
            username
        }
    });
    return user;
   }
    catch(err) {
        console.log(err);
        return null;
    }
}

export async function updateUser(id: number, data:Partial<User>): Promise<User> {
    const user = await client.user.update({
        where: {
            id
        },
        data
    });
    return user;
}
