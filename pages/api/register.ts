import { generateSixDigitNumber } from "@/lib/functions";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi"; // Import Joi for validation
import axios from "axios"; // Import Axios for API calls
import bankAccountQueue from "@/lib/bullqueue";

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
    // Check if phone number, username, or email already exists
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

    // Create the user in the database
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

    // Create a function that will be called when the client click generate virtual account button

    // // Call Flutterwave API to create a virtual account for the customer
    // const flutterwaveResponse = await axios.post(
    //   "https://api.flutterwave.com/v3/virtual-account-numbers",
    //   {
    //     email: email,
    //     is_permanent: true,
    //     bvn: "22366804906",
    //     tx_ref: ref,
    //     firstname: first_name,
    //     lastname: last_name,
    //     narration: `${first_name} ${last_name}`,
    //     phonenumber: phone_number,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
    //       // "Content-Type": "application/json",
    //     },
    //   }
    // );

    // // Extract account details from te response
    // const { account_number, bank_name } = flutterwaveResponse.data.data;

    // // Store the virtual account in the database
    // await prisma.virtual_accounts.create({
    //   data: {
    //     customer_id: user.id,
    //     account_id: ref,
    //     account_reference: ref,
    //     account_number,
    //     account_name: `${first_name} ${last_name}`,
    //     bank_name,
    //     bank_code: "1234",
    //   },
    // });

    // Create a welcome notification
    await prisma.notifications.create({
      data: {
        customer_id: String(user.id),
        message:
          "Welcome to Radius Data! Your account was created succesfully. We're glad you joined us",
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
