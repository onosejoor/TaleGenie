import { createSession } from "@/lib/actions/jwt";
import OTP from "@/lib/models/otp.model";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

type IFormData = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const formData: IFormData = await req.json();

  const { name, email, username, password } = formData;

  try {
    const newUser = new User({
      name,
      email,
      password,
      username,
    });

    const savedUser = await newUser.save();

    await OTP.deleteOne({ email });

    await createSession(savedUser.id, savedUser.username);

    return NextResponse.json(
      { success: true, message: "User Created Successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log("[SERVER_SIGNUP_POST_ERROR]: " + error);
    return NextResponse.json(
      { sucess: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
