import {ValidationError} from "@/src/shared/utils/errors";
import {loginUser} from "@/src/users/service";
import {cookies} from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = await loginUser(
            body.email,
            body.password,
        );

        const cookieStore = await cookies();
        cookieStore.set("session", result.sessionId, {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        })

        return Response.json({
            id: result.id,
            email: result.email,
        }, {
            status: 200,
        });

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