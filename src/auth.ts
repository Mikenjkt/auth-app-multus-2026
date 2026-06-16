import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
  credentials: {
    email: {},
    password: {},
  },
  async authorize(credentials) {
    if (!credentials) {
      console.log("❌ Debug: No credentials provided");
      return null;
    }

    const email = credentials.email as string;
    const password = credentials.password as string;
    console.log(`🔍 Debug: Attempting login for email: ${email}`);

    // 1. Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("❌ Debug: User not found in database");
      return null;
    }

    console.log("✅ Debug: User found, verifying password...");

    // 2. Check if password is valid
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      console.log("❌ Debug: Password mismatch");
      return null;
    }

    console.log("🎉 Debug: Login successful!");
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  },
}),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.role = String(token.role);
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
});