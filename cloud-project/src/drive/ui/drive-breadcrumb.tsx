import Link from "next/link";

type DriveBreadcrumbProps = {
    folderId: string | null;
}

export function DriveBreadcrumb({ folderId }: DriveBreadcrumbProps) {
    if (!folderId) {
        return null;
    }
    return (
        <nav aria-label="Навигация по диску" className="mb-5">
            <Link
                href="/drive"
                className="text-sm font-medium text-primary hover:underline"
            >
                ← Мой диск
            </Link>
        </nav>
    )
}