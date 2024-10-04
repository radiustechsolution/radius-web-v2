import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // or appropriate type
      fullname: string; // Add fullname here
      email?: string | null;
      image?: string | null;
      balance?: any | null;
    };
  }
}
