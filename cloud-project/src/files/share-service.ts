import {createFileShare, deleteFileShare, findFileByOwner, findFileShareByFileId} from "@/src/files/repository";
import {randomBytes} from "node:crypto";

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

