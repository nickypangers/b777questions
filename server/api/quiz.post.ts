import { Prisma, PrismaClient } from "@prisma/client"
import _ from "lodash";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const questions = await prisma.question.findMany({
        where: {
            answer: {
                isNot: null,
            }
        },
        select: {
            id: true,
            text: true,
            options: {
                select: {
                    id: true,
                    text: true,
                    questionId: true,
                },
                orderBy: {
                    id: 'asc',
                }
            }
        },
        orderBy: {
            id: 'asc',
        }
    })


    const quiz = await prisma.quiz.create({
        data: {
            user: {
                connect: {
                    email: 'testing@testing.com',
                }
            },
            quizSelections: {
                create: questions.map((q: Prisma.QuestionGetPayload<{
                    select: {
                        id: true,
                    }
                }>, index: number) => ({
                    question: {
                        connect: {
                            id: q.id,
                        }
                    },
                    questionNumber: index + 1,
                })),
            }
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
                        },
                    },
                    questionNumber: true,
                    selectedOptionId: true,
                    quizId: true,
                },
                orderBy: {
                    questionNumber: 'asc'
                }
            },
        }
    });

    const firstQuestion = _.first(quiz.quizSelections)?.question;

    let firstQ: any = firstQuestion;
    delete firstQ.answerId;

    return {
        id: quiz.id,
        userId: quiz.userId,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt,
    }
})