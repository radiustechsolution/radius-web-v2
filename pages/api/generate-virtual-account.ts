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
    // const flutterwaveResponse = await axios.post(
    //   "https://api.flutterwave.com/v3/virtual-account-numbers",
    //   {
    //     email: email,
    //     is_permanent: true,
    //     bvn: "22366804906", // Replace with valid BVN
    //     tx_ref: ref,
    //     firstname: first_name,
    //     lastname: last_name,
    //     narration: `${first_name} ${last_name}`,
    //     phonenumber: phone_number,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
    //     },
    //   }
    // );
    // console.log("Flutterwave Response:", flutterwaveResponse.data);

    // Fetch the admin user by ID (adjust based on your logic)
    const adminUser = await prisma.user.findUnique({
      where: {
        id: 232, // Specify the admin ID or adjust based on your logic
      },
    });

    const monnifyResponse = await axios.post(
      "https://api.monnify.com/api/v2/bank-transfer/reserved-accounts",
      {
        accountReference: ref,
        accountName: `${first_name} ${last_name}`,
        currencyCode: "NGN",
        contractCode: "443364460709",
        customerEmail: email,
        customerName: `${first_name} ${last_name}`,
        bvn: "22366804906",
        getAllAvailableBanks: true,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${adminUser?.pin}`, // Use the existing token
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Monnify Response:", monnifyResponse.data);

    const { accounts } = monnifyResponse.data.data;

    const { bankCode, bankName, accountNumber } = accounts[0];

    const account_number = accountNumber;
    const bank_name = bankName;

    await prisma.virtual_accounts.create({
      data: {
        customer_id: Number(userId),
        account_id: ref,
        account_reference: ref,
        account_number: accountNumber,
        account_name: `${first_name} ${last_name}`,
        bank_name: bankName,
        bank_code: bankCode,
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
