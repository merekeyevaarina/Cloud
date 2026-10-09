import {cookies} from "next/headers";
import {logoutUser} from "@/src/auth/service";

export async function POST(){
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session")?.value;
    if (sessionId) {
        await logoutUser(sessionId)
    }

    return Response.json({message: "Вы вышли из аккаунта"});
}
