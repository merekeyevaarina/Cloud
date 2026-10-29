"use client";

import { Download } from "lucide-react";

import { Button } from "@/src/shared/ui/button";

type DownloadFileButtonProps = {
    fileId: string;
};

export function DownloadFileButton({ fileId }: DownloadFileButtonProps) {
    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            title="Скачать файл"
            onClick={() => {
                window.location.href = `/api/v1/files/${fileId}/download`;
            }}
        >
            <Download className="size-4" />
        </Button>
    );
}