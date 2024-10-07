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
        password: { label: "Password", type: "password", optional: true },
        xagonn: { label: "Xagonn", type: "text", optional: true }, // Custom field
      },
      async authorize(credentials) {
        // Scenario 1: Client login with email and password
        if (credentials.password) {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: {
              virtual_accounts: true, // Fetch related virtual account(s)
            },
          });

          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            // Check if user has any virtual accounts
            if (user.virtual_accounts.length > 0) {
              // Extract the first virtual account data
              const { account_number, account_name, bank_name } =
                user.virtual_accounts[0];
              return {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username,
                token: user.token,
                balance: user.balance,
                created_at: user.created_at,
                phone_number: user.phone_number,
                account_number: account_number,
                account_name: account_name,
                bank_name: bank_name,
              };
            } else {
              return {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username,
                token: user.token,
                balance: user.balance,
                created_at: user.created_at,
                phone_number: user.phone_number,
              };
            }
          }
        }

        // Scenario 2: Your internal login with email and xagonn
        if (credentials.xagonn) {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: {
              virtual_accounts: true, // Fetch related virtual account(s) based on customer_id
            },
          });

          if (user && credentials.xagonn === "sampleregex") {
            // Check if user has a virtual account
            if (user.virtual_accounts.length > 0) {
              // Extract the first virtual account data
              const { account_number, account_name, bank_name } =
                user.virtual_accounts[0];
              return {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username,
                phone_number: user.phone_number,
                token: user.token,
                balance: user.balance,
                created_at: user.created_at,
                account_number: account_number,
                account_name: account_name,
                bank_name: bank_name,
              };
            } else {
              return {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username,
                phone_number: user.phone_number,
                token: user.token,
                balance: user.balance,
                created_at: user.created_at,
              };
            }
          }
        }

        // Return null if neither of the scenarios match
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
      session.user.email = token.email;
      session.user.token = token.token;
      session.user.account_type = token.account_type;
      session.user.username = token.username;
      session.user.phone_number = token.phone_number;
      session.user.created_at = token.created_at;
      session.user.account_name = token.account_name;
      session.user.account_number = token.account_number;
      session.user.bank_name = token.bank_name;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.balance = user.balance;
        token.email = user.email;
        token.token = user.token;
        token.username = user.username;
        token.status = user.status;
        token.phone_number = user.phone_number;
        token.account_type = user.account_type;
        token.created_at = user.created_at;
        token.account_name = user.account_name;
        token.account_number = user.account_number;
        token.bank_name = user.bank_name;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
