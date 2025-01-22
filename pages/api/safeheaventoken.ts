// /pages/api/token.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch("https://api.safehavenmfb.com/oauth2/token", {
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
    });

    const data = await response.json();
    if (!response.ok) {
      // Handle errors
      res.status(response.status).json({ error: data });
      return;
    }

    // Send back the token response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
