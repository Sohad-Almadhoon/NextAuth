import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifingPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const user = await client.db().collection("users").findOne({
          email: credentials.email,
        });
        console.log(user);
        if (!user) {
          client.close();
          throw new Error("No user is found!");
        }
        const checkPassword = await verifingPassword(
          credentials.password,
          user.password
        );
        if (!checkPassword) {
          client.close();
          throw new Error("Password isn't correct");
        }
        client.close();
        return {
          email: user.email,
            };
      },
    }),
  ],
});
