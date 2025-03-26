import NextAuth from "next-auth";
import User from "./lib/models/user.model";
import Google from "next-auth/providers/google";
import { createSession } from "./lib/actions/jwt";
import { verifySession } from "./lib/actions/dal";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      name: "google",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      try {
        if (account?.provider === "google" && profile?.email_verified) {
          const user = await User.findOne({ email: profile.email });

          if (user) {
            await createSession(user.id, user.username);

            return true;
          }

          const { name, email, picture, preferred_username } = profile;
          const newUser = new User({
            name,
            email,
            avatar: picture,
            password: process.env.GOOGLE_CODE!,
            username: preferred_username ?? null,
          });

          const savedData = await newUser.save();

          await createSession(savedData.id, savedData.username);

          return true;
        }
        return false;
      } catch (error) {
        console.error("[GOOGLE_AUTH_ERROR] : ", error);

        return false;
      }
    },

    async redirect({ url, baseUrl }) {
      try {
        const session = await verifySession();
        if (!session.username && url.startsWith("/")) {
          return `${baseUrl}/create-username`;
        }

        return `${baseUrl}/create`;
      } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return url;
      }
    },
  },
});
