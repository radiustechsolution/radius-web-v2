import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const accountSid =
    process.env.TWILIO_ACCOUNT_SID || "AC4aa7b8a7a414879d25535dd6c33f063f";
  const authToken = process.env.TWILIO_AUTH_TOKEN || "[AuthToken]";

  const client = twilio(accountSid, authToken);

  try {
    const { to, contentSid, contentVariables } = req.body;

    const message = await client.messages.create({
      to: `whatsapp:${to}`,
      from: "whatsapp:+14155238886", // Twilio's WhatsApp sandbox number
      contentSid: contentSid || "HXb5b62575e6e4ff6129ad7c8efe1f983e",
      contentVariables: JSON.stringify(
        contentVariables || { "1": "12/1", "2": "3pm" }
      ),
    });

    res
      .status(200)
      .json({ message: "Message sent successfully", sid: message.sid });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error });
  }
}
