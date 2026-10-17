import {createFolder, findFoldersByOwner} from "@/src/folders/repository";
import {prisma} from "@/src/shared/lib/prisma";

export async function getUserFolders(ownerId: string, parentId: string | null = null) {
    return findFoldersByOwner(ownerId, parentId);
}
export async function createUserFolder(ownerId: string, name: string, parentId: string | null = null) {
    const trimmedName = name.trim();
    if (!trimmedName) {
        throw new Error("Название папки не может быть пустым");
    }
    if(trimmedName.length > 255){
        throw new Error("Название папки не должно превышать 255 символов");

    }
    if(parentId){
        const parentFolder = await prisma.folders.findFirst({
            where: {
                id: parentId,
                owner_id: ownerId
            },
            select: {
                id:true
            }
        })
        if(!parentFolder){
            throw new Error("Родительская папка не найдена");

        }
    }
    return createFolder(ownerId, trimmedName, parentId);
}
