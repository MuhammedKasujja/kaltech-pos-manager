-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('ACCOUNT_SETUP', 'DATA_SYNC');

-- AlterTable
ALTER TABLE "Licence" ADD COLUMN     "subscriptionId" INTEGER;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "planDays" INTEGER NOT NULL,
    "plan" "SubscriptionPlan" NOT NULL,
    "type" "SubscriptionType" NOT NULL,
    "monthylyPrice" DOUBLE PRECISION NOT NULL,
    "yearlyPrice" DOUBLE PRECISION NOT NULL,
    "oldYearlyPrice" DOUBLE PRECISION NOT NULL,
    "oldMonthlyPrice" DOUBLE PRECISION NOT NULL,
    "maxSyncDevices" INTEGER NOT NULL,
    "tags" TEXT[],
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Licence" ADD CONSTRAINT "Licence_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
