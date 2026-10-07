import {
    ValidationError,
} from "@/src/shared/utils/errors";
import {loginUser} from "@/src/users/service";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = await loginUser(

            body.email,
            body.password,
        );

        return Response.json(result, {
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