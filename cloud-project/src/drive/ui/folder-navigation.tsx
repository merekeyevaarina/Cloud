"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Folder } from "lucide-react";
import type { DriveFolder } from "@/src/drive/ui/drive-types";

type FolderNavigationProps = {
    initialFolders: DriveFolder[];
};

export function FolderNavigation({ initialFolders }: FolderNavigationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function openFolder(folderId: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("folderId", folderId);
        router.push(`/drive?${params.toString()}`);
    }

    if (initialFolders.length === 0) {
        return <p className="px-3 text-sm text-muted-foreground">Папок пока нет.</p>;
    }

    return (
        <nav aria-label="Мои папки">
            <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Мои папки
            </h2>

            <div className="space-y-1">
                {initialFolders.map((folder) => (
                    <button
                        key={folder.id}
                        onClick={() => openFolder(folder.id)}
                        className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <Folder className="size-4 shrink-0" />
                        <span className="truncate">{folder.name}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}