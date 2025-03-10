import { Types } from "mongoose";

declare global {
  let mongoose;

  interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    avatar: string;
  }
}
