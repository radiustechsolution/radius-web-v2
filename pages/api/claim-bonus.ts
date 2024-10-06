// pages/api/claim-bonus.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function claimBonus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    if (!session || !session.user) {
      console.log(session?.user?.email);
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId: any = session.user.id;
    const today = new Date().toISOString().slice(0, 10); // Format date as YYYY-MM-DD

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has already claimed today
    if (user.last_bonus_claim === today) {
      return res.status(400).json({ message: "Bonus already claimed today." });
    }

    // Get the daily bonus price from the admin table
    const admin = await prisma.admin.findUnique({ where: { id: 1 } });
    const dailyBonus: any = admin?.daily_bonus ?? 0;

    // Lock user profile before crediting to prevent race conditions
    await prisma.user.update({
      where: { id: userId },
      data: { profile_locked: true },
    });

    // Credit user balance
    await prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          increment: dailyBonus,
        },
        last_bonus_claim: today, // Update the last claimed date
      },
    });

    // Unlock user profile after the process
    await prisma.user.update({
      where: { id: userId },
      data: { profile_locked: false },
    });

    // Fetch the updated user data to get the new balance
    const updatedUser: any = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Update the session balance with the new balance
    session.user.balance = updatedUser.balance;

    // Update the JWT token to reflect the new balance
    await prisma.user.update({
      where: { id: userId },
      data: { balance: updatedUser.balance },
    });

    return res.status(200).json({
      message: "Bonus claimed successfully!",
      newBalance: updatedUser.balance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred." });
  }
}
