// /pages/api/Auth.ts
import { NextApiRequest, NextApiResponse } from "next";

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

    if (!apiKey || !clientSecret) {
      res.status(400).json({ error: "API Key or Client Secret missing" });
      return;
    }

    // Encode the API Key and Client Secret
    const encodedCredentials = base64Encode(apiKey, clientSecret);

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

    if (!response.ok) {
      // Handle errors returned by the Monnify API
      res.status(response.status).json({ error: data });
      return;
    }

    console.log(data);

    // Send back the access token
    res.status(200).json(data);
  } catch (error) {
    console.error("Error during Monnify authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
