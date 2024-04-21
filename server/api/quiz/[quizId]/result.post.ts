import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const quizId = getRouterParam(event, 'quizId');

    const quiz = await prisma.quiz.findUnique({
        where: {
            id: Number.parseInt(quizId!),
        },
        select: {
            id: true,
            quizSelections: {
                select: {
                    questionNumber: true,
                    question: {
                        select: {
                            answerId: true,
                        }
                    },
                    selectedOptionId: true,
                },
                orderBy: {
                    questionNumber: 'asc'
                }
            }
        }
    })

    return {
        id: quiz?.id,
        results: quiz?.quizSelections.map((q) => {
            return {
                qno: q.questionNumber,
                isCorrect: q.selectedOptionId == null ? null : q.question.answerId == q.selectedOptionId,
                selectedOptionId: q.selectedOptionId,
                answerId: q.selectedOptionId == null ? null : q.question.answerId,
            }
        })
    }
})