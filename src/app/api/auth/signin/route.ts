import { createSession } from "@/lib/actions/jwt";
import User from "@/lib/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

type IFormData = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const formData: IFormData = await req.json();

  const { email, password } = formData;

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return NextResponse.json(
        {
          success: false,
          message: `User ${email} is not registered on TaleGenie`,
        },
        { status: 409 },
      );
    }

    const verifyPasswords = await bcrypt.compare(password, checkUser.password);

    if (!verifyPasswords) {
      return NextResponse.json(
        { success: false, message: `Incorrect Password` },
        { status: 403 },
      );
    }

    await createSession(checkUser.id, checkUser.username);

    return NextResponse.json(
      { success: true, message: `Welcome ${checkUser.username}` },
      { status: 200 },
    );
  } catch (error) {
    console.log("[SERVER_SIGNIN_POST_ERROR]: " + error);

    return NextResponse.json(
      { sucess: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
