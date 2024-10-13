import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

type PinType = {
  id: number;
};

// Main API Handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id }: PinType = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new Error("Account not found.");
    }

    if (!user.pin) {
      throw new Error("pin");
    }

    // Step 7: Return successful response
    res.status(200).json({ message: "Proceed to verify" });
  } catch (error: any) {
    console.error("Pin Set error: ", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred",
      message: "Pin Set failed",
    });
  }
}
