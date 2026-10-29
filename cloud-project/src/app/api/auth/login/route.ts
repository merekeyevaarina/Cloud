import {ValidationError} from "@/src/shared/utils/errors";
import {loginUser} from "@/src/users/service";
import {cookies} from "next/headers";
import {loginSchema} from "@/src/users/validation";
import {LoginResponse} from "@/src/users/types";

export async function POST(request: Request) {
    try {
        const body:unknown = await request.json();

        const validation = loginSchema.safeParse(body);
        if(!validation.success){
            return Response.json(
                {error: validation.error.issues[0]?.message ?? "Некорректные данные"},
                {status: 400},
            )
        }
        const result = await loginUser(
            validation.data.email,
            validation.data.password,
        );

        const cookieStore = await cookies();
        cookieStore.set("session", result.sessionId, {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        })

        const response: LoginResponse = {
            id: result.id,
            email: result.email,
        };

        return Response.json(response, {status: 200,});

    } catch (error) {
        console.log(error);
        if (error instanceof ValidationError) {
            return Response.json(
                { error: error.message },
                { status: 401 }
            );
        }

        return Response.json(
            { error: "Внутренняя ошибка сервера" },
            { status: 500 }
        );
    }
}