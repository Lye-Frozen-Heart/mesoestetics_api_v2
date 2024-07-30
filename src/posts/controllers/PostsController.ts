import createPost from "./createPost";
import deletePost from "./deletePost";
import getAllPosts from "./getAllPosts";
import updatePost from "./updatePost";
import getPost from "./getPost";
// import addLike from "./addLike";
// import removeLike from "./removeLike";
const PostsController = (repository) => ({
  getAllPosts: getAllPosts(repository),
  getPost: getPost(repository),
  createPost: createPost(repository),
  updatePost: updatePost(repository),
  deletePost: deletePost(repository),
  // addLike: addLike(repository),
  // removeLike: removeLike(repository),
});
export default PostsController;
