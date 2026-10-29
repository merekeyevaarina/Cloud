import {cookies} from "next/headers";
import {getUserBySession} from "@/src/auth/service";
import {prisma} from "@/src/shared/lib/prisma";
import {s3} from "@/src/shared/lib/s3";
import {DeleteObjectCommand} from "@aws-sdk/client-s3";

export async function DELETE (
    request:Request,
    {params}:{params:Promise<{fileId:string}>}) {

    try{
       const {fileId} = await params;
       const cookieStore = await cookies();
       const sessionId = cookieStore.get("session")?.value;

       if (!sessionId) {
           return Response.json(
               {error: "Необходимо войти в аккаунт"},
               {status: 401},
           )
       };

       const user = await getUserBySession(sessionId);
       if (!user) {
           return Response.json(
               {error:"Сессия недействительна"},
               {status: 401},
           )
       };

       const file = await prisma.files.findFirst({
           where:{
               id: fileId,
               owner_id: user.id
           },
           select:{
               id:true,
               storage_key: true,
           }
       })
        if (!file) {
            return Response.json(
                {error:"Файл не найден"},
                {status: 401},
            )
        }
    await s3.send(
        new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: file.storage_key
        })
    )
    await prisma.files.delete({
        where: {id: file.id}
    })
    return new Response(null, {status: 204})

    }catch(error){
        console.error("Ошибка удаления файла:", error);

        return Response.json(
            {error: "Не удалось удалить файл"},
            {status: 500},
        )
    }
}