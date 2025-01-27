// pages/api/webhook.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { generateRef } from "@/lib/functions";
import { sendEmail } from "@/lib/sendmail";
import { sendWhatsappMessage } from "@/lib/sendWhatsapp";
import { siteConfig } from "@/config/site";

const prisma = new PrismaClient();

export default async function webhook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Log the entire payload
    console.log("Flutterwave webhook payload:", req.body);

    const event = req.body;

    // Extract the relevant details from the event payload
    const { status, id, tx_ref, app_fee, flw_ref, amount, customer, currency } =
      event.data;

    const { email, id: user_id } = customer;

    if (status === "successful") {
      // Check if id already exist
      const transaction = await prisma.transactions.findFirst({
        where: {
          x_ref: String(id),
          trans_type: "wallet_funding",
          status: "successful",
        },
      });

      if (transaction) {
        return res.status(500).json({ message: "Transaction already exist" });
      }

      // Find the user in the database using their email or customer ID
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const creditableAmount = amount - app_fee;

      // check if this is users first time funding
      const checkUserTransaction = await prisma.transactions.findFirst({
        where: {
          user_id: String(user.id),
          trans_type: "wallet_funding",
          status: "successful",
        },
      });

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
          narration: `Wallet funding (${currency})`,
        },
      });

      try {
        await sendEmail(
          siteConfig.adminEmail,
          `Customer wallet funding. Name: ${user.first_name} ${user.last_name} Email: ${email} Phone Number: ${user.phone_number} Amount: ${creditableAmount}, Old Balance: ${user.balance}, New Balance: ${updatedUser.balance} `,
          "New Wallet Funding"
        );
        await sendWhatsappMessage(
          `Customer wallet funding. Name: ${user.first_name} ${user.last_name} Email: ${email} Phone Number: ${user.phone_number} Amount: ${creditableAmount}`
        );
      } catch (emailError) {
        console.error("Wallet funding:", emailError);
      }

      if (!checkUserTransaction) {
        // Check if user was invited
        if (user.invited_by !== "" && user.invited_by !== "Radius") {
          // Get 15 percent
          let referBonus = creditableAmount * 0.15;

          if (referBonus > 200) {
            referBonus = 200;
          }

          // Resolve Referral
          const referral = await prisma.user.findFirst({
            where: {
              username: String(user.invited_by),
            },
          });

          if (referral) {
            const updateReferral = await prisma.user.update({
              where: { username: String(user.invited_by) },
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
                txf: String(generateRef("RB", user.id)),
                amount: referBonus,
                balance_before: referral.balance,
                balance_after: updateReferral.balance,
                status: "successful",
                narration: "Referral bonus",
              },
            });

            try {
              // await sendEmail(
              //   referral.email,
              //   `Congratulations. Your radius account has been credited with the sum of Amount: ${referBonus} from your referred first wallet deposit.`,
              //   "Referring Bonus Received!"
              // );
            } catch (emailError) {
              console.error("Referal funding bonus error:", emailError);
            }
          }
        }
      }

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
