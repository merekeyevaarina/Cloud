import {findUserByEmail, createUser} from "@/src/users/repository";
import argon2 from "argon2";
import {ConflictError, ValidationError} from "@/src/shared/utils/errors";

//регистрация
export async function registerUser(email: string, password: string) {
   // TODO проверка валидации доделать
    if (!email || !email.includes("@")) {
        throw new ValidationError("Некорректный email");
    }
    if(!password || password.length < 8) {
        throw new ValidationError("Пароль должен содержать минимум 8 символов")
    }


    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new ConflictError("email занят")
    }

    const passwordHash = await argon2.hash(password);

    const id = crypto.randomUUID()


    const user = await createUser(
        id,
        email,
        passwordHash,
    )

    return {
        id: user.id,
        email: user.email,
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

    return {
        id: user.id,
        email: user.email,
    }
}