import { generateOTP } from "@/lib/functions";
import { sendEmail } from "@/lib/sendmail";
import { sendWhatsappMessage } from "@/lib/sendWhatsapp";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

// Use a singleton for Prisma Client to avoid creating too many connections
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;

  // Basic validation for email
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const otp = generateOTP();

  try {
    // Find user by email
    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "Account could not be found." });
    }

    // Hash the OTP before saving it
    const hashedOtp = bcrypt.hashSync(otp, 10); // 10 is the salt rounds for bcrypt

    // Store hashed OTP in user record
    await prisma.user.update({
      where: { email: email },
      data: { otp: hashedOtp }, // Save the hashed OTP
    });

    try {
      // Send OTP via email
      // await sendEmail(
      //   email,
      //   `Your OTP is ${otp}. Do not share this with anyone. We will never ask you for your OTP.`,
      //   "OTP from Radius"
      // );

      await sendWhatsappMessage(`Customer ${email} OTP is ${otp}.`);
    } catch (error) {}

    return res.status(200).json({ message: "OTP Sent! Check your email." });
  } catch (error) {
    console.error("Error during OTP request:", error); // Log the error for debugging

    return res
      .status(500)
      .json({ message: "An error occurred while sending the OTP." });
  } finally {
    // Disconnect Prisma Client when done
    await prisma.$disconnect();
  }
}
