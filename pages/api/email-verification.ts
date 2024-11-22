import { sendEmail } from "@/lib/sendmail";
import { sendWhatsappMessage } from "@/lib/sendWhatsapp";
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

  if (!otp || !email) {
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

    // Resolve promo code
    const promocode = await prisma.user.findFirst({
      where: { username: user.invited_by },
    });

    // Clear the OTP
    await prisma.user.update({
      where: { email: email },
      data: { otp: null, email_verified: 1 },
    });

    try {
      // await sendEmail(
      //   promocode?.email,
      //   `Congratulations. You've successfully invited a new customer to Radius. Name: ${user.first_name} ${user.last_name}, You will get 15% of this user first deposit. (Capped at N500)`,
      //   "New Invited Radius User"
      // );
      // await sendEmail(
      //   email,
      //   "Welcome to Radius. We are glad you joined us. Feel free to use our help line should you have any question. Cheers!",
      //   "Welcome to Radius"
      // );

      await sendWhatsappMessage(
        `Sucessful customer registration. Wallet generated successfully.`
      );
    } catch (error) {}

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
