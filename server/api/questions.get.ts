import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    return prisma.question.findMany({
        where: {
            answer: {
                isNot: null,
            }
        },
        select: {
            id: true,
            text: true,
            options: true,
            answerId: false,
        },
    });
})