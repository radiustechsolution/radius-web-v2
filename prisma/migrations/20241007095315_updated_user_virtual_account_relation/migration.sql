/*
  Warnings:

  - You are about to drop the column `last_bonus_claim` on the `user` table. All the data in the column will be lost.
  - Changed the type of `customer_id` on the `virtual_accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "last_bonus_claim";

-- AlterTable
ALTER TABLE "virtual_accounts" DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "virtual_accounts" ADD CONSTRAINT "virtual_accounts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
