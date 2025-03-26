import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";

import { decrypt } from "./jwt";

/**
 * This is a DAL (Data Action Layer) used to check if the user is Authenticated or not
 *
 * @returns {boolean} the boolean if there is a session, the userId and username
 */

export const verifySession = cache(async () => {
  const cookieStore = (await cookies()).get("talegenie_session")?.value;

  if (!cookieStore) return { isAuth: false, message: "User Not Authorized" };

  const user = (await decrypt(cookieStore)) as {
    userId: string;
    username: string;
  };

  return { isAuth: true, userId: user.userId, username: user.username };
});