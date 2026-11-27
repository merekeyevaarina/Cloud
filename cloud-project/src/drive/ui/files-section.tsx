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
        setFiles((previousFiles) => [newFile, ...previousFiles]);
    }

    function handleDelete(fileId: string) {
        setFiles((previousFiles) =>
            previousFiles.filter((file) => file.id !== fileId)
        );
    }

    return (
        <section aria-labelledby="files-heading">
            <div className="mb-4 flex items-center justify-between">
                <UploadFileButton
                    folderId={folderId}
                    onUploadComplete={handleUploadComplete}
                />
            </div>

            <FileTable key={folderId ?? "root"} files={files} onDelete={handleDelete} />
        </section>
    );
}