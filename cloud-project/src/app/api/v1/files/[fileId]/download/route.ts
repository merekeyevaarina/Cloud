
import { cookies } from "next/headers";
import { GetObjectCommand } from "@aws-sdk/client-s3";

import { getUserBySession } from "@/src/auth/service";
import { prisma } from "@/src/shared/lib/prisma";
import { s3 } from "@/src/shared/lib/s3";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ fileId: string }> },
) {
  try {
    const { fileId } = await params;

    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session")?.value;

    if (!sessionId) {
      return Response.json(
        { error: "Необходимо войти в аккаунт" },
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

    const file = await prisma.files.findFirst({
      where: {
        id: fileId,
        owner_id: user.id,
      },
      select: {
        name: true,
        storage_key: true,
        mime_type: true,
      },
    });

    if (!file) {
      return Response.json(
        { error: "Файл не найден" },
        { status: 404 },
      );
    }

    const result = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: file.storage_key,
      }),
    );

    if (!result.Body) {
      return Response.json(
        { error: "Содержимое файла не найдено" },
        { status: 404 },
      );
    }

    const body = await result.Body.transformToWebStream();

    const filename = encodeURIComponent(file.name);

    return new Response(body, {
      headers: {
        "Content-Type": file.mime_type || "application/octet-stream",
        "Content-Disposition": `attachment; filename*=UTF-8''${filename}`,
      },
    });
  } catch (error) {
    console.error("Ошибка скачивания файла:", error);

    return Response.json(
      { error: "Не удалось скачать файл" },
      { status: 500 },
    );
  }
}
