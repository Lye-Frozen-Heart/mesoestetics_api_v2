import { Post } from "../../../types";
import { PostsRepository } from "../PostsRepository";
import { lineRed } from "../../../utils/logger";
import postModel from "./models/post.model";
import { isValidObjectId } from "../../../utils";
const MongoosePostsRepository = (): PostsRepository => {
  return {
    getAllPosts: async function (): Promise<Post[]> {
      try {
        const posts = await postModel.find({});
        return posts;
      } catch (error) {
        lineRed(`Error al buscar posts: ${error}`);
        throw error;
      }
    },
    getPost: async function (id: string): Promise<Post | null> {
      if (!isValidObjectId(id)) return null;
      try {
        const post = await postModel.findById(id);
        if (post != null) return post;
        return null;
      } catch (error) {
        lineRed(`Error al buscar el post: ${error}`);
        return null;
      }
    },
    addPost: async function (Post: Post): Promise<Post | null> {
      try {
        const { title, description, images = [], tags = [] } = Post;
        const newPost = new postModel({
          title,
          description,
          images,
          tags,
          likes: 0,
          status: "OnAir",
          created_at: new Date().toISOString(),
          user_id: 5,
        });
        await newPost.save();
        return newPost;
      } catch (error) {
        lineRed(`Error al guardar el nuevo post: ${error}`);
        return null;
      }
    },
    updatePost: async function (id: string, post: Post): Promise<Post | null> {
      if (!isValidObjectId(id)) return null;
      try {
        const { title, description, tags, images, likes, status } = post;
        await postModel.findByIdAndUpdate(id, {
          title,
          description,
          tags,
          images,
          likes,
          status,
        });
        return post;
      } catch (error) {
        lineRed(`Error al actualizar los likes del post: ${error}`);
        return null;
      }
    },
    removePost: async function (id: string): Promise<string | null> {
      if (!isValidObjectId(id)) return null;
      try {
        await postModel.findByIdAndDelete(id);
        return id;
      } catch (error) {
        lineRed(`Error al eliminar el post: ${error}`);
        return null;
      }
    },
    updateLikesFromPost: async function (
      id: string,
      likes: number
    ): Promise<Post | null> {
      if (!isValidObjectId(id)) return null;
      try {
        const data = await postModel.findByIdAndUpdate(id, { likes });
        return data;
      } catch (error) {
        lineRed(`Error al actualizar los likes del post: ${error}`);
        return null;
      }
    },
  };
};

export default MongoosePostsRepository;
