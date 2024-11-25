import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma"; // Assuming Prisma client is set up in /lib/prisma

type ProfitData = {
  date: string;
  profit: number;
  bonusClaimed: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get today's date and the last 30 days
    const today = new Date();
    today.setHours(today.getHours() - 1);

    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    thirtyDaysAgo.setHours(thirtyDaysAgo.getHours() - 1);

    // Fetch all transactions within the last 30 days
    const transactions = await prisma.transactions.findMany({
      where: {
        created_at: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Fetch total customer balances
    const totalCustomersBalance = await prisma.user.aggregate({
      _sum: {
        balance: true, // Assuming customers have a 'balance' field
      },
    });

    // Group and sum the profits and bonuses by date
    const profitByDate: { [key: string]: { profit: number; bonus: number } } =
      {};

    transactions.forEach((transaction) => {
      const date = transaction.created_at.toISOString().split("T")[0];

      if (!profitByDate[date]) {
        profitByDate[date] = { profit: 0, bonus: 0 };
      }

      profitByDate[date].profit += parseFloat(transaction.profit.toString());

      if (transaction.trans_type === "daily_bonus") {
        profitByDate[date].bonus += parseFloat(transaction.amount.toString());
      }
    });

    const formattedProfits: ProfitData[] = Object.keys(profitByDate).map(
      (date) => ({
        date,
        profit: profitByDate[date].profit,
        bonusClaimed: profitByDate[date].bonus,
      })
    );

    formattedProfits.sort((a, b) => (a.date > b.date ? -1 : 1));

    res.status(200).json({
      profits: formattedProfits,
      totalCustomersBalance: totalCustomersBalance._sum.balance || 0, // Return total balance
    });
  } catch (error) {
    console.error("Error fetching profits:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
