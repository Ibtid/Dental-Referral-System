-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('Card', 'Cash');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Suspended');

-- CreateEnum
CREATE TYPE "SmsStatus" AS ENUM ('Sent', 'Failed');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" VARCHAR(200) NOT NULL,
    "userName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "role" VARCHAR(30)[],
    "phone" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "user_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyUser" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "companyUser_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "investigationAmount" DECIMAL(50,2) NOT NULL,

    CONSTRAINT "test_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "role_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "shortName" VARCHAR(100) NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "contactNumber" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "website" VARCHAR(100),
    "status" "Status" DEFAULT E'Active',
    "logoPath" VARCHAR(100),
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "company_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetPasswordToken" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(20) NOT NULL,
    "userEmail" VARCHAR(100),
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "resetPasswordToken_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthToken" (
    "id" SERIAL NOT NULL,
    "hashedRefreshToken" TEXT,
    "hashedAccessToken" TEXT,
    "userId" INTEGER,

    CONSTRAINT "jwt_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "gender" VARCHAR(20) NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "contactNumber" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100),
    "age" INTEGER NOT NULL,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "patient_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "speciality" VARCHAR(200) NOT NULL,
    "organization" VARCHAR(200),
    "address" VARCHAR(500) NOT NULL,
    "contactNumber" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100),
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "doctor_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "reportId" VARCHAR(100) NOT NULL,
    "patientId" INTEGER NOT NULL,
    "clinicId" INTEGER,
    "companyId" INTEGER NOT NULL,
    "discount" DECIMAL(50,2) NOT NULL,
    "mobileNumber" VARCHAR(50) NOT NULL,
    "deliveryTime" TIMESTAMP(3) NOT NULL,
    "grossTotal" DECIMAL(50,2) NOT NULL,
    "total" DECIMAL(50,2) NOT NULL,
    "paid" DECIMAL(50,2) NOT NULL,
    "due" DECIMAL(50,2) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT E'Cash',
    "paymentDescription" VARCHAR(100),
    "firstVisit" TIMESTAMP(3),
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "pathologyReport_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceInvestigation" (
    "id" SERIAL NOT NULL,
    "invoiceId" VARCHAR(100) NOT NULL,
    "investigationId" INTEGER NOT NULL,
    "amount" DECIMAL(50,2) NOT NULL,
    "reportPath" TEXT,
    "reportUploaded" BOOLEAN NOT NULL DEFAULT false,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "pathologyInvoice_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investigation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "category" VARCHAR(30) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "referenceValue" VARCHAR(1000),
    "cost" DECIMAL(50,2) NOT NULL,
    "comission" DECIMAL(50,2) NOT NULL,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,
    "invoiceId" TEXT,

    CONSTRAINT "investigation_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinic" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "mobile" VARCHAR(255) NOT NULL,
    "logoPath" VARCHAR(100),
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "clinic_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmsLog" (
    "id" SERIAL NOT NULL,
    "receiverPhone" VARCHAR(100) NOT NULL,
    "message" VARCHAR(200) NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clinicId" INTEGER,
    "companyId" INTEGER NOT NULL,
    "status" "SmsStatus" NOT NULL,
    "statusMessage" TEXT,
    "type" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "smsLog_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partnership" (
    "id" SERIAL NOT NULL,
    "clinicId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "clinicBranch" VARCHAR(500),
    "clinicAddress" VARCHAR(500) NOT NULL,
    "clinicMobile" VARCHAR(100) NOT NULL,
    "clinicPhone" VARCHAR(100),
    "branchEmail" VARCHAR(100),
    "longitude" DECIMAL(15,10),
    "latitude" DECIMAL(15,10),
    "clinicStatus" "Status" DEFAULT E'Active',
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "partnership_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralBonusPayment" (
    "id" SERIAL NOT NULL,
    "clinicId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "invoiceAmount" INTEGER NOT NULL,
    "discountAmount" DECIMAL(50,2) NOT NULL,
    "totalReferralAmount" DECIMAL(50,2) NOT NULL,
    "finalReferralAmount" DECIMAL(50,2) NOT NULL,
    "paymentMonth" TIMESTAMP(3) NOT NULL,
    "meansOfPayment" VARCHAR(30) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "referralBonusPayment_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "otp" VARCHAR(4) NOT NULL,
    "mobile" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" INTEGER,
    "lastModifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "otp_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyUser_userId_key" ON "CompanyUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_key" ON "Role"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_userEmail_key" ON "ResetPasswordToken"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "AuthToken_userId_key" ON "AuthToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_reportId_key" ON "Invoice"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "Investigation_name_key" ON "Investigation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_email_key" ON "Clinic"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_mobile_key" ON "Clinic"("mobile");

-- AddForeignKey
ALTER TABLE "CompanyUser" ADD CONSTRAINT "CompanyUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyUser" ADD CONSTRAINT "CompanyUser_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetPasswordToken" ADD CONSTRAINT "ResetPasswordToken_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthToken" ADD CONSTRAINT "AuthToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceInvestigation" ADD CONSTRAINT "InvoiceInvestigation_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("reportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceInvestigation" ADD CONSTRAINT "InvoiceInvestigation_investigationId_fkey" FOREIGN KEY ("investigationId") REFERENCES "Investigation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investigation" ADD CONSTRAINT "Investigation_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("reportId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmsLog" ADD CONSTRAINT "SmsLog_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partnership" ADD CONSTRAINT "Partnership_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partnership" ADD CONSTRAINT "Partnership_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralBonusPayment" ADD CONSTRAINT "ReferralBonusPayment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralBonusPayment" ADD CONSTRAINT "ReferralBonusPayment_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
