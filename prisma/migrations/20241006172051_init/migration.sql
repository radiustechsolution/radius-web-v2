-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "xagonn" TEXT NOT NULL DEFAULT 'sampleregex',
    "pin" TEXT,
    "balance" DECIMAL(60,2) NOT NULL DEFAULT 0.00,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "promo_code" TEXT NOT NULL,
    "invited_by" TEXT NOT NULL,
    "lastBonusClaim" TIMESTAMP(3),
    "last_bonus_claim" TEXT NOT NULL DEFAULT 'now',
    "token" TEXT NOT NULL,
    "account_type" TEXT NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_locked" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "data_status" BOOLEAN NOT NULL DEFAULT true,
    "airtime_status" BOOLEAN NOT NULL DEFAULT true,
    "electricity_status" BOOLEAN NOT NULL DEFAULT true,
    "cable_status" BOOLEAN NOT NULL DEFAULT true,
    "education_status" BOOLEAN NOT NULL DEFAULT true,
    "internet_status" BOOLEAN NOT NULL DEFAULT true,
    "daily_bonus" DECIMAL(60,2) NOT NULL DEFAULT 0.00,
    "all_services_status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "txf" TEXT NOT NULL,
    "x_ref" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "amount" DECIMAL(60,2) NOT NULL,
    "fee" DECIMAL(60,2) NOT NULL,
    "balance_before" DECIMAL(60,2) NOT NULL,
    "balance_after" DECIMAL(60,2) NOT NULL,
    "trans_type" TEXT NOT NULL,
    "account_type" TEXT NOT NULL,
    "beneficiary" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "narration" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "bank_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "virtual_accounts" (
    "id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "account_reference" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "bank_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "virtual_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_key" ON "user"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_txf_key" ON "transactions"("txf");
