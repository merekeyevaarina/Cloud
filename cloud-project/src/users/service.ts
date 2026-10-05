import {findUserByEmail} from "@/src/users/repository";

export async function registerUser(email: string, password: string) {
    const existingUser = await findUserByEmail(email);
    console.log("регистрация пользователя:", email);

    return {
        email, password
    }
}