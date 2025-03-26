import mongoose, { model, Model, Schema } from "mongoose";

interface IOtp {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema = new Schema<IOtp>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, expires: 60 * 5, default: Date.now },
});

const OTP: Model<IOtp> = mongoose.models?.OTP || model("OTP", otpSchema);

export default OTP;
