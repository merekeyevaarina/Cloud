
"use client"

import { Button } from "@/src/shared/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

type ImagePreviewButtonProps = {
    fileId: string;
    fileName: string;
};

export function ImagePreviewButton({
                                       fileId,
                                       fileName,
                                   }: ImagePreviewButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function openPreview() {
        setIsOpen(true);
        setImageUrl(null);
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(
                `/api/v1/files/${fileId}/preview-url`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Не удалось открыть изображение");
            }

            setImageUrl(data.previewUrl);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Не удалось открыть изображение"
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={openPreview}
                className="min-w-0 max-w-[150px] truncate text-left font-medium transition-colors hover:text-primary hover:underline"
            >
                {fileName}
            </button>

            {isOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Предпросмотр: ${fileName}`}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            setIsOpen(false);
                        }
                    }}
                >
                    <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col items-center rounded-lg bg-background p-4 shadow-xl">
                        <div className="mb-4 flex w-full items-center justify-between gap-4">
                            <p className="truncate text-sm font-medium">
                                {fileName}
                            </p>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="shrink-0"
                                aria-label="Закрыть предпросмотр"
                            >
                                <X className="size-5" />
                            </Button>
                        </div>

                        {isLoading && <p>Загрузка изображения...</p>}

                        {error && (
                            <p className="text-sm text-destructive">
                                {error}
                            </p>
                        )}

                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt={fileName}
                                className="max-h-[75vh] max-w-full rounded-md object-contain"
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
