"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostsController_1 = __importDefault(require("../controllers/PostsController"));
const createPostsRouter = (repository) => {
    const postsRouter = (0, express_1.Router)();
    const postsController = (0, PostsController_1.default)(repository);
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
exports.default = postsRouterIoC;
