import { generateRef, GetCurrentTime, getCurrentTime } from "@/lib/functions";
import { blockedEmail } from "@/lib/object";
import { sendEmail } from "@/lib/sendmail";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

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
    // Fetch the user's email
    const customer = await prisma.user.findUnique({
      where: { id: customerId },
      select: { email: true },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Step 2: Check if the user's email is in the blockedEmail list
    if (blockedEmail.includes(customer.email)) {
      return res.status(403).json({
        error: "Account cannot make purchase. Kindly reach the admin.",
      });
    }

    // Step 2: Lock user profile to prevent concurrent transactions
    const lockUser = await prisma.user.update({
      where: { id: customerId },
      data: { profile_locked: true },
    });

    if (!lockUser) {
      throw new Error("Failed. Try again later.");
    }

    // Check if user has set pin
    if (!lockUser.pin) {
      throw new Error("pin");
    }

    const chargeAmount: any = Number(amount) - Number(amount) * 0.015;

    // Step 3: Check customer's balance
    const balance = await getCustomerBalance(customerId);
    if (balance < chargeAmount) {
      try {
        await sendEmail(
          "xeonncodes@gmail.com",
          "Customer transaction failed while purchasing N" +
            chargeAmount +
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
          balance: { decrement: chargeAmount },
        },
        select: { balance: true },
      });

      const currentTime = GetCurrentTime();

      // Create transaction record (status: pending)
      await prisma.transactions.create({
        data: {
          user_id: String(customerId), // Ensure this is a string
          type: "debit",
          trans_type: "airtime",
          txf: transactionReference,
          fee: 0,
          merchant: merchant,
          amount: chargeAmount,
          beneficiary: phone_number,
          balance_before: balance,
          balance_after: updatedUser.balance,
          status: "pending",
          narration: `N${amount} airtime processed`,
          created_at: currentTime,
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
            balance: { increment: chargeAmount },
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
              chargeAmount +
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

    const profit = new Decimal(chargeAmount).minus(
      new Decimal(airtimeData.amount)
    );

    // Step 6: Update transaction status on successful airtime purchase
    await prisma.transactions.update({
      where: { txf: transactionReference },
      data: {
        x_ref: airtimeData.orderid,
        amount_sent: new Decimal(airtimeData.amount),
        profit: profit,
        status: "successful",
      },
    });

    try {
      await sendEmail(
        "xeonncodes@gmail.com",
        `Successful airtime purchase , Email: ${lockUser.email}, Amount: ${amount}, Charged Amount: ${chargeAmount}, Beneficiary: ${phone_number}, Merchant: ${merchant} Customer Name: ${lockUser.first_name} ${lockUser.last_name}`,
        "Successful airtime Purchase"
      );
      await sendEmail(
        lockUser.email,
        `Hello ${lockUser.username}, Great news! Your airtime purchase of ₦${amount} was successful. You saved ₦${amount - chargeAmount} using Radius for this purchase. Details: Network: ${merchant}. Thank you for trusting us. We’re excited to continue serving you with more seamless and rewarding experiences! Warm regards, The Radius Team`,
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
