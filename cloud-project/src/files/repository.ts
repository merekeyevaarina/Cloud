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

export async function createFileShare(fileId:string, token:string){
    return prisma.file_shares.create({
        data:{
            file_id:fileId,
            token,
        },
        select:{
            id: true,
            token: true,
            created_at: true,
        }
    })
}

export async function deleteFileShare(fileId:string){
    return prisma.file_shares.deleteMany({
        where: {
            file_id:fileId
        }
    })
}

export async function findFileShareByFileId(fileId:string){
    return prisma.file_shares.findUnique({
        where:{
            file_id:fileId,
        },
        select:{
            token:true
        }
    })
}

export async function findPublicFileByToken(token:string){
    return prisma.file_shares.findUnique({
        where:{token},
        select:{
            file:{
                select:{
                    id: true,
                    name: true,
                    mime_type: true,
                    size_bytes: true,
                    storage_key: true,
                }
            }
        }
    })
}

