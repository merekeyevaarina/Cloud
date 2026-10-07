import { createSession } from "@/src/auth/repository";

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