import {prisma} from "@/src/shared/lib/prisma";

export async function findUserByEmail(email: string) {
    return prisma.users.findUnique({
        where: { email:email },
    })
}