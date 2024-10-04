import { generateSixDigitNumber } from "@/lib/functions";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi"; // Import Joi for validation

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    phone_number: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { first_name, last_name, email, username, phone_number, password } =
    req.body;

  const randomToken = randomBytes(16).toString("hex");
  const randomPromoCode: string = String(generateSixDigitNumber());
  const hashedToken = bcrypt.hashSync(randomToken, 10);
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    // Check if the phone number already exists
    const existingPhone = await prisma.user.findUnique({
      where: { phone_number },
    });
    const existingUsernmae = await prisma.user.findUnique({
      where: { username },
    });
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingPhone) {
      return res.status(400).json({ error: "Phone number already exists" });
    }

    if (existingUsernmae) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user: any = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        username,
        phone_number,
        invited_by: "",
        promo_code: randomPromoCode,
        password: hashedPassword,
        token: hashedToken,
      },
    });

    await prisma.notifications.create({
      data: {
        customer_id: String(user.id),
        message:
          "Welcome to Radius Data! Your account has been created. Kindly proceed with your funding account generation",
        status: false,
        link: "",
        img: "",
        ref: "",
        type: "message",
      },
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    return res.status(400).json({
      error: error.message || "An error occurred during registration.",
    });
  }
}
