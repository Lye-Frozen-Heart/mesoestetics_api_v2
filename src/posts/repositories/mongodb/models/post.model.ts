import * as mongoose from "mongoose";
import { Post } from "../../../../types";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    problem_description: { type: String, required: true },
    solution_description: { type: String, required: true },
    created_at: { type: String, required: true },
    user: { type: String, required: true },
    likes: { type: [String], required: true },
    status: { type: String, required: true },
    images: { type: [String] },
    tags: { type: [String], required: true },
    rooms: { type: [String]},
  },
  { collection: "posts", strict: true }
);

export default mongoose.model<Post>("Post", PostSchema);
