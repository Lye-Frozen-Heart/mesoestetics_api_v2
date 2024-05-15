import { Post } from "../../types";

export interface IPostsInMemoryRepository {
  getAllPosts: () => Promise<Post[]>;
  getPost: (id: string) => Promise<NonSensitivePost | []>;
  addPost: (Post: Post) => Promise<void>;
  updatePost: (id: string, Post: NonSensitivePost) => Promise<void>;
  removePost: (id: string) => Promise<void>;
  updateLikesFromPost: (id: string, likes: number) => Promise<void>;
}
