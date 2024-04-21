import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const quizId = getRouterParam(event, 'quizId');
    const questionNumber = getRouterParam(event, 'questionNumber');

    const { selectedOptionId } = await readBody(event);

    let quizSelection = await prisma.quizSelection.findUnique({
        where: {
            quizSelectionId: {
                quizId: Number.parseInt(quizId!),
                questionNumber: Number.parseInt(questionNumber!),
            }
        }
    })

    if (quizSelection?.selectedOptionId != null) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Question already answered'
        })
    }

    let updatedQuizSelection = await prisma.quizSelection.update({
        where: {
            quizSelectionId: {
                quizId: quizSelection!.quizId,
                questionNumber: quizSelection!.questionNumber,
            }
        },
        data: {
            selectedOptionId,
        },
        select: {
            question: {
                select: {
                    id: true,
                    answerId: true
                }
            }
        }
    })

    return {
        quizId,
        questionNumber,
        questionId: updatedQuizSelection.question.id,
        isCorrect: selectedOptionId == updatedQuizSelection.question.answerId,
        answerId: updatedQuizSelection.question.answerId,
    }
})