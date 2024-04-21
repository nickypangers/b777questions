/*
  Warnings:

  - You are about to drop the `Attempt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Attempt";

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizUserSelection" (
    "quizId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "selectedOptionId" INTEGER,
    "questionNumber" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizUserSelection_quizId_key" ON "QuizUserSelection"("quizId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizUserSelection_questionId_key" ON "QuizUserSelection"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizUserSelection_selectedOptionId_key" ON "QuizUserSelection"("selectedOptionId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizUserSelection_questionNumber_key" ON "QuizUserSelection"("questionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "QuizUserSelection_quizId_questionId_selectedOptionId_key" ON "QuizUserSelection"("quizId", "questionId", "selectedOptionId");

-- AddForeignKey
ALTER TABLE "QuizUserSelection" ADD CONSTRAINT "QuizUserSelection_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizUserSelection" ADD CONSTRAINT "QuizUserSelection_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizUserSelection" ADD CONSTRAINT "QuizUserSelection_selectedOptionId_fkey" FOREIGN KEY ("selectedOptionId") REFERENCES "Option"("id") ON DELETE SET NULL ON UPDATE CASCADE;
