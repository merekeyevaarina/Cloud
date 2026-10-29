import {prisma} from "@/src/shared/lib/prisma";
import type { sessions } from "@/src/generated/prisma/client";
import type { Prisma } from "@/src/generated/prisma/client";

type SessionWithUser = Prisma.sessionsGetPayload<{
    include: {
        user:true
    }
}>

export async function createSession(id: string, userId:string, expiresAt:Date): Promise<sessions> {
    return prisma.sessions.create({
      data: {
          id,
          user_id: userId,
          expires_at:expiresAt,
          created_at: new Date(),
      }
    })
}

export async function findSessionById(sessionId:string):Promise<SessionWithUser | null>{
    return prisma.sessions.findUnique({
        where:{
            id: sessionId
        },
        include:{
            user:true
        }
    })
}

export async function deleteSession(sessionId:string):Promise<{count:number}>{
    return prisma.sessions.deleteMany({
        where:{
            id: sessionId,
        }
    })
}