// /pages/api/Auth.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs"; // Import dayjs to handle date comparisons
const prisma = new PrismaClient(); // Initialize Prisma Client

// Function to base64 encode the API Key and Secret Key
function base64Encode(apiKey: string, clientSecret: string) {
  return Buffer.from(`${apiKey}:${clientSecret}`).toString("base64");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Retrieve the API Key and Secret Key from environment variables
    const apiKey = process.env.MONNIFY_API_KEY;
    const clientSecret = process.env.MONNIFY_SEC_KEY;

    // Fetch the admin user by ID (adjust based on your logic)
    const adminUser = await prisma.user.findUnique({
      where: {
        id: 232, // Specify the admin ID or adjust based on your logic
      },
    });

    if (!apiKey || !clientSecret) {
      res.status(400).json({ error: "API Key or Client Secret missing" });
      return;
    }

    // Encode the API Key and Client Secret
    const encodedCredentials = base64Encode(apiKey, clientSecret);

    if (adminUser) {
      // Check if the token is older than 30 minutes
      const thirtyMinutesAgo = dayjs().subtract(30, "minutes");

      // if (dayjs(adminUser.created_at).isBefore(thirtyMinutesAgo)) {
      // console.log("Older");
      // Make the POST request to Monnify to get the access token
      const response = await fetch(
        `${process.env.MONNIFY_BASE_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${encodedCredentials}`, // Add the Base64-encoded API Key and Client Secret
            "Content-Type": "application/json", // Set the content type
          },
        }
      );

      const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        // Handle errors returned by the Monnify API
        res.status(response.status).json({ error: data });
        return;
      }

      // Update the token in the "safe" column of the admin table
      await prisma.user.update({
        where: {
          id: 232, // Specify the admin ID or adjust based on your logic
        },
        data: {
          pin: data.responseBody.accessToken, // token
          created_at: new Date(), // Update created_at to the current timestamp
        },
      });

      // console.log(data);
      // Send back the access token
      res.status(200).json(data);
      // } else {
      //   // If the token is still valid (less than 30 minutes old), send the current token
      //   res.status(200).json({ access_token: adminUser.pin });
      // }
    } else {
      // Handle case where admin user is not found
      res.status(404).json({ error: "Admin user not found" });
    }
  } catch (error) {
    console.error("Error during Monnify authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
