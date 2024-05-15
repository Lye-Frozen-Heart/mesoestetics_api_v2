import { Post, NonSensitivePost } from "../../../types";
import { IPostsInMemoryRepository } from "../PostsInMemoryRepository";
import { lineRed } from "../../../utils/logger";
import * as postService from "../../../services/postService";

const PostsInMongoRepository = () => ({
  getAllPosts: async function (): Promise<Post[]> {
    try {
      const response = await postService.getMongoDBPosts();
      return response;
    } catch (error) {
      lineRed(`Cannot extract posts: ${error}`);
    }
  },
  getPost: async function (id: string): Promise<NonSensitivePost> {
    try {
      const response = await postService.findPostById(id);
      if (response === null) {
        throw new Error("Post not found");
      }
      return response;
    } catch (error) {
      lineRed(`Cannot find post: ${error}`);
    }
  },
  addPost: async function (Post: NonSensitivePost): Promise<void> {
    try {
      await postService.addPostEntry(Post);
    } catch (error) {
      lineRed(`Cannot add post: ${error}`);
    }
  },
  updatePost: async function (
    id: string,
    Post: NonSensitivePost
  ): Promise<void> {
    try {
      await postService.updatePostFromMongo(Post, id);
    } catch (error) {
      lineRed(`Cannot add post: ${error}`);
    }
  },
  removePost: async function (id: string): Promise<void> {
    try {
      await postService.findPostByIdAndDelete(id);
    } catch (error) {
      lineRed(`Cannot add post: ${error}`);
    }
  },
  updateLikesFromPost: async function (
    id: string,
    likes: number
  ): Promise<void> {
    if (isNaN(likes)) throw new Error("Invalid likes parameter");
    try {
      const response = await postService.updateLikesFromPost(likes, id);
      return response;
    } catch (error) {
      lineRed(`Cannot update likes: ${error}`);
    }
  },
});
export default PostsInMongoRepository;
