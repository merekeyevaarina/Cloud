import {cookies} from "next/headers";
import {getUserBySession} from "@/src/auth/service";
import {createPublicFileShare, disablePublicFileShare} from "@/src/files/share-service";

export async function POST (
    request:Request,
    {params}:{params:Promise<{fileId:string}>},
){
    try {
        const {fileId} = await params;

        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session")?.value
        if(!sessionId){
            return Response.json(
                { error: "Необходимо войти в аккаунт" },
                { status: 401 },
            );
        }

        const user = await getUserBySession(sessionId);
        if(!user){
            return Response.json(
                { error: "Сессия недействительна" },
                { status: 401 },
            );
        }

        const share = await createPublicFileShare(fileId, user.id);

        return Response.json(share, { status: 201 });
    }
    catch(error){
        if (error instanceof Error && error.message === "Файл не найден") {
            return Response.json(
                { error: "Файл не найден" },
                { status: 404 },
            );
        }

        console.error("Ошибка создания публичной ссылки:", error);

        return Response.json(
            { error: "Не удалось создать публичную ссылку" },
            { status: 500 },
        );
    }
}

export async function DELETE (
    request:Request,
    {params}:{params:Promise<{fileId:string}>}){
    try{

        const {fileId} = await params;

        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session")?.value;
        if(!sessionId){
            return Response.json(
                { error: "Необходимо войти в аккаунт" },
                { status: 401 },
            );
        }
        const user = await getUserBySession(sessionId);
        if(!user){
            return Response.json(
                { error: "Сессия недействительна" },
                { status: 401 },
            );
        }
        await disablePublicFileShare(fileId, user.id);

        return Response.json(
            { message: "Публичная ссылка отключена" },
            { status: 200 },
        );
    }
    catch(error){
        if(error instanceof Error && error.message === "Файл не найден"){
            return Response.json(
                { error: "Файл не найден" },
                { status: 404 },
            );
        }
        console.error("Ошибка отключения публичной ссылки:", error);
        return Response.json(
            { error: "Не удалось отключить публичную ссылку" },
            { status: 500 },
        );
    }
}