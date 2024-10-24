import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, otp, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email not provided." });
  }

  if (!otp || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find the user by email
    const user: any = await prisma.user.findFirst({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: "Account could not be found." });
    }

    // Verify the OTP using bcrypt's compare function
    const isOtpValid = bcrypt.compareSync(otp, user.otp);

    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    // Update the user's password in the database
    await prisma.user.update({
      where: { email: email },
      data: { otp: null }, // Clear the OTP after resetting the password
    });

    return res.status(200).json({
      message: "Email verified successfully.",
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        id: user.id,
        phone_number: user.phone_number,
      },
    });
  } catch (error) {
    console.error("Error verifying otp:", error);
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  } finally {
    await prisma.$disconnect();
  }
}
