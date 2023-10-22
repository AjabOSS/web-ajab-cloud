import NextAuth from "next-auth";
import { IUser } from "@/types/interfaces";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}
