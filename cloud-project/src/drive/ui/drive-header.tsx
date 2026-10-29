import Link from "next/link";
import { HardDrive } from "lucide-react";

export function DriveHeader() {
  return (
    <header className="flex h-[72px] items-center border-b bg-card px-5 sm:px-8 lg:px-10">
      <Link href="/drive" className="flex items-center gap-2 text-base font-semibold tracking-wide lg:hidden">
        <HardDrive aria-hidden="true" className="size-5 text-primary" />
        cloud
      </Link>
      <p className="hidden text-sm text-muted-foreground lg:block">Файлы и папки</p>
    </header>
  );
}
