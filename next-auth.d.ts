import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // or appropriate type
      first_name: string; // Add fullname here
      last_name: string; // Add fullname here
      email?: string | null;
      image?: string | null;
      balance?: any | null;
      username?: string | null;
    };
  }
}
