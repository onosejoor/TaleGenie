"use server";

import { User } from "../models/index";
import { verifySession } from "./dal";
import { createSession } from "./jwt";
import uploadImage from "./uploadImage";

type Props = {
  username?: string;
  imgFile?: File;
  name?: string;
  bio?: string;
};

type UploadPayload = Props & {
  avatar?: string;
};

/**
 * Server action to update the user details.
 *
 * @param {Props} data - The user profile data to update.
 *
 * @returns `{ success: boolean; message: string }` A promise that resolves with an object indicating the success state and a message.
 */
export async function updateProfileAction(data: Props) {
  try {
    const { userId } = await verifySession();
    const { username, imgFile, name, bio } = data;

    if (username) {
      const findUser = await User.findOne({ username });

      if (findUser) {
        return { success: false, message: "Username already used" };
      }
    }

    const updatePayload: UploadPayload = {
      username,
      name,
      bio,
    };

    if (imgFile) {
      const { success, image } = await uploadImage(imgFile);

      if (success) {
        updatePayload.avatar = image;
      }
    }

    await User.findByIdAndUpdate(userId, updatePayload);

    if (username) {
      await createSession(userId!, username);
    }

    return { success: true, message: "Profile Updated Successfully" };
  } catch (error) {
    console.log("[UPDATE_USER_PROFILE_ERROR]: ", error);
    return { success: false, message: "Internal Error, try again" };
  }
}
