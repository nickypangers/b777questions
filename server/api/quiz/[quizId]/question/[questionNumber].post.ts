import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const quizId = getRouterParam(event, 'quizId');
    const questionNumber = getRouterParam(event, 'questionNumber');

    const { userId } = await readBody(event);

    const quiz = await prisma.quiz.findUnique({
        where: {
            id: Number.parseInt(quizId!),
            userId,
        },
        include: {
            quizSelections: {
                select: {
                    question: {
                        select: {
                            id: true,
                            answerId: true,
                            text: true,
                            options: true,
                        }
                    },
                    questionNumber: true,
                    selectedOptionId: true,
                    quizId: true,
                },
                orderBy: {
                    questionNumber: 'asc'
                }
            }
        }
    })

    const question = quiz?.quizSelections.find((q) => q.questionNumber == Number.parseInt(questionNumber!));

    const currentQ: any = question?.question;

    delete currentQ.answerId;
    delete currentQ.selectedOptionId;

    return {
        id: quiz?.id,
        question: currentQ,
        qno: quiz?.quizSelections.find((q) => q.question.id == currentQ.id)?.questionNumber,
    }
})