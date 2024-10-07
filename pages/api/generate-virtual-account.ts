import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"; // Adjust if you're using a different authentication method
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

async function createVirtualAccount(
  first_name: string,
  last_name: string,
  email: any,
  phone_number: any,
  userId: string
) {
  const ref = `VA-${userId}-${Date.now()}`;

  try {
    const flutterwaveResponse = await axios.post(
      "https://api.flutterwave.com/v3/virtual-account-numbers",
      {
        email: email,
        is_permanent: true,
        bvn: "22366804906", // Replace with valid BVN
        tx_ref: ref,
        firstname: first_name,
        lastname: last_name,
        narration: `${first_name} ${last_name}`,
        phonenumber: phone_number,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
        timeout: 50000,
      }
    );

    console.log("Flutterwave Response:", flutterwaveResponse.data);

    const { account_number, bank_name } = flutterwaveResponse.data.data;

    await prisma.virtual_accounts.create({
      data: {
        customer_id: Number(userId),
        account_id: ref,
        account_reference: ref,
        account_number,
        account_name: `${first_name} ${last_name}`,
        bank_name,
        bank_code: "1234",
      },
    });

    return { account_number, bank_name };
  } catch (error: any) {
    console.error(
      "Error creating virtual account:",
      error.response?.data || error.message
    );
    throw new Error(
      "Error creating virtual account: " +
        (error.response?.data?.message || error.message)
    );
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = session.user.id; // Assuming user ID is stored in session
  const { first_name, last_name, email, phone_number } = session.user; // Adjust according to your session structure
  try {
    // Call the function to creates a virtual account
    const virtualAccount = await createVirtualAccount(
      first_name,
      last_name,
      email,
      phone_number,
      userId
    );
    return res.status(200).json({
      message: "Virtual account created successfully",
      virtualAccount,
    });
  } catch (error: any) {
    return res.status(400).json({
      error:
        error.message ||
        "An error occurred while creating the virtual account.",
    });
  }
}
