// pages/api/generate-wallet.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { ref, first_name, last_name, email, phone_number, customer_id } =
      req.body;

    try {
      const response = await fetch(
        "https://appapi.radiustech.com.ng/api/virtualaccountnew",
        {
          method: "POST",
          body: JSON.stringify({
            ref,
            first_name,
            last_name,
            email,
            phone_number,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal: AbortSignal.timeout(50000),
        }
      );

      if (response.ok) {
        const resJson = await response.json();
        const { account_number, bank_name } = resJson.data;

        // Store the virtual account in the database
        await prisma.virtual_accounts.create({
          data: {
            customer_id: Number(customer_id),
            account_id: ref,
            account_reference: ref,
            account_number,
            account_name: `${first_name} ${last_name}`,
            bank_name,
            bank_code: "1234",
          },
        });

        return res.status(200).json({
          message: "Virtual account created successfully!",
          data: { account_number, bank_name },
        });
      } else {
        return res.status(response.status).json({
          message: "Failed to create virtual account",
        });
      }
    } catch (error: any) {
      console.error("Virtual account creation error:", error.message);
      return res.status(500).json({
        message: "Error creating virtual account",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
