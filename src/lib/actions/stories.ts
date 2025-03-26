"use server";

import User from "../models/user.model";
import Story from "../models/story.model";
import { verifySession } from "./dal";

type Props = {
  story: string;
  episodes: number;
  title: string;
  genres: string[];
  readingTime: string;
  description: string;
  status: Status;
  coverImage: string;
};

export async function slugify(title: string) {
  let uuid = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    uuid += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const slugString = title
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const findStoryWithSlug = await Story.findOne({ slug: slugString });

  if (!findStoryWithSlug) {
    return slugString;
  }
  return `${slugString}-${uuid}`;
}

export async function postStory(storyData: Props) {
  try {
    const checkUser = await verifySession();
    if (!checkUser) {
      throw new Error("User UnAuthorized");
    }

    const {
      story,
      episodes,
      title,
      genres,
      readingTime,
      description,
      status,
      coverImage,
    } = storyData;

    const slug = await slugify(title);

    const newStory = new Story({
      content: story,
      episodes,
      title,
      readingTime,
      genres,
      description,
      coverImage,
      status,
      author: checkUser.userId,
      slug,
    });

    const newData = await newStory.save();

    return {
      success: true,
      message: `Story ${status} Successfully`,
      slug: newData.slug,
    };
  } catch (error: any) {
    console.log("[POST_STORY_ERROR]: ", error);
    return { success: false, message: error.message };
  }
}

/**
 * A function to update the story visibility
 *
 * @param id The ObjectID of the story
 * @param status the currrent status of the story: `published || saved`
 * @returns `{success: boolean, message: string}`
 */
export async function changeVisibilityAction(id: string, status: Status) {
  const changedStatus = status === "published" ? "saved" : "published";
  try {
    await Story.findOneAndUpdate(
      { _id: id },
      {
        status: changedStatus,
      },
    );

    return { success: true, message: "Story visibility updated" };
  } catch (error: any) {
    console.log("[CHANGE_VISIBILITY_ERROR]: ", error);

    return { success: false, message: error.message };
  }
}

/**
 * Function to delete a particular story
 *
 * @param id the ObjectId of the story
 * @returns `{success: boolean, message: string}`
 */
export async function deleteStoryAction(id: string) {
  try {
    await Story.deleteOne({ _id: id });
    return { success: true, message: "Story deleted successfully" };
  } catch (error: any) {
    console.log("[DELETE_STORY_ERROR]: ", error);

    return { success: false, message: error.message };
  }
}
