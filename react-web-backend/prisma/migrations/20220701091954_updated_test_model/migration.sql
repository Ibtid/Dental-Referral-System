/*
  Warnings:

  - You are about to drop the column `content` on the `Test` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Test" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "age" INTEGER,
    "gender" TEXT,
    "status" TEXT,
    "bio" TEXT,
    "createdDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Test" ("age", "createdDate", "id", "name") SELECT "age", "createdDate", "id", "name" FROM "Test";
DROP TABLE "Test";
ALTER TABLE "new_Test" RENAME TO "Test";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
