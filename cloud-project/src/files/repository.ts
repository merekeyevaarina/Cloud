import {prisma} from "@/src/shared/lib/prisma";

export async function findFilesByOwner(ownerId: string, folderId: string | null = null) {
    return prisma.files.findMany({
        where: {
            owner_id: ownerId,
            folder_id: folderId
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

export async function createFileRecord(data:{
    ownerId: string,
    folderId: string | null;
    name: string,
    storageKey: string,
    mimeType: string,
    sizeBytes: bigint,
}){
    return prisma.files.create({
        data:{
            owner_id: data.ownerId,
            folder_id: data.folderId,
            name: data.name,
            storage_key: data.storageKey,
            mime_type: data.mimeType,
            size_bytes: data.sizeBytes,
        },
        select:{
            id: true,
            name: true,
            mime_type: true,
            size_bytes: true,
            folder_id: true,
            created_at: true,
        }
    })
}