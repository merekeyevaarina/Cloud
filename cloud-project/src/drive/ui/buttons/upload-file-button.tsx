'use client'

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/shared/ui/button";
import { Upload } from "lucide-react";
import type {DriveFile} from "@/src/drive/ui/drive-types";

type UploadFileButtonProps = {
    folderId: string | null;
    onUploadComplete: (file: DriveFile) => void;
};

export function UploadFileButton({ folderId,onUploadComplete }: UploadFileButtonProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    async function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) return;

        setError("");
        setUploading(true);

        try {
            const start = performance.now();
            console.log("Начало загрузки");

            const urlResponse = await fetch("/api/v1/files/upload-url", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: file.name,
                    size: file.size,
                    mimeType: file.type || "application/octet-stream",
                    folderId,
                }),
            });
            console.log("Получение upload URL:", performance.now() - start);


            const urlData = await urlResponse.json();

            if (!urlResponse.ok) {
                throw new Error(
                    urlData.error || "Не удалось получить ссылку загрузки"
                );
            }

            const storageResponse = await fetch(urlData.uploadUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": urlData.mimeType,
                },
                body: file,
            });

            if (!storageResponse.ok) {
                throw new Error("Не удалось загрузить файл в Storage");
            }
            console.log("Загрузка в Storage:", performance.now() - start);

            const completeResponse = await fetch(
                "/api/v1/files/complete",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        storageKey: urlData.storageKey,
                        name: urlData.name,
                        folderId: urlData.folderId,
                    }),
                }
            );

            const completeData = await completeResponse.json();

            if (!completeResponse.ok) {
                throw new Error(
                    completeData.error || "Не удалось завершить загрузку"
                );
            }
            const newFile:DriveFile = {
                ...completeData,
                size_bytes: BigInt(completeData.size_bytes),
                createdAt: new Date(completeData.created_at),
            }

            onUploadComplete(newFile);
            console.log("Завершение загрузки:", performance.now() - start);
            console.log("До router.refresh:", performance.now() - start);


            router.refresh();

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Не удалось загрузить файл"
            );
        } finally {
            setUploading(false);

            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }

    return (
        <div>
            <input
                ref={inputRef}
                onChange={handleFileChange}
                type="file"
                className="hidden"
                disabled={uploading}
            />

            <Button
                type="button"
                variant="outline"
                className="h-10 rounded-xl px-4"
                disabled={uploading}
                onClick={() => inputRef.current?.click()}
            >
                <Upload aria-hidden="true" />
                {uploading ? "Загрузка..." : "Загрузить"}
            </Button>

            {error && (
                <p role="alert" className="mt-2 text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
}
