import {
    createFileRecord,
    deleteFileRecord,
    findFileByOwner,
    findFilesByOwner,
    findFolderByOwner
} from "@/src/files/repository";
import {randomUUID} from "node:crypto";
import {
    createUploadUrl,
    deleteFileFromStorage,
    downloadFileFromStorage,
    uploadFileToStorage
} from "@/src/files/storage";
import {file} from "zod";

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
    if (!file.name.trim()) {
        throw new Error("Имя файла не может быть пустым");
    }
    if(folderId){
        const folder = await findFolderByOwner(folderId, ownerId);
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
    }catch (error) {
        try {
            await deleteFileFromStorage(storageKey);
        } catch (cleanupError) {
            console.error(
                "Не удалось удалить загруженный файл из Storage:",
                cleanupError,
            );
        }
        throw error;
    }
}


export async function deleteUserFile(
    fileId: string,
    ownerId: string,
){
    const file = await findFileByOwner(fileId, ownerId);
    if (!file) {
        throw new Error("Файл не найден");
    }

    await deleteFileFromStorage(file.storage_key);
    await deleteFileRecord(file.id);
}

export async function downloadUserFile(
    fileId: string,
    ownerId: string,
){
    const file = await findFileByOwner(fileId, ownerId);
    if (!file) {
        throw new Error("Файл не найден");
    }

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

type createUserUploadUrlProps = {
    name: string;
    size: number;
    mimeType: string;
    folderId: string | null;
}

export async function createUserUploadUrl(
    ownerId: string,
    input:createUserUploadUrlProps
){

    if(!Number.isInteger(input.size) || input.size <= 0){
        throw new Error("Некорректный размер файла");
    }
    if(input.size > 50){
        throw new Error("Размер файла не должен превышать 50МБ");
    }

    const name = input.name.trim();
    if(!name){
        throw new Error("Имя файла не может быть пустым");
    }
    if(input.folderId){
        const folder = await findFolderByOwner(input.folderId, ownerId);
    }
    if (!input.folderId) {
        throw new Error("Папка не найдена");
    }
    const storageKey = `${ownerId}.${randomUUID()}`
    const uploadUrl = await createUploadUrl(
        storageKey,
        input.mimeType || "application/octet-stream",
    )

    return {
        uploadUrl,
        storageKey,
        name,
        size:input.size,
        mimeType: input.mimeType || "application/octet-stream",
        folderId:input.folderId,
    }
}



