// lib/bullQueue.ts
import Bull from "bull";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

// Create a new Bull queue
const bankAccountQueue = new Bull("bankAccountQueue", {
  redis: {
    host: "localhost", // Replace with your Redis server host
    port: 6379, // Replace with your Redis server port
  },
});

// Process the queue
bankAccountQueue.process(async (job) => {
  const { userId, email, firstName, lastName, phoneNumber } = job.data;

  try {
    const ref = `VA-${userId}-${Date.now()}`;

    // Call Flutterwave API to create a virtual account for the customer
    const flutterwaveResponse = await axios.post(
      "https://api.flutterwave.com/v3/virtual-account-numbers",
      {
        email,
        is_permanent: true,
        bvn: "22366804906",
        tx_ref: ref,
        firstname: firstName,
        lastname: lastName,
        narration: `${firstName} ${lastName}`,
        phonenumber: phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );

    // Extract account details from the response
    const { account_number, bank_name } = flutterwaveResponse.data.data;

    // Store the virtual account in the database
    await prisma.virtual_accounts.create({
      data: {
        customer_id: userId,
        account_id: ref,
        account_reference: ref,
        account_number,
        account_name: `${firstName} ${lastName}`,
        bank_name,
        bank_code: "1234",
      },
    });

    console.log("Bank account created successfully");
  } catch (error) {
    console.error("Error creating bank account:", error);
    throw new Error("Failed to create bank account");
  }
});

export default bankAccountQueue;
