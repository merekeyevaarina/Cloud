'use client'

import {DriveFolder} from "@/src/drive/ui/drive-types";
import {useState} from "react";
import Link from "next/link";
import {Folder} from "lucide-react";

type FolderNavigationProps = {
    initialFolders: DriveFolder[];
}

export function FolderNavigation({initialFolders}: FolderNavigationProps) {
    console.log("FolderNavigation component rendered");
    const [folders, setFolders] = useState(initialFolders);
    console.log("initialFolders:", initialFolders);
    console.log("folders:", folders);
    return (
        <nav aria-label="Мои папки">
            <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Мои папки
            </h2>

            <div className="space-y-1">
                {folders.map((folder) => (
                    <Link
                        key={folder.id}
                        href={`/drive?folderId=${folder.id}`}
                        className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <Folder className="size-4 shrink-0" />
                        <span className="truncate">{folder.name}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );}