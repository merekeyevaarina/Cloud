import Link from "next/link";
import { HardDrive } from "lucide-react";
import { Badge } from "@/src/shared/ui/badge";
import { Button } from "@/src/shared/ui/button";
import { Progress } from "@/src/shared/ui/progress";
import { storageUsage } from "./drive-data";

export function DriveSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r bg-card px-5 py-7 lg:flex">
      <Link href="/drive" className="mb-10 flex items-center gap-3 px-2 text-lg font-semibold tracking-wide">
        <Badge variant="muted" className="size-9 rounded-xl bg-primary p-0 text-primary-foreground">
          <HardDrive className="size-5" />
        </Badge>
        cloud
      </Link>

      <nav aria-label="Основная навигация">
        <Button asChild variant="secondary" className="h-10 w-full justify-start rounded-xl px-3 font-medium">
          <Link href="/drive"><HardDrive />Мой диск</Link>
        </Button>
      </nav>

      <section aria-label="Использование хранилища" className="mt-auto">
        <div className="mb-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>Хранилище</span>
          <span>{storageUsage.used} из {storageUsage.total}</span>
        </div>
        <Progress value={storageUsage.percent} className="h-1.5" />
        <p className="mt-2 text-xs text-muted-foreground">Использовано {storageUsage.percent}%</p>
      </section>
    </aside>
  );
}
