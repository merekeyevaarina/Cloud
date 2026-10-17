import {prisma} from "@/src/shared/lib/prisma";

export async function findFoldersByOwner(ownerId: string, parentId:string | null = null) {
    return prisma.folders.findMany({
        where: {
            owner_id: ownerId,
            parent_id: parentId,
        },
        orderBy:{
            created_at:"desc"
        },
        select:{
            id:true,
            name:true,
            parent_id:true,
            created_at:true,
            updated_at:true,
        }
    })
}

export async function createFolder(ownerId: string, name: string, parentId: string | null = null) {
    return prisma.folders.create({
        data: {owner_id: ownerId,
            name: name,
            parent_id: parentId },
    })
}