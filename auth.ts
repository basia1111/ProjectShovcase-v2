import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import verifyUser from "@lib/auth/verifyUser";
import { findUser } from "@lib/user/findUser";
import { registerGoogle } from "@lib/auth/registerGoogle";

type Profile = {
  email: string;
  name: string;
  picture: string;
};
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = (credentials?.email ?? "") as string;
        const password = (credentials?.password ?? "") as string;

        try {
          const user = await verifyUser(email, password);
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return `${baseUrl}/my-profile`;
    },
    async jwt({ token, account, profile, trigger, session, user }) {
      if (account?.provider === "google") {
        const { email, name, picture } = profile as Profile;

        let googleUser = await findUser(email);
        if (!googleUser) {
          googleUser = await registerGoogle({ name, email, image: picture });
        }
        token.id = googleUser.id;
        token.name = googleUser.name;
        token.email = googleUser.email;
        token.image = googleUser.image;
      } else if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      if (trigger === "update") {
        token.image = session.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name,
          image: token.image as string | null,
          emailVerified: null,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
