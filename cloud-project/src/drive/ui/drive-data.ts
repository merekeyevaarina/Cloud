import {getUserStorageUsage} from "@/src/files/repository";
import {requireAuth} from "@/src/auth/require-auth";
import {redirect} from "next/navigation";
import {DriveFolder, DriveFile} from "@/src/drive/ui/drive-types";


export function formatStorageSize(bytes: bigint) {
  const size = Number(bytes);

  if (size < 1024) return `${size} Б`;
  if (size < 1024 ** 2) return `${(size / 1024).toFixed(2)} КБ`;
  if (size < 1024 ** 3) return `${(size / (1024 ** 2)).toFixed(2)} МБ`;

  return `${(size / (1024 ** 3)).toFixed(2)} ГБ`;
}

export async function storageSize() {
  const user = await requireAuth();

  if (user instanceof Response) {
    redirect("/login");
  }

  const totalBytes = await getUserStorageUsage(user.id);

  const totalGB = formatStorageSize(totalBytes);
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

