import { Post } from "../../../types";
import { PostsRepository } from "../PostsRepository";
import { lineRed } from "../../../utils/logger";
import postModel from "./models/post.model";
import { isValidObjectId } from "../../../utils";
import dayjs from "dayjs";
const MongoosePostsRepository = (): PostsRepository => {
  return {
    getAllPosts: async function (): Promise<Post[]> {
      try {
        const posts = await postModel.find({});
        return posts;
      } catch (error) {
        lineRed(`Error trying to find posts: ${error}`);
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
        lineRed(
          `Error trying to find the post with id: ${id}, error found: ${error}`
        );
        return null;
      }
    },
    addPost: async function (Post: Post): Promise<Post | null> {
      try {
        const { title, problem_description, solution_description, images = [], tags = [], user, rooms = [] } = Post;
        const newPost = new postModel({
          title,
          problem_description,
          solution_description,
          images,
          tags,
          likes: 0,
          status: "Plan",
          created_at: dayjs().toISOString(),
          user,
          rooms,
        });
        await newPost.save();
        return newPost;
      } catch (error) {
        lineRed(`Error trying to save the new post: ${error}`);
        return null;
      }
    },
    updatePost: async function (id: string, post: Post): Promise<Post | null> {
      if (!isValidObjectId(id)) return null;
      try {
        const { title, problem_description, solution_description, tags, images, likes, status, rooms } = post;
        await postModel.findByIdAndUpdate(id, {
          title,
          problem_description,
          solution_description,
          tags,
          images,
          likes,
          status,
          rooms,
        });
        return post;
      } catch (error) {
        lineRed(
          `Error trying to update the post with id: ${id}, error found: ${error}`
        );
        return null;
      }
    },
    removePost: async function (id: string): Promise<string | null> {
      if (!isValidObjectId(id)) return null;
      try {
        await postModel.findByIdAndDelete(id);
        return id;
      } catch (error) {
        lineRed(
          `Error trying to remove the post with id: ${id}, error found: ${error}`
        );
        return null;
      }
    },
    updateLikesFromPost: async function (
      id: string,
      likes: string
    ): Promise<Post | null> {
      if (!isValidObjectId(id)) return null;
      try {
        const data = await postModel.findByIdAndUpdate(id, { likes });
        return data;
      } catch (error) {
        lineRed(
          `Error trying to update the likes from post: ${id}, error found: ${error}`
        );
        return null;
      }
    },
  };
};

export default MongoosePostsRepository;
