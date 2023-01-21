/*
  Warnings:

  - Added the required column `companyId` to the `Investigation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Investigation_name_key";

-- AlterTable
ALTER TABLE "Investigation" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Investigation" ADD CONSTRAINT "Investigation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
