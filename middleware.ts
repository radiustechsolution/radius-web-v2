import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { siteConfig } from "./config/site";

// Define protected routes that require the user to be authenticated
const protectedRoutes = [siteConfig.paths.dashboard];

export async function middleware(req: NextRequest) {
  try {
    // Get the session token
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl;

    // Handle protected routes (e.g., /dashboard)
    if (protectedRoutes.includes(pathname)) {
      // If no session exists, redirect to /signin
      if (!session) {
        const signInUrl = new URL(siteConfig.paths.signin, req.url);
        return NextResponse.redirect(signInUrl);
      }
    }

    // Redirect to /dashboard if user is already signed in and trying to access /signin or /signup
    if (
      (pathname === siteConfig.paths.signin ||
        pathname === siteConfig.paths.signup) &&
      session
    ) {
      const dashboardUrl = new URL(siteConfig.paths.dashboard, req.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // Optionally handle offline mode
    // if (!navigator.onLine) {
    //   const offlineUrl = new URL("/offline", req.url); // assuming you have an offline page
    //   return NextResponse.redirect(offlineUrl);
    // }

    // Continue to the requested page
    return NextResponse.next();
  } catch (error: any) {
    console.error("Error in middleware:", error);
    const errorUrl = new URL(siteConfig.paths.error, req.url);
    return NextResponse.redirect(errorUrl);
  }
}

// Paths middleware should run on
export const config = {
  matcher: [
    "/dashboard", // Assuming this is the route for chatHome
    "/auth/signup",
    "/auth/signin",
  ],
};
