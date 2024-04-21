import type { Prisma } from "@prisma/client";

export type QuestionWithoutAnswer = Prisma.QuestionGetPayload<{
    select: {
        id: true,
        text: true,
        options: {
            select: {
                id: true,
                text: true,
            }
        },
    },
}>;