import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/src/shared/lib/s3";
import {findPublicFileByToken} from "@/src/files/share-repository";

type DownloadRouteProps = {
    params: Promise<{ token: string }>;
};

export async function GET(
    request: Request,
    { params }: DownloadRouteProps,
) {
    try {
        const { token } = await params;

        const share = await findPublicFileByToken(token);

        if (!share) {
            return Response.json(
                { error: "Ссылка недействительна или отключена" },
                { status: 404 },
            );
        }

        const file = share.file;

        const result = await s3.send(
            new GetObjectCommand({
                Bucket: process.env.S3_BUCKET,
                Key: file.storage_key,
            }),
        );

        if (!result.Body) {
            return Response.json(
                { error: "Не удалось получить файл из хранилища" },
                { status: 500 },
            );
        }

        return new Response(result.Body.transformToWebStream(), {
            headers: {
                "Content-Type": file.mime_type,
                "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(file.name)}`,
            },
        });
    } catch (error) {
        console.error("Ошибка скачивания публичного файла:", error);

        return Response.json(
            { error: "Не удалось скачать файл" },
            { status: 500 },
        );
    }
}