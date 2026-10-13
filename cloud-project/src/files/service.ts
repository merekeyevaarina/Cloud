import {findFilesByOwner} from "@/src/files/repository";

export async function getUserFiles(ownerId: string) {
    return findFilesByOwner(ownerId);
}
