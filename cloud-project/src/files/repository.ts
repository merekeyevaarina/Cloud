import {prisma} from "@/src/shared/lib/prisma";

export async function findFilesByOwner(ownerId: string) {
    return prisma.files.findMany({
        where: {
            owner_id: ownerId,
        },
        orderBy: {
            created_at: "desc",
        },
        select: {
            id: true,
            name: true,
            mime_type: true,
            size_bytes: true,
            created_at: true,
            folder_id: true,
        }
    })
}