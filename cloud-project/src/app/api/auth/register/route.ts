import {registerUser} from "@/src/users/service";
import {ConflictError, ValidationError} from "@/src/shared/utils/errors";

export async function POST (request: Request) {
    try {
        const body = await request.json();
        console.log(body);

        const result = await registerUser(
            body.email,
            body.password,
        )
        return Response.json(result, {status: 201});
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
                {status:409}

            )
        }
        return Response.json(
            { error: "Внутренняя ошибка сервера" },
            { status: 500 }
        );


}
}