-- AlterTable
ALTER TABLE "user" ALTER COLUMN "invited_by" DROP NOT NULL,
ALTER COLUMN "token" DROP NOT NULL;
