import {prisma} from "@/src/shared/lib/prisma";
import {Prisma, users} from "@/src/generated/prisma/client";

type CreateUserData = Pick<
    Prisma.usersCreateInput,
    "id" | "first_name" | "last_name" | "email" | "password_hash"
>;

export async function findUserByEmail(email: string): Promise<users | null> {
    return prisma.users.findUnique({
        where: { email:email },
    })
}

export async function existsByEmail(email: string) : Promise<boolean> {
    const result = await prisma.$queryRaw<{ exists: boolean }[]>`
    SELECT EXISTS (
        SELECT 1
        FROM users
        WHERE email = ${email}
    ) AS exists
`;
    const exists = result[0].exists;
    return exists;
}


export async function createUser(data: CreateUserData) {
    return prisma.users.create({
        data:{
            ...data,
            created_at: new Date(),
            updated_at: new Date(),
        }
    })
}