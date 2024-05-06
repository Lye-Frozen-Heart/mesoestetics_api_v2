/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/naming-convention */
import postModel from '../models/post.model'
import { Post, NonSensitivePost, Tag } from '../types'

export const getMongoDBPosts = async (): Promise<Post[]> => {
  const posts = await postModel.find({})
  return posts
}

export const findPostById = async (id: string): Promise<NonSensitivePost | null> => {
  try {
    const post = await postModel.findById(id)
    if (post != null) {
      console.log('LLEGO')
      const { _id, user_id, created_at, ...restOfPost } = post?.toObject()
      return restOfPost
    }
    return null
  } catch (error) {
    throw new Error('Error al buscar el post por ID')
  }
}

export const addPostEntry = async (title: string, description: string, images: string[], tags: Tag[]): Promise<Post> => {
  try {
    const newPost = new postModel({
      title,
      description,
      images,
      tags,
      status: 'Cancelled',
      created_at: new Date(),
      user_id: 1
    })
    await newPost.save()
    return await newPost.toObject()
  } catch (error) {
    throw new Error('Error al guardar el nuevo post en MongoDB')
  }
}
export const findPostByIdAndDelete = async (id: string): Promise<void> => {
  try {
    await postModel.findByIdAndDelete(id)
  } catch (error) {
    throw new Error('Error al eliminar el post por ID')
  }
}
