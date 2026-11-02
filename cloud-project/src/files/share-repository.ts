import {prisma} from "@/src/shared/lib/prisma";


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

