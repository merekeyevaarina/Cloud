import {cookies} from "next/headers";
import {getUserBySession} from "@/src/auth/service";

export async function GET (){
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("session")?.value;

    if(!sessionId){
        return Response.json(
            { error:"Не авторизован" },
            { status:401 },
        );

    }
    const user = await getUserBySession(sessionId);
    if(!user){
        return Response.json(
            { error: "Сессия недействительна" },
            { status:401 },
        )
    }
    return Response.json(user);
}