import { z } from "zod"

export const registerSchema = z.object({
    firstName: z.string().trim().min(1, "Введите имя"),
    lastName: z.string().trim().min(1,"Введите фамилию"),
    email:z.string().trim().email("Некорректный email"),
    password: z
        .string()
        .min(8, "Пароль должен содержать минимум 8 символов")
        .regex(
            /[A-Za-z]/,
            "Пароль должен содержать латинскую букву"
        )
        .regex(
            /[0-9]/,
            "Пароль должен содержать цифру"
        )
})
export type RegisterInput = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email: z.string().trim().email("Некорректный email"),
    password: z.string().min(1, "Введите пароль")
})
export type LoginInput = z.infer<typeof loginSchema>