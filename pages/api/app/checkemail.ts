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
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    const { email } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res
        .status(400)
        .json({ status: 400, message: "Email already exist on the webapp" });
    }

    return res.status(200).json({
      status: 200,
      message: "Account creation is valid",
    });
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
