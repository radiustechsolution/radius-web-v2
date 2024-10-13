import { generateRef, getCurrentTime } from "@/lib/functions";
import { sendEmail } from "@/lib/sendmail";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

// Helper to get the customer's current balance
const getCustomerBalance = async (customerId: number) => {
  const customer = await prisma.user.findUnique({
    where: { id: customerId },
    select: { balance: true },
  });
  return customer?.balance ?? 0;
};

type BuyAirtimeRequestBody = {
  customerId: number;
  network: string;
  phone_number: string;
  merchant: string;
  amount: any;
};

// Main API Handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    customerId,
    network,
    phone_number,
    merchant,
    amount,
  }: BuyAirtimeRequestBody = req.body;

  // Step 1: Validate input
  if (!customerId || !network || !phone_number || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (amount < 50) {
    return res.status(400).json({ error: "Amount cannot be less than 50" });
  }

  let updatedUser, airtimeResponse, errorMsg;

  try {
    // Step 2: Lock user profile to prevent concurrent transactions
    const lockUser = await prisma.user.update({
      where: { id: customerId },
      data: { profile_locked: true },
    });

    if (!lockUser) {
      throw new Error("Failed. Try again later.");
    }

    // Step 3: Check customer's balance
    const balance = await getCustomerBalance(customerId);
    if (balance < amount) {
      try {
        await sendEmail(
          "xeonncodes@gmail.com",
          "Customer transaction failed while purchasing N" +
            amount +
            " airtime. Name: " +
            lockUser.first_name +
            " " +
            lockUser.last_name +
            " Network: " +
            merchant +
            ", Error: " +
            "Customer balance is insufficient",
          "Failed Transaction"
        );
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
      throw new Error("Insufficient balance");
    }

    // Step 4: Begin transaction to decrement balance and update records
    const transactionReference = generateRef("AT", customerId);

    await prisma.$transaction(async (prisma) => {
      updatedUser = await prisma.user.update({
        where: { id: customerId },
        data: {
          balance: { decrement: amount },
        },
        select: { balance: true },
      });

      // Create transaction record (status: pending)
      await prisma.transactions.create({
        data: {
          user_id: String(customerId), // Ensure this is a string
          type: "debit",
          trans_type: "airtime",
          txf: transactionReference,
          fee: 0,
          merchant: merchant,
          amount: amount,
          beneficiary: phone_number,
          balance_before: balance,
          balance_after: updatedUser.balance,
          status: "pending",
          narration: `N${amount} airtime processing`,
          created_at: getCurrentTime(),
        },
      });
    });

    // Step 5: Proceed with Airtime Purchase API request
    const ref = `VA-${"airtime"}-${Date.now()}`;
    airtimeResponse = await fetch(
      `https://www.nellobytesystems.com/APIAirtimeV1.asp?UserID=${process.env.CLUB_KON_ID}&APIKey=${process.env.CLUB_KON}&MobileNetwork=${network}&Amount=${amount}&MobileNumber=${phone_number}&RequestID=${ref}&CallBackURL=${process.env.APP_URL}/api/callback/clubkon`,
      {
        method: "GET",
      }
    );

    const airtimeData = await airtimeResponse.json();
    if (airtimeData.status != "ORDER_RECEIVED") {
      if (airtimeData.status == "INSUFFICIENT_BALANCE") {
        await prisma.user.update({
          where: { id: customerId },
          data: {
            balance: { increment: amount },
          },
        });
        await prisma.transactions.update({
          where: { txf: transactionReference },
          data: {
            amount_sent: 0,
            balance_after: balance,
            status: "failed",
          },
        });

        try {
          await sendEmail(
            "xeonncodes@gmail.com",
            "Customer transaction failed while purchasing N" +
              amount +
              " airtime. Email: " +
              lockUser.email +
              " Network: " +
              merchant +
              ", Error: " +
              airtimeData?.status +
              " Customer Name: " +
              lockUser.first_name +
              " " +
              lockUser.last_name,
            "Failed Transaction"
          );
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
        }
      }
      throw new Error("Airtime purchase failed. Try again!");
    }

    // Step 6: Update transaction status on successful airtime purchase
    await prisma.transactions.update({
      where: { txf: transactionReference },
      data: {
        x_ref: airtimeData.orderid,
        amount_sent: new Decimal(airtimeData.amount),
        profit: new Decimal(amount - airtimeData.amount),
        status: "successful",
      },
    });

    try {
      await sendEmail(
        "xeonncodes@gmail.com",
        `Successful airtime purchase , Email: ${lockUser.email}, Amount: ${amount} Beneficiary: ${phone_number}, Merchant: ${merchant} Customer Name: ${lockUser.first_name} ${lockUser.last_name}`,
        "Successful airtime Purchase"
      );
      await sendEmail(
        lockUser.email,
        `Hello ${lockUser.username},\n\nGreat news! Your airtime purchase of ${amount} was successful.\n\nDetails:\nNetwork: ${merchant}\nNew Balance: ${balance}\n\nThank you for trusting us. We’re excited to continue serving you with more seamless and rewarding experiences!\n\nWarm regards,\nThe Radius Team`,
        "Your Airtime Purchase was Successful!"
      );
    } catch (emailError) {
      console.error("Airtime purchase failed:", emailError);
    }

    // Step 7: Return successful response
    res.status(200).json({
      message: "Airtime purchase successful",
      airtimeData,
    });
  } catch (error: any) {
    console.error("Airtime purchase error: ", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred",
      message: "Airtime purchase failed",
    });
  } finally {
    // Step 9: Ensure user profile is unlocked
    await prisma.user.update({
      where: { id: customerId },
      data: { profile_locked: false },
    });
  }
}
