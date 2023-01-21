/*
  Warnings:

  - Added the required column `companyId` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
