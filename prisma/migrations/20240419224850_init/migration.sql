/*
  Warnings:

  - You are about to drop the `QuizUserSelection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuizUserSelection" DROP CONSTRAINT "QuizUserSelection_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuizUserSelection" DROP CONSTRAINT "QuizUserSelection_quizId_fkey";

-- DropForeignKey
ALTER TABLE "QuizUserSelection" DROP CONSTRAINT "QuizUserSelection_selectedOptionId_fkey";

-- DropTable
DROP TABLE "QuizUserSelection";

-- CreateTable
CREATE TABLE "QuizSelection" (
    "quizId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "optionId" INTEGER,
    "questionIndex" INTEGER NOT NULL,

    CONSTRAINT "QuizSelection_pkey" PRIMARY KEY ("quizId","questionId")
);

-- AddForeignKey
ALTER TABLE "QuizSelection" ADD CONSTRAINT "QuizSelection_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSelection" ADD CONSTRAINT "QuizSelection_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSelection" ADD CONSTRAINT "QuizSelection_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE SET NULL ON UPDATE CASCADE;
