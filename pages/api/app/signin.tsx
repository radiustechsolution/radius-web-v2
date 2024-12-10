import { generateSixDigitNumber } from "@/lib/functions";
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

    const randomToken = randomBytes(16).toString("hex");
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.findFirst({
      where: {
        email,
        password: hashedPassword,
      },
    });

    await sendEmail(
      email,
      `Welcome back to Radius. Your OTP code is ${generateSixDigitNumber()}`, // Message with otp
      "Login Successful"
    );

    return res
      .status(200)
      .json({ status: 200, message: "Successfully login", data: user });
  } catch (error: any) {
    return res.status(400).json({
      status: 400,
      message: "Something went wrong!. Try again",
      error: error.message || "none",
    });
  }
}
