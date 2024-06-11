import * as mongoose from "mongoose";
import { User } from "../../../../types";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now },
    liked_posts: { type: [String], default: [] },
    points: { type: Number, default: 0 },
    role: { type: String, default: "Regular" },
  },
  { collection: "users", strict: true }
);

export default mongoose.model<User>("User", UserSchema);
