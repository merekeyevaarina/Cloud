import {prisma} from "@/src/shared/lib/prisma";

export async function createSession(id: string, userId:string, expiresAt:Date) {
    return prisma.sessions.create({
      data: {
          id,
          user_id: userId,
          expires_at:expiresAt,
          created_at: new Date(),
      }
    })
}