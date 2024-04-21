import type { Prisma } from "@prisma/client";

export type Option = Prisma.OptionGetPayload<{
    select: {
        id: true,
        text: true,
    }
}>;