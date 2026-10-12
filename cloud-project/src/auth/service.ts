import {createSession, deleteSession, findSessionById} from "@/src/auth/repository";
import {SessionUser} from "@/src/users/types";
import {sessions} from "@/src/generated/prisma/client";

export async function createUserSession(userId: string): Promise<sessions> {
    const sessionId = crypto.randomUUID();

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 7);

    return createSession(
        sessionId,
        userId,
        expiresAt,
    );
}

export async function getUserBySession(sessionId:string):Promise<SessionUser | null> {
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

export async function logoutUser(sessionId:string):Promise<void> {
    await deleteSession(sessionId);
}