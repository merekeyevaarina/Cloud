import {prisma} from "@/src/shared/lib/prisma";
import {Prisma, type users} from "@/src/generated/prisma/client";

type CreateUserData = Pick<
    Prisma.usersCreateInput,
    "id" | "first_name" | "last_name" | "email" | "password_hash"
>;

export async function findUserByEmail(email: string): Promise<users | null> {
    return prisma.users.findUnique({
        where: { email:email },
    })
}

export async function existsByEmail(email: string): Promise<boolean> {
    const user = await prisma.users.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });

    return user !== null;
}

export async function createUser(data: CreateUserData): Promise<users> {
    return prisma.users.create({
        data:{
            ...data,
            created_at: new Date(),
            updated_at: new Date(),
        }
    })
}