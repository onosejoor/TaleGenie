import Story from "@/lib/models/story.model";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const { page, limit, keyword } = Object.fromEntries(searchParams) as {
      page: string;
      limit: string;
      keyword: string;
    };

    const nextPage = parseInt(page) || 1;
    const documentLimit = parseInt(limit) || 6;

    if (keyword) {
      const findStoryByQuery = await Story.find({
        title: new RegExp(keyword, "i"),
        status: "published",
      })
        .skip((nextPage - 1) * documentLimit)
        .sort({ createdAt: -1 })
        .limit(documentLimit)
        .populate<{ author: IUser }>("author")
        .lean();

      if (!findStoryByQuery) {
        return NextResponse.json(
          { success: false, message: "The search provided 0 results" },
          { status: 404 },
        );
      }

      return NextResponse.json({ success: true, stories: findStoryByQuery });
    }

    const getStories = await Story.find({
      status: "published",
    })
      .skip((nextPage - 1) * documentLimit)
      .sort({ createdAt: -1 })
      .limit(documentLimit)
      .populate<{ author: IUser }>("author")
      .lean();

    return NextResponse.json({ success: true, stories: getStories });
  } catch (error: any) {
    console.log("[GET_USER_STORIES_ERROR]: ", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
