import { requireAuth } from "@/src/auth/require-auth";
import {createUserUploadUrl} from "@/src/files/service";

export async function POST(request: Request) {
    try {
        const user = await requireAuth();

        if (user instanceof Response) {
            return user;
        }

        const body = await request.json();

        const { name, size, mimeType, folderId } = body;

        if (
            typeof name !== "string" ||
            typeof size !== "number" ||
            typeof mimeType !== "string" ||
            (folderId !== null && typeof folderId !== "string")
        ) {
            return Response.json(
                { error: "Некорректные данные файла" },
                { status: 400 },
            );
        }

        const result = await createUserUploadUrl(
            user.id,
            {
                name,
                size,
                mimeType,
                folderId,
            },
        );

        return Response.json(result);
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Не удалось создать ссылку для загрузки";

        if (
            message === "Некорректный размер файла" ||
            message === "Размер файла не должен превышать 50МБ" ||
            message === "Нельзя загрузить пустой файл" ||
            message === "Имя файла не может быть пустым"
        ) {
            return Response.json(
                { error: message },
                { status: 400 },
            );
        }

        if (message === "Папка не найдена") {
            return Response.json(
                { error: message },
                { status: 404 },
            );
        }

        console.error("Ошибка создания ссылки загрузки:", error);

        return Response.json(
            { error: "Не удалось создать ссылку для загрузки" },
            { status: 500 },
        );
    }
}