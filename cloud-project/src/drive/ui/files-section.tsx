"use client";

import { useState } from "react";
import type { DriveFile } from "@/src/drive/ui/drive-types";
import { UploadFileButton } from "@/src/drive/ui/buttons/upload-file-button";
import { FileTable } from "@/src/drive/ui/file-table";

type FilesSectionProps = {
    initialFiles: DriveFile[];
    folderId: string | null;
};

export function FilesSection({ initialFiles, folderId }: FilesSectionProps) {
    const [files, setFiles] = useState(initialFiles);

    function handleUploadComplete(newFile: DriveFile) {
        setFiles((previousFiles) => [...previousFiles, newFile]);
    }

    return (
        <section aria-labelledby="files-heading">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 id="files-heading" className="text-base font-semibold">
                        Файлы
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Последние добавленные файлы
                    </p>
                </div>

                <UploadFileButton
                    folderId={folderId}
                    onUploadComplete={handleUploadComplete}
                />
            </div>

            <FileTable files={files} />
        </section>
    );
}