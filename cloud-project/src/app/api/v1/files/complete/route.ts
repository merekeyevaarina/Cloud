import { requireAuth } from "@/src/auth/require-auth";
import { completeUserUpload } from "@/src/files/service";

export async function POST(request: Request) {
    try {
        const user = await requireAuth();

        if (user instanceof Response) {
            return user;
        }

        const body = await request.json();

        const { storageKey, name, folderId } = body;

        if (
            typeof storageKey !== "string" ||
            typeof name !== "string" ||
            (folderId !== null && typeof folderId !== "string")
        ) {
            return Response.json(
                { error: "Некорректные данные файла" },
                { status: 400 },
            );
        }

        const uploadedFile = await completeUserUpload(
            user.id,
            {
                storageKey,
                name,
                folderId,
            },
        );

        return Response.json(uploadedFile);

    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Не удалось завершить загрузку";

        if (
            message === "Некорректный ключ файла" ||
            message === "Имя файла не может быть пустым" ||
            message === "Загруженный файл пуст или не найден" ||
            message === "Размер файла не должен превышать 50МБ"
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

        console.error("Ошибка завершения загрузки:", error);

        return Response.json(
            { error: "Не удалось завершить загрузку" },
            { status: 500 },
        );
    }
}