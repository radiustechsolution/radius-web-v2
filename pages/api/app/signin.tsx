import { generateOTP, generateSixDigitNumber } from "@/lib/functions";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";
import { sendEmail } from "@/lib/sendmail";

// Handle Prisma for Serverless
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check method
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    // Validate input
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    const { email, password } = req.body;

    const otp = generateOTP();

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: 400, message: "Email or password is incorrect" });
    }

    // Compare password
    const passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) {
      return res
        .status(400)
        .json({ status: 400, message: "Email or password is incorrect" });
    }

    // Generate a random token
    const randomToken = randomBytes(16).toString("hex");

    // Hash the OTP before saving it
    const hashedOtp = bcrypt.hashSync(otp, 10); // 10 is the salt rounds for bcrypt

    // Store hashed OTP in user record
    await prisma.user.update({
      where: { email: email },
      data: { otp: hashedOtp }, // Save the hashed OTP
    });

    // Send OTP email
    await sendEmail(
      email,
      `Welcome back to Radius. Your OTP code is ${otp}`,
      "Login Successful"
    );

    return res
      .status(200)
      .json({ status: 200, message: "Successfully logged in", data: user });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong!. Try again",
      error: error.message || "none",
    });
  } finally {
    await prisma.$disconnect();
  }
}
