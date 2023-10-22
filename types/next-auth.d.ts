import { IUser } from "@/types/interfaces";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}
