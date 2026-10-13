import type { Metadata } from "next";
import { DrivePageView } from "@/src/drive/ui/drive-page-view";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {getUserBySession} from "@/src/auth/service";
import {getUserFiles} from "@/src/files/service";
import { getUserFolders } from "@/src/folders/service";

export const metadata: Metadata = {
  title: "Мой диск — Cloud",
  description: "Ваши файлы и папки в Cloud.",
};

export default async function DrivePage() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session")?.value;
  if (!sessionId) {
    redirect("/login")
  }

  const user = await getUserBySession(sessionId)
  if (!user) {
    redirect("/login");
  }

  const files = await getUserFiles(user.id);
  const folders = await getUserFolders(user.id);

  return <DrivePageView files={files}
                        folders={folders.map((folder) => ({
    id: folder.id, name: folder.name, fileCount: "Папка", updatedAt:folder.updated_at.toLocaleDateString("ru-RU")

  }))} />;
}
