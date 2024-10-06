// pages/api/refresh-session.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function refreshSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Invalid request" });
  }

  // Fetch updated user info
  const updatedUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // Trigger JWT callback for updating session
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Update token with new balance and any other fields you need
  token.balance = updatedUser.balance;

  return res.status(200).json({ message: "Session refreshed successfully!" });
}
