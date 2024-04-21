import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    return prisma.user.create({
        data: {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: '1234',
        }
    })
})