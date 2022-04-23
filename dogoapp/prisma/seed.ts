import { PrismaClient } from '@prisma/client'
import faker from '@faker-js/faker'

const prisma = new PrismaClient()

const NUMBER_OF_USERS = 4

const data = Array.from({ length: NUMBER_OF_USERS }).map(() => ({
    name: faker.name.findName(),
}))

async function main() {
    for (let entry of data) {
        await prisma.user.create({
            data: {
                name: entry.name,
                profile: {
                    create: {
                        biography: faker.lorem.paragraph(),

                    },
                },
            },
        })
    }
}

main().finally(async () => {
    await prisma.$disconnect()
})