import mongoose, { model, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  username: string;
  bio: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: false, unique: true },
  bio: { type: String, required: false },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dog3ihaqs/image/upload/v1741877054/mq56g3xeifvoe7rhtnmz.jpg",
  },
});

userSchema.pre("save", async function (next) {
  if (
    !this.isModified("password") ||
    this.password === process.env.GOOGLE_CODE!
  ) {
    return next();
  }
  const saltRounds = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(this.password, saltRounds);

  this.password = hashedPassword;
  return next();
});

const User: Model<IUser> =
  mongoose.models?.User || model<IUser>("User", userSchema); //allowObjectTypes

export default User;
