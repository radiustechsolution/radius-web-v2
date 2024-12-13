// /pages/api/user.ts

import prisma from "@/lib/prisma"; // Adjust this path based on your Prisma client location
import { getToken } from "next-auth/jwt"; // Import the getToken method from next-auth/jwt

const secret = process.env.NEXTAUTH_SECRET; // Ensure you have this secret set in your environment variables

export default async function handler(req: any, res: any) {
  // Ensure the request method is GET
  if (req.method !== "POST") {
    return res.status(405).json({ status: 405, message: "Method not allowed" });
  }

  try {
    // Fetch the token from the request headers using next-auth's getToken utility
    // const token = await getToken({ req, secret });

    const token = req.headers.authorization?.split(" ")[1]; // Extract the token after "Bearer"

    // If token does not exist, return an unauthorized error
    if (!token) {
      return res
        .status(401)
        .json({ status: 401, message: "Unauthorized access" });
    }

    // Extract user Token or email from the token (depending on how your token is structured)
    const userId = token.sub; // This assumes the token contains the user's ID in the "sub" field

    // Fetch user data from the database
    const user = await prisma.user.findFirst({
      where: { token: userId },
    });

    // If the user does not exist, return a 404 error
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Respond with the user data
    return res.status(200).json({
      status: 200,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
}
