import { Router } from "express";
import PostsController from "../controllers/PostsController";

const createPostsRouter = (repository) => {
  const postsRouter = Router();
  const postsController = PostsController(repository);

  postsRouter.get("/", postsController.getAllPosts);
  postsRouter.get("/:id", postsController.getPost);
  postsRouter.post("/", postsController.createPost);
  postsRouter.put("/:id", postsController.updatePost);
  postsRouter.delete("/:id", postsController.deletePost);

  return postsRouter;
};

const postsRouterIoC = (app, repository) => {
  const postsRouter = createPostsRouter(repository);

  app.use("/posts", postsRouter);
};
export default postsRouterIoC;
