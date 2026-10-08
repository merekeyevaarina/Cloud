import {createSession, findSessionById} from "@/src/auth/repository";

export async function createUserSession(userId: string) {
    const sessionId = crypto.randomUUID();

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 7);

    return createSession(
        sessionId,
        userId,
        expiresAt,
    );
}

export async function getUserBySession(sessionId:string){
    const session = await findSessionById(sessionId);
    if (!session) {
        return null
    }
    if(session.expires_at < new Date()){
        return null
    }
    return {
        id: session.user.id,
        email:session.user.email
    }
}