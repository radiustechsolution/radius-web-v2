import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma"; // Assuming your Prisma client is set up in /lib/prisma

type ProfitData = {
  date: string;
  profit: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get today's date and the last 30 days
    const today = new Date();
    today.setHours(today.getHours() - 1); // Reduce the time by 1 hour

    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(today.getDate() - 30); // Set five days ago from today
    fiveDaysAgo.setHours(fiveDaysAgo.getHours() - 1); // Reduce the time by 1 hour for fiveDaysAgo

    // Fetch transactions within the last 30 days
    const transactions = await prisma.transactions.findMany({
      where: {
        created_at: {
          gte: fiveDaysAgo, // Fetch transactions from 30 days ago until now
        },
      },
    });

    // Group and sum the profits by date
    const profitByDate: { [key: string]: number } = {};

    transactions.forEach((transaction) => {
      const date = transaction.created_at.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      profitByDate[date] =
        (profitByDate[date] || 0) + parseFloat(transaction.profit.toString()); // Sum profits for each date
    });

    // Format the result into an array
    const formattedProfits: ProfitData[] = Object.keys(profitByDate).map(
      (date) => ({
        date,
        profit: profitByDate[date],
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
