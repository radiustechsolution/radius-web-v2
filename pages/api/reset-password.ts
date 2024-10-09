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

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Update the user's password in the database
    await prisma.user.update({
      where: { email: email },
      data: { password: hashedPassword, otp: null }, // Clear the OTP after resetting the password
    });

    return res
      .status(200)
      .json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  } finally {
    await prisma.$disconnect();
  }
}
