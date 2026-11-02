import {createFileRecord, findFilesByOwner, findFolderByOwner} from "@/src/files/repository";
import {randomUUID} from "node:crypto";
import {deleteFileFromStorage, uploadFileToStorage} from "@/src/files/storage";

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

