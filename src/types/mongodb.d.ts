import { Types } from "mongoose";
declare global {
  var mongoose: any;

  interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    avatar: string;
    bio: string;
    username: string;
  }

  interface IStory {
    _id: Types.ObjectId;
    title: string;
    content: string;
    genres: string[];
    slug: string;
    readingTime: string;
    description: string;
    episodes: number
    status: Status;
    coverImage: string;
    createdAt: Date;
    updatedAt: Date;
    author: Types.ObjectId;
  }

  interface IOtp {
    _id: Types.ObjectId;
    email: string;
    otp: string;
    createdAt: Date;
  }

  interface INotification {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    message: string;
    date: Date;
    read: boolean;
  }

  type Status = "published" | "saved";
}
