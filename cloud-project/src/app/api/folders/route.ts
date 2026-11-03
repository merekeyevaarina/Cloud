import {createUserFolder} from "@/src/folders/service";
import {requireAuth} from "@/src/auth/require-auth";

export async function POST(request: Request) {
    const user = await requireAuth();

    if (user instanceof Response) {
        return user;
    }


    let body: {name?:string, parentId?:unknown};
    try{
        body = await request.json();
    } catch {
        return Response.json(
            {error: "Некорректный JSON"},
            {status: 400},
        )
    };

    if(typeof body.name !== "string" ||
        (body.parentId !== undefined &&
        body.parentId !== null &&
        typeof body.parentId !== "string")
    ) {
        return Response.json(
            {error: "Некорректные данные папки" },
            {status: 400},
        )
    }

    try{
        const folder = await createUserFolder(
            user.id,
            body.name,
            body.parentId ?? null
        );
        return Response.json(folder, {status: 201});
    } catch (error){
        const message = error instanceof Error
            ? error.message
            : "Не удалось создать папку";
        return Response.json(
            {error: message},
            {status: 400},
        )
    }

}