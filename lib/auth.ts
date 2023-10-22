import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userSignIn } from "@/lib/services/user.service";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as any;
        const res = await userSignIn(email, password);

        if (res.isOk) {
          return { ...res.user } as any;
        } else if (!res.isOk && res.message) {
          return Promise.reject({ message: res.message });
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token as any;

      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },
};

export default authOptions;
