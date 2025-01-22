// /pages/api/token.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs"; // Import dayjs to handle date comparisons
const prisma = new PrismaClient(); // Initialize Prisma Client

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch the admin user by ID (adjust based on your logic)
    const adminUser = await prisma.user.findUnique({
      where: {
        id: 232, // Specify the admin ID or adjust based on your logic
      },
    });

    // Check if created_at is more than 30 minutes old
    if (adminUser) {
      const thirtyMinutesAgo = dayjs().subtract(30, "minutes");

      if (dayjs(adminUser.created_at).isBefore(thirtyMinutesAgo)) {
        // If the created_at is older than 30 minutes, refresh the token
        const response = await fetch(
          "https://api.safehavenmfb.com/oauth2/token",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              grant_type: "client_credentials",
              client_assertion_type:
                "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
              client_id: process.env.HavenOAuthClientID, // Use environment variables for sensitive data
              client_assertion: process.env.HavenClientAAssertion, // Store your JWT token securely
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          // Handle errors
          res.status(response.status).json({ error: data });
          return;
        }

        // Update the token in the "safe" column of the admin table
        await prisma.user.update({
          where: {
            id: 232, // Specify the admin ID or adjust based on your logic
          },
          data: {
            pin: data.access_token, // token
            password: data.ibs_client_id, // ibs_client_id
            created_at: new Date(), // Update created_at to the current timestamp
          },
        });

        // Send back the refreshed token response
        res.status(200).json(data);
      } else {
        // If the token is still valid (less than 30 minutes old), send the current token
        res.status(200).json({ access_token: adminUser.pin });
      }
    } else {
      // Handle case where admin user is not found
      res.status(404).json({ error: "Admin user not found" });
    }
  } catch (error) {
    console.error("Error fetching token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
