// /pages/api/token.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs"; // Import dayjs to handle date comparisons
import { sendEmail } from "@/lib/sendmail";
import { siteConfig } from "@/config/site";

const prisma = new PrismaClient(); // Initialize Prisma Client

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch the admin user by ID (adjust based on your logic)
    const adminUser = await prisma.user.findUnique({
      where: {
        id: 232, // Specify the admin ID or adjust based on your logic
      },
    });

    const ref = `VA-${adminUser?.id}-${Date.now()}`;

    // Check if created_at is more than 30 minutes old
    const thirtyMinutesAgo = dayjs().subtract(30, "minutes");
    // If the created_at is older than 30 minutes, refresh the token
    const response = await fetch(
      "https://api.monnify.com/api/v2/bank-transfer/reserved-accounts",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${adminUser?.pin}`, // Use the existing token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountReference: ref,
          accountName: "Timi John",
          currencyCode: "NGN",
          contractCode: "443364460709",
          customerEmail: "xeonncodes@gmail.com",
          customerName: "John Doe",
          bvn: "22366804906",
          getAllAvailableBanks: true,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      // Handle errors
      res.status(response.status).json({ error: data });
      return;
    }

    // Send back the refreshed token response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
