import { redirect } from "next/navigation";

import { verifySession } from "@/lib/actions/dal";
import User from "@/lib/models/user.model";

import ProfileSettings from "./Form";

export const metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const { userId, isAuth } = await verifySession();

  if (!isAuth) {
    redirect("/signin");
  }

  const getUser = await User.findById(userId);

  const { name, avatar, username, email, bio } = getUser!;

  const data = { name, avatar, username, email, bio };

  return <ProfileSettings data={data} />;
}
