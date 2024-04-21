/*
  Warnings:

  - You are about to drop the column `optionId` on the `QuizSelection` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuizSelection" DROP CONSTRAINT "QuizSelection_optionId_fkey";

-- AlterTable
ALTER TABLE "QuizSelection" DROP COLUMN "optionId",
ADD COLUMN     "selectedOptionId" INTEGER;

-- AddForeignKey
ALTER TABLE "QuizSelection" ADD CONSTRAINT "QuizSelection_selectedOptionId_fkey" FOREIGN KEY ("selectedOptionId") REFERENCES "Option"("id") ON DELETE SET NULL ON UPDATE CASCADE;
