import {FileArchive, FileIcon, FileImage, FileText} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/src/shared/ui/badge";
import { Card, CardContent } from "@/src/shared/ui/card";
import { Separator } from "@/src/shared/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/ui/table";
import type { DriveFile } from "./drive-data";
import { DeleteFileButton } from "./delete-file-button";
import { DownloadFileButton } from "./download-file-button";

type FileTableProps = {
  files: DriveFile[];
}

function getFileIcon(mimeType: string):LucideIcon{
  if(mimeType.startsWith("image/")) return FileImage;
  if( mimeType === "application/zip" ||
      mimeType === "application/x-7z-compressed" ||
      mimeType === "application/x-rar-compressed"){
    return FileArchive;
  }
  if( mimeType === "application/pdf" ||
      mimeType.startsWith("text/") ||
      mimeType.includes("word") ||
      mimeType.includes("spreadsheet")){
    return FileText;
  }
  return FileIcon;
}


function formatFileSize(bytes:bigint):string{
  const size = Number(bytes);

  if(size < 1024) return `${size} Б`;
  if(size < 1024 ** 2) return `${(size / 1024).toFixed()} КБ`;
  if(size < 1024 ** 3) return `${(size / 1024 ** 2).toFixed()} МБ`;
 
  return `${(size / 1024 ** 3).toFixed(1)} ГБ`;
}

function formatDate(date: Date):string {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle:"medium",
    timeStyle:"short",
  }).format(date);
}


export function FileTable({files}: FileTableProps) {

  if(files.length === 0) {
    return (
        <p className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Файлов пока нет.
        </p>
    )
  }

  return (
    <Card className="overflow-hidden rounded-2xl py-0 shadow-none">
      <div className="overflow-x-auto">
        <Table className="min-w-[680px] text-left">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-5 py-3.5 text-xs">Название</TableHead>
              <TableHead className="px-4 py-3.5 text-xs">Размер</TableHead>
              <TableHead className="px-4 py-3.5 text-xs">Дата загрузки</TableHead>
              <TableHead className="px-4 py-3.5 text-xs">Тип</TableHead>
              <TableHead className="px-4 py-3.5 text-xs">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => {
              const Icon = getFileIcon(file.mime_type);
              return (
                <TableRow key={file.id}>
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="muted" className="size-10 shrink-0 rounded-xl bg-secondary p-0 text-primary">
                        <Icon aria-hidden="true" className="size-5" />
                      </Badge>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{file.name}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{file.mime_type}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <DownloadFileButton fileId={file.id} />
                      <DeleteFileButton fileId={file.id} />
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm text-muted-foreground">{formatFileSize(file.size_bytes)}</TableCell>
                  <TableCell className="px-4 py-4 text-sm text-muted-foreground">{formatDate(file.created_at)}</TableCell>
                  <TableCell className="px-4 py-4">
                    <Badge variant="muted" className="bg-muted text-muted-foreground">{file.mime_type.split("/ ")[1] ?? "файл"}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Separator />
      <CardContent className="px-5 py-3 text-xs text-muted-foreground">
        {files.length} {files.length === 1 ? "файл" : "файлов"}
      </CardContent>
    </Card>
  );
}
