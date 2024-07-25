import { Post } from "../../types";

export interface PostsRepository {
  getAllPosts: () => Promise<Post[]>;
  getPost: (id: string) => Promise<Post | null>;
  addPost: (Post: Post) => Promise<Post | null>;
  updatePost: (id: string, post: Post) => Promise<Post | null>;
  removePost: (id: string) => Promise<string | null>;
  updateLikesFromPost: (id: string, likes: string[]) => Promise<Post | null>;
}
