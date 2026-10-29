import {cookies} from "next/headers";
import {getUserBySession} from "@/src/auth/service";
import {createUserFolder} from "@/src/folders/service";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session")?.value;
    if (!sessionId) {
        return Response.json(
            { error: "Не авторизован" },
            {status: 401},);
    };

    const user = await getUserBySession(sessionId);
    if (!user) {
        return Response.json(
            {error:"Сессия недействительна"},
            {status: 401},
        )
    };

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