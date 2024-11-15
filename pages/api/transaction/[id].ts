import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma"; // Adjust to your Prisma client instance

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  // Check if the user is authenticated
  if (!session || !session.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.query;

  try {
    // Fetch the transaction by ID
    const transaction = await prisma.transactions.findUnique({
      where: {
        id: Number(id), // Ensure `id` is treated as a number
      },
    });

    // If transaction is not found or the transaction doesn't belong to the current user
    if (!transaction || transaction.user_id != session.user.id) {
      return res
        .status(404)
        .json({ message: "Transaction not found or access denied" });
    }

    // console.log(transaction);
    // console.log(session.user.id);

    // Return the transaction data
    return res.status(200).json(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return res.status(500).json({ message: "Error fetching transaction" });
  }
}
