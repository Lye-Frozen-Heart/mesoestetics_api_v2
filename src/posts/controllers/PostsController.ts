import createPost from "./createPost.js";
import deletePost from "./deletePost.js";
import getAllPosts from "./getAllPosts.js";
import updatePost from "./updatePost.js";

const PostsController = (repository) => ({
    getAllPosts: getAllPosts(repository),
    createPost: createPost(repository),
    updatePost: updatePost(repository),
    deletePost: deletePost(repository)
});
export default PostsController;