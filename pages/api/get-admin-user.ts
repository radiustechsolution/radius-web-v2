import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // assuming you're using Prisma

type Data = {
  adminUser?: any;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // Query the admin user from the user table with id = 232
    const adminUser = await prisma.user.findUnique({
      where: {
        id: 232,
      },
    });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Return the admin user data
    return res.status(200).json({ adminUser });
  } catch (error) {
    console.error("Error fetching admin user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
