/*
  Warnings:

  - You are about to drop the column `branchEmail` on the `Partnership` table. All the data in the column will be lost.
  - You are about to drop the column `clinicAddress` on the `Partnership` table. All the data in the column will be lost.
  - You are about to drop the column `clinicBranch` on the `Partnership` table. All the data in the column will be lost.
  - You are about to drop the column `clinicMobile` on the `Partnership` table. All the data in the column will be lost.
  - You are about to drop the column `clinicPhone` on the `Partnership` table. All the data in the column will be lost.
  - You are about to drop the column `clinicStatus` on the `Partnership` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Partnership` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Partnership` table. All the data in the column will be lost.
  - Added the required column `address` to the `Clinic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clinic" ADD COLUMN     "address" VARCHAR(500) NOT NULL,
ADD COLUMN     "latitude" DECIMAL(15,10),
ADD COLUMN     "longitude" DECIMAL(15,10),
ADD COLUMN     "phone" VARCHAR(100),
ADD COLUMN     "status" "Status" DEFAULT E'Active';

-- AlterTable
ALTER TABLE "Partnership" DROP COLUMN "branchEmail",
DROP COLUMN "clinicAddress",
DROP COLUMN "clinicBranch",
DROP COLUMN "clinicMobile",
DROP COLUMN "clinicPhone",
DROP COLUMN "clinicStatus",
DROP COLUMN "latitude",
DROP COLUMN "longitude";
