'use client'

import { Folder } from "lucide-react";
import { Badge } from "@/src/shared/ui/badge";
import { Card, CardContent } from "@/src/shared/ui/card";
import type { DriveFolder } from "./drive-data";
import {useRouter, useSearchParams} from "next/navigation";

type FolderGridProps = {
  folders: DriveFolder[];
};

export function FolderGrid({ folders }: FolderGridProps) {
 const router = useRouter();
 const searchParams = useSearchParams();

 function openFolder(folderId:string){
     const params = new URLSearchParams(searchParams.toString());
     params.set("folderId", folderId);
     router.push(`/drive?${params.toString()}`);
 }

  if (folders.length === 0) {
    return <p className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">Папок пока нет.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {folders.map((folder) => (
        <Card
            key={folder.id}
            role="button"
            tabIndex={0}
            onClick={() => openFolder(folder.id)}
            className="flex-row items-center gap-3 rounded-2xl p-4 shadow-none transition-colors hover:bg-accent/40">
          <Badge variant="muted" className="size-11 shrink-0 rounded-xl bg-secondary p-0 text-primary">
            <Folder aria-hidden="true" className="size-5" />
          </Badge>
          <CardContent className="min-w-0 flex-1 p-0">
            <div className="truncate text-sm font-semibold">{folder.name}</div>
            <div className="mt-1 text-xs text-muted-foreground">{folder.fileCount} · {folder.updatedAt}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
