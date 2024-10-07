// pages/api/webhook.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { generateRef } from "@/lib/functions";

const prisma = new PrismaClient();

export default async function webhook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Verify Flutterwave's signature to ensure the webhook is authentic
    // const signature = req.headers["verif-hash"];
    // const secretHash = process.env.FLW_SECRET_HASH;

    // const hash = crypto
    //   .createHash("sha256")
    //   .update(JSON.stringify(req.body))
    //   .digest("hex");

    // // Check if the signature matches the hash of the request body
    // if (signature !== hash) {
    //   return res.status(401).json({ message: "Invalid signature" });
    // }

    // Log the entire payload
    console.log("Flutterwave webhook payload:", req.body);

    const event = req.body;

    // Extract the relevant details from the event payload
    const { status, id, tx_ref, app_fee, flw_ref, amount, customer, currency } =
      event.data;

    const { email, id: user_id } = customer;

    if (status === "successful") {
      // Find the user in the database using their email or customer ID
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const creditableAmount = amount - app_fee;

      // Update the user's wallet balance
      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: {
          balance: {
            increment: creditableAmount,
          },
        },
      });

      // Create a transaction record
      await prisma.transactions.create({
        data: {
          user_id: String(user.id),
          type: "credit",
          x_ref: String(id),
          trans_type: "wallet_funding",
          txf: String(generateRef("FUND", user.id)),
          amount: creditableAmount,
          amount_sent: amount,
          balance_before: user.balance,
          balance_after: updatedUser.balance,
          status: "successful",
          narration: `Wallet funding via Flutterwave (${currency})`,
        },
      });

      return res
        .status(200)
        .json({ message: "Webhook processed successfully" });
    } else {
      return res.status(400).json({ message: "Transaction not successful" });
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
