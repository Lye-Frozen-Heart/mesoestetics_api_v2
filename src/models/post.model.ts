import * as mongoose from 'mongoose'
import { Post } from '../types'

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: String, required: true },
    user_id: { type: Number, required: true },
    likes: { type: Number, required: true},
    status: { type: String, required: true },
    images: { type: [String] },
    tags: { type:[String], required:true}
  },
  { collection: 'posts', strict: true }
)

export default mongoose.model<Post>('Post', PostSchema)
