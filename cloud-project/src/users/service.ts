import argon2 from "argon2";
import {ConflictError, ValidationError} from "@/src/shared/utils/errors";
import {createUserSession} from "@/src/auth/service";
import {createUser, existsByEmail, findUserByEmail} from "@/src/users/repository";
import {RegisteredUser} from "@/src/users/types";


//регистрация

export async function registerUser(firstName:string,lastName:string,email: string, password: string): Promise<RegisteredUser> {
    if (!firstName || !firstName.trim()) {
        throw new ValidationError("Введите имя"); }
    if (!lastName || !lastName.trim()) {
        throw new ValidationError("Введите фамилию"); }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new ValidationError("Некорректный email");
    }
    if(!password || password.length < 8) {
        throw new ValidationError("Пароль должен содержать минимум 8 символов")
    }


    const existingUser = await existsByEmail(email);

    if (existingUser) {
        throw new ConflictError("email занят")
    }

    const passwordHash = await argon2.hash(password);

    const id = crypto.randomUUID()


    const user = await createUser({
        id,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email,
        password_hash: passwordHash,
    });

    const session = await createUserSession(user.id)

    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        sessionId: session.id,
    }

};


//вход
export async function loginUser(email: string, password: string) {
    if(!email || !email.includes("@")) {
    throw new ValidationError("Некорректный email");
    }
    if(!password) {
        throw new ValidationError("Введите пароль");
    }
    const user = await findUserByEmail(email);
    if (!user) {
        throw new ValidationError("Неверный email или пароль")
    }

    const isPasswordValid = await argon2.verify(
        user.password_hash,
        password
    )

    if(!isPasswordValid) {
        throw new ValidationError("Неверный email или пароль")
    }

    const session = await createUserSession(user.id)

    return {
        id: user.id,
        email: user.email,
        sessionId: session.id,
    }
}