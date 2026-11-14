
import Link from "next/link";
import { HardDrive } from "lucide-react";
import { Badge } from "@/src/shared/ui/badge";
import { Button } from "@/src/shared/ui/button";
import { Progress } from "@/src/shared/ui/progress";
import { storageSize } from "@/src/drive/ui/drive-data";

export async function DriveSidebar() {
    const storageUsage = await storageSize();

    return (
        <aside className="flex w-full shrink-0 items-center justify-between border-b bg-card px-4 py-3 lg:w-64 lg:flex-col lg:items-stretch lg:border-b-0 lg:border-r lg:px-5 lg:py-7">

            <Link
                href="/drive"
                className="hidden items-center gap-3 px-2 text-lg font-semibold tracking-wide lg:mb-10 lg:flex"
            >
                <Badge variant="muted" className="size-9 rounded-xl bg-primary p-0 text-primary-foreground">
                    <HardDrive className="size-5" />
                </Badge>
                cloud
            </Link>

            <nav aria-label="Основная навигация" className="flex-1 lg:flex-none">
                <Button
                    asChild
                    variant="secondary"
                    className="h-10 w-full justify-start rounded-xl px-3 font-medium"
                >
                    <Link href="/drive">
                        <HardDrive />
                        Мой диск
                    </Link>
                </Button>
            </nav>

            <section
                aria-label="Использование хранилища"
                className="mt-auto hidden lg:block"
            >
                <div className="mb-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>Хранилище</span>
                    <span>
            {storageUsage.used} из {storageUsage.total}
          </span>
                </div>

                <Progress value={storageUsage.percent} className="h-1.5" />

                <p className="mt-2 text-xs text-muted-foreground">
                    Использовано {storageUsage.percent}%
                </p>
            </section>
        </aside>
    );
}
