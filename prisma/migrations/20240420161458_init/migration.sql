/*
  Warnings:

  - The primary key for the `QuizSelection` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "QuizSelection" DROP CONSTRAINT "QuizSelection_pkey",
ADD CONSTRAINT "QuizSelection_pkey" PRIMARY KEY ("quizId", "questionNumber");
