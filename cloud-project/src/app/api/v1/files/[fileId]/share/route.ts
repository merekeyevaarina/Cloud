import {createPublicFileShare, disablePublicFileShare} from "@/src/files/share-service";
import {requireAuth} from "@/src/auth/require-auth";

export async function POST (
    request:Request,
    {params}:{params:Promise<{fileId:string}>},
){
    try {
        const {fileId} = await params;

        const user = await requireAuth()
        if (user instanceof Response) {
            return user;
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

        const user = await requireAuth()
        if (user instanceof Response) {
            return user;
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