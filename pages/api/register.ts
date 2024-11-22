import { generateSixDigitNumber } from "@/lib/functions";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi"; // Import Joi for validation
import { sendEmail } from "@/lib/sendmail";
import { sendWhatsappMessage } from "@/lib/sendWhatsapp";

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
    promo_code: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const {
    first_name,
    last_name,
    email,
    username,
    phone_number,
    password,
    promo_code,
  } = req.body;

  const randomToken = randomBytes(16).toString("hex");
  const randomPromoCode: string = String(generateSixDigitNumber());
  const hashedToken = bcrypt.hashSync(randomToken, 10);
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    // Check if phone numbern, username, or email already exists
    const [existingPhone, existingUsername, existingEmail] = await Promise.all([
      prisma.user.findUnique({ where: { phone_number } }),
      prisma.user.findUnique({ where: { username } }),
      prisma.user.findUnique({ where: { email } }),
    ]);

    if (existingPhone) {
      return res.status(400).json({ error: "Phone number already exists" });
    }

    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const user_name = promo_code.toLowerCase();
    let invited_code = promo_code.toLowerCase();

    // Resolve promo code
    const promocode = await prisma.user.findFirst({
      where: { username: user_name },
    });

    if (!promocode) {
      invited_code = "radius";
    }

    const user_n = username.toLowerCase();

    // Create the user in the database
    const user: any = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        username: user_n,
        phone_number,
        invited_by: invited_code,
        promo_code: randomPromoCode,
        password: hashedPassword,
        token: hashedToken,
      },
    });

    try {
      // await sendEmail(
      //   "xeonncodes@gmail.com",
      //   `New customer registration. Name: ${first_name} ${last_name} Email: ${email} Phone Number: ${phone_number}, Invited By: ${invited_code}`,
      //   "New Customer Registration"
      // );
      await sendWhatsappMessage(
        // "xeonncodes@gmail.com",
        `New customer registration. Name: ${first_name} ${last_name} Email: ${email} Phone Number: ${phone_number}, Invited By: ${invited_code}`
        // "New Customer Registration"
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    return res.status(400).json({
      error: error.message || "An error occurred during registration.",
    });
  }
}
