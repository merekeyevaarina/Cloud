'use client'

import type {DriveFolder} from "@/src/drive/ui/drive-types";

type FolderSidebarProps = {
    folders: DriveFolder[];
}

export const FolderSidebar = ({folders}: FolderSidebarProps) => {
    return (
        <nav aria-label="Папки">
            {folders.map((folder) => (
                <div key={folder.id}>
                    {folder.name}
                </div>
            ))}
        </nav>
    )
}