import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email?: string | null;
      image?: string | null;
      balance?: any | null;
      xagonn?: any | null;
      username?: string | null;
      account_number?: string | null;
      account_name?: string | null;
      bank_name?: string | null;
      phone_number?: string | null;
    };
  }
}
