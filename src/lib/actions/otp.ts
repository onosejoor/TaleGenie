"use server";

import OTP from "../models/otp.model";
import User from "../models/user.model";
import { generate } from "otp-generator";
import { createTransport } from "nodemailer";

const APP_PASSWORD = process.env.APP_PASSWORD!;
const EMAIL_USER = process.env.EMAIL_USER!;

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: APP_PASSWORD,
  },
});

export async function handleOtp(email: string, username: string) {
  try {
    const checkUserExists = await User.findOne({ email });

    if (checkUserExists) {
      return { success: false, message: `User already exists!` };
    }

    const checkUsernameExists = await User.findOne({ username });

    if (checkUsernameExists) {
      return { success: false, message: `Username already exists!` };
    }

    const genOtp = generate(6, {
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });

    const checkOtp = await OTP.findOne({ email });

    if (checkOtp) {
      await checkOtp.deleteOne();
    }

    const newOtp = new OTP({
      email: email,
      otp: genOtp,
    });

    await newOtp.save();

    await transporter.sendMail({
      from: `Onos <${EMAIL_USER}>`,
      to: email,
      subject: `OTP Verification Code`,
      text: `Your OTP is ${genOtp}. Expires in 5mins `,
      html: `<p>Your OTP is ${genOtp}. Expires in 5mins </p>`,
    });

    return { success: true, message: `OTP Sent Successfully` };
  } catch (error) {
    console.log("[OTP_POST_ERROR]: " + error);
    return { success: false, message: `Internal Error, try again` };
  }
}

export async function resendOtp(email: string) {
  try {
    const genOtp = generate(6, {
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });

    const newOtp = new OTP({
      email: email,
      otp: genOtp,
    });

    await newOtp.save();

    await transporter.sendMail({
      from: `Onos <${EMAIL_USER}>`,
      to: email,
      subject: `OTP Verification Code`,
      text: `Your OTP is ${genOtp}. Expires in 5mins `,
      html: `<p>Your OTP is ${genOtp}. Expires in 5mins </p>`,
    });

    return { success: true, message: `OTP Sent Successfully` };
  } catch (error) {
    console.log("[OTP_RESEND_ERROR]: " + error);
    return { success: false, message: `Internal Error, try again` };
  }
}

export async function verifyOtp(email: string, otp: string) {
  try {
    const getOtp = await OTP.findOne({ email });

    if (!getOtp) {
      return { success: false, message: "Invalid OTP" };
    }
    const checkOtp = getOtp.otp === otp;

    if (!checkOtp) {
      return { success: false, message: `OTP Incorrect` };
    }

    return { success: true, message: `Email verified successfully` };
  } catch (error) {
    console.log("[VERIFY_OTP_ERROR]: " + error);
    return { success: false, message: `Internal Error, try again` };
  }
}
