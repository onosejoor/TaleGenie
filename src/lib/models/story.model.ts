import mongoose, { Model, model, Schema, Types } from "mongoose";

interface IStory {
  title: string;
  content: string;
  genres: string[];
  description: string;
  episodes: number;
  readingTime: string;
  status: Status;
  author: Types.ObjectId;
  slug: string;
  coverImage: string;
  createdAt: Date;
  updatedAt: Date
}

const storySchema = new Schema<IStory>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    genres: [{ type: String, required: true }],
    slug: { type: String, unique: true, required: true },
    readingTime: { type: String, required: true},
    coverImage: { type: String, required: true},
    episodes: { type: Number, required: true },
    description: { type: String },
    status: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Story: Model<IStory> =
  mongoose.models?.Story || model<IStory>("Story", storySchema);

export default Story;
