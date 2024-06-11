import * as mongoose from "mongoose";
import { User } from "../../../../types";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    created_at: Date,
    points: Number,
    liked_posts: Array,
    role: String,
  },
  { collection: "users", strict: true }
);

export default mongoose.model<User>("User", UserSchema);
