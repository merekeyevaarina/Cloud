import { notFound } from "next/navigation";
import {findPublicFileByToken} from "@/src/files/share-repository";

type PublicFilePageProps = {
    params: Promise<{ token: string }>;
};

export default async function PublicFilePage({
                                                 params,
                                             }: PublicFilePageProps) {
    const { token } = await params;

    const share = await findPublicFileByToken(token);

    if (!share) {
        notFound();
    }

    const file = share.file;

    const sizeInMb = (Number(file.size_bytes) / (1024 * 1024)).toFixed(2);

    return (
        <main className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl border p-8 text-center">
        <h1 className="mb-2 text-2xl font-semibold">
            Вам поделились файлом
    </h1>

    <p className="mb-2 break-words">{file.name}</p>

        <p className="mb-6 text-sm text-muted-foreground">
        {sizeInMb} МБ
    </p>

    <a
    href={`/api/v1/public-shares/${token}/download`}
    className="inline-flex rounded-md bg-primary px-5 py-2 text-primary-foreground"
        >
        Скачать файл
    </a>
    </div>
    </main>
);
}