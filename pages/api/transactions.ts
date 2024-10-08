// In your API route handler (e.g., /api/transactions)
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query; // Get userId from request

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Fetch the user's transaction history
    const transactions = await prisma.transactions.findMany({
      where: {
        user_id: String(userId), // Ensure the userId is a number
      },
      orderBy: {
        created_at: "desc", // Order by most recent first
      },
      take: 10, // Limit the number of transactions shown (e.g., 20 most recent)
    });

    res.status(200).json(transactions); // Send transactions data back to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transaction history" });
  }
}
