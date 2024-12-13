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
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
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

    const [existingPhone, existingUsername, existingEmail] = await Promise.all([
      prisma.user.findUnique({ where: { phone_number } }),
      prisma.user.findUnique({ where: { username } }),
      prisma.user.findUnique({ where: { email } }),
    ]);

    if (existingPhone) {
      return res
        .status(400)
        .json({ status: 400, message: "Phone number already exists" });
    }
    if (existingUsername) {
      return res
        .status(400)
        .json({ status: 400, message: "Username already exists" });
    }
    if (existingEmail) {
      return res
        .status(400)
        .json({ status: 400, message: "Email already exists" });
    }

    let invited_code = promo_code.toLowerCase() || "radius";

    const promocode = await prisma.user.findFirst({
      where: { username: promo_code.toLowerCase() },
    });

    if (!promocode) {
      invited_code = "radius";
    }

    // OTP
    const otp = generateOTP();

    // Hash the OTP before saving it
    const hashedOtp = bcrypt.hashSync(otp, 10); // 10 is the salt rounds for bcrypt

    const user_n = username.toLowerCase();

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        username: user_n,
        phone_number,
        otp: hashedOtp,
        invited_by: invited_code,
        promo_code: randomPromoCode,
        password: hashedPassword,
        token: hashedToken,
      },
    });

    try {
      // Send OTP email
      await sendEmail(
        email,
        `Welcome to Radius. We are glad you joined us. Feel free to use our help line should you have any question. Cheers! Your OTP code is ${otp}`,
        "Welcome to Radius"
      );

      await sendEmail(
        "xeonncodes@gmail.com",
        `New customer registration. Name: ${first_name} ${last_name} Email: ${email} Phone Number: ${phone_number}, Invited By: ${invited_code}`,
        "New Customer Registration"
      );
    } catch (error) {}

    return res
      .status(201)
      .json({ status: 200, message: "User created successfully", data: user });
  } catch (error: any) {
    return res.status(400).json({
      status: 400,
      message: "Something went wrong!. Try again",
      error: error.message || "none",
    });
  }
}
