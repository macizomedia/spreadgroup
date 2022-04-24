import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function addUser(payload: any) {
    await prisma.user.create({
        data: {
            name: payload.name,

        }

    })
}
