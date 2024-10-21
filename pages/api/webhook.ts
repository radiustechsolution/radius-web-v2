import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { generateRef } from "@/lib/functions";
import { sendEmail } from "@/lib/sendmail";

const prisma = new PrismaClient();

export default async function webhook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Validate the webhook signature from Flutterwave
    const secretHash = process.env.FLUTTERWAVE_SECRET_HASH;
    const signature = req.headers["verif-hash"];

    if (!signature || signature !== secretHash) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const event = req.body;

    console.log("Flutterwave webhook payload:", event);

    const { status, id, tx_ref, app_fee, flw_ref, amount, customer, currency } =
      event.data;
    const { email } = customer;

    if (status === "successful") {
      // Check if transaction already exists
      const transactionExists = await prisma.transactions.findFirst({
        where: {
          x_ref: String(id),
          trans_type: "wallet_funding",
          status: "successful",
        },
      });

      if (transactionExists) {
        return res.status(400).json({ message: "Transaction already exists" });
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const creditableAmount = amount - app_fee;

      const firstTransaction = await prisma.transactions.findFirst({
        where: {
          user_id: String(user.id),
          trans_type: "wallet_funding",
          status: "successful",
        },
      });

      if (!firstTransaction && user.invited_by) {
        const referBonus = creditableAmount * 0.15;
        const referral = await prisma.user.findFirst({
          where: { username: user.invited_by },
        });

        if (referral) {
          const updatedReferral = await prisma.user.update({
            where: { username: user.invited_by },
            data: {
              balance: {
                increment: referBonus,
              },
            },
          });

          await prisma.transactions.create({
            data: {
              user_id: String(referral.id),
              type: "credit",
              trans_type: "referral",
              txf: generateRef("RB", user.id),
              amount: referBonus,
              balance_before: referral.balance,
              balance_after: updatedReferral.balance,
              status: "successful",
              narration: "Referral bonus",
            },
          });

          await sendEmail(
            referral.email,
            `Your account has been credited with N${referBonus} as referral bonus.`,
            "Referral Bonus"
          );
        }
      }

      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          balance: {
            increment: creditableAmount,
          },
        },
      });

      await prisma.transactions.create({
        data: {
          user_id: String(user.id),
          type: "credit",
          x_ref: String(id),
          trans_type: "wallet_funding",
          txf: generateRef("FUND", user.id),
          amount: creditableAmount,
          amount_sent: amount,
          balance_before: user.balance,
          balance_after: updatedUser.balance,
          status: "successful",
          narration: `Wallet funding via Flutterwave (${currency})`,
        },
      });

      await sendEmail(
        "xeonncodes@gmail.com",
        `Wallet funded: ${user.first_name} ${user.last_name}, Amount: ${creditableAmount}`,
        "New Wallet Funding"
      );

      return res
        .status(200)
        .json({ message: "Webhook processed successfully" });
    } else {
      return res.status(400).json({ message: "Transaction not successful" });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
