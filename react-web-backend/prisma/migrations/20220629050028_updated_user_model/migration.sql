/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `companyId` on the `CompanyUser` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Company_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Company";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CompanyUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false
);
INSERT INTO "new_CompanyUser" ("createdDate", "email", "fullName", "id", "isDeleted", "lastModifiedBy", "lastModifiedDate", "password", "phone", "role", "userName") SELECT "createdDate", "email", "fullName", "id", "isDeleted", "lastModifiedBy", "lastModifiedDate", "password", "phone", "role", "userName" FROM "CompanyUser";
DROP TABLE "CompanyUser";
ALTER TABLE "new_CompanyUser" RENAME TO "CompanyUser";
CREATE UNIQUE INDEX "user_name_uindex" ON "CompanyUser"("userName");
CREATE UNIQUE INDEX "CompanyUser_email_key" ON "CompanyUser"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
