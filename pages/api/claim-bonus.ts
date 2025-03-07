// pages/api/claim-bonus.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { generateRef } from "@/lib/functions";
import { sendEmail } from "@/lib/sendmail";
import { sendWhatsappMessage } from "@/lib/sendWhatsapp";
import { siteConfig } from "@/config/site";

const prisma = new PrismaClient();

export default async function claimBonus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    if (!session || !session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId: any = session.user.id;
    const today = new Date().toISOString().slice(0, 10);

    // Get the user and check if bonus was already claimed
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.last_bonus_claim === today) {
      try {
        await sendEmail(
          siteConfig.adminEmail,
          `Customer tries to claim bonus twice today. Name: ${user.first_name} ${user.last_name}, Email: ${user.email}, Balance: ${user.balance}, Phone Number: ${user.phone_number}`,
          "Daily Bonus Issue"
        );
      } catch (error) {}
      return res.status(400).json({ message: "Bonus already claimed today." });
    }

    // Check if user has claimed bonus before
    const checkBonusClaimBefore = await prisma.transactions.findFirst({
      where: { user_id: String(user.id), trans_type: "daily_bonus" },
    });

    // Check if user has bought
    const checkPurchaseBefore = await prisma.transactions.findFirst({
      where: {
        user_id: String(userId),
        type: "debit",
      },
    });

    if (checkBonusClaimBefore && !checkPurchaseBefore) {
      try {
        sendWhatsappMessage(
          `Customer tries to claim bonus again without purchasing a product. Name: ${user.first_name} ${user.last_name}, Email: ${user.email}, Balance: ${user.balance}, Phone Number: ${user.phone_number}`
        );
        await sendEmail(
          siteConfig.adminEmail,
          `Customer tries to claim bonus again without purchasing a product. Name: ${user.first_name} ${user.last_name}, Email: ${user.email}, Balance: ${user.balance}, Phone Number: ${user.phone_number}`,
          "Daily Bonus Issue"
        );
      } catch (error) {}

      return res
        .status(400)
        .json({ message: "Purchase a product to continue getting bonus" });
    }

    // Get daily bonus amount from the admin table
    const admin = await prisma.admin.findUnique({ where: { id: 1 } });
    const dailyBonus: any = admin?.daily_bonus ?? 0;
    const old_balance = user.balance;

    // Perform a transaction to lock user update balance, and unlock
    const [_, updatedUser, __] = await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { profile_locked: true },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          balance: { increment: dailyBonus },
          last_bonus_claim: today,
        },
        select: { balance: true }, // Select only balance to get updated balance
      }),
      prisma.user.update({
        where: { id: userId },
        data: { profile_locked: false },
      }),
    ]);

    try {
      // Create a transaction record
      await prisma.transactions.create({
        data: {
          user_id: String(user.id), // Make sure this is a string
          type: "credit",
          trans_type: "daily_bonus",
          txf: String(generateRef("BN", user.id)), // Make sure this generates a unique value
          amount: dailyBonus, // This should be a number (matching Decimal)
          balance_before: old_balance, // Should match the Decimal type (Number)
          balance_after: updatedUser.balance, // Should match the Decimal type (Number)
          status: "successful",
          narration: "Daily bonus",
          // You can omit the optional fields if not needed
        },
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
    }

    await sendWhatsappMessage(
      `Daily bonus claim, Email: ${user.email}, Customer Name: ${user.first_name} ${user.last_name}, Balance after ${updatedUser.balance}`
    );

    await sendEmail(
      siteConfig.adminEmail,
      `Daily bonus claim, Email: ${user.email}, Customer Name: ${user.first_name} ${user.last_name}, Balance after ${updatedUser.balance}`,
      "Daily Bonus"
    );

    return res.status(200).json({
      message: "Bonus claimed successfully!",
      newBalance: updatedUser.balance, // Return the updated balance
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred." });
  }
}
