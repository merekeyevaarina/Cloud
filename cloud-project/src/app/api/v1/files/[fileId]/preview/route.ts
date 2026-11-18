import { requireAuth } from "@/src/auth/require-auth";
import { getUserFilePreviewUrl } from "@/src/files/service";

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

        const previewUrl = await getUserFilePreviewUrl(
            fileId,
            user.id,
        );

        return Response.json({ previewUrl });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "Файл не найден"
        ) {
            return Response.json(
                { error: error.message },
                { status: 404 },
            );
        }

        if (
            error instanceof Error &&
            error.message === "Предпросмотр доступен только для PNG"
        ) {
            return Response.json(
                { error: error.message },
                { status: 415 },
            );
        }

        console.error("Ошибка создания ссылки предпросмотра:", error);

        return Response.json(
            { error: "Не удалось открыть изображение" },
            { status: 500 },
        );
    }
}