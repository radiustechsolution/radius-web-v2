import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type PinType = {
  id: number;
  pin: string;
};

// Main API Handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, pin }: PinType = req.body;

  // Step 1: Validate input
  if (!id || !pin) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (pin.length != 4) {
    return res.status(400).json({ error: "Pin can only be 4 Digit" });
  }

  try {
    // Step 2: Lock user profile to prevent concurrent transactions
    const user: any = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new Error("Failed. Try again later.");
    }

    const checkPin = bcrypt.compareSync(pin, user.pin);

    if (!checkPin) {
      throw new Error("Incorrect PIN. Try again!");
    }

    // Step 7: Return successful response
    res.status(200).json({ message: "PIN verified successfully." });
  } catch (error: any) {
    console.error("Pin Set error: ", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred",
      message: "Pin Set failed",
    });
  }
}
