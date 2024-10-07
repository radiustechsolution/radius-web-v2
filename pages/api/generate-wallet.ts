// pages/api/generate-wallet
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { first_name, last_name, email, phone_number, userId } = req.body;
  const ref = `VA-${userId}-${Date.now()}`;

  // Check if the Flutterwave secret key is defined
  //   if (!process.env.FLW_SECRET_KEY) {
  //     return res.status(500).json({ message: "Internal server error" });
  //   }

  console.log("Got First");

  try {
    console.log("Got Second");
    // Perform the request to Flutterwave API
    const response = await fetch(
      "https://api.flutterwave.com/v3/virtual-account-numbers",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          is_permanent: true,
          bvn: "22366804906",
          tx_ref: ref,
          firstname: first_name,
          lastname: last_name,
          narration: `${first_name} ${last_name}`,
          phonenumber: phone_number,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer FLWSECK-9f573cb00dfd500f1e2ba364198529cf-18c83938749vt-X",
        },
      }
    );

    console.log("Got Third");

    // Check if the response is okay
    if (!response.ok) {
      console.log("Got Fourt");
      const errorResponse = await response.json();
      return res.status(response.status).json({
        message: errorResponse.message || "Failed to create virtual account",
      });
    }

    const resJson = await response.json();

    console.log(resJson);

    // Check if the necessary data is present
    if (!resJson.data) {
      return res
        .status(500)
        .json({ message: "No data received from Flutterwave" });
    }

    const { account_number, bank_name } = resJson.data;

    // Store the virtual account in the database
    await prisma.virtual_accounts.create({
      data: {
        customer_id: Number(userId),
        account_id: ref,
        account_reference: ref,
        account_number,
        account_name: `${first_name} ${last_name}`,
        bank_name,
        bank_code: "1234",
      },
    });

    return res
      .status(200)
      .json({ message: "Virtual account created successfully" });
  } catch (error: any) {
    console.error("Error creating virtual account:", error);
    return res.status(500).json({
      message: "An error occurred while creating the virtual account.",
      error: error.message,
    });
  }
}
