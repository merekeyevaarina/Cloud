import {downloadPublicFile} from "@/src/files/share-service";

type DownloadRouteProps = {
    params: Promise<{ token: string }>;
};

export async function GET(
    request: Request,
    { params }: DownloadRouteProps,
) {
    try {
        const { token } = await params;

        const file = await downloadPublicFile(token);


        return new Response(file.body.transformToWebStream(), {
            headers: {
                "Content-Type": file.mimeType || "application/octet-stream",
                "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(file.name)}`,
            },
        });
    } catch (error) {
        if (error instanceof Error && error.message === "Публичная ссылка недействительна или отключена") {
            return Response.json(
            {error: error.message},
                {status: 404},
            )
        }
        console.error("Ошибка скачивания публичного файла:", error);


        return Response.json(
            { error: "Не удалось скачать файл" },
            { status: 500 },
        );
    }
}