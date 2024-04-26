import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import * as bcrypt from "bcrypt";
import CredentialProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
export const authOptions: AuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentails",
      credentials: {
        userName: {
          label: "User Name",
          type: "text",
          placeholder: "Your Email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.userName,
          },
        });
        if (!user) throw new Error("use name or password is not correct");
        if (!credentials?.password)
          throw new Error("Please Provide your password");
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect)
          throw new Error("user name or password is not correct");
        const { password, ...userWithOutPass } = user;
        return userWithOutPass;
      },
    }),
  ],
};
const handler=NextAuth(authOptions)

export {handler as GET, handler as POST}