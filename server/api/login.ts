import {getUserByEmail} from "~/server/repositories/userRepository";




const login = defineEventHandler(async (e)=>{
    const {email} = await readBody(e);
    if (!email) {
        return sendError(e, createError( 'Email is required'));
    }

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return sendError(e, createError( {
                message: 'User not found',
                statusCode: 404
            }));
        }
        return user;
    }catch (e) {
        console.error(e);
        return sendError(e, createError( {
            message: 'Something went wrong',
            statusCode: 500
        }))
    }


})

export default login;
