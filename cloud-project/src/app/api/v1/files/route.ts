import {cookies} from "next/headers";
import {getUserBySession} from "@/src/auth/service";
import {uploadUserFile} from "@/src/files/service";

export async function POST (request: Request) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session")?.value;
    if (!sessionId) {
        return Response.json(
            { error: "Необходима авторизация" },
            { status: 401 },
        );
    }
    const user = await getUserBySession(sessionId);

    if (!user) {
        return Response.json(
            { error: "Сессия недействительна" },
            { status: 401 },
        );
    }

    try{
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
            message === "Размер файла не должен превышать 50 МБ" ||
            message === "Нельзя загрузить пустой файл"
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