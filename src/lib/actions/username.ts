"use server";

import { verifySession } from "@/lib/actions/dal";
import { createSession } from "@/lib/actions/jwt";

import User from "@/lib/models/user.model";

/**
 * @param username the username to add to the user DB
 * @returns `{success: boolean, message: string}`
 */
export async function updateUsername(username: string) {
  try {
    const { userId } = await verifySession();
    const checkUserIsInDb = await User.findOne({ username });

    if (checkUserIsInDb) {
      return { success: false, message: "Username already used" };
    }

    const updateUser = await User.findByIdAndUpdate(userId, {
      username,
    });

    await createSession(updateUser?.id, username);

    return { success: true, message: "Username Created Succeddfully" };
  } catch (error) {
    console.log("[POST_USERNAME_ERROR]:", error);

    return {
      success: false,
      message: "Error Createing Username. Try again later",
    };
  }
}
