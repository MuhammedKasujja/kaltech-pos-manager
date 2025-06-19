-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('TRIAL', 'PRO', 'ENTERPRISE', 'WHITE_LABEL');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "accountKey" TEXT NOT NULL,
    "expiresAt" INTEGER,
    "isVerifiedAccount" BOOLEAN NOT NULL DEFAULT false,
    "isTrial" BOOLEAN NOT NULL DEFAULT true,
    "plan" TEXT NOT NULL,
    "trialStarted" TIMESTAMP(3) NOT NULL,
    "planStarted" TIMESTAMP(3) NOT NULL,
    "trialDuration" INTEGER NOT NULL,
    "planExpires" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataUpload" (
    "id" SERIAL NOT NULL,
    "deviceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountKey" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updateId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" INTEGER,

    CONSTRAINT "DataUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncDevice" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" INTEGER,

    CONSTRAINT "SyncDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyAdminId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyAdmin" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Licence" (
    "id" SERIAL NOT NULL,
    "licenceKey" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "isApplied" BOOLEAN NOT NULL DEFAULT false,
    "appliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Licence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_companyId_key" ON "Account"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SyncDevice_deviceId_key" ON "SyncDevice"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "SyncDevice_userName_key" ON "SyncDevice"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_phone_key" ON "Company"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyAdminId_key" ON "Company"("companyAdminId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyAdmin_email_key" ON "CompanyAdmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyAdmin_phone_key" ON "CompanyAdmin"("phone");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataUpload" ADD CONSTRAINT "DataUpload_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncDevice" ADD CONSTRAINT "SyncDevice_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_companyAdminId_fkey" FOREIGN KEY ("companyAdminId") REFERENCES "CompanyAdmin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Licence" ADD CONSTRAINT "Licence_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
