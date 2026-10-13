import { Plus, Upload } from "lucide-react";
import { Button } from "@/src/shared/ui/button";
import { Separator } from "@/src/shared/ui/separator";
import type { DriveFile, DriveFolder } from "./drive-data";
import { DriveHeader } from "./drive-header";
import { DriveSidebar } from "./drive-sidebar";
import { FileTable } from "./file-table";
import { FolderGrid } from "./folder-grid";

type DrivePageViewProps = {
  folders: DriveFolder[];
  files: DriveFile[];
};

export function DrivePageView({ folders, files }: DrivePageViewProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <DriveSidebar />
        <section className="min-w-0 flex-1">
          <DriveHeader />
          <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-3xl font-semibold tracking-[-0.04em]">Мой диск</h1>
                <p className="mt-2 text-sm text-muted-foreground">Ваши файлы и папки в одном месте</p>
              </div>
              <div className="flex gap-2">
                <Button disabled title="Загрузка станет доступна после подключения хранилища" variant="outline" className="h-10 rounded-xl px-4">
                  <Upload aria-hidden="true" />Загрузить
                </Button>
                <Button disabled title="Создание папок станет доступно после подключения хранилища" className="h-10 rounded-xl px-4">
                  <Plus aria-hidden="true" />Новая папка
                </Button>
              </div>
            </div>

            <section aria-labelledby="folders-heading" className="mb-9">
              <h2 id="folders-heading" className="mb-4 text-base font-semibold">Папки</h2>
              <FolderGrid folders={folders} />
            </section>

            <section aria-labelledby="files-heading">
              <div className="mb-4">
                <h2 id="files-heading" className="text-base font-semibold">Файлы</h2>
                <p className="mt-1 text-xs text-muted-foreground">Последние добавленные файлы</p>
              </div>
              <FileTable files={files} />
            </section>

            <Separator className="mt-8" />
            <footer className="flex items-center justify-between gap-4 pt-4 text-xs text-muted-foreground">
              <span>Демонстрационные данные интерфейса</span>
              <span className="hidden sm:block">© 2026 Cloud</span>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
