import {prisma} from "@/src/shared/lib/prisma";

type CreateFileRecordInput = {
    ownerId: string;
    folderId: string | null;
    name: string;
    storageKey: string;
    mimeType: string;
    sizeBytes: bigint;
};

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

export async function createFileRecord(data: CreateFileRecordInput) {
    return prisma.files.create({
        data: {
            owner_id: data.ownerId,
            folder_id: data.folderId,
            name: data.name,
            storage_key: data.storageKey,
            mime_type: data.mimeType,
            size_bytes: data.sizeBytes,
        },
        select: {
            id: true,
            name: true,
            mime_type: true,
            size_bytes: true,
            folder_id: true,
            created_at: true,
        },
    });
}

export async function findFileByOwner(fileId: string, ownerId:string){
    return prisma.files.findFirst({
        where: {
            id: fileId,
            owner_id: ownerId,
        },
        select:{
            id: true,
        }
    })
}

export async function findFolderByOwner(
    folderId: string,
    ownerId: string,
) {
    return prisma.folders.findFirst({
        where: {
            id: folderId,
            owner_id: ownerId,
        },
        select: {
            id: true,
        },
    });
}