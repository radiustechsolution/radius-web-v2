import { generateRef, GetCurrentTime, getCurrentTime } from "@/lib/functions";
import { sendEmail } from "@/lib/sendmail";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

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
    const lockUser = await prisma.user.update({
      where: { id: id },
      data: { profile_locked: true },
    });

    if (!lockUser) {
      throw new Error("Failed. Try again later.");
    }

    const hashedPin = bcrypt.hashSync(pin, 10);

    await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: id },
        data: {
          pin: hashedPin,
        },
      });
    });

    try {
      await sendEmail(
        "xeonncodes@gmail.com",
        `Activity - Pin Reset, Email: ${lockUser.email}, Customer Name: ${lockUser.first_name} ${lockUser.last_name}. Set or Reset Transaction PIN`,
        "Activity - Pin Set or Reset"
      );

      await sendEmail(
        lockUser.email,
        `Your transaction PIN has been reset successfully. If you did not perform this change, kindly reach out to our support as soon as possible.`,
        "Successful PIN SET / RESET"
      );
    } catch (emailError) {
      console.error("Pin Reset Email Failed:", emailError);
    }

    // Step 7: Return successful response
    res.status(200).json({ message: "Pin SET Successfully." });
  } catch (error: any) {
    console.error("Pin Set error: ", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred",
      message: "Pin Set failed",
    });
  } finally {
    // Step 9: Ensure user profile is unlocked
    await prisma.user.update({
      where: { id: id },
      data: { profile_locked: false },
    });
  }
}
