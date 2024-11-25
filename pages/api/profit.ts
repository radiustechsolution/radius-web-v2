import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma"; // Assuming your Prisma client is set up in /lib/prisma

type ProfitData = {
  date: string;
  profit: number;
  bonusClaimed: number; // Add a field for bonus claimed
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get today's date and the last 30 days
    const today = new Date();
    today.setHours(today.getHours() - 1); // Reduce the time by 1 hour

    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30); // Set 30 days ago from today
    thirtyDaysAgo.setHours(thirtyDaysAgo.getHours() - 1); // Reduce the time by 1 hour for thirtyDaysAgo

    // Fetch all transactions within the last 30 days
    const transactions = await prisma.transactions.findMany({
      where: {
        created_at: {
          gte: thirtyDaysAgo, // Fetch transactions from 30 days ago until now
        },
      },
    });

    // Group and sum the profits and bonuses by date
    const profitByDate: { [key: string]: { profit: number; bonus: number } } =
      {};

    transactions.forEach((transaction) => {
      const date = transaction.created_at.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

      // Initialize the date entry if it doesn't exist
      if (!profitByDate[date]) {
        profitByDate[date] = { profit: 0, bonus: 0 };
      }

      // Sum profits for each date
      profitByDate[date].profit += parseFloat(transaction.profit.toString());

      // Check if the transaction is a daily bonus
      if (transaction.trans_type === "daily_bonus") {
        profitByDate[date].bonus += parseFloat(transaction.amount.toString()); // Sum bonuses
      }
    });

    // Format the result into an array
    const formattedProfits: ProfitData[] = Object.keys(profitByDate).map(
      (date) => ({
        date,
        profit: profitByDate[date].profit,
        bonusClaimed: profitByDate[date].bonus, // Include the bonus claimed for the day
      })
    );

    // Sort the results by date in descending order
    formattedProfits.sort((a, b) => (a.date > b.date ? -1 : 1));

    res.status(200).json(formattedProfits);
  } catch (error) {
    console.error("Error fetching profits:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
