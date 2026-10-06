import {prisma} from "@/src/shared/lib/prisma";

export async function findUserByEmail(email: string) {
    return prisma.users.findUnique({
        where: { email:email },
    })
}

export async function createUser(id: string, email: string, passwordHash: string) {
    return prisma.users.create({
        data:{
            id,
            email,
            password_hash: passwordHash,
            created_at: new Date(),
            updated_at: new Date(),
        }
    })
}