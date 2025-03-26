import { verifySession } from "@/lib/actions/dal";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const verifyUser = await verifySession();

    if (!verifyUser.isAuth) {
      return NextResponse.json(
        { success: false, message: "Not Authorized" },
        { status: 401 },
      );
    }

    const getUser = await User.findById(verifyUser.userId);

    if (!getUser) {
      return NextResponse.json(
        { success: false, message: "Not Authorized" },
        { status: 404 },
      );
    }

    const userData = {
      name: getUser.name,
      email: getUser.email,
      avatar: getUser.avatar,
      username: verifyUser.username,
    };

    return NextResponse.json(
      { success: true, data: userData },
      { status: 200 },
    );
  } catch (error) {
    console.error("[GET_USER_EROR]: ", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
