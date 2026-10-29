import {createFileRecord, findFilesByOwner} from "@/src/files/repository";
import {prisma} from "@/src/shared/lib/prisma";
import {randomUUID} from "node:crypto";
import {uploadFileToStorage} from "@/src/files/storage";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 МБ
export async function getUserFiles(
    ownerId: string,
    folderId: string | null = null) {
    return findFilesByOwner(ownerId, folderId);
}

export async function uploadUserFile(
    ownerId: string,
    file: File,
    folderId: string | null = null,
){
    if(file.size === 0){
        throw new Error("Нельзя загрузить пустой файл")
    }
    if(file.size > MAX_FILE_SIZE){
        throw new Error("Размер файла не должен превышать 50МБ")
    }
    if(folderId){
        const folder = await prisma.folders.findFirst({
            where: {
                id: folderId,
                owner_id: ownerId,
            },
            select:{id:true}
        })
        if(!folder){
            throw new Error("Папка не найдена")
        }
    }
    const storageKey = `${ownerId}.${randomUUID()}`;
    await uploadFileToStorage(storageKey, file);

    try{
        return await createFileRecord({
            ownerId,
            folderId,
            name: file.name.trim(),
            storageKey,
            mimeType: file.type || "application/octet-stream",
            sizeBytes: BigInt(file.size),
        })
    }catch(error){
        const {DeleteObjectCommand} = await import("@aws-sdk/client-s3");
        const { s3 } = await import("@/src/shared/lib/s3");
        await s3.send(
            new DeleteObjectCommand({
                Bucket: process.env.S3_BUCKET,
                Key: storageKey,
            })
        ).catch(() => {});
        throw error;
    }
}

