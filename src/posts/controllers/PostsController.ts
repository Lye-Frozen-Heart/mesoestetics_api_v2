import createPost from "./createPost";
import deletePost from "./deletePost";
import getAllPosts from "./getAllPosts";
import updatePost from "./updatePost";
import getPost from "./getPost";
import likePost from "./likePost";

const PostsController = (repository) => ({
  getAllPosts: getAllPosts(repository),
  getPost: getPost(repository),
  createPost: createPost(repository),
  updatePost: updatePost(repository),
  deletePost: deletePost(repository),
  likePost: likePost(repository),
});
export default PostsController;
