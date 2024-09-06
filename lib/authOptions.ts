import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const { email, name } = user;

      if (account?.provider === "google") {
        try {
          await connectMongoDB();
          const existingUser = await User.findOne({ email });

          if (!existingUser) {
            await User.create({
              name,
              email,
              role: "student",
            });
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token?.email) {
        await connectMongoDB();
        const user = await User.findOne({ email: token.email });
        session.user.role = user?.role || "student";
      }
      return session;
    },
  },
};