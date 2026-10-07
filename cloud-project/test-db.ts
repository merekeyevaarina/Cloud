import { prisma } from "./src/shared/lib/prisma";

async function main() {
    const users = await prisma.users.findMany();

    console.log(users);
}

main();