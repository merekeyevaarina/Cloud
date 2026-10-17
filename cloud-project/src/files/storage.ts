import {PutObjectCommand} from "@aws-sdk/client-s3";
import {s3} from "@/src/shared/lib/s3";

const bucket = process.env.S3_BUCKET;
if(!bucket) {
    throw new Error("Не задана переменная S3_BUCKET")
}

export async function uploadFileToStorage(
    storageKey:string,
    file:File
){
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    await s3.send(
        new PutObjectCommand({
            Bucket:bucket,
            Key:storageKey,
            Body:fileBuffer,
            ContentType:file.type || "application/octet-stream",
        })
    )

}