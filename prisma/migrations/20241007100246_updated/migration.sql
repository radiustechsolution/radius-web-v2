/*
  Warnings:

  - You are about to drop the column `lastBonusClaim` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "lastBonusClaim",
ADD COLUMN     "last_bonus_claim" TIMESTAMP(3);
