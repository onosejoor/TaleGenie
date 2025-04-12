import User from "@/lib/models/user.model";
import Story from "@/lib/models/story.model";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const headers = req.headers;
    const searchParams = req.nextUrl.searchParams;

    const { page, limit, status } = Object.fromEntries(searchParams) as {
      page: string;
      limit: string;
      status: string;
    };

    const nextPage = parseInt(page) || 1;
    const documentLimit = parseInt(limit) || 6;

    const userId = headers.get("userId");
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID header required" },
        { status: 400 },
      );
    }

    const checkUser = await User.findById(userId);

    if (!checkUser) {
      return NextResponse.json(
        { success: false, message: "User Not Found" },
        { status: 404 },
      );
    }

    if (status) {
      const getStories = await Story.find({
        author: userId,
        status: { $regex: status },
      })
        .skip((nextPage - 1) * documentLimit)
        .sort({ createdAt: -1 })
        .limit(documentLimit)
        .exec();

      return NextResponse.json({ success: true, stories: getStories });
    }

    const getStories = await Story.find({ author: userId })
      .skip((nextPage - 1) * documentLimit)
      .sort({ createdAt: -1 })
      .limit(documentLimit)
      .exec();

    return NextResponse.json({ success: true, stories: getStories });
  } catch (error: any) {
    console.log("[GET_USER_STORIES_ERROR]: ", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error, try again" },
      { status: 500 },
    );
  }
}
