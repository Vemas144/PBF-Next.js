import { signInWithGoogle, signIn } from "@/utils/db/servicefirebase";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";


export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user: any = await signIn(credentials.email as string);

        // ✅ CHECK USER EXISTS
        if (!user) {
          return null;
        }

        // ✅ CHECK PASSWORD
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        // ✅ RETURN USER JIKA VALID
        if (isPasswordValid) {
          return {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
          };
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }

      // login dengan Google
      if (account?.provider === "google") {
        const data = {
          fullname: user?.name,
          email: user?.email,
          image: user?.image,
          type: account.provider,
        };

        await signInWithGoogle(data, (result: any) => {
          if (result.status) {
            token.fullname = data.fullname;
            token.email = data.email;
            token.image = data.image;
            token.type = data.type;
          }
        });
      }

      // login dengan GitHub
      if (account?.provider === "github") {
        const data = {
          fullname: user?.name,
          email: user?.email,
          image: user?.image,
          type: account.provider,
        };

        await signInWithGoogle(data, (result: any) => {
          if (result.status) {
            token.fullname = data.fullname;
            token.email = data.email;
            token.image = data.image;
            token.type = data.type;
          }
        });
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token.email) {
        session.user.email = token.email;
      }
      if (token.fullname) {
        session.user.fullname = token.fullname;
      }
      if (token.image) {
        session.user.image = token.image;
      }
      if (token.role) {
        session.user.role = token.role;
      }
      if (token.type) {
        session.user.type = token.type;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);