-- CreateTable
CREATE TABLE "CompanyUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,
    CONSTRAINT "CompanyUser_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "test" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "createdDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false
);

-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "status" TEXT,
    "logo" TEXT,
    "createdDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false
);

-- CreateTable
CREATE TABLE "ResetPasswordToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "companyUserEmail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ResetPasswordToken_companyUserEmail_fkey" FOREIGN KEY ("companyUserEmail") REFERENCES "CompanyUser" ("email") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuthTokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hashedRefreshToken" TEXT,
    "hashedAccessToken" TEXT,
    "companyUserId" INTEGER,
    CONSTRAINT "AuthTokens_companyUserId_fkey" FOREIGN KEY ("companyUserId") REFERENCES "CompanyUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_name_uindex" ON "CompanyUser"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyUser_email_key" ON "CompanyUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_companyUserEmail_key" ON "ResetPasswordToken"("companyUserEmail");

-- CreateIndex
CREATE UNIQUE INDEX "AuthTokens_companyUserId_key" ON "AuthTokens"("companyUserId");
