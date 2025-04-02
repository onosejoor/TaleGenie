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
            return `/create?username=${user.username}`;
          }

          const { name, email, picture } = profile;
          const newUser = new User({
            name,
            email,
            avatar: picture,
            password: process.env.GOOGLE_CODE!,
            username: null,
          });

          const savedData = await newUser.save();
          await createSession(savedData.id, savedData.username);

          return `/create-username`;
        }
        return false;
      } catch (error) {
        console.error("[GOOGLE_AUTH_ERROR] : ", error);

        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      const urlObj = new URL(url, baseUrl);
      const username = urlObj.searchParams.get("username");
      if (!username && url.startsWith("/")) {
        return `${baseUrl}/create-username`;
      }
      return `${baseUrl}/create`;
    },
  },
});
