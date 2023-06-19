import type { User } from '@prisma/client';
import client from "~/server/database/client";
import type {IUser} from "~/types/IUser";

export async function getUserByEmail(email: string): Promise<IUser | null> {
    const user = await client.user.findUnique({
        where: {
            email
        }
    });
    if (!user) return null;
    return {
        id: user.id,
        name: user.name as string,
        email: user.email
    };
}

export async function createUser(name: string, email: string): Promise<IUser> {
    const user = await client.user.create({
        data: {
            name,
            email
        }
    });
    return {
        id: user.id,
        name: user.name as string,
        email: user.email
    };
}
