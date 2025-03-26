import User from "../models/user.model";

export async function getUserProfile(username: string) {
  try {
    const getUser = await User.findOne({ username });

    if (!getUser) {
      return { success: false, code: 404 };
    }
    return { success: true, user: getUser };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Internal Error, try again",
    };
  }
}
