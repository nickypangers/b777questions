import type { Prisma } from "@prisma/client";
import type { QuestionWithoutAnswer } from "./question";

export type Quiz = {
    id: Number;
    userId: Number;
    createdAt: Date;
    updatedAt: Date;
    userId: Number;
    results: {
        qno: Number;
        isCorrect: boolean | undefined
    }[],
    currentQuestion: QuestionWithoutAnswer;
    currentQno: Number;
}