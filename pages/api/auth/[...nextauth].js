// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            token: user.token,
            balance: user.balance,
            created_at: user.created_at,
            xagonn: user.xagonn,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.first_name = token.first_name;
      session.user.last_name = token.last_name;
      session.user.balance = token.balance;
      session.user.xagonn = token.xagonn;
      session.user.token = token.token;
      session.user.account_type = token.account_type;
      session.user.username = token.username;
      session.user.created_at = token.created_at;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.balance = user.balance;
        token.xagonn = user.xagonn;
        token.token = user.token;
        token.username = user.username;
        token.status = user.status;
        token.account_type = user.account_type;
        token.created_at = user.created_at;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
