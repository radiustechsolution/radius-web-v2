import { generateRef, getCurrentTime } from "@/lib/functions";
import { sendEmail } from "@/lib/sendmail";
import dataPlans from "@/util/dataplan";
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

type BuyDataRequestBody = {
  customerId: number;
  network: string;
  phone_number: string;
  merchant: string;
  planId: any;
};

// Function to resolve the plan amount
const resolvePlanAmount = (network: string, planId: string): number => {
  const dataPlan = dataPlans[network]?.find((plan) =>
    plan.PRODUCT.some((p) => p.PRODUCT_ID === planId)
  );
  const selectedPlan = dataPlan?.PRODUCT.find((p) => p.PRODUCT_ID === planId);

  if (!selectedPlan) {
    throw new Error(planId);
  }

  return typeof selectedPlan.PRODUCT_AMOUNT === "string"
    ? parseFloat(selectedPlan.PRODUCT_AMOUNT)
    : selectedPlan.PRODUCT_AMOUNT;
};

const resolvePlanName = (network: string, planId: string): string => {
  const dataPlan = dataPlans[network]?.find((plan) =>
    plan.PRODUCT.some((p) => p.PRODUCT_ID === planId)
  );
  const selectedPlan = dataPlan?.PRODUCT.find((p) => p.PRODUCT_ID === planId);

  if (!selectedPlan) {
    throw new Error("Invalid plan selected");
  }

  return selectedPlan.PRODUCT_NAME;
};

// Map network to API expected values
const mapNetworkToApiValue = (network: string): string => {
  return (
    {
      MTN: "1",
      Glo: "2",
      Airtel: "4",
      m_9mobile: "3",
    }[network] || ""
  );
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
    planId,
  }: BuyDataRequestBody = req.body;

  // Step 1: Validate inputs
  if (!customerId || !network || !phone_number || !planId) {
    return res.status(400).json({ error: "Missing required fields" });
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

    // Step 3: Resolve plan amount
    const plan_amount: any = resolvePlanAmount(network, planId);
    const product_name = resolvePlanName(network, planId);

    // Step 4: Check customer's balance
    const balance = await getCustomerBalance(customerId);
    if (balance < plan_amount) {
      try {
        await sendEmail(
          "xeonncodes@gmail.com",
          `Customer transaction failed while purchasing ${product_name} Network: ${network} Customer ID: ${customerId}. Error: Insufficient balance`,
          "Failed Transaction"
        );
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
      throw new Error("Insufficient balance");
    }

    // Step 5: Begin transaction to decrement balance and update records
    const transactionReference = generateRef("DT", customerId);

    await prisma.$transaction(async (prisma) => {
      updatedUser = await prisma.user.update({
        where: { id: customerId },
        data: {
          balance: { decrement: plan_amount },
        },
        select: { balance: true },
      });

      // Create transaction record (status: pending)
      await prisma.transactions.create({
        data: {
          user_id: String(customerId), // Ensure this is a string
          type: "debit",
          trans_type: "data",
          txf: transactionReference,
          fee: 0,
          merchant: merchant,
          amount: plan_amount,
          product: product_name,
          beneficiary: phone_number,
          balance_before: balance,
          balance_after: updatedUser.balance,
          status: "pending",
          narration: `${product_name} processing`,
          created_at: getCurrentTime(),
        },
      });
    });

    // Step 6: Proceed with Data Purchase API request
    // const networkMapped = mapNetworkToApiValue(network);
    // const apiResponse = await fetch("https://datastationapi.com/api/data/", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Token ${process.env.DATA_STATION_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     network: networkMapped,
    //     mobile_number: phone_number,
    //     plan: planId,
    //     Ported_number: true,
    //   }),
    // });

    // const databundleData = await apiResponse.json();

    // if (databundleData.Status !== "successful") {
    //   if (databundleData.Status === "INSUFFICIENT_BALANCE") {
    //     await prisma.user.update({
    //       where: { id: customerId },
    //       data: {
    //         balance: { increment: plan_amount },
    //       },
    //     });
    //     await prisma.transactions.update({
    //       where: { txf: transactionReference },
    //       data: {
    //         amount_sent: 0,
    //         balance_after: balance,
    //         status: "failed",
    //       },
    //     });

    //     try {
    //       await sendEmail(
    //         "xeonncodes@gmail.com",
    //         `Customer transaction failed while purchasing ${planName}`,
    //         "Failed Transaction"
    //       );
    //     } catch (emailError) {
    //       console.error("Email sending failed:", emailError);
    //     }
    //   }
    //   throw new Error("Data purchase failed. Try again!");
    // }

    // // Step 7: Update transaction status on successful data purchase
    // await prisma.transactions.update({
    //   where: { txf: transactionReference },
    //   data: {
    //     x_ref: databundleData.order_id,
    //     amount_sent: new Decimal(databundleData.plan_amount),
    //     status: "successful",
    //   },
    // });

    // Step 8: Return successful response
    res.status(200).json({ message: plan_amount });
  } catch (error: any) {
    console.error("Data purchase error: ", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred",
      message: "Data purchase failed",
    });
  } finally {
    // Step 9: Ensure user profile is unlocked
    await prisma.user.update({
      where: { id: customerId },
      data: { profile_locked: false },
    });
  }
}