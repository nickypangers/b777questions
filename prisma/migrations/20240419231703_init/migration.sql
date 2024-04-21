/*
  Warnings:

  - You are about to drop the column `questionIndex` on the `QuizSelection` table. All the data in the column will be lost.
  - Added the required column `questionNumber` to the `QuizSelection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuizSelection" DROP COLUMN "questionIndex",
ADD COLUMN     "questionNumber" INTEGER NOT NULL;
