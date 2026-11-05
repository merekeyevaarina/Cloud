import {getUserStorageUsage} from "@/src/files/repository";
import {requireAuth} from "@/src/auth/require-auth";
import {redirect} from "next/navigation";

export type DriveFolder = {
  id: string;
  name: string;
  fileCount: string;
  updatedAt: string;
};

export type DriveFile = {
  id: string;
  name: string;
  mime_type: string;
  size_bytes: bigint;
  created_at: Date;
  folder_id: string | null;
};


export async function storageSize() {
  const user = await requireAuth();

  if (user instanceof Response) {
    redirect("/login");
  }

  const totalBytes = await getUserStorageUsage(user.id);

  const totalGB = `${(Number(totalBytes) / (1024 ** 3)).toFixed(2)} ГБ`;

  const totalBytesLimit = 15 * 1024 ** 3;
  const total = `${(totalBytesLimit / (1024 ** 3)).toFixed(0)} ГБ`;

  const percent = Math.min(
      100,
      Math.round((Number(totalBytes) / totalBytesLimit) * 100),
  );

  return {
    used: totalGB,
    total,
    percent,
  };
}

