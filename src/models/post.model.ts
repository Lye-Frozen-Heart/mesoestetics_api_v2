import * as mongoose from 'mongoose'
import { Post } from '../types'

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: String, required: true },
    user_id: { type: String, required: true },
    status: { type: String, required: true },
    images: { type: [String] }
  },
  { collection: 'posts', strict: true }
)

export default mongoose.model<Post>('Post', PostSchema)
