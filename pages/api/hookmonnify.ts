// pages/api/webhook.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
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
    // Log the Monnify webhook payload
    console.log("Monnify webhook payload:", req.body);

    const event = req.body;

    // Extract relevant data from Monnify's payload
    const {
      transactionReference,
      amountPaid,
      // totalPayable,
      settlementAmount,
      paymentStatus,
      customer,
    } = event.eventData;

    const { email } = customer;

    if (
      event.eventType === "SUCCESSFUL_TRANSACTION" &&
      paymentStatus === "PAID"
    ) {
      // Check if the transactionReference already exists
      const transaction = await prisma.transactions.findFirst({
        where: {
          x_ref: transactionReference,
          trans_type: "wallet_funding",
          status: "successful",
        },
      });

      if (transaction) {
        return res.status(500).json({ message: "Transaction already exists" });
      }

      // Find the user in the database using their email
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        // Payload to send to the external endpoint
        const event = req.body; // Use the request body as the payload
        const externalUrl = "https://appapi.radiustech.com.ng/v1/hook/monnify";

        try {
          // Send the payload to the external endpoint using Fetch API
          const response = await fetch(externalUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(event), // Convert the payload to JSON
          });

          // Check if the request was successful
          if (!response.ok) {
            throw new Error(
              `External API returned ${response.status}: ${response.statusText}`
            );
          }

          // Parse the response from the external API
          const responseData = await response.json();

          // Log the response from the external API
          console.log("External API Response:", responseData);

          // Return a 404 response to the client
          return res.status(404).json({
            message: "User not found",
            externalApiResponse: responseData,
          });
        } catch (error) {
          // Log the error if the request fails
          // console.error('Error sending payload to external API:', error.message);
        }
        return res.status(404).json({ message: "User not found" });
      }

      const creditableAmount = parseFloat(settlementAmount);

      // Check if this is the user's first time funding the wallet
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
          x_ref: transactionReference,
          trans_type: "wallet_funding",
          txf: String(generateRef("FUND", user.id)),
          amount: creditableAmount,
          amount_sent: amountPaid,
          balance_before: user.balance,
          balance_after: updatedUser.balance,
          status: "successful",
          narration: `Wallet funding (NGN)`,
        },
      });

      // Notify admin or perform other actions
      try {
        await sendEmail(
          siteConfig.adminEmail,
          `Customer wallet funding. Name: ${user.first_name} ${user.last_name} Email: ${email} Amount: ${creditableAmount}, Old Balance: ${user.balance}, New Balance: ${updatedUser.balance}`,
          "New Wallet Funding"
        );
        // await sendWhatsappMessage(
        //   `Customer wallet funding. Name: ${user.first_name} ${user.last_name} Email: ${email} Amount: ${creditableAmount}`
        // );
      } catch (emailError) {
        console.error("Wallet funding notification error:", emailError);
      }

      // if (!checkUserTransaction) {
      //   // Handle referral bonus logic (optional)
      //   if (user.invited_by && user.invited_by !== "Radius") {
      //     let referBonus = creditableAmount * 0.15;
      //     if (referBonus > 200) referBonus = 200;

      //     const referral = await prisma.user.findFirst({
      //       where: { username: String(user.invited_by) },
      //     });

      //     if (referral) {
      //       const updateReferral = await prisma.user.update({
      //         where: { username: String(user.invited_by) },
      //         data: {
      //           balance: {
      //             increment: referBonus,
      //           },
      //         },
      //       });

      //       await prisma.transactions.create({
      //         data: {
      //           user_id: String(referral.id),
      //           type: "credit",
      //           trans_type: "referral",
      //           txf: String(generateRef("RB", user.id)),
      //           amount: referBonus,
      //           balance_before: referral.balance,
      //           balance_after: updateReferral.balance,
      //           status: "successful",
      //           narration: "Referral bonus",
      //         },
      //       });

      //       // Send referral bonus email notification (optional)
      //       try {
      //         // Uncomment this to send the referral bonus email
      //         // await sendEmail(
      //         //   referral.email,
      //         //   `Congratulations! You've received a referral bonus of NGN ${referBonus} from ${user.first_name} ${user.last_name}'s wallet funding.`,
      //         //   "Referral Bonus Received"
      //         // );
      //       } catch (emailError) {
      //         console.error("Referral bonus notification error:", emailError);
      //       }
      //     }
      //   }
      // }

      return res
        .status(200)
        .json({ message: "Monnify webhook processed successfully" });
    } else {
      return res.status(400).json({ message: "Transaction not successful" });
    }
  } catch (error) {
    console.error("Error handling Monnify webhook:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
