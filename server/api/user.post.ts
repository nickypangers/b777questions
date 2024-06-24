import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { email, password, username } = await readBody(event);

    return prisma.user.create({
        data: {
            email,
            username,
            password: password,
        }
    })
})