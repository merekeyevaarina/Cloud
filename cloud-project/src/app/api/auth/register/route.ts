import {registerUser} from "@/src/users/service";
import {ConflictError, ValidationError} from "@/src/shared/utils/errors";
import {cookies} from "next/headers";
import {registerSchema} from "@/src/users/validation";
import {PublicUser} from "@/src/users/types";

export async function POST (request: Request) {
    try {
        const body: unknown = await request.json();
        console.log(body);

        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return Response.json(
                {
                    error: validation.error.issues[0]?.message ?? "Некорректные данные",
                },
                {status: 400},
            )
        }

        const result = await registerUser(
            validation.data.firstName,
            validation.data.lastName,
            validation.data.email,
            validation.data.password,
        );

        const cookieStore = await cookies();
        cookieStore.set("session", result.sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path:"/",
            maxAge: 60 * 60 * 24 * 7,
        });

        const response: PublicUser =  {
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
        }

        return Response.json(
            response, {status: 201});
    }
    catch (error) {
        if (error instanceof ValidationError) {
            return Response.json(
                {error: error.message},
                {
                    status:400
                }

        )
    }
        if (error instanceof ConflictError) {
            return Response.json(
                {error: error.message},
                {
                    status:409
                }

            )
        }
        console.log(error);
        return Response.json(
            { error: "Внутренняя ошибка сервера" },
            { status: 500 }
        );


}
}