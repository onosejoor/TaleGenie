"use server";

import Story from "../models/story.model";
import { verifySession } from "./dal";

/**
 * A server action to get the single story based on the unique slug provided
 * @param slug The url slug of the story
 * @returns `{success: boolean, code: number, message?: string}`
 */
export async function getSingleStory(slug: string) {
  try {
    const verify = (await verifySession()) || {};

    const retrieveStories = await Story.findOne({
      slug,
    })
      .populate<{ author: IUser }>("author")
      .lean();

    if (!retrieveStories || !retrieveStories.author) {
      return { success: false, code: 404 };
    }

    const isOwner =
      verify.isAuth && verify.username === retrieveStories.author.username;

    if (!isOwner && retrieveStories.status !== "published") {
      return { success: false, code: 404 };
    }

    return { success: true, story: retrieveStories };
  } catch (error) {
    console.error("[GET_STORY_BY_SLUG_ERR0R]: ", error);

    return {
      success: false,
      code: 500,
      message: "Internal Server Error, try again",
    };
  }
}
