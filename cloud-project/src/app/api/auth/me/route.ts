import {requireAuth} from "@/src/auth/require-auth";

export async function GET (){
    const user = await requireAuth();

    if (user instanceof Response) {
        return user;
    }
    return Response.json(user);
}