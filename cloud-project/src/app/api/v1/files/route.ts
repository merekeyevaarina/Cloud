import {getUserFiles, uploadUserFile} from "@/src/files/service";
import {requireAuth} from "@/src/auth/require-auth";

export async function POST (request: Request) {

    try{
        const user = await requireAuth();
        if (user instanceof Response) {
            return user;
        }


        const formData = await request.formData();
        const file = formData.get("file");
        const folderIdValue = formData.get("folderId");
        if (!(file instanceof File)) {
            return Response.json(
                {error: "Файл не передан"},
                { status: 400 },
            )
        }
        if(
            folderIdValue !== null &&
            typeof folderIdValue !== "string"
        ){
            return Response.json(
                {error: "Некорректный идентификатор папки"},
                {status: 400 },
            )
        }

        const folderId =
            typeof folderIdValue === "string" && folderIdValue
                ? folderIdValue
                : null;
        const uploadedFile = await uploadUserFile(
            user.id,
            file,
            folderId
        )

        return Response.json(
            {
                ...uploadedFile,
                size_bytes: uploadedFile.size_bytes.toString(),
            },
            { status: 201 },
        );    }catch (error){
        const message =
            error instanceof Error
        ? error.message
                : "Не удалось загрузить файл";
        if (
            message === "Размер файла не должен превышать 50МБ" ||
            message === "Нельзя загрузить пустой файл" ||
            message === "Имя файла не может быть пустым"
        ) {
            return Response.json({ error: message }, { status: 400 });
        }

        if (message === "Папка не найдена") {
            return Response.json({ error: message }, { status: 404 });
        }

        console.error("Ошибка загрузки файла:", error);
        return Response.json(
            { error: "Не удалось загрузить файл" },
            { status: 500 },
        );
    }
}

export async function GET (request: Request) {
    try{
        const user = await requireAuth();
        if (user instanceof Response) {
            return user;
        }


        const {searchParams} = new URL(request.url);
        const folderId = searchParams.get("folderId");

        const files = await getUserFiles(user.id, folderId);

        const serializedFiles = files.map((file) => ({
            ...file,
            size_bytes: file.size_bytes.toString(),
        }));
        return Response.json(serializedFiles);

    }catch(error){
        console.error("Ошибка получения файлов:", error);
    }



}