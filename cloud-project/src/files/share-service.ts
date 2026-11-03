import {randomBytes} from "node:crypto";
import {findFileByOwner} from "@/src/files/repository";
import {
    createFileShare,
    deleteFileShare,
    findFileShareByFileId,
    findPublicFileByToken
} from "@/src/files/share-repository";
import {downloadFileFromStorage} from "@/src/files/storage";

const PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function createPublicFileShare(fileId:string, ownerId:string){
    const file = await findFileByOwner(fileId, ownerId);
    if (!file) {
        throw new Error("Файл не найден");
    }

    const existingShare = await findFileShareByFileId(fileId)
    if (existingShare) {
        return {
            url:`${PUBLIC_URL}/s/${existingShare.token}`
        }
    }

    const token= randomBytes(16).toString("base64url");

    const share = await createFileShare(fileId, token);
    return {
        url:`${PUBLIC_URL}/s/${share.token}`,
    }
}

export async function disablePublicFileShare(fileId:string, ownerId:string){
    const file = await findFileByOwner(fileId, ownerId);
    if (!file) {
        throw new Error("Файл не найден");
    }
    await deleteFileShare(fileId);
}

export async function downloadPublicFile(token:string){
    const share = await findPublicFileByToken(token)
    if (!share) {
        throw new Error("Публичная ссылка недействительна или отключена")
    }
    const file = share.file
    const result = await downloadFileFromStorage(file.storage_key)
        if (!result.Body) {
            throw new Error("Содержимое файла не найдено");
        }
        return {
            name: file.name,
            mimeType: file.mime_type,
            body: result.Body
        }

}

export async function getPublicFileInfo(token:string){
    const share = await findPublicFileByToken(token)
    if (!share) {
        return null
    }
    return {
        name: share.file.name,
        sizeBytes: share.file.size_bytes
    }
}
