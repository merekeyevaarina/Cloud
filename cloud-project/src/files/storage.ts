import {PutObjectCommand, DeleteObjectCommand, GetObjectCommand} from "@aws-sdk/client-s3";
import {s3} from "@/src/shared/lib/s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

function getBucket(): string {
    const bucket = process.env.S3_BUCKET;

    if (!bucket) {
        throw new Error("Не задана переменная S3_BUCKET");
    }

    return bucket;
}export async function uploadFileToStorage(
    storageKey: string,
    file: File
) {
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    await s3.send(
        new PutObjectCommand({
            Bucket: getBucket(),
            Key: storageKey,
            Body: fileBuffer,
            ContentType: file.type || "application/octet-stream",
        })
    );
}
export async function deleteFileFromStorage(
    storageKey: string,
) {
    await s3.send(
        new DeleteObjectCommand({
            Bucket: getBucket(),
            Key: storageKey,
        })
    ).catch(() => {});
}

export async function downloadFileFromStorage(storageKey:string) {
    return s3.send(
        new GetObjectCommand({
            Bucket: getBucket(),
            Key: storageKey,
        }),
    );
}

export async function createUploadUrl(storageKey:string, mimeType:string) {
    const command = new PutObjectCommand({
        Bucket: getBucket(),
        Key: storageKey,
        ContentType: mimeType,
    })

    const uploadUrl = await getSignedUrl(
        s3,
        command,
        {
            expiresIn:300
        }
    );
    return uploadUrl;
} 