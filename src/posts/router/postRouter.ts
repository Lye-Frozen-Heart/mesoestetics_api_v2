import { Router } from "express";
import PostsController from "../controllers/PostsController";

const createPostsRouter = (repository) => {
  const postsRouter = Router();
  const postsController = PostsController(repository);

  // Existing routes
  postsRouter.get("/", postsController.getAllPosts);
  postsRouter.get("/:id", postsController.getPost);
  postsRouter.post("/", postsController.createPost);
  postsRouter.put("/:id", postsController.updatePost);
  postsRouter.delete("/:id", postsController.deletePost);

  // New route for toggling like
  postsRouter.post("/:postId/like", async (req, res) => {
    try {
      // Fetch the post by ID
      const post = await repository.getPost(req.params.postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Check if the user has liked the post
      const userIndex = post.likes.indexOf(req.user.username);

      if (userIndex > -1) {
        // User already liked, remove like
        post.likes.splice(userIndex, 1);
      } else {
        // User has not liked, add like
        post.likes.push(req.user.username);
      }

      // Save the updated post
      await repository.updatePost(req.params.postId, post);

      // Respond with the updated like status
      res.json({
        success: true,
        likesCount: post.likes.length,
        likedByCurrentUser: userIndex === -1
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  return postsRouter;
};

const postsRouterIoC = (app, repository) => {
  const postsRouter = createPostsRouter(repository);

  app.use("/posts", postsRouter);
};

export default postsRouterIoC;