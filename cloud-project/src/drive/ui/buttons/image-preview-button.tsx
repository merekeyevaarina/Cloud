import { Button } from "@/src/shared/ui/button";
import { X } from "lucide-react";
import {useState} from "react";

type ImagePreviewButtonProps = {
    fileId: string;
    fileName: string;
}

export function ImagePreviewButton({fileId,fileName}: ImagePreviewButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const imageUrl = `/api/v1/files/${fileId}/preview`;
    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="truncate text-left font-medium transition-colors hover:text-primary hover:underline"
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
                        <img
                            src={imageUrl}
                            alt={fileName}
                            className="max-h-[75vh] max-w-full rounded-md object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
}