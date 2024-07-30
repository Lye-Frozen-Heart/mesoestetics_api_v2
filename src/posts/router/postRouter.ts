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
  // postsRouter.post('/:id/like', postsController.addLike);
  // postsRouter.post('/:id/unlike', postsController.removeLike);

  return postsRouter;
};

const postsRouterIoC = (app, repository) => {
  const postsRouter = createPostsRouter(repository);

  app.use("/posts", postsRouter);
};

export default postsRouterIoC;