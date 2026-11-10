
import { requireAuth } from "@/src/auth/require-auth";
import { downloadUserFile } from "@/src/files/service";

const ALLOWED_IMAGE_TYPES = [
    "image/png"
];

export async function GET(
    request: Request,
    { params }: { params: Promise<{ fileId: string }> },
) {
    try {
        const user = await requireAuth();

        if (user instanceof Response) {
            return user;
        }

        const { fileId } = await params;
        const file = await downloadUserFile(fileId, user.id);

        if (!ALLOWED_IMAGE_TYPES.includes(file.mimeType)) {
            return Response.json(
                { error: "Предпросмотр этого формата не поддерживается" },
                { status: 415 },
            );
        }

        const body = await file.body.transformToWebStream();

        return new Response(body, {
            headers: {
                "Content-Type": file.mimeType,
                "Content-Disposition": "inline",
                "Cache-Control": "private, no-store",
                "X-Content-Type-Options": "nosniff",
            },
        });
    } catch (error) {
        if (error instanceof Error && error.message === "Файл не найден") {
            return Response.json({ error: error.message }, { status: 404 });
        }

        if (
            error instanceof Error &&
            error.message === "Содержимое файла не найдено"
        ) {
            return Response.json({ error: error.message }, { status: 404 });
        }

        console.error("Ошибка предпросмотра файла:", error);

        return Response.json(
            { error: "Не удалось открыть изображение" },
            { status: 500 },
        );
    }
}
