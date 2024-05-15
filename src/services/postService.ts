import mongoose from "mongoose";
import postModel from "../models/post.model";
import { Post, NonSensitivePost, Tag } from "../types";
import { lineRed } from "../utils/logger";
const { ObjectId } = mongoose.Types;

const isValidObjectId = (id: string) =>
  ObjectId.isValid(id) && new ObjectId(id).toString() === id;
export const getMongoDBPosts = async (): Promise<Post[]> => {
  try {
    const posts = await postModel.find({});
    return posts;
  } catch (error) {
    lineRed(`Error al buscar posts: ${error}`);
    throw error;
  }
};

export const findPostById = async (
  id: string
): Promise<NonSensitivePost | null> => {
  if (!isValidObjectId(id)) return null;
  try {
    const post = await postModel.findById(id);
    if (post != null) {
      const { _id, user_id, created_at, ...restOfPost } = post?.toObject();
      return restOfPost;
    }
    return null;
  } catch (error) {
    lineRed(`Error al buscar el post: ${error}`);
    throw error;
  }
};

export const addPostEntry = async (Post: NonSensitivePost): Promise<void> => {
  try {
    const { title, description, images, tags } = Post;
    const newPost = new postModel({
      title,
      description,
      images,
      tags,
      likes: 0,
      status: "OnAir",
      created_at: new Date().toISOString(),
      user_id: null,
    });
    await newPost.save();
  } catch (error) {
    lineRed(`Error al guardar el nuevo post: ${error}`);
    throw error;
  }
};
export const updatePostFromMongo = async (
  Post: NonSensitivePost,
  id: string
): Promise<void> | null => {
  if (!isValidObjectId(id)) return null;
  try {
    const { title, description, tags, images, likes, status } = Post;
    await postModel.findByIdAndUpdate(id, {
      title,
      description,
      tags,
      images,
      likes,
      status,
    });
  } catch (error) {
    lineRed(`Error al actualizar los likes del post: ${error}`);
    throw error;
  }
};
export const updateLikesFromPost = async (
  likes: number,
  id: string
): Promise<void> | null => {
  if (!isValidObjectId(id)) return null;
  try {
    await postModel.findByIdAndUpdate(id, { likes });
  } catch (error) {
    lineRed(`Error al actualizar los likes del post: ${error}`);
    throw error;
  }
};
export const findPostByIdAndDelete = async (
  id: string
): Promise<void> | null => {
  if (!isValidObjectId(id)) return null;
  try {
    await postModel.findByIdAndDelete(id);
  } catch (error) {
    lineRed(`Error al eliminar el post: ${error}`);
    throw error;
  }
};
