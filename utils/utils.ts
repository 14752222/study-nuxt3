import {User} from "@prisma/client";

export function hidePassword(user: User) {
    const {password, ...rest} = user;
    return rest;
}
