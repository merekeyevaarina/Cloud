import {requireAuth} from "@/src/auth/require-auth";
import {deleteUserFile} from "@/src/files/service";

export async function DELETE (
    request:Request,
    {params}:{params:Promise<{fileId:string}>}) {

    try{
        const user = await requireAuth();
        if (user instanceof Response) {
            return user
        };

        const {fileId} = await params;

        await deleteUserFile(fileId,user.id)
        return new Response(null, {status: 204})

    }catch(error){
        if (error instanceof Error && error.message === "Файл не найден") {
            return Response.json(
                { error: error.message },
                { status: 404 },
            );
        }

        console.error("Ошибка удаления файла:", error);
        return Response.json(
            { error: "Не удалось удалить файл" },
            { status: 500 },
        );
    }
}