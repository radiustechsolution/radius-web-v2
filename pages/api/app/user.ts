import prisma from "@/lib/prisma"; // Adjust this path based on your Prisma client location
import jwt from "jsonwebtoken"; // Import jwt to decode the token

const secret: any = process.env.NEXTAUTH_SECRET; // Ensure you have this secret set

export default async function handler(req: any, res: any) {
  // Ensure the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ status: 405, message: "Method not allowed" });
  }

  try {
    // Fetch the token from the request headers
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1]; // Extract the token after "Bearer"

    // If token does not exist, return an unauthorized error
    if (!token) {
      return res
        .status(401)
        .json({ status: 401, message: "Unauthorized access" });
    }

    // Decode the token using jwt.verify
    const decodedToken = jwt.verify(token, secret);

    // Extract user ID or email from the decoded token
    const userId = decodedToken.sub; // Assuming the token contains 'sub' as user ID

    // Fetch user data from the database
    const user = await prisma.user.findUnique({
      where: { id: userId }, // Assuming you use userId as primary key
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
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
}
