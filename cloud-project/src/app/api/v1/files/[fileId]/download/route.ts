import {requireAuth} from "@/src/auth/require-auth";
import {downloadUserFile} from "@/src/files/service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ fileId: string }> },
) {
  try {
    const user = await requireAuth();
    if (user instanceof Response) {
      return user
    };

    const { fileId } = await params;


    const file = await downloadUserFile(fileId, user.id);

    const body = await file.body.transformToWebStream();

    const filename = encodeURIComponent(file.name);

    return new Response(body, {
      headers: {
        "Content-Type": file.mimeType || "application/octet-stream",
        "Content-Disposition": `attachment; filename*=UTF-8''${filename}`,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Файл не найден") {
      return Response.json(
          { error: error.message },
          { status: 404 },
      );
    }

    if (error instanceof Error && error.message === "Содержимое файла не найдено") {
      return Response.json(
          { error: error.message },
          { status: 404 },
      );
    }

    console.error("Ошибка скачивания файла:", error);

    return Response.json(
        { error: "Не удалось скачать файл" },
        { status: 500 },
    );
  }
}
