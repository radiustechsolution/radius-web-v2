/*
  Warnings:

  - Made the column `last_bonus_claim` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "last_bonus_claim" SET NOT NULL,
ALTER COLUMN "last_bonus_claim" SET DEFAULT 'now',
ALTER COLUMN "last_bonus_claim" SET DATA TYPE TEXT;
