import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string | null; // Add the role field
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string | null; // Add the role field
  }
}